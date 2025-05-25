import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenName } from '../App';
import { AppHeader } from '../common/AppHeader';
import { styles } from '../../styles/common';

interface LoginScreenProps {
  navigateTo: (screen: ScreenName) => void;
  currentScreen: ScreenName;
  isAuthenticated: boolean;
  handleLogout: () => void;
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ 
  navigateTo, 
  currentScreen, 
  isAuthenticated, 
  handleLogout, 
  onLoginSuccess 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // TODO: Implement actual login logic here
      // For now, simulate a successful login
      onLoginSuccess();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
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
          <h2 style={styles.authTitle}>Log In to MediConnect</h2>
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
                placeholder="Enter your password"
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
              Log In
            </motion.button>
          </form>
          <div style={styles.authLink}>
            Don't have an account?{' '}
            <button
              onClick={() => navigateTo('signup')}
              style={styles.linkButton}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}; 