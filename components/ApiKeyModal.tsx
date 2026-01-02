import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
  onVerify: (key: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onVerify }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if key exists in local storage or env
    const storedKey = localStorage.getItem('gemini_api_key');
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (storedKey || envKey) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleSave = () => {
    if (!inputKey.trim().startsWith('AIza')) {
       // simple validation check for Google keys which usually start with AIza
       // but we can be lenient or strict. Let's just check length.
       if (inputKey.length < 10) {
         setError('Invalid key format. Please check your input.');
         return;
       }
    }
    
    localStorage.setItem('gemini_api_key', inputKey);
    // Reload to trigger the app's initialization logic
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white border-[3px] border-black w-full max-w-lg shadow-[8px_8px_0px_#000]">
        
        {/* Header */}
        <div className="bg-black text-white p-4 font-bold font-mono text-lg flex justify-between items-center">
          <span>INITIALIZE FORENSIC ENGINE</span>
          {/* Simple Alert Icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>

        <div className="p-8">
          
          {/* Explanation Accordion */}
          <details className="mb-6 border-2 border-gray-200 open:border-black open:bg-gray-50 group">
            <summary className="cursor-pointer font-bold p-3 list-none flex justify-between items-center">
              <span>Why do I need an API Key?</span>
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="p-3 pt-0 text-sm text-gray-600 leading-relaxed border-t-2 border-gray-200 group-open:border-black mt-2">
              This forensic tool runs on Google's <strong>Gemini Pro</strong> model. To keep this tool free and private, we use your personal API quota (Free Tier available). Your key is stored <strong>ONLY</strong> in your browser's local storage and is never sent to our servers.
            </div>
          </details>

          {/* Input Field with Lock Icon */}
          <div className="mb-6 relative">
             <label className="block font-bold text-sm mb-2">GOOGLE AI STUDIO KEY</label>
             <div className="relative">
               {/* Raw Lock SVG - No Import Needed */}
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
               </div>
               <input 
                  type="password" 
                  className="w-full border-[3px] border-black pl-10 pr-4 py-3 font-mono text-sm focus:outline-none focus:ring-4 focus:ring-green-400/50"
                  placeholder="Paste your key here (sk-...)"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
               />
             </div>
             {error && <p className="text-red-600 text-xs font-bold mt-2 font-mono">ERROR: {error}</p>}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={handleSave}
              className="w-full bg-[#42BE65] border-[3px] border-black p-4 font-bold text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_#000] transition-all uppercase tracking-wider"
            >
              Authenticate & Launch
            </button>
            
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noreferrer"
              className="text-center text-xs font-mono text-gray-500 underline hover:text-black"
            >
              Get a free key from Google AI Studio →
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
