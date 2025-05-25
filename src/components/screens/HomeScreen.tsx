import React from 'react';
import { motion } from 'framer-motion';
import { ScreenName } from '../App';
import { AppHeader } from '../common/AppHeader';
import { styles } from '../../styles/common';

interface HomeScreenProps {
  navigateTo: (screen: ScreenName) => void;
  currentScreen: ScreenName;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

interface UpcomingAppointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface HealthMetric {
  name: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ 
  navigateTo, 
  currentScreen, 
  isAuthenticated, 
  handleLogout 
}) => {
  // Mock data - replace with actual API calls
  const upcomingAppointments: UpcomingAppointment[] = [
    {
      id: '1',
      date: '2024-03-20',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Johnson',
      type: 'General Checkup',
      status: 'confirmed',
    },
    {
      id: '2',
      date: '2024-03-25',
      time: '02:30 PM',
      doctor: 'Dr. Michael Chen',
      type: 'Follow-up',
      status: 'pending',
    },
  ];

  const healthMetrics: HealthMetric[] = [
    {
      name: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      trend: 'stable',
      lastUpdated: '2024-03-15',
    },
    {
      name: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      trend: 'down',
      lastUpdated: '2024-03-15',
    },
    {
      name: 'Weight',
      value: '70',
      unit: 'kg',
      trend: 'stable',
      lastUpdated: '2024-03-10',
    },
    {
      name: 'Blood Sugar',
      value: '5.5',
      unit: 'mmol/L',
      trend: 'up',
      lastUpdated: '2024-03-15',
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: UpcomingAppointment['status']) => {
    switch (status) {
      case 'confirmed':
        return '#34C759';
      case 'pending':
        return '#FF9500';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const getTrendIcon = (trend: HealthMetric['trend']) => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      case 'stable':
        return '→';
      default:
        return '';
    }
  };

  const getTrendColor = (trend: HealthMetric['trend']) => {
    switch (trend) {
      case 'up':
        return '#FF3B30';
      case 'down':
        return '#34C759';
      case 'stable':
        return '#666';
      default:
        return '#666';
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
      <motion.div style={styles.mainContent}>
        <h2 style={styles.pageTitle}>Welcome Back!</h2>
        <p style={styles.introText}>
          Here's an overview of your health status and upcoming appointments.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '30px' }}>
          <motion.div
            style={styles.featureCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 style={{ margin: '0 0 20px 0' }}>Quick Actions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' }}>
              <motion.button
                onClick={() => navigateTo('appointmentBooking')}
                style={styles.outlineButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Appointment
              </motion.button>
              <motion.button
                onClick={() => navigateTo('videoCall')}
                style={styles.outlineButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Video Call
              </motion.button>
              <motion.button
                onClick={() => navigateTo('medicalRecords')}
                style={styles.outlineButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Records
              </motion.button>
              <motion.button
                onClick={() => navigateTo('profile')}
                style={styles.outlineButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Update Profile
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            style={styles.featureCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 style={{ margin: '0 0 20px 0' }}>Upcoming Appointments</h3>
            {upcomingAppointments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {upcomingAppointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    style={{
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      border: '1px solid #eee',
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 5px 0' }}>{appointment.type}</h4>
                        <p style={{ margin: '0', color: '#666' }}>{appointment.doctor}</p>
                      </div>
                      <span
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          backgroundColor: `${getStatusColor(appointment.status)}20`,
                          color: getStatusColor(appointment.status),
                        }}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    <p style={{ margin: '0', fontSize: '0.9rem' }}>
                      {formatDate(appointment.date)} at {appointment.time}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#666', textAlign: 'center' }}>No upcoming appointments</p>
            )}
            <motion.button
              onClick={() => navigateTo('appointmentBooking')}
              style={{
                ...styles.outlineButton,
                width: '100%',
                marginTop: '15px',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule New Appointment
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          style={styles.featureCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 style={{ margin: '0 0 20px 0' }}>Health Metrics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {healthMetrics.map((metric) => (
              <motion.div
                key={metric.name}
                style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #eee',
                }}
                whileHover={{ scale: 1.02 }}
              >
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>{metric.name}</h4>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{metric.value}</span>
                  <span style={{ color: '#666' }}>{metric.unit}</span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      color: getTrendColor(metric.trend),
                      fontSize: '1.2rem',
                    }}
                  >
                    {getTrendIcon(metric.trend)}
                  </span>
                </div>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#666' }}>
                  Last updated: {formatDate(metric.lastUpdated)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}; 