import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TotoPortfolio from './components/TotoPortfolio';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TotoPortfolio />
  </StrictMode>,
);
