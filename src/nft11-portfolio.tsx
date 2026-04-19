import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Nft11Portfolio from './components/Nft11Portfolio';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Nft11Portfolio />
  </StrictMode>,
);
