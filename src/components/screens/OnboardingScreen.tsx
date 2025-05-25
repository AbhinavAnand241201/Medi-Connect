import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenName } from '../App';
import { AppHeader } from '../common/AppHeader';
import { styles } from '../../styles/common';

interface OnboardingScreenProps {
  navigateTo: (screen: ScreenName) => void;
  currentScreen: ScreenName;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ 
  navigateTo, 
  currentScreen, 
  isAuthenticated, 
  handleLogout 
}) => {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !age || !gender) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // TODO: Implement actual onboarding logic here
      // For now, simulate a successful onboarding
      navigateTo('mainTab');
    } catch (err) {
      setError('Onboarding failed. Please try again.');
    }
  };

  const nextStep = () => {
    if (step === 1 && !fullName) {
      setError('Please enter your full name.');
      return;
    }
    if (step === 2 && (!age || !gender)) {
      setError('Please fill in all fields.');
      return;
    }
    setStep(step + 1);
    setError(null);
  };

  const prevStep = () => {
    setStep(step - 1);
    setError(null);
  };

  return (
    <motion.div
      style={styles.pageContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <AppHeader
        navigateTo={navigateTo}
        currentScreen={currentScreen}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
      <motion.div style={styles.mainContent}>
        <motion.div
          style={styles.authFormContainerContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <h2 style={styles.authTitle}>Complete Your Profile</h2>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            Step {step} of 3
          </div>
          <form onSubmit={handleSubmit} style={styles.authForm}>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="fullName" style={styles.label}>Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={styles.inputField}
                  placeholder="Enter your full name"
                  required
                />
              </motion.div>
            )}
            {step === 2 && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <label htmlFor="age" style={styles.label}>Age</label>
                  <input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={styles.inputField}
                    placeholder="Enter your age"
                    required
                    min="0"
                    max="120"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label htmlFor="gender" style={styles.label}>Gender</label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    style={styles.inputField}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </motion.div>
              </>
            )}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                  Thank you for providing your information. Click "Complete" to finish setting up your profile.
                </p>
              </motion.div>
            )}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#FF3B30', fontSize: '0.9rem', margin: '0 0 15px 0' }}
              >
                {error}
              </motion.p>
            )}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  style={styles.outlineButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
              )}
              {step < 3 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  style={styles.ctaButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  style={styles.ctaButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Complete
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}; 