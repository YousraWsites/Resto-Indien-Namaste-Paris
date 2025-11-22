import React, { useMemo, useRef, useState } from "react";

// Fallback inline (aucun fichier requis)
const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120" viewBox="0 0 160 120">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="#f3ede1" offset="0"/>
      <stop stop-color="#e9e1d4" offset="1"/>
    </linearGradient>
  </defs>
  <rect width="160" height="120" fill="url(#g)"/>
  <g fill="#b9ad99">
    <circle cx="26" cy="26" r="10"/>
    <rect x="18" y="60" width="124" height="8" rx="4"/>
    <rect x="18" y="76" width="96" height="8" rx="4"/>
  </g>
</svg>`);

/**
 * Img robuste :
 * - essaie src direct
 * - si échec et domaine Unsplash → retente via proxy (images.weserv.nl)
 * - sinon → fallback SVG
 */
export default function Img({ src, alt, className, ...rest }) {
  const [broken, setBroken] = useState(false);
  const [useProxy, setUseProxy] = useState(false);
  const triedProxy = useRef(false);

  const computedSrc = useMemo(() => {
    if (broken) return FALLBACK;
    if (useProxy) {
      // proxy https (contourne certains 403/Adblock/CORS)
      const proxied = `https://images.weserv.nl/?url=${encodeURIComponent(
        src.replace(/^https?:\/\//, "")
      )}&w=640&fit=cover&we`;
      return proxied;
    }
    return src;
  }, [src, broken, useProxy]);

  const handleError = () => {
    const isUnsplash = typeof src === "string" && src.includes("images.unsplash.com");
    if (isUnsplash && !triedProxy.current) {
      triedProxy.current = true;
      setUseProxy(true); // 2e tentative via proxy
    } else {
      setBroken(true);   // sinon, fallback
    }
  };

  return (
    <img
      src={computedSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      {...rest}
    />
  );
}
