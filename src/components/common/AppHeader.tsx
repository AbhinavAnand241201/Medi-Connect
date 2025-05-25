import React from 'react';
import { motion } from 'framer-motion';
import { ScreenName } from '../App';
import { styles } from '../../styles/common';

interface AppHeaderProps {
  navigateTo: (screen: ScreenName) => void;
  currentScreen: ScreenName;
  isAuthenticated: boolean;
  handleLogout: () => void;
  logoNavTarget?: ScreenName;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  navigateTo, 
  currentScreen, 
  isAuthenticated, 
  handleLogout, 
  logoNavTarget = 'home' 
}) => {
  const getLogoNavTarget = () => {
    if (!isAuthenticated) return 'home';
    if (logoNavTarget === 'mainTab' || ['mainTab', 'profile', 'settings', 'aiDiagnosis', 'videoCall', 'appointmentBooking'].includes(currentScreen)) {
      return 'mainTab';
    }
    return 'home';
  };

  return (
    <motion.header
      style={styles.header}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div 
        style={styles.logoContainer} 
        onClick={() => navigateTo(getLogoNavTarget())} 
        role="button" 
        tabIndex={0} 
        aria-label="Go to Homepage/Dashboard"
      >
        <img src="https://img.icons8.com/fluency/96/caduceus.png" alt="MediConnect Logo" style={styles.logo} />
        <h1 style={styles.title}>MediConnect</h1>
      </div>
      <nav style={styles.navigation}>
        {!isAuthenticated && currentScreen !== 'login' && (
          <motion.button 
            onClick={() => navigateTo('login')} 
            style={styles.navButton} 
            whileHover={{ backgroundColor: '#007AFF', color: 'white' }} 
            aria-label="Login"
          >
            Login
          </motion.button>
        )}
        {!isAuthenticated && currentScreen !== 'signup' && (
          <motion.button 
            onClick={() => navigateTo('signup')} 
            style={styles.navButton} 
            whileHover={{ backgroundColor: '#007AFF', color: 'white' }} 
            aria-label="Sign Up"
          >
            Sign Up
          </motion.button>
        )}
        {isAuthenticated && ['mainTab', 'profile', 'settings', 'aiDiagnosis', 'videoCall', 'appointmentBooking'].includes(currentScreen) && (
          <>
            {currentScreen !== 'profile' && 
              <motion.button 
                onClick={() => navigateTo('profile')} 
                style={styles.navButton} 
                whileHover={{ backgroundColor: '#007AFF', color: 'white' }} 
                aria-label="Profile"
              >
                Profile
              </motion.button>
            }
            {currentScreen !== 'settings' &&
              <motion.button 
                onClick={() => navigateTo('settings')} 
                style={styles.navButton} 
                whileHover={{ backgroundColor: '#007AFF', color: 'white' }} 
                aria-label="Settings"
              >
                Settings
              </motion.button>
            }
            <motion.button 
              onClick={handleLogout} 
              style={{...styles.navButton, backgroundColor: '#FF3B30', color: 'white', borderColor: '#FF3B30'}} 
              whileHover={{ backgroundColor: '#D92C20' }} 
              aria-label="Logout"
            >
              Logout
            </motion.button>
          </>
        )}
      </nav>
    </motion.header>
  );
}; 