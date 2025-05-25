import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { AppHeader } from '../common/AppHeader';
import { Footer } from '../common/Footer';
import { styles } from '../../styles/components';
import { ScreenProps } from '../App';

export const HomeScreen: React.FC<Pick<ScreenProps, 'navigateTo' | 'isAuthenticated' | 'handleLogout'>> = ({
  navigateTo,
  isAuthenticated,
  handleLogout,
}) => {
  const bookButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (bookButtonRef.current) {
      const button = bookButtonRef.current;
      const tl = gsap.timeline({ paused: true });
      tl.to(button, { scale: 1.05, duration: 0.2, ease: 'power1.out' })
        .to(button, { boxShadow: '0px 8px 20px rgba(0, 122, 255, 0.4)', duration: 0.2 }, "-=0.2");

      const enterListener = () => tl.play();
      const leaveListener = () => tl.reverse();

      button.addEventListener('mouseenter', enterListener);
      button.addEventListener('mouseleave', leaveListener);

      return () => {
        button.removeEventListener('mouseenter', enterListener);
        button.removeEventListener('mouseleave', leaveListener);
        tl.kill();
      };
    }
  }, []);

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.pageContainer}
    >
      <AppHeader navigateTo={navigateTo} currentScreen="home" isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <main style={styles.mainContent}>
        <motion.p
          style={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your Health, Simplified. Anytime, Anywhere.
        </motion.p>
        <motion.p
          style={styles.introText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Welcome to MediConnect! Book appointments, consult with top doctors via video call,
          share symptoms securely, and get quick diagnoses.
        </motion.p>

        <motion.button
          ref={bookButtonRef}
          style={styles.ctaButton}
          onClick={() => navigateTo(isAuthenticated ? 'mainTab' : 'login')}
          aria-label="Book an Appointment Now"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Book an Appointment
        </motion.button>

        <div style={styles.featuresPreview}>
          {[
            { title: "Video Consultations", desc: "Connect face-to-face with doctors." },
            { title: "Symptom Checker", desc: "Share images & details easily." },
            { title: "Secure & Private", desc: "Your health data is protected." }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              style={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
            >
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}; 