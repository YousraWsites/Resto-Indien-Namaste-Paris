import React, { useState } from "react";
import { motion } from "framer-motion";
import { MENU } from "../data/menuData.js";
import Img from "../components/Img.jsx";
import heroImg from "../assets/dinerindien.jpg";
import { useNavigate } from "react-router-dom";   // 👈 nouveau


export default function Home() {
  const [open, setOpen] = useState(false);
  const featured = MENU.slice(0, 3);
  const navigate = useNavigate();                 // 👈 nouveau


  return (
    <section className="home">
      <motion.div
        className="hero"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero__text">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Saveurs de l’Inde, cœur de Paris.
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Bienvenue chez <strong>Namasté Paris</strong> — tandoor, curries
            onctueux et street food. Carte maison, produits frais, épices
            torréfiées.
          </motion.p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
  <motion.button
    className="btn"
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => navigate("/menu")}          // 👈 navigation SPA
  >
    Voir le menu
  </motion.button>

  <motion.button
    className="btn btn-outline"
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => navigate("/offers")}        // 👈 navigation SPA
  >
    Offres midi
  </motion.button>

  <motion.button
    className="btn btn-outline"
    onClick={() => setOpen(true)}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.98 }}
  >
    Réserver
  </motion.button>
</div>

        </div>

        <motion.div
          className="hero__media"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <Img
            className="hero__img"
            src={heroImg}
            alt="Dîner indien (tandoor, curry, pains)"
          />
        </motion.div>
      </motion.div>

      {/* Section lien culture + plats */}
      <section className="culture">
        <div className="culture-header">
          <span className="tag">Inde dans l’assiette</span>
          <h2>Quand la culture se raconte en plats</h2>
          <p className="muted">
            Chaque recette de <strong>Namasté Paris</strong> s’inspire d’une
            région, d’une fête ou d’un moment de partage : du tandoor du Nord
            aux currys parfumés plus au Sud.
          </p>
        </div>

        <div className="culture-list">
          {featured.map((it, i) => (
            <motion.article
              key={it.id}
              className="card culture-card"
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
            >
              <div className="culture-img-wrap">
                <Img
  src={import.meta.env.BASE_URL + it.img}
  alt={it.name}
  className="culture-img"
/>

              </div>

              <div className="card__body culture-body">
                <div className="culture-top">
                  <h3>{it.name}</h3>
                  <span className="culture-price">
                    {it.price.toFixed(2)}€
                  </span>
                </div>

                <p className="muted culture-desc">{it.desc}</p>

                <div className="culture-foot">
                  <div className="culture-tags">
                    {it.veg && (
                      <span className="badge veg">🥦 Végétarien</span>
                    )}
                    {it.spicy > 0 && (
                      <span className="badge spicy">🌶️ {it.spicy}</span>
                    )}
                  </div>
                  <span className="culture-note">
                    Une façon de découvrir la cuisine indienne en douceur.
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Modal de réservation */}
      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <motion.div
            className="modal"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Réserver une table</h2>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Merci ! Nous vous confirmons par email.");
                setOpen(false);
              }}
            >
              <label>
                Nom
                <input required placeholder="Votre nom" />
              </label>
              <label>
                Email
                <input required type="email" placeholder="vous@email.com" />
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <label>
                  Date
                  <input required type="date" />
                </label>
                <label>
                  Heure
                  <input required type="time" />
                </label>
              </div>
              <label>
                Personnes
                <input required type="number" min="1" defaultValue="2" />
              </label>
              <button className="btn" type="submit">
                Envoyer la demande
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}
