import { CSSProperties } from 'react';

export const enhancedStyles: { [key: string]: CSSProperties } = {
  // Container styles
  glassContainer: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 122, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '24px',
    transition: 'all 0.3s ease',
  },

  // Card styles
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0, 122, 255, 0.08)',
    border: '1px solid rgba(0, 122, 255, 0.1)',
    transition: 'all 0.3s ease',
  },

  // Button styles
  primaryButton: {
    background: 'linear-gradient(135deg, #007AFF, #0055FF)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.2)',
  },

  secondaryButton: {
    background: 'white',
    color: '#007AFF',
    border: '2px solid #007AFF',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  // Input styles
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '2px solid #E5E5EA',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    outline: 'none',
  },

  // Profile styles
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 122, 255, 0.08)',
  },

  profilePicture: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #007AFF',
    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.2)',
  },

  // Chat styles
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 122, 255, 0.08)',
    overflow: 'hidden',
  },

  chatMessage: {
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '12px',
    margin: '8px',
  },

  // AI Diagnosis styles
  aiDiagnosisContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    padding: '24px',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 122, 255, 0.08)',
  },

  imageUploadContainer: {
    border: '2px dashed #007AFF',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  // Video call styles
  videoCallContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '24px',
    height: 'calc(100vh - 100px)',
    padding: '24px',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 122, 255, 0.08)',
  },

  // Loading states
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #007AFF',
    borderRadius: '50%',
  },

  // Responsive grid
  responsiveGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    width: '100%',
  },
};

// Animation variants for Framer Motion
export const motionVariants = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  
  childFadeIn: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  },
}; 