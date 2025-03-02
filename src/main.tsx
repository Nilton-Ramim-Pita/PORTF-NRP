import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Use a more efficient approach to hydrate the app
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Create root outside of render to avoid re-creating it
const root = createRoot(rootElement);

// Defer non-critical rendering
setTimeout(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}, 0);