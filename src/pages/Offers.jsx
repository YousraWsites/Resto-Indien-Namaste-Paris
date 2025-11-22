import React from "react";
import { motion } from "framer-motion";
import Img from "../components/Img.jsx";

const offers = [
  {
    id: "midi1",
    title: "Menu Midi Classique",
    subtitle: "Idéal pour une pause rapide",
    price: 15.9,
    per: "par personne",
    desc: "Entrée + Plat OU Plat + Dessert au choix dans la sélection midi.",
    details: [
      "Entrées : Samosa légumes ou Chicken Pakora",
      "Plats : Butter Chicken, Veg Biryani ou Dal Tadka",
      "Desserts : Gulab Jamun ou Kheer",
    ],
    time: "Du lundi au vendredi — 12:00–14:30",
    tag: "Le plus choisi",
    img: "/img/menu/offre1.jpg",
  },
  {
    id: "midi2",
    title: "Menu Thali Végétarien",
    subtitle: "Assortiment complet à partager",
    price: 17.9,
    per: "par personne",
    desc: "Plateau traditionnel avec 3 curries, riz basmati, naan et condiments.",
    details: ["Palak Paneer", "Dal Tadka", "Curry de légumes de saison"],
    time: "Du lundi au vendredi — 12:00–14:30",
    tag: "100% végétarien",
    img: "/img/menu/offre2.jpg",
  },
];

export default function Offers() {
  return (
    <section>
      <motion.h1
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Offres midi
      </motion.h1>
      <p className="muted">
        Formules servies uniquement le midi, parfaites pour un déjeuner sur le
        pouce ou entre collègues.
      </p>

      <div className="cards">
        {offers.map((o, i) => (
          <motion.article
            key={o.id}
            className="card offer-card"
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.12 }}
          >
            <div className="offer-layout">
              <div className="offer-img-wrap">
<Img
  src={import.meta.env.BASE_URL + o.img}
  alt={o.title}
  className="offer-img"
/>

                {o.tag && <span className="badge offer-tag">{o.tag}</span>}
              </div>

              <div className="card__body" style={{ display: "grid", gap: 6 }}>
                <h3>{o.title}</h3>
                {o.subtitle && (
                  <p className="muted" style={{ marginTop: 0 }}>
                    {o.subtitle}
                  </p>
                )}
                <div className="muted">{o.desc}</div>

                <ul
                  className="muted"
                  style={{ margin: "6px 0 0 16px" }}
                >
                  {o.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <strong style={{ fontSize: "1.3rem" }}>
                      {o.price.toFixed(2)}€
                    </strong>
                    <div className="muted" style={{ fontSize: "0.9rem" }}>
                      {o.per}
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: 4, textAlign: "right" }}>
                    <span className="badge">{o.time}</span>
                    <span className="muted" style={{ fontSize: "0.8rem" }}>
                      Boissons non incluses · Sur place uniquement
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <p className="muted" style={{ marginTop: 14 }}>
        Pour les groupes (&gt; 8 personnes), merci de nous contacter à l’avance
        pour une formule adaptée.
      </p>
    </section>
  );
}
