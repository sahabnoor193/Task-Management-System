import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< Updated upstream
=======
import { BrowserRouter } from 'react-router-dom' 
>>>>>>> Stashed changes
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< Updated upstream
    <App />
=======
    <BrowserRouter> 
      <App />
    </BrowserRouter>
>>>>>>> Stashed changes
  </StrictMode>,
)
