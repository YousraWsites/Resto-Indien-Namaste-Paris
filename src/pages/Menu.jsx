import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MENU, CATEGORIES } from '../data/menuData.js';
import Img from '../components/Img.jsx';

export default function Menu() {
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('Curries');
  const [onlyVeg, setOnlyVeg] = useState(false);
  const [maxSpicy, setMaxSpicy] = useState(3);

  const shown = useMemo(()=>{
    return MENU.filter(m =>
      (tab ? m.cat === tab : true) &&
      (onlyVeg ? m.veg : true) &&
      (m.spicy <= maxSpicy) &&
      (q ? (m.name.toLowerCase().includes(q.toLowerCase()) || m.desc.toLowerCase().includes(q.toLowerCase())) : true)
    );
  }, [q, tab, onlyVeg, maxSpicy]);

  return (
    <section>
      <motion.h1 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>Menu indien</motion.h1>
      <p className="muted">Filtrez par catégorie, plat végétarien et niveau d’épices. Ajoutez au panier en un clic.</p>

      <div className="menu-toolbar">
        <div className="tabs">
          {CATEGORIES.map(c => (
            <button key={c} className={`tab ${tab===c?'active':''}`} onClick={()=>setTab(c)}>{c}</button>
          ))}
        </div>
        <div className="search"><input placeholder="Rechercher un plat… (ex: naan, tikka)" value={q} onChange={e=>setQ(e.target.value)} /></div>
        <label className="badge veg" style={{cursor:'pointer'}}>
          <input type="checkbox" checked={onlyVeg} onChange={e=>setOnlyVeg(e.target.checked)} />&nbsp;Plat végétarien
        </label>
        <label className="badge spicy" title="Niveau d’épices max">
          🌶️ max&nbsp;
          <select value={maxSpicy} onChange={e=>setMaxSpicy(Number(e.target.value))}>
            <option value={0}>0</option><option value={1}>1</option><option value={2}>2</option><option value={3}>3</option>
          </select>
        </label>
      </div>

      <div className="menu-grid">
        {shown.map((it) => (
          <motion.div key={it.id} className="menu-item" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <Img className="mi-img" src={it.img} alt={it.name} />
            <div>
              <h3 className="mi-title">{it.name}</h3>
              <p className="mi-desc">{it.desc}</p>
              <div style={{display:'flex', gap:8}}>
                {it.sig && <span className="badge sig">Signature</span>}
                {it.veg && <span className="badge veg"> Vég</span>}
                {it.spicy>0 && <span className="badge spicy">🌶️ {it.spicy}</span>}
              </div>
            </div>
            <div style={{display:'grid', gap:8, justifyItems:'end'}}>
              <strong className="mi-price">{it.price.toFixed(2)}€</strong>
              <button className="btn" onClick={()=>alert('Ajout au panier désactivé si tu préfères réserver uniquement 😉')}>Ajouter</button>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="muted" style={{marginTop:14}}>Prix nets, service compris. Allergènes : nous consulter.</p>
    </section>
  );
}
