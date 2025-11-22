import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext.jsx';

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/menu', label: 'Menu' },
  { to: '/offers', label: 'Offres midi' },
  { to: '/about', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [elev, setElev] = useState(false);
  const { count } = useCart();
  const navigate = useNavigate();

  useEffect(()=>{
    const onScroll = () => setElev(window.scrollY > 6);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  },[]);

  return (
    <header className="nav" style={{ boxShadow: elev ? '0 6px 20px rgba(0,0,0,.06)' : 'none' }}>
      <div className="nav__inner">
        <Link to="/" className="logo">Namasté Paris</Link>

        <nav className="nav__links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={({isActive}) => isActive ? 'active' : ''}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <button
            className="btn btn-outline"
            onClick={()=>navigate('/cart')}
            style={{ position:'relative' }}
          >
            Panier
            <span
              style={{
                position:'absolute', top:-8, right:-10, background:'#2e3a59',
                color:'#fff', borderRadius:999, padding:'2px 8px', fontSize:12, fontWeight:800,
                minWidth:18, textAlign:'center'
              }}
              aria-label={`Articles dans le panier : ${count}`}
            >
              {count}
            </span>
          </button>

          <button className="burger" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu">
            <span/><span/><span/>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="drawer"
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {links.map(l => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/cart" onClick={() => setOpen(false)}>Panier ({count})</NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
