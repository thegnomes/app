import { useEffect } from 'react';

/* ─── Page ─── */

export default function PortfolioWork() {
  useEffect(() => {
    window.location.replace('/toto-portfolio.html');
  }, []);

  return null;
}
