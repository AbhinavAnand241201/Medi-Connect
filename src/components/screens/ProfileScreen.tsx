import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenName } from '../App';
import { AppHeader } from '../common/AppHeader';
import { styles } from '../../styles/common';

interface ProfileScreenProps {
  navigateTo: (screen: ScreenName) => void;
  currentScreen: ScreenName;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

interface MedicalInfo {
  bloodType: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  height: string;
  weight: string;
  lastCheckup: string;
}

interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber: string;
  expirationDate: string;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  navigateTo,
  currentScreen,
  isAuthenticated,
  handleLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'medical' | 'insurance'>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, City, State 12345',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '(555) 987-6543',
    },
  });

  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>({
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    medications: ['Lisinopril', 'Metformin'],
    height: '5\'10"',
    weight: '180 lbs',
    lastCheckup: '2024-01-15',
  });

  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceInfo>({
    provider: 'Blue Cross Blue Shield',
    policyNumber: 'BCBS123456789',
    groupNumber: 'GRP987654',
    expirationDate: '2024-12-31',
  });

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // TODO: Implement actual profile update logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEmergencyContactChange = (field: keyof PersonalInfo['emergencyContact'], value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value,
      },
    }));
  };

  const handleMedicalInfoChange = (field: keyof MedicalInfo, value: string | string[]) => {
    setMedicalInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInsuranceInfoChange = (field: keyof InsuranceInfo, value: string) => {
    setInsuranceInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderPersonalInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={styles.featureCard}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Personal Information</h3>
        <motion.button
          onClick={() => setIsEditing(!isEditing)}
          style={styles.outlineButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </motion.button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>First Name</label>
          {isEditing ? (
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
              style={styles.inputField}
            />
          ) : (
            <p style={{ margin: 0 }}>{personalInfo.firstName}</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Last Name</label>
          {isEditing ? (
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
              style={styles.inputField}
            />
          ) : (
            <p style={{ margin: 0 }}>{personalInfo.lastName}</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Date of Birth</label>
          {isEditing ? (
            <input
              type="date"
              value={personalInfo.dateOfBirth}
              onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
              style={styles.inputField}
            />
          ) : (
            <p style={{ margin: 0 }}>{new Date(personalInfo.dateOfBirth).toLocaleDateString()}</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Gender</label>
          {isEditing ? (
            <select
              value={personalInfo.gender}
              onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
              style={styles.inputField}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          ) : (
            <p style={{ margin: 0 }}>{personalInfo.gender}</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Email</label>
          {isEditing ? (
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              style={styles.inputField}
            />
          ) : (
            <p style={{ margin: 0 }}>{personalInfo.email}</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Phone</label>
          {isEditing ? (
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              style={styles.inputField}
            />
          ) : (
            <p style={{ margin: 0 }}>{personalInfo.phone}</p>
          )}
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Address</label>
          {isEditing ? (
            <input
              type="text"
              value={personalInfo.address}
              onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
              style={styles.inputField}
            />
          ) : (
            <p style={{ margin: 0 }}>{personalInfo.address}</p>
          )}
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: '20px' }}>
          <h4 style={{ margin: '0 0 15px 0' }}>Emergency Contact</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={personalInfo.emergencyContact.name}
                  onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                  style={styles.inputField}
                />
              ) : (
                <p style={{ margin: 0 }}>{personalInfo.emergencyContact.name}</p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Relationship</label>
              {isEditing ? (
                <input
                  type="text"
                  value={personalInfo.emergencyContact.relationship}
                  onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                  style={styles.inputField}
                />
              ) : (
                <p style={{ margin: 0 }}>{personalInfo.emergencyContact.relationship}</p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={personalInfo.emergencyContact.phone}
                  onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                  style={styles.inputField}
                />
              ) : (
                <p style={{ margin: 0 }}>{personalInfo.emergencyContact.phone}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderMedicalInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={styles.featureCard}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Medical Information</h3>
        <motion.button
          onClick={() => setIsEditing(!isEditing)}
          style={styles.outlineButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </motion.button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Blood Type</label>
          {isEditing ? (
            <select
              value={medicalInfo.bloodType}
              onChange={(e) => handleMedicalInfoChange('bloodType', e.target.value)}
              style={styles.inputField}
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          ) : (
            <p style={{ margin: 0 }}>{medicalInfo.bloodType}</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Height</label>
          {isEditing ? (
            <input
              type="text"
              value={medicalInfo.height}
              onChange={(e) => handleMedicalInfoChange('height', e.target.value)}
              style={styles.inputField}
            />
          ) : (
            <p style={{ margin: 0 }}>{medicalInfo.height}</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Weight</label>
          {isEditing ? (
            <input
              type="text"
              value={medicalInfo.weight}
              onChange={(e) => handleMedicalInfoChange('weight', e.target.value)}
              style={styles.inputField}
            />
          ) : (
            <p style={{ margin: 0 }}>{medicalInfo.weight}</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Last Checkup</label>
          {isEditing ? (
            <input
              type="date"
              value={medicalInfo.lastCheckup}
              onChange={(e) => handleMedicalInfoChange('lastCheckup', e.target.value)}
              style={styles.inputField}
            />
          ) : (
            <p style={{ margin: 0 }}>{new Date(medicalInfo.lastCheckup).toLocaleDateString()}</p>
          )}
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Allergies</label>
          {isEditing ? (
            <input
              type="text"
              value={medicalInfo.allergies.join(', ')}
              onChange={(e) => handleMedicalInfoChange('allergies', e.target.value.split(',').map(s => s.trim()))}
              style={styles.inputField}
              placeholder="Enter allergies separated by commas"
            />
          ) : (
            <p style={{ margin: 0 }}>{medicalInfo.allergies.join(', ') || 'None'}</p>
          )}
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Medical Conditions</label>
          {isEditing ? (
            <input
              type="text"
              value={medicalInfo.conditions.join(', ')}
              onChange={(e) => handleMedicalInfoChange('conditions', e.target.value.split(',').map(s => s.trim()))}
              style={styles.inputField}
              placeholder="Enter conditions separated by commas"
            />
          ) : (
            <p style={{ margin: 0 }}>{medicalInfo.conditions.join(', ') || 'None'}</p>
          )}
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Current Medications</label>
          {isEditing ? (
            <input
              type="text"
              value={medicalInfo.medications.join(', ')}
              onChange={(e) => handleMedicalInfoChange('medications', e.target.value.split(',').map(s => s.trim()))}
              style={styles.inputField}
              placeholder="Enter medications separated by commas"
            />
          ) : (
            <p style={{ margin: 0 }}>{medicalInfo.medications.join(', ') || 'None'}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderInsuranceInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={styles.featureCard}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Insurance Information</h3>
        <motion.button
          onClick={() => setIsEditing(!isEditing)}
          style={styles.outlineButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </motion.button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Provider</label>
          {isEditing ? (
            <input
              type="text"
              value={insuranceInfo.provider}
              onChange={(e) => handleInsuranceInfoChange('provider', e.target.value)}
              style={styles.inputField}
            />
          ) : (
            <p style={{ margin: 0 }}>{insuranceInfo.provider}</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Policy Number</label>
          {isEditing ? (
            <input
              type="text"
              value={insuranceInfo.policyNumber}
              onChange={(e) => handleInsuranceInfoChange('policyNumber', e.target.value)}
              style={styles.inputField}
            />
          ) : (
            <p style={{ margin: 0 }}>{insuranceInfo.policyNumber}</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Group Number</label>
          {isEditing ? (
            <input
              type="text"
              value={insuranceInfo.groupNumber}
              onChange={(e) => handleInsuranceInfoChange('groupNumber', e.target.value)}
              style={styles.inputField}
            />
          ) : (
            <p style={{ margin: 0 }}>{insuranceInfo.groupNumber}</p>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Expiration Date</label>
          {isEditing ? (
            <input
              type="date"
              value={insuranceInfo.expirationDate}
              onChange={(e) => handleInsuranceInfoChange('expirationDate', e.target.value)}
              style={styles.inputField}
            />
          ) : (
            <p style={{ margin: 0 }}>{new Date(insuranceInfo.expirationDate).toLocaleDateString()}</p>
          )}
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
        <h2 style={styles.pageTitle}>Profile</h2>
        <p style={styles.introText}>
          View and manage your personal information, medical history, and insurance details.
        </p>

        <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', margin: '0 auto', gap: '20px' }}>
          <nav style={{ width: '200px', padding: '20px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {(['personal', 'medical', 'insurance'] as const).map((tab) => (
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

            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'medical' && renderMedicalInfo()}
            {activeTab === 'insurance' && renderInsuranceInfo()}

            {isEditing && (
              <motion.button
                onClick={handleSaveProfile}
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
            )}
          </main>
        </div>
      </motion.div>
    </motion.div>
  );
}; 