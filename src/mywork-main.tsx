import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyWorkPage from './MyWorkPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyWorkPage />
  </StrictMode>,
)
