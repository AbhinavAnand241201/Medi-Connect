import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenName } from '../App';
import { AppHeader } from '../common/AppHeader';
import { styles } from '../../styles/common';

interface AppointmentBookingScreenProps {
  navigateTo: (screen: ScreenName) => void;
  currentScreen: ScreenName;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  availability: string[];
  rating: number;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export const AppointmentBookingScreen: React.FC<AppointmentBookingScreenProps> = ({ 
  navigateTo, 
  currentScreen, 
  isAuthenticated, 
  handleLogout 
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'General Medicine',
      availability: ['2024-03-20', '2024-03-21', '2024-03-22'],
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Cardiology',
      availability: ['2024-03-20', '2024-03-23'],
      rating: 4.9,
    },
    {
      id: '3',
      name: 'Dr. Emily Brown',
      specialization: 'Pediatrics',
      availability: ['2024-03-21', '2024-03-22', '2024-03-23'],
      rating: 4.7,
    },
  ];

  const timeSlots: TimeSlot[] = [
    { id: '1', time: '09:00 AM', available: true },
    { id: '2', time: '10:00 AM', available: true },
    { id: '3', time: '11:00 AM', available: false },
    { id: '4', time: '02:00 PM', available: true },
    { id: '5', time: '03:00 PM', available: true },
    { id: '6', time: '04:00 PM', available: false },
  ];

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedDoctor(null);
    setSelectedTimeSlot(null);
  };

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlotId: string) => {
    setSelectedTimeSlot(timeSlotId);
  };

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedDoctor || !selectedTimeSlot) {
      setError('Please select a date, doctor, and time slot');
      return;
    }

    setIsBooking(true);
    setError(null);
    setSuccess(null);

    try {
      // TODO: Implement actual booking logic here
      // For now, simulate a successful booking
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess('Appointment booked successfully!');
      // Reset form
      setSelectedDate('');
      setSelectedDoctor(null);
      setSelectedTimeSlot(null);
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const getAvailableDoctors = () => {
    if (!selectedDate) return [];
    return doctors.filter(doctor => doctor.availability.includes(selectedDate));
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
        <h2 style={styles.pageTitle}>Book an Appointment</h2>
        <p style={styles.introText}>
          Select a date, choose a doctor, and pick an available time slot for your appointment.
        </p>

        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px' }}>Select Date</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['2024-03-20', '2024-03-21', '2024-03-22', '2024-03-23'].map((date) => (
                <motion.button
                  key={date}
                  onClick={() => handleDateSelect(date)}
                  style={{
                    ...styles.outlineButton,
                    backgroundColor: selectedDate === date ? '#007AFF' : 'transparent',
                    color: selectedDate === date ? 'white' : '#007AFF',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </motion.button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginBottom: '30px' }}
            >
              <h3 style={{ marginBottom: '15px' }}>Select Doctor</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                {getAvailableDoctors().map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    onClick={() => handleDoctorSelect(doctor.id)}
                    style={{
                      ...styles.featureCard,
                      backgroundColor: selectedDoctor === doctor.id ? '#f0f8ff' : 'white',
                      borderColor: selectedDoctor === doctor.id ? '#007AFF' : '#eee',
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 style={{ margin: '0 0 5px 0' }}>{doctor.name}</h4>
                    <p style={{ margin: '0 0 5px 0', color: '#666' }}>{doctor.specialization}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span>⭐</span>
                      <span>{doctor.rating}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedDoctor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginBottom: '30px' }}
            >
              <h3 style={{ marginBottom: '15px' }}>Select Time Slot</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {timeSlots.map((slot) => (
                  <motion.button
                    key={slot.id}
                    onClick={() => slot.available && handleTimeSlotSelect(slot.id)}
                    style={{
                      ...styles.outlineButton,
                      backgroundColor: selectedTimeSlot === slot.id ? '#007AFF' : 'transparent',
                      color: selectedTimeSlot === slot.id ? 'white' : '#007AFF',
                      opacity: slot.available ? 1 : 0.5,
                      cursor: slot.available ? 'pointer' : 'not-allowed',
                    }}
                    whileHover={slot.available ? { scale: 1.02 } : {}}
                    whileTap={slot.available ? { scale: 0.98 } : {}}
                    disabled={!slot.available}
                  >
                    {slot.time}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

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

          <motion.button
            onClick={handleBookAppointment}
            style={styles.ctaButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isBooking || !selectedDate || !selectedDoctor || !selectedTimeSlot}
          >
            {isBooking ? 'Booking...' : 'Book Appointment'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}; 