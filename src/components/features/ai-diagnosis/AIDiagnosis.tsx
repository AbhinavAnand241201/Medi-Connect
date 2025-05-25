import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useStore } from '../../../store';
import { FaRobot, FaSpinner, FaHistory, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface DiagnosisResult {
  id: string;
  timestamp: string;
  symptoms: string[];
  conditions: Array<{
    name: string;
    confidence: number;
    description: string;
  }>;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
}

export const AIDiagnosis: React.FC = () => {
  const [symptoms, setSymptoms] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<DiagnosisResult | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const user = useStore((state) => state.user);
  const addAIDiagnosis = useStore((state) => state.addAIDiagnosis);
  const aiDiagnoses = useStore((state) => state.aiDiagnoses);

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      toast.error('Please enter your symptoms');
      return;
    }

    setIsAnalyzing(true);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `As a medical AI assistant, analyze these symptoms and provide a diagnosis:
      Symptoms: ${symptoms}
      
      Please provide:
      1. A list of potential conditions with confidence levels (0-100%)
      2. A brief description of each condition
      3. Recommended next steps
      4. Overall severity assessment (low/medium/high)
      
      Format the response as JSON with the following structure:
      {
        "conditions": [
          {
            "name": "condition name",
            "confidence": number,
            "description": "brief description"
          }
        ],
        "recommendations": ["recommendation1", "recommendation2"],
        "severity": "low/medium/high"
      }`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the JSON response
      const diagnosisData = JSON.parse(text);
      
      const newDiagnosis: DiagnosisResult = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        symptoms: symptoms.split(',').map(s => s.trim()),
        conditions: diagnosisData.conditions,
        recommendations: diagnosisData.recommendations,
        severity: diagnosisData.severity,
      };

      setCurrentResult(newDiagnosis);
      addAIDiagnosis(newDiagnosis);
      toast.success('Analysis complete!');

    } catch (error) {
      console.error('AI Diagnosis error:', error);
      toast.error('Failed to analyze symptoms. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">AI-Powered Symptom Analysis</h1>
        <p className="text-gray-600">
          Enter your symptoms below for an AI-powered analysis. Our system will help identify
          potential conditions and provide recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe Your Symptoms
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Enter your symptoms, separated by commas (e.g., fever, headache, fatigue)"
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={analyzeSymptoms}
              disabled={isAnalyzing}
              className={`w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 ${
                isAnalyzing
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
                  <FaRobot />
                  Analyze Symptoms
                </>
              )}
            </motion.button>

            {currentResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Analysis Results</h2>
                    <span className={`font-medium ${getSeverityColor(currentResult.severity)}`}>
                      Severity: {currentResult.severity.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">
                        Potential Conditions
                      </h3>
                      <div className="space-y-4">
                        {currentResult.conditions.map((condition, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 p-4 rounded-lg"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-gray-800">
                                {condition.name}
                              </span>
                              <span className="text-sm text-gray-600">
                                {condition.confidence}% confidence
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {condition.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">
                        Recommendations
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {currentResult.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FaExclamationTriangle className="text-yellow-500 mt-1 flex-shrink-0" />
                        <p className="text-sm text-yellow-700">
                          This is an AI-powered analysis and should not replace professional medical advice.
                          Please consult a healthcare provider for proper diagnosis and treatment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Diagnosis History</h2>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-blue-500 hover:text-blue-600"
              >
                {showHistory ? 'Hide' : 'Show'}
              </button>
            </div>

            {showHistory && (
              <div className="space-y-4">
                {aiDiagnoses.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No previous diagnoses</p>
                ) : (
                  aiDiagnoses.map((diagnosis) => (
                    <motion.div
                      key={diagnosis.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setCurrentResult(diagnosis)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-500">
                          {new Date(diagnosis.timestamp).toLocaleDateString()}
                        </span>
                        <span className={`text-sm font-medium ${getSeverityColor(diagnosis.severity)}`}>
                          {diagnosis.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {diagnosis.symptoms.join(', ')}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 