import React from 'react';
import { motion } from 'framer-motion';
import { AppHeader } from '../common/AppHeader';
import { Footer } from '../common/Footer';
import { styles } from '../../styles/components';
import { ScreenProps } from '../App';

export const MainTabScreen: React.FC<Pick<ScreenProps, 'navigateTo' | 'isAuthenticated' | 'handleLogout'>> = ({
  navigateTo,
  isAuthenticated,
  handleLogout,
}) => {
  return (
    <motion.div
      key="mainTab"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.pageContainer}
    >
      <AppHeader
        navigateTo={navigateTo}
        currentScreen="mainTab"
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        logoNavTarget="mainTab"
      />
      <main style={{ ...styles.mainContent, alignItems: 'stretch', textAlign: 'left' }}>
        <motion.h2
          style={{ ...styles.authTitle, textAlign: 'left', marginBottom: '30px' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Your Health Dashboard
        </motion.h2>

        <motion.p
          style={{ ...styles.introText, textAlign: 'left', marginBottom: '30px' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome back! Here you can manage your appointments, start new consultations, and view your health overview.
        </motion.p>

        <div style={styles.dashboardGrid}>
          <motion.div
            style={styles.dashboardCard}
            whileHover={{ scale: 1.03, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
            onClick={() => alert("Feature: Book New Appointment")}
          >
            <h3 style={styles.featureTitle}>Book New Appointment</h3>
            <p style={styles.featureDescription}>Find a doctor and schedule your next visit.</p>
          </motion.div>
          <motion.div
            style={styles.dashboardCard}
            whileHover={{ scale: 1.03, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
            onClick={() => alert("Feature: View Upcoming Appointments")}
          >
            <h3 style={styles.featureTitle}>Upcoming Appointments</h3>
            <p style={styles.featureDescription}>Check your scheduled consultations.</p>
          </motion.div>
          <motion.div
            style={styles.dashboardCard}
            whileHover={{ scale: 1.03, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
            onClick={() => navigateTo('profile')}
          >
            <h3 style={styles.featureTitle}>My Profile</h3>
            <p style={styles.featureDescription}>View and update your personal information.</p>
          </motion.div>
          <motion.div
            style={styles.dashboardCard}
            whileHover={{ scale: 1.03, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
            onClick={() => navigateTo('settings')}
          >
            <h3 style={styles.featureTitle}>Settings</h3>
            <p style={styles.featureDescription}>Manage your application preferences.</p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}; 