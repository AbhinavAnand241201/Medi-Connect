import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { MainTabScreen } from './screens/MainTabScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export type ScreenName = 'home' | 'login' | 'signup' | 'onboarding' | 'mainTab' | 'profile' | 'settings';

export interface ScreenProps {
  navigateTo: (screen: ScreenName) => void;
  currentScreen: ScreenName;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigateTo = (screen: ScreenName) => {
    setCurrentScreen(screen);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigateTo('onboarding');
  };

  const handleSignupSuccess = () => {
    setIsAuthenticated(true);
    navigateTo('onboarding');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigateTo('home');
  };

  const renderScreen = () => {
    const commonProps = { navigateTo, isAuthenticated, handleLogout };
    switch (currentScreen) {
      case 'login':
        return <LoginScreen {...commonProps} onLoginSuccess={handleLoginSuccess} />;
      case 'signup':
        return <SignupScreen {...commonProps} onSignupSuccess={handleSignupSuccess} />;
      case 'onboarding':
        return <OnboardingScreen {...commonProps} />;
      case 'mainTab':
        return <MainTabScreen {...commonProps} />;
      case 'profile':
        return <ProfileScreen {...commonProps} />;
      case 'settings':
        return <SettingsScreen {...commonProps} />;
      case 'home':
      default:
        return <HomeScreen {...commonProps} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderScreen()}
    </AnimatePresence>
  );
};

export default App; 