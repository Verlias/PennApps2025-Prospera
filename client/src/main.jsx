import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {MousePositionProvider} from "./context/MousePositionProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <MousePositionProvider>
          <App />
      </MousePositionProvider>
  </StrictMode>,
)
