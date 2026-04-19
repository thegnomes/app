import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import OxytapPortfolio from './components/OxytapPortfolio';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OxytapPortfolio />
  </StrictMode>,
);
