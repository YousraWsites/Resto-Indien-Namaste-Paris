import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
};

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Merci ! Nous revenons vers vous rapidement.");
  };

  return (
    <section className="contact">
      <div className="contact-layout">
   {/* --- Colonne texte stylée --- */}
<motion.div
  className="contact-text enhanced-left"
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.4 }}
>
  <motion.h1 variants={fadeUp} className="contact-title">
    Contact & réservation
  </motion.h1>

  <motion.p
    className="contact-intro"
    variants={fadeUp}
    custom={1}
  >
    Une table pour ce soir ? Une demande spéciale ?  
    Notre équipe vous répond avec plaisir et le plus rapidement possible.
  </motion.p>

  <motion.div
    className="contact-infos"
    variants={fadeUp}
    custom={2}
  >
    <div className="info-block">
      <span className="info-label">📍 Adresse</span>
      <p>123 Rue du Soleil, 75000 Paris</p>
    </div>

    <div className="info-block">
      <span className="info-label">📞 Téléphone</span>
      <p>01 23 45 67 89</p>
    </div>

    <div className="info-block">
      <span className="info-label">🕒 Horaires</span>
      <p>12:00–14:30 & 19:00–23:00</p>
    </div>
  </motion.div>

  <motion.div
    className="contact-separator"
    variants={fadeUp}
    custom={3}
  />

  <motion.p
    className="contact-subtext"
    variants={fadeUp}
    custom={4}
  >
    Nous proposons également des privatisations, des menus groupes et un service traiteur sur demande.
  </motion.p>
</motion.div>


        {/* Colonne formulaire */}
        <motion.form
          className="form contact-form"
          onSubmit={handleSubmit}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          custom={3}
        >
          <label>
            Nom
            <input type="text" placeholder="Votre nom" required />
          </label>
          <label>
            Email
            <input type="email" placeholder="vous@email.com" required />
          </label>
          <label>
            Téléphone
            <input type="tel" placeholder="06 12 34 56 78" />
          </label>
          <label>
            Message
            <textarea
              rows="4"
              placeholder="Date, heure, nombre de personnes…"
            />
          </label>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn"
            type="submit"
          >
            Envoyer
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
