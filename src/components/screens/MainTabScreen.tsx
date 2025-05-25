import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenName } from '../App';
import { AppHeader } from '../common/AppHeader';
import { styles } from '../../styles/common';

interface MainTabScreenProps {
  navigateTo: (screen: ScreenName) => void;
  currentScreen: ScreenName;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

export const MainTabScreen: React.FC<MainTabScreenProps> = ({ 
  navigateTo, 
  currentScreen, 
  isAuthenticated, 
  handleLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'health'>('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={styles.pageTitle}>Welcome to Your Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', width: '100%' }}>
              <motion.div
                style={styles.featureCard}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigateTo('aiDiagnosis')}
              >
                <h3>AI Diagnosis</h3>
                <p>Get instant medical insights powered by AI</p>
              </motion.div>
              <motion.div
                style={styles.featureCard}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigateTo('videoCall')}
              >
                <h3>Video Consultation</h3>
                <p>Connect with doctors in real-time</p>
              </motion.div>
              <motion.div
                style={styles.featureCard}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigateTo('appointmentBooking')}
              >
                <h3>Book Appointment</h3>
                <p>Schedule your next visit</p>
              </motion.div>
            </div>
          </motion.div>
        );
      case 'appointments':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={styles.pageTitle}>Your Appointments</h2>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
              {/* TODO: Add appointment list component */}
              <p style={{ textAlign: 'center', color: '#666' }}>No upcoming appointments</p>
            </div>
          </motion.div>
        );
      case 'health':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={styles.pageTitle}>Health Overview</h2>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
              {/* TODO: Add health data visualization component */}
              <p style={{ textAlign: 'center', color: '#666' }}>Health data will be displayed here</p>
            </div>
          </motion.div>
        );
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
      <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', margin: '0 auto', gap: '20px' }}>
        <nav style={{ width: '200px', padding: '20px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {(['dashboard', 'appointments', 'health'] as const).map((tab) => (
              <li key={tab} style={{ marginBottom: '10px' }}>
                <motion.button
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...styles.navButton,
                    width: '100%',
                    textAlign: 'left',
                    backgroundColor: activeTab === tab ? '#007AFF' : 'transparent',
                    color: activeTab === tab ? 'white' : '#007AFF',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>
        <main style={{ flex: 1, padding: '20px' }}>
          {renderTabContent()}
        </main>
      </div>
    </motion.div>
  );
}; 