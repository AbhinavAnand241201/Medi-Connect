import React from 'react';
import { motion } from 'framer-motion';
import { AuthFormContainer } from '../common/AuthFormContainer';
import { styles } from '../../styles/components';
import { ScreenProps } from '../App';

interface LoginScreenProps extends Pick<ScreenProps, 'navigateTo' | 'isAuthenticated' | 'handleLogout'> {
  onLoginSuccess?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  navigateTo,
  isAuthenticated,
  handleLogout,
  onLoginSuccess,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt");
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <AuthFormContainer
      title="Login to MediConnect"
      screenProps={{ navigateTo, currentScreen: 'login', isAuthenticated, handleLogout }}
      screenKey="login"
    >
      <form onSubmit={handleSubmit} style={styles.authForm}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <label htmlFor="email" style={styles.label}>Email Address</label>
          <motion.input
            type="email"
            id="email"
            name="email"
            required
            style={styles.inputField}
            placeholder="you@example.com"
            whileFocus={{
              borderColor: '#007AFF',
              boxShadow: '0 0 0 3px rgba(0, 122, 255, 0.2)',
              outline: 'none',
            }}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <motion.input
            type="password"
            id="password"
            name="password"
            required
            style={styles.inputField}
            placeholder="••••••••"
            whileFocus={{
              borderColor: '#007AFF',
              boxShadow: '0 0 0 3px rgba(0, 122, 255, 0.2)',
              outline: 'none',
            }}
          />
        </motion.div>
        <motion.button
          type="submit"
          style={styles.ctaButton}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Login"
        >
          Login
        </motion.button>
      </form>
      <p style={styles.authLink}>
        Don't have an account?{' '}
        <button onClick={() => navigateTo('signup')} style={styles.linkButton} aria-label="Navigate to Sign Up page">
          Sign Up
        </button>
      </p>
    </AuthFormContainer>
  );
}; 