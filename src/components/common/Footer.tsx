import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../../styles/components';

export const Footer: React.FC = () => (
  <motion.footer
    style={styles.footer}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.8 }}
  >
    <p>&copy; {new Date().getFullYear()} MediConnect. All rights reserved.</p>
    <p>
      This is a conceptual UI. Full functionality will be implemented progressively.
    </p>
  </motion.footer>
); 