import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export interface AnalysisResult {
  diagnosis: string;
  confidence: number;
  recommendations: string[];
  additionalNotes?: string;
}

export const analyzeSymptoms = async (
  symptoms: string,
  images?: File[]
): Promise<AnalysisResult> => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please add your API key to the .env file.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    
    // Prepare the prompt
    const prompt = `As a medical AI assistant, analyze the following symptoms and provide a preliminary assessment:
    Symptoms: ${symptoms}
    Please provide:
    1. A possible diagnosis
    2. Confidence level (0-100)
    3. Recommended next steps
    4. Any additional notes or warnings`;

    // If images are provided, include them in the analysis
    if (images && images.length > 0) {
      const imageParts = await Promise.all(
        images.map(async (image) => {
          const base64 = await convertFileToBase64(image);
          return {
            inlineData: {
              data: base64,
              mimeType: image.type,
            },
          };
        })
      );

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();
      
      // Parse the response and structure it
      return parseGeminiResponse(text);
    } else {
      // Text-only analysis
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return parseGeminiResponse(text);
    }
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw new Error('Failed to analyze symptoms. Please try again.');
  }
};

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

const parseGeminiResponse = (text: string): AnalysisResult => {
  // This is a simple parser - you might want to make it more robust
  const lines = text.split('\n');
  
  const diagnosis = lines.find(line => line.toLowerCase().includes('diagnosis:'))?.split(':')[1]?.trim() || 'Unable to determine';
  const confidenceMatch = text.match(/confidence:?\s*(\d+)/i);
  const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 0;
  
  const recommendations = lines
    .filter(line => line.toLowerCase().includes('recommend') || line.toLowerCase().includes('next step'))
    .map(line => line.replace(/^[•-]\s*/, '').trim());
  
  const additionalNotes = lines
    .find(line => line.toLowerCase().includes('note') || line.toLowerCase().includes('warning'))
    ?.split(':')[1]
    ?.trim();

  return {
    diagnosis,
    confidence,
    recommendations,
    additionalNotes,
  };
}; 