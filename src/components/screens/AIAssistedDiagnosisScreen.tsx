import React from 'react';
import { ScreenProps } from '../App';

export const AIAssistedDiagnosisScreen: React.FC<ScreenProps> = ({ navigateTo }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">AI-Assisted Diagnosis</h1>
      <p className="text-center text-gray-600">Coming soon...</p>
    </div>
  );
}; 