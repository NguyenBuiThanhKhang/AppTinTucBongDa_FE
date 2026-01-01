import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GuessLineup from './pages/GuessLineup.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*<App />*/}<GuessLineup />
  </StrictMode>,
)
