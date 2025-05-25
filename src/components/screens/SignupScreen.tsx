import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenName } from '../App';
import { AppHeader } from '../common/AppHeader';
import { styles } from '../../styles/common';

interface SignupScreenProps {
  navigateTo: (screen: ScreenName) => void;
  currentScreen: ScreenName;
  isAuthenticated: boolean;
  handleLogout: () => void;
  onSignupSuccess: () => void;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({ 
  navigateTo, 
  currentScreen, 
  isAuthenticated, 
  handleLogout, 
  onSignupSuccess 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // TODO: Implement actual signup logic here
      // For now, simulate a successful signup
      onSignupSuccess();
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
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
          <h2 style={styles.authTitle}>Create Your MediConnect Account</h2>
          <form onSubmit={handleSubmit} style={styles.authForm}>
            <div>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.inputField}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.inputField}
                placeholder="Create a password"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.inputField}
                placeholder="Confirm your password"
                required
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#FF3B30', fontSize: '0.9rem', margin: '0 0 15px 0' }}
              >
                {error}
              </motion.p>
            )}
            <motion.button
              type="submit"
              style={styles.ctaButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </form>
          <div style={styles.authLink}>
            Already have an account?{' '}
            <button
              onClick={() => navigateTo('login')}
              style={styles.linkButton}
              type="button"
            >
              Log In
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}; 