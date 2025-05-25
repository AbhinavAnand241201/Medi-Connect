import React from 'react';
import { motion } from 'framer-motion';
import { AuthFormContainer } from '../common/AuthFormContainer';
import { styles } from '../../styles/components';
import { ScreenProps } from '../App';

export const ProfileScreen: React.FC<Pick<ScreenProps, 'navigateTo' | 'isAuthenticated' | 'handleLogout'>> = ({
  navigateTo,
  isAuthenticated,
  handleLogout,
}) => {
  return (
    <AuthFormContainer
      title="Your Profile"
      screenProps={{ navigateTo, currentScreen: 'profile', isAuthenticated, handleLogout }}
      screenKey="profile"
      logoNavTarget="mainTab"
    >
      <motion.p
        style={{ ...styles.introText, textAlign: 'center', marginBottom: '25px' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Manage your personal information, medical history, and communication preferences here. (Content placeholder)
      </motion.p>
      <motion.button
        onClick={() => navigateTo('mainTab')}
        style={{ ...styles.ctaButton, backgroundColor: '#5856D6', borderColor: '#5856D6' }}
        whileHover={{ scale: 1.03, backgroundColor: '#4B49C0' }}
        whileTap={{ scale: 0.98 }}
        aria-label="Back to Dashboard"
      >
        Back to Dashboard
      </motion.button>
    </AuthFormContainer>
  );
}; 