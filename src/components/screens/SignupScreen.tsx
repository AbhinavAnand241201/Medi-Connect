import React from 'react';
import { motion } from 'framer-motion';
import { AuthFormContainer } from '../common/AuthFormContainer';
import { styles } from '../../styles/components';
import { ScreenProps } from '../App';

interface SignupScreenProps extends Pick<ScreenProps, 'navigateTo' | 'isAuthenticated' | 'handleLogout'> {
  onSignupSuccess?: () => void;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({
  navigateTo,
  isAuthenticated,
  handleLogout,
  onSignupSuccess,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt");
    if (onSignupSuccess) onSignupSuccess();
  };

  return (
    <AuthFormContainer
      title="Join MediConnect"
      screenProps={{ navigateTo, currentScreen: 'signup', isAuthenticated, handleLogout }}
      screenKey="signup"
    >
      <form onSubmit={handleSubmit} style={styles.authForm}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <label htmlFor="fullName" style={styles.label}>Full Name</label>
          <motion.input
            type="text"
            id="fullName"
            name="fullName"
            required
            style={styles.inputField}
            placeholder="Your Name"
            whileFocus={{
              borderColor: '#007AFF',
              boxShadow: '0 0 0 3px rgba(0, 122, 255, 0.2)',
              outline: 'none',
            }}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <label htmlFor="email-signup" style={styles.label}>Email Address</label>
          <motion.input
            type="email"
            id="email-signup"
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
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <label htmlFor="password-signup" style={styles.label}>Password</label>
          <motion.input
            type="password"
            id="password-signup"
            name="password"
            required
            style={styles.inputField}
            placeholder="Choose a strong password"
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
          aria-label="Sign Up"
        >
          Sign Up
        </motion.button>
      </form>
      <p style={styles.authLink}>
        Already have an account?{' '}
        <button onClick={() => navigateTo('login')} style={styles.linkButton} aria-label="Navigate to Login page">
          Login
        </button>
      </p>
    </AuthFormContainer>
  );
}; 