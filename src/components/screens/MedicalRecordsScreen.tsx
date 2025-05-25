import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenName } from '../App';
import { AppHeader } from '../common/AppHeader';
import { styles } from '../../styles/common';

interface MedicalRecordsScreenProps {
  navigateTo: (screen: ScreenName) => void;
  currentScreen: ScreenName;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

interface MedicalRecord {
  id: string;
  date: string;
  type: 'consultation' | 'lab_result' | 'prescription' | 'imaging' | 'vaccination';
  title: string;
  provider: string;
  summary: string;
  attachments?: string[];
  status: 'active' | 'archived';
}

interface FilterOptions {
  type: MedicalRecord['type'] | 'all';
  dateRange: 'all' | 'last_month' | 'last_3_months' | 'last_year';
  status: MedicalRecord['status'] | 'all';
}

export const MedicalRecordsScreen: React.FC<MedicalRecordsScreenProps> = ({
  navigateTo,
  currentScreen,
  isAuthenticated,
  handleLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    dateRange: 'all',
    status: 'all',
  });
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  // Mock data - replace with actual API calls
  const records: MedicalRecord[] = [
    {
      id: '1',
      date: '2024-03-15',
      type: 'consultation',
      title: 'Annual Physical Examination',
      provider: 'Dr. Sarah Johnson',
      summary: 'Routine checkup with normal findings. Blood pressure and heart rate within normal range.',
      status: 'active',
    },
    {
      id: '2',
      date: '2024-02-28',
      type: 'lab_result',
      title: 'Complete Blood Count',
      provider: 'City Lab Services',
      summary: 'All blood parameters within normal range. No abnormalities detected.',
      attachments: ['blood_test_results.pdf'],
      status: 'active',
    },
    {
      id: '3',
      date: '2024-01-15',
      type: 'prescription',
      title: 'Antibiotics Prescription',
      provider: 'Dr. Michael Chen',
      summary: 'Prescribed amoxicillin 500mg for bacterial infection. Take three times daily for 7 days.',
      status: 'archived',
    },
    {
      id: '4',
      date: '2023-12-10',
      type: 'imaging',
      title: 'Chest X-Ray',
      provider: 'Radiology Department',
      summary: 'Normal chest X-ray. No signs of infection or abnormalities.',
      attachments: ['chest_xray.jpg'],
      status: 'active',
    },
    {
      id: '5',
      date: '2023-11-05',
      type: 'vaccination',
      title: 'Annual Flu Shot',
      provider: 'Community Health Center',
      summary: 'Received annual influenza vaccination. No adverse reactions reported.',
      status: 'active',
    },
  ];

  const getTypeIcon = (type: MedicalRecord['type']) => {
    switch (type) {
      case 'consultation':
        return '👨‍⚕️';
      case 'lab_result':
        return '🔬';
      case 'prescription':
        return '💊';
      case 'imaging':
        return '📷';
      case 'vaccination':
        return '💉';
      default:
        return '📄';
    }
  };

  const getTypeLabel = (type: MedicalRecord['type']) => {
    switch (type) {
      case 'consultation':
        return 'Consultation';
      case 'lab_result':
        return 'Lab Result';
      case 'prescription':
        return 'Prescription';
      case 'imaging':
        return 'Imaging';
      case 'vaccination':
        return 'Vaccination';
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filterRecords = (records: MedicalRecord[]) => {
    return records.filter((record) => {
      const matchesSearch = searchQuery === '' ||
        record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = filters.type === 'all' || record.type === filters.type;
      const matchesStatus = filters.status === 'all' || record.status === filters.status;

      let matchesDateRange = true;
      if (filters.dateRange !== 'all') {
        const recordDate = new Date(record.date);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - recordDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (filters.dateRange) {
          case 'last_month':
            matchesDateRange = diffDays <= 30;
            break;
          case 'last_3_months':
            matchesDateRange = diffDays <= 90;
            break;
          case 'last_year':
            matchesDateRange = diffDays <= 365;
            break;
        }
      }

      return matchesSearch && matchesType && matchesStatus && matchesDateRange;
    });
  };

  const filteredRecords = filterRecords(records);

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
        <h2 style={styles.pageTitle}>Medical Records</h2>
        <p style={styles.introText}>
          View and manage your medical history, test results, and prescriptions in one place.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <motion.div
            style={styles.featureCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 style={{ margin: '0 0 20px 0' }}>Search & Filter</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search records..."
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Record Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as FilterOptions['type'] }))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                  }}
                >
                  <option value="all">All Types</option>
                  <option value="consultation">Consultations</option>
                  <option value="lab_result">Lab Results</option>
                  <option value="prescription">Prescriptions</option>
                  <option value="imaging">Imaging</option>
                  <option value="vaccination">Vaccinations</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value as FilterOptions['dateRange'] }))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                  }}
                >
                  <option value="all">All Time</option>
                  <option value="last_month">Last Month</option>
                  <option value="last_3_months">Last 3 Months</option>
                  <option value="last_year">Last Year</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as FilterOptions['status'] }))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={styles.featureCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 style={{ margin: '0 0 20px 0' }}>Medical Records</h3>
            {filteredRecords.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {filteredRecords.map((record) => (
                  <motion.div
                    key={record.id}
                    style={{
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      border: '1px solid #eee',
                      cursor: 'pointer',
                    }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedRecord(record)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.5rem' }}>{getTypeIcon(record.type)}</span>
                        <div>
                          <h4 style={{ margin: '0 0 5px 0' }}>{record.title}</h4>
                          <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>{record.provider}</p>
                        </div>
                      </div>
                      <span
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          backgroundColor: record.status === 'active' ? '#34C75920' : '#FF950020',
                          color: record.status === 'active' ? '#34C759' : '#FF9500',
                        }}
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                    <p style={{ margin: '0', fontSize: '0.9rem' }}>{record.summary}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#666' }}>{formatDate(record.date)}</span>
                      {record.attachments && record.attachments.length > 0 && (
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>
                          {record.attachments.length} attachment{record.attachments.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#666', textAlign: 'center' }}>No records found</p>
            )}
          </motion.div>

          {selectedRecord && (
            <motion.div
              style={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <h3 style={{ margin: 0 }}>Record Details</h3>
                <motion.button
                  onClick={() => setSelectedRecord(null)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#666',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '2rem' }}>{getTypeIcon(selectedRecord.type)}</span>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>{selectedRecord.title}</h4>
                    <p style={{ margin: '0', color: '#666' }}>{getTypeLabel(selectedRecord.type)}</p>
                  </div>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>Provider</h4>
                  <p style={{ margin: '0', fontSize: '0.9rem' }}>{selectedRecord.provider}</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>Date</h4>
                  <p style={{ margin: '0', fontSize: '0.9rem' }}>{formatDate(selectedRecord.date)}</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>Summary</h4>
                  <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: 1.5 }}>{selectedRecord.summary}</p>
                </div>
                {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                  <div>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>Attachments</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {selectedRecord.attachments.map((attachment, index) => (
                        <motion.button
                          key={index}
                          style={{
                            ...styles.outlineButton,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            justifyContent: 'flex-start',
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            // TODO: Implement file download/view
                            console.log('Download/view attachment:', attachment);
                          }}
                        >
                          📎 {attachment}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
                <motion.button
                  onClick={() => navigateTo('appointmentBooking')}
                  style={styles.outlineButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Schedule Follow-up Appointment
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}; 