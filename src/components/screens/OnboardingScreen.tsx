import React from 'react';
import { motion } from 'framer-motion';
import { AuthFormContainer } from '../common/AuthFormContainer';
import { styles } from '../../styles/components';
import { ScreenProps } from '../App';

export const OnboardingScreen: React.FC<Pick<ScreenProps, 'navigateTo' | 'isAuthenticated' | 'handleLogout'>> = ({
  navigateTo,
  isAuthenticated,
  handleLogout,
}) => {
  return (
    <AuthFormContainer
      title="Welcome to MediConnect!"
      screenProps={{ navigateTo, currentScreen: 'onboarding', isAuthenticated, handleLogout }}
      screenKey="onboarding"
      logoNavTarget="home"
    >
      <motion.p
        style={{ ...styles.introText, textAlign: 'center', marginBottom: '25px' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        We're excited to have you. Let's get you set up for a healthier tomorrow.
      </motion.p>
      <motion.button
        onClick={() => navigateTo('mainTab')}
        style={styles.ctaButton}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Get Started"
      >
        Get Started
      </motion.button>
    </AuthFormContainer>
  );
}; 