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

const pills = [
  "Tandoor traditionnel",
  "Épices toastées chaque matin",
  "Accueil chaleureux",
  "Options végétariennes",
];

export default function About() {
  return (
    <section className="about">
      <div className="about-inner">
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          À propos
        </motion.h1>

        <motion.p
          className="about-lead muted"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          Depuis 2010, <strong>Namasté Paris</strong> prépare une cuisine
          indienne maison : pains au tandoor, currys mijotés, lassis frais
          et assiettes à partager dans une ambiance chaleureuse.
        </motion.p>

        {/* Petites étiquettes */}
        <motion.div
          className="about__grid about-pills"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {pills.map((t, i) => (
            <motion.div
              key={t}
              className="pill"
              custom={i + 1}
              variants={fadeUp}
            >
              {t}
            </motion.div>
          ))}
        </motion.div>

        {/* Petite carte simple pour l'histoire */}
        <motion.div
          className="card about-card"
          variants={fadeUp}
          custom={4}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="about-card-header">
            <h2>Notre histoire</h2>
            <span className="tag">Depuis 2010</span>
          </div>
          <ul className="muted">
            <li>Premier restaurant ouvert à République, quartier animé de Paris.</li>
            <li>Un four tandoor en cuivre, des recettes inspirées de la famille.</li>
            <li>Une carte qui évolue mais une promesse qui reste : chaleur, partage et générosité.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
