import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const LS_KEY = "namaste_cart_v1";
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const add = (product, qty = 1) => {
    setItems(curr => {
      const i = curr.findIndex(it => it.id === product.id);
      if (i >= 0) {
        const copy = [...curr];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...curr, { ...product, qty }];
    });
  };
  const remove = (id) => setItems(curr => curr.filter(it => it.id !== id));
  const setQty = (id, qty) => setItems(curr => curr.map(it => it.id === id ? { ...it, qty: Math.max(1, qty) } : it));
  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((a,b)=>a + b.qty, 0), [items]);
  const total = useMemo(() => items.reduce((a,b)=>a + b.qty * Number(b.price), 0), [items]);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){ 
  const ctx = useContext(CartContext); 
  if (!ctx) throw new Error("useCart must be used within CartProvider"); 
  return ctx; 
}
