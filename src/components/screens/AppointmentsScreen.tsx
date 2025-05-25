import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenName } from '../App';
import { AppHeader } from '../common/AppHeader';
import { styles } from '../../styles/common';

interface AppointmentsScreenProps {
  navigateTo: (screen: ScreenName) => void;
  currentScreen: ScreenName;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'in-person' | 'video' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  reason: string;
  notes?: string;
  location?: string;
  meetingLink?: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
  rating: number;
  reviews: number;
  imageUrl: string;
}

export const AppointmentsScreen: React.FC<AppointmentsScreenProps> = ({
  navigateTo,
  currentScreen,
  isAuthenticated,
  handleLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'schedule'>('upcoming');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<Appointment['type']>('in-person');
  const [reason, setReason] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctorId: 'd1',
      doctorName: 'Dr. Sarah Johnson',
      doctorSpecialty: 'Cardiology',
      date: '2024-03-20',
      time: '10:00',
      duration: 30,
      type: 'video',
      status: 'scheduled',
      reason: 'Follow-up consultation',
      meetingLink: 'https://meet.example.com/abc123',
    },
    {
      id: '2',
      doctorId: 'd2',
      doctorName: 'Dr. Michael Chen',
      doctorSpecialty: 'Dermatology',
      date: '2024-03-25',
      time: '14:30',
      duration: 45,
      type: 'in-person',
      status: 'scheduled',
      reason: 'Annual skin check',
      location: 'Medical Center, Room 304',
    },
  ]);

  const [doctors] = useState<Doctor[]>([
    {
      id: 'd1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      availability: {
        days: ['Monday', 'Wednesday', 'Friday'],
        hours: { start: '09:00', end: '17:00' },
      },
      rating: 4.8,
      reviews: 127,
      imageUrl: 'https://example.com/doctor1.jpg',
    },
    {
      id: 'd2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      availability: {
        days: ['Tuesday', 'Thursday', 'Saturday'],
        hours: { start: '10:00', end: '18:00' },
      },
      rating: 4.9,
      reviews: 89,
      imageUrl: 'https://example.com/doctor2.jpg',
    },
  ]);

  const handleScheduleAppointment = async () => {
    if (!selectedDoctor || !selectedTime || !reason) {
      setError('Please fill in all required fields');
      return;
    }

    setIsScheduling(true);
    setError(null);
    setSuccess(null);

    try {
      // TODO: Implement actual appointment scheduling logic here
      await new Promise(resolve => setTimeout(resolve, 1000));

      const doctor = doctors.find(d => d.id === selectedDoctor);
      if (!doctor) throw new Error('Doctor not found');

      const newAppointment: Appointment = {
        id: Date.now().toString(),
        doctorId: selectedDoctor,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        date: selectedDate,
        time: selectedTime,
        duration: 30,
        type: appointmentType,
        status: 'scheduled',
        reason,
        ...(appointmentType === 'video' && { meetingLink: 'https://meet.example.com/new' }),
        ...(appointmentType === 'in-person' && { location: 'Medical Center, Room TBD' }),
      };

      setAppointments(prev => [...prev, newAppointment]);
      setSuccess('Appointment scheduled successfully!');
      setActiveTab('upcoming');
      resetForm();
    } catch (err) {
      setError('Failed to schedule appointment. Please try again.');
    } finally {
      setIsScheduling(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      // TODO: Implement actual appointment cancellation logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
        )
      );
      setSuccess('Appointment cancelled successfully');
    } catch (err) {
      setError('Failed to cancel appointment. Please try again.');
    }
  };

  const handleRescheduleAppointment = (appointmentId: string) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (!appointment) return;

    setSelectedDoctor(appointment.doctorId);
    setSelectedDate(appointment.date);
    setSelectedTime(appointment.time);
    setAppointmentType(appointment.type);
    setReason(appointment.reason);
    setActiveTab('schedule');
  };

  const resetForm = () => {
    setSelectedDoctor('');
    setSelectedTime('');
    setAppointmentType('in-person');
    setReason('');
  };

  const renderUpcomingAppointments = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={styles.featureCard}
    >
      <h3 style={{ margin: '0 0 20px 0' }}>Upcoming Appointments</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {appointments
          .filter(apt => apt.status === 'scheduled' && new Date(apt.date) >= new Date())
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map(appointment => (
            <motion.div
              key={appointment.id}
              style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
              }}
              whileHover={{ scale: 1.01 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ margin: '0 0 10px 0' }}>{appointment.doctorName}</h4>
                  <p style={{ margin: '0 0 5px 0', color: '#666' }}>{appointment.doctorSpecialty}</p>
                  <p style={{ margin: '0 0 5px 0' }}>
                    {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                  </p>
                  <p style={{ margin: '0 0 5px 0' }}>
                    Type: {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                  </p>
                  {appointment.location && (
                    <p style={{ margin: '0 0 5px 0' }}>Location: {appointment.location}</p>
                  )}
                  {appointment.meetingLink && (
                    <p style={{ margin: '0 0 5px 0' }}>
                      <a href={appointment.meetingLink} target="_blank" rel="noopener noreferrer" style={{ color: '#007AFF' }}>
                        Join Video Call
                      </a>
                    </p>
                  )}
                  <p style={{ margin: '0', color: '#666' }}>Reason: {appointment.reason}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <motion.button
                    onClick={() => handleRescheduleAppointment(appointment.id)}
                    style={styles.outlineButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reschedule
                  </motion.button>
                  <motion.button
                    onClick={() => handleCancelAppointment(appointment.id)}
                    style={{
                      ...styles.outlineButton,
                      backgroundColor: 'transparent',
                      color: '#FF3B30',
                      borderColor: '#FF3B30',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        {appointments.filter(apt => apt.status === 'scheduled' && new Date(apt.date) >= new Date()).length === 0 && (
          <p style={{ textAlign: 'center', color: '#666' }}>No upcoming appointments</p>
        )}
      </div>
    </motion.div>
  );

  const renderPastAppointments = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={styles.featureCard}
    >
      <h3 style={{ margin: '0 0 20px 0' }}>Past Appointments</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {appointments
          .filter(apt => apt.status === 'completed' || new Date(apt.date) < new Date())
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map(appointment => (
            <motion.div
              key={appointment.id}
              style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 10px 0' }}>{appointment.doctorName}</h4>
                <p style={{ margin: '0 0 5px 0', color: '#666' }}>{appointment.doctorSpecialty}</p>
                <p style={{ margin: '0 0 5px 0' }}>
                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                </p>
                <p style={{ margin: '0 0 5px 0' }}>
                  Type: {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                </p>
                <p style={{ margin: '0 0 5px 0', color: '#666' }}>Reason: {appointment.reason}</p>
                <p style={{ margin: '0', color: appointment.status === 'completed' ? '#34C759' : '#FF3B30' }}>
                  Status: {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </p>
              </div>
            </motion.div>
          ))}
        {appointments.filter(apt => apt.status === 'completed' || new Date(apt.date) < new Date()).length === 0 && (
          <p style={{ textAlign: 'center', color: '#666' }}>No past appointments</p>
        )}
      </div>
    </motion.div>
  );

  const renderScheduleAppointment = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={styles.featureCard}
    >
      <h3 style={{ margin: '0 0 20px 0' }}>Schedule New Appointment</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Select Doctor</label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            style={styles.inputField}
          >
            <option value="">Choose a doctor...</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            style={styles.inputField}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Time</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            style={styles.inputField}
          >
            <option value="">Select a time...</option>
            {selectedDoctor && doctors
              .find(d => d.id === selectedDoctor)
              ?.availability.days.includes(new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }))
              ? Array.from({ length: 17 }, (_, i) => i + 8).map(hour => (
                  <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                    {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                  </option>
                ))
              : null}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Appointment Type</label>
          <select
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value as Appointment['type'])}
            style={styles.inputField}
          >
            <option value="in-person">In-Person</option>
            <option value="video">Video Call</option>
            <option value="phone">Phone Call</option>
          </select>
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Reason for Visit</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{
              ...styles.inputField,
              minHeight: '100px',
              resize: 'vertical',
            }}
            placeholder="Please describe the reason for your visit..."
          />
        </div>

        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <motion.button
            onClick={resetForm}
            style={styles.outlineButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Reset
          </motion.button>
          <motion.button
            onClick={handleScheduleAppointment}
            style={styles.ctaButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isScheduling}
          >
            {isScheduling ? 'Scheduling...' : 'Schedule Appointment'}
          </motion.button>
        </div>
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
        <h2 style={styles.pageTitle}>Appointments</h2>
        <p style={styles.introText}>
          Schedule, manage, and view your medical appointments.
        </p>

        <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', margin: '0 auto', gap: '20px' }}>
          <nav style={{ width: '200px', padding: '20px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {(['upcoming', 'past', 'schedule'] as const).map((tab) => (
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

            {activeTab === 'upcoming' && renderUpcomingAppointments()}
            {activeTab === 'past' && renderPastAppointments()}
            {activeTab === 'schedule' && renderScheduleAppointment()}
          </main>
        </div>
      </motion.div>
    </motion.div>
  );
}; 