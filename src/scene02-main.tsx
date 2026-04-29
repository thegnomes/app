import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Scene02Page from './Scene02Page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Scene02Page />
  </StrictMode>,
)
