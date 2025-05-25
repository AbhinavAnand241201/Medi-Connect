import React from 'react';
import { motion } from 'framer-motion';
import { ScreenProps, ScreenName } from '../App';
import { AppHeader } from './AppHeader';
import { Footer } from './Footer';
import { styles } from '../../styles/components';

interface AuthFormContainerProps {
  title: string;
  children: React.ReactNode;
  screenProps: ScreenProps;
  screenKey: ScreenName;
  logoNavTarget?: ScreenName;
}

export const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  children,
  screenProps,
  screenKey,
  logoNavTarget,
}) => {
  return (
    <motion.div
      key={screenKey}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={styles.pageContainer}
    >
      <AppHeader {...screenProps} currentScreen={screenKey} logoNavTarget={logoNavTarget} />
      <main style={{ ...styles.mainContent, ...styles.authFormContainer }}>
        <h2 style={styles.authTitle}>{title}</h2>
        {children}
      </main>
      <Footer />
    </motion.div>
  );
}; 