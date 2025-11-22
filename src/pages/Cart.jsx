import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext.jsx';

const fallback = 'https://picsum.photos/seed/foodfallback/120/80';

export default function Cart() {
  const { items, setQty, remove, clear, total } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <section>
      <motion.h1 initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>Votre panier</motion.h1>
      {items.length === 0 ? (
        <p className="muted">Votre panier est vide.</p>
      ) : (
        <>
          <div className="card" style={{padding:12}}>
            {items.map(it => (
              <div key={it.id} style={{display:'grid', gridTemplateColumns:'auto 1fr auto auto', gap:12, alignItems:'center', padding:'10px 0', borderBottom:'1px solid #eee'}}>
                <img src={it.img} alt={it.name} width="86" height="64" style={{objectFit:'cover', borderRadius:8}} onError={(e)=>{e.currentTarget.src=fallback}}/>
                <div>
                  <strong>{it.name}</strong>
                  <div className="muted" style={{fontSize:'.9rem'}}>{Number(it.price).toFixed(2)}€ / pièce</div>
                </div>
                <input
                  aria-label="Quantité"
                  type="number"
                  min="1"
                  value={it.qty}
                  onChange={(e)=>setQty(it.id, Number(e.target.value))}
                  style={{width:70, padding:8, borderRadius:10, border:'1px solid #e6dfd3'}}
                />
                <div style={{display:'grid', justifyItems:'end', gap:6}}>
                  <div><strong>{(it.qty * Number(it.price)).toFixed(2)}€</strong></div>
                  <button className="btn btn-outline" onClick={()=>remove(it.id)}>Retirer</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14}}>
            <button className="btn btn-outline" onClick={clear}>Vider le panier</button>
            <div style={{display:'grid', gap:6, justifyItems:'end'}}>
              <div className="muted">Total estimé</div>
              <div style={{fontSize:'1.4rem', fontWeight:800}}>{total.toFixed(2)}€</div>
              <button className="btn" onClick={()=>setOpen(true)}>Réserver</button>
            </div>
          </div>
        </>
      )}

      {/* Modal de réservation (copiée depuis Home) */}
      {open && (
        <div className="modal-backdrop" onClick={()=>setOpen(false)}>
          <motion.div className="modal" initial={{scale:.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{opacity:0}} onClick={(e)=>e.stopPropagation()}>
            <h2>Réserver une table</h2>
            <form className="form" onSubmit={(e)=>{e.preventDefault(); alert('Merci ! Votre réservation a bien été envoyée.'); setOpen(false);}}>
              <label>Nom<input required placeholder="Votre nom"/></label>
              <label>Email<input required type="email" placeholder="vous@email.com"/></label>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                <label>Date<input required type="date"/></label>
                <label>Heure<input required type="time"/></label>
              </div>
              <label>Personnes<input required type="number" min="1" defaultValue="2"/></label>
              <button className="btn" type="submit">Envoyer la demande</button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}
