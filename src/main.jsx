import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StreamForgeProvider } from './context/StreamForgeContext';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StreamForgeProvider>
        <App />
      </StreamForgeProvider>
    </BrowserRouter>
  </StrictMode>
);
