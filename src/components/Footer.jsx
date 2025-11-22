import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p>© {new Date().getFullYear()} Namasté Paris — Tous droits réservés.</p>
      <p className="muted">123 Rue du Soleil, 75000 Paris — 01 23 45 67 89</p>
    </motion.footer>
  );
}
