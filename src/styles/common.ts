import { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties } = {
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #eee',
    marginBottom: '30px',
    boxSizing: 'border-box',
  },
  logoContainer: { 
    display: 'flex', 
    alignItems: 'center', 
    cursor: 'pointer' 
  },
  logo: { 
    width: '50px', 
    height: '50px', 
    marginRight: '15px' 
  },
  title: { 
    fontSize: '2rem', 
    color: '#007AFF', 
    margin: 0, 
    fontWeight: 700 
  },
  navigation: { 
    display: 'flex', 
    gap: '15px' 
  },
  navButton: {
    background: 'none',
    border: '1px solid #007AFF',
    color: '#007AFF',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 20px 20px 20px',
    minHeight: 'calc(100vh - 40px)',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
  },
  mainContent: {
    maxWidth: '900px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    flexGrow: 1,
  },
  pageTitle: {
    fontSize: '2.2rem',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
    fontWeight: 600,
  },
  footer: {
    padding: '25px 0',
    fontSize: '0.9rem',
    color: '#777',
    borderTop: '1px solid #eee',
    width: '100%',
    textAlign: 'center',
    marginTop: '40px'
  },
  ctaButton: {
    backgroundColor: '#007AFF',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0px 4px 15px rgba(0, 122, 255, 0.3)',
    marginBottom: '20px',
    marginTop: '10px',
  },
  outlineButton: {
    background: 'transparent',
    border: '1px solid #007AFF',
    color: '#007AFF',
    padding: '12px 25px',
    fontSize: '1rem',
    fontWeight: 500,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
  inputField: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '8px',
    fontWeight: 500,
    textAlign: 'left'
  },
  authForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%'
  },
  authFormContainerContent: {
    maxWidth: '450px',
    padding: '30px',
    backgroundColor: '#fdfdfd',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    marginTop: '20px',
  },
  authTitle: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '25px',
    textAlign: 'center'
  },
  authLink: {
    textAlign: 'center',
    marginTop: '25px',
    fontSize: '0.95rem',
    color: '#555'
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#007AFF',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '0.95rem',
    padding: 0,
    fontWeight: 600,
  },
  introText: {
    fontSize: '1.1rem',
    color: '#4A4A4A',
    lineHeight: 1.6,
    marginBottom: '30px',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#555',
    margin: '0 0 20px 0',
    textAlign: 'center'
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    border: '1px solid #eee',
  },
  featureTitle: {
    fontSize: '1.2rem',
    color: '#333',
    margin: '0 0 10px 0',
    fontWeight: 600,
  },
  featureDescription: {
    fontSize: '0.9rem',
    color: '#666',
    margin: 0,
    lineHeight: 1.4,
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    width: '100%',
  },
  dashboardCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    border: '1px solid #eee',
  },
}; 