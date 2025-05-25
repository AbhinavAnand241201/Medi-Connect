import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenName } from '../App';
import { AppHeader } from '../common/AppHeader';
import { styles } from '../../styles/common';

interface SettingsScreenProps {
  navigateTo: (screen: ScreenName) => void;
  currentScreen: ScreenName;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

interface NotificationSettings {
  appointmentReminders: boolean;
  medicationReminders: boolean;
  testResults: boolean;
  healthTips: boolean;
  marketingEmails: boolean;
}

interface PrivacySettings {
  shareHealthData: boolean;
  shareLocation: boolean;
  allowAnalytics: boolean;
  showOnlineStatus: boolean;
}

interface AccountSettings {
  language: string;
  theme: 'light' | 'dark' | 'system';
  timezone: string;
  dateFormat: string;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigateTo,
  currentScreen,
  isAuthenticated,
  handleLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'privacy' | 'account' | 'security'>('notifications');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    appointmentReminders: true,
    medicationReminders: true,
    testResults: true,
    healthTips: true,
    marketingEmails: false,
  });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    shareHealthData: true,
    shareLocation: false,
    allowAnalytics: true,
    showOnlineStatus: true,
  });

  const [accountSettings, setAccountSettings] = useState<AccountSettings>({
    language: 'en',
    theme: 'system',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
  });

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // TODO: Implement actual settings update logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Settings saved successfully!');
    } catch (err) {
      setError('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationChange = (setting: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handlePrivacyChange = (setting: keyof PrivacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleAccountChange = (setting: keyof AccountSettings, value: string) => {
    setAccountSettings(prev => ({
      ...prev,
      [setting]: value,
    }));
  };

  const renderNotificationSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={styles.featureCard}
    >
      <h3 style={{ margin: '0 0 20px 0' }}>Notification Preferences</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {Object.entries(notificationSettings).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ color: '#333', fontSize: '0.95rem' }}>
              {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </label>
            <motion.button
              onClick={() => handleNotificationChange(key as keyof NotificationSettings)}
              style={{
                width: '40px',
                height: '24px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: value ? '#34C759' : '#ddd',
                position: 'relative',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: '2px',
                  left: value ? '18px' : '2px',
                }}
                animate={{ left: value ? '18px' : '2px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderPrivacySettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={styles.featureCard}
    >
      <h3 style={{ margin: '0 0 20px 0' }}>Privacy Settings</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {Object.entries(privacySettings).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ color: '#333', fontSize: '0.95rem' }}>
              {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </label>
            <motion.button
              onClick={() => handlePrivacyChange(key as keyof PrivacySettings)}
              style={{
                width: '40px',
                height: '24px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: value ? '#34C759' : '#ddd',
                position: 'relative',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: '2px',
                  left: value ? '18px' : '2px',
                }}
                animate={{ left: value ? '18px' : '2px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderAccountSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={styles.featureCard}
    >
      <h3 style={{ margin: '0 0 20px 0' }}>Account Settings</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Language</label>
          <select
            value={accountSettings.language}
            onChange={(e) => handleAccountChange('language', e.target.value)}
            style={styles.inputField}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Theme</label>
          <select
            value={accountSettings.theme}
            onChange={(e) => handleAccountChange('theme', e.target.value)}
            style={styles.inputField}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Timezone</label>
          <select
            value={accountSettings.timezone}
            onChange={(e) => handleAccountChange('timezone', e.target.value)}
            style={styles.inputField}
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Date Format</label>
          <select
            value={accountSettings.dateFormat}
            onChange={(e) => handleAccountChange('dateFormat', e.target.value)}
            style={styles.inputField}
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </motion.div>
  );

  const renderSecuritySettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={styles.featureCard}
    >
      <h3 style={{ margin: '0 0 20px 0' }}>Security Settings</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <motion.button
          onClick={() => navigateTo('profile')}
          style={styles.outlineButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Change Password
        </motion.button>
        <motion.button
          onClick={() => navigateTo('profile')}
          style={styles.outlineButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Enable Two-Factor Authentication
        </motion.button>
        <motion.button
          onClick={() => {
            // TODO: Implement account deletion logic
            if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
              handleLogout();
            }
          }}
          style={{
            ...styles.outlineButton,
            backgroundColor: 'transparent',
            color: '#FF3B30',
            borderColor: '#FF3B30',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Delete Account
        </motion.button>
      </div>
    </motion.div>
  );

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
        <h2 style={styles.pageTitle}>Settings</h2>
        <p style={styles.introText}>
          Manage your preferences, privacy settings, and account information.
        </p>

        <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', margin: '0 auto', gap: '20px' }}>
          <nav style={{ width: '200px', padding: '20px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {(['notifications', 'privacy', 'account', 'security'] as const).map((tab) => (
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
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#FF3B30', fontSize: '0.9rem', margin: '0 0 15px 0' }}
              >
                {error}
              </motion.p>
            )}

            {success && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#34C759', fontSize: '0.9rem', margin: '0 0 15px 0' }}
              >
                {success}
              </motion.p>
            )}

            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'privacy' && renderPrivacySettings()}
            {activeTab === 'account' && renderAccountSettings()}
            {activeTab === 'security' && renderSecuritySettings()}

            <motion.button
              onClick={handleSaveSettings}
              style={{
                ...styles.ctaButton,
                marginTop: '20px',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </main>
        </div>
      </motion.div>
    </motion.div>
  );
}; 