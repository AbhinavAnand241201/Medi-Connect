import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useStore } from '../../../store';
import { toast } from 'react-toastify';
import { FaSearch, FaSpinner } from 'react-icons/fa';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const commonSymptoms = [
  'Fever',
  'Cough',
  'Headache',
  'Fatigue',
  'Sore throat',
  'Shortness of breath',
  'Muscle aches',
  'Loss of taste or smell',
  'Nausea',
  'Diarrhea',
];

export const SymptomChecker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<{
    condition: string;
    confidence: number;
    recommendations: string[];
  } | null>(null);
  const addAIDiagnosis = useStore((state) => state.addAIDiagnosis);
  const user = useStore((state) => state.user);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      setSelectedSymptoms((prev) => [...prev, customSymptom.trim()]);
      setCustomSymptom('');
    }
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error('Please select at least one symptom');
      return;
    }

    setIsAnalyzing(true);
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `As a medical AI assistant, analyze these symptoms: ${selectedSymptoms.join(
        ', '
      )}. Provide a potential diagnosis, confidence level (0-100), and recommendations. Format as JSON: {condition: string, confidence: number, recommendations: string[]}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const analysis = JSON.parse(text);

      setDiagnosis(analysis);

      if (user) {
        addAIDiagnosis({
          id: Date.now().toString(),
          date: new Date().toISOString(),
          symptoms: selectedSymptoms,
          diagnosis: analysis.condition,
          confidence: analysis.confidence,
          recommendations: analysis.recommendations,
          paid: false,
        });
      }

      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      toast.error('Failed to analyze symptoms. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Symptom Checker</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Common Symptoms</h3>
        <div className="flex flex-wrap gap-2">
          {commonSymptoms.map((symptom) => (
            <motion.button
              key={symptom}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSymptom(symptom)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSymptoms.includes(symptom)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {symptom}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Custom Symptom</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={customSymptom}
            onChange={(e) => setCustomSymptom(e.target.value)}
            placeholder="Enter a symptom..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addCustomSymptom}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </motion.button>
        </div>
      </div>

      {selectedSymptoms.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Selected Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map((symptom) => (
              <motion.div
                key={symptom}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full"
              >
                <span>{symptom}</span>
                <button
                  onClick={() => toggleSymptom(symptom)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={analyzeSymptoms}
        disabled={isAnalyzing || selectedSymptoms.length === 0}
        className={`w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 ${
          isAnalyzing || selectedSymptoms.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isAnalyzing ? (
          <>
            <FaSpinner className="animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <FaSearch />
            Analyze Symptoms
          </>
        )}
      </motion.button>

      {diagnosis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Analysis Results</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Potential Condition</p>
              <p className="text-lg font-medium text-gray-800">{diagnosis.condition}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Confidence Level</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${diagnosis.confidence}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{diagnosis.confidence}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Recommendations</p>
              <ul className="list-disc list-inside space-y-1">
                {diagnosis.recommendations.map((rec, index) => (
                  <li key={index} className="text-gray-800">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}; 