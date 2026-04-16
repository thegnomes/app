import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PortfolioWork from './components/PortfolioWork'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioWork />
  </StrictMode>,
)
