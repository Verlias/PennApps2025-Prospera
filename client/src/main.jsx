import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { MousePositionProvider } from "./context/MousePositionProvider.jsx";
import { AuthProvider } from "@propelauth/react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider authUrl={'https://6055383.propelauthtest.com'}>
      <MousePositionProvider>
        <App />
      </MousePositionProvider>
    </AuthProvider>
  </StrictMode>,
);

