import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 1. Log that script has started
console.log('✅ index.tsx is running...');

// 2. Find the root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  // If root is missing, display a full-screen error manually
  console.error('❌ FATAL: Could not find element with id="root"');
  document.body.innerHTML = `
    <div style="color: red; font-family: monospace; padding: 20px; border: 5px solid red; background: white; margin: 20px;">
      <h1>CRITICAL ERROR: MISSING ROOT ELEMENT</h1>
      <p>React could not find the &lt;div id="root"&gt; in your index.html.</p>
      <p>Please check your index.html file.</p>
    </div>
  `;
} else {
  // 3. Try to mount the app safely
  try {
    console.log('✅ Root element found. Mounting React...');
    
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    
    console.log('✅ React mount command sent.');
  } catch (err) {
    console.error('❌ React Crash:', err);
    rootElement.innerHTML = `
      <div style="color: red; padding: 20px; font-family: monospace; background: white; border: 5px solid red;">
        <h1>React Crash</h1>
        <pre>${err instanceof Error ? err.stack : String(err)}</pre>
      </div>
    `;
  }
}