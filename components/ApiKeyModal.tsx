import React, { useState } from 'react';
import { Lock, ExternalLink, Cpu, Key, ChevronDown, Zap } from 'lucide-react';

interface ApiKeyModalProps {
  onAuthorized: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onAuthorized }) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveKey = () => {
    if (!apiKeyInput.trim()) return;
    
    setIsSaving(true);
    // Save to localStorage
    localStorage.setItem('gemini_api_key', apiKeyInput.trim());
    
    // Trigger window reload to re-initialize the app with the new key
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white border-[3px] border-black p-8 w-full max-w-lg shadow-[16px_16px_0px_#000] relative animate-in zoom-in-95 duration-300 rounded-none">
        
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6 border-b-[3px] border-black pb-4">
          <Cpu size={32} className="text-[#42BE65]" strokeWidth={3} />
          <h2 className="text-3xl font-black font-spacegrotesk leading-none tracking-tighter uppercase italic">
            INITIALIZE FORENSIC ENGINE
          </h2>
        </div>

        {/* Info Body */}
        <div className="space-y-6">
          <p className="text-sm font-bold text-gray-700 leading-relaxed font-body">
            To use this forensic tool, you must provide a valid Google Gemini API Key. Your key is stored locally in your browser and is never sent to our servers.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black font-mono uppercase tracking-widest text-gray-500">
                <Lock size={12} strokeWidth={3} /> Input_System_Credentials
              </label>
              <input 
                type="password"
                placeholder="sk-..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full border-[3px] border-black p-4 font-mono text-sm bg-gray-50 focus:bg-white focus:outline-none transition-colors rounded-none"
              />
            </div>

            {/* Accordion Explanation */}
            <details className="border-[3px] border-black bg-gray-50 p-4 rounded-none group">
              <summary className="font-black uppercase text-[10px] tracking-widest cursor-pointer list-none flex justify-between items-center select-none">
                Why do I need an API Key?
                <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-[11px] font-bold mt-3 text-gray-600 leading-relaxed font-body italic">
                This tool runs on Google's Gemini Pro model. To keep the tool free and private, we use your personal API quota. Your key is stored ONLY in your browser's local storage.
              </p>
            </details>

            <div className="bg-white border-[3px] border-black p-4 space-y-3 shadow-[4px_4px_0px_#000]">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between text-black hover:text-[#42BE65] transition-colors font-black uppercase text-xs tracking-widest font-spacegrotesk"
              >
                Get a free key from AI Studio <ExternalLink size={14} strokeWidth={3} />
              </a>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleSaveKey}
          disabled={!apiKeyInput.trim() || isSaving}
          className="w-full bg-[#42BE65] text-black font-spacegrotesk uppercase font-black py-5 mt-8 border-[3px] border-black hover:bg-black hover:text-[#42BE65] hover:shadow-[4px_4px_0px_#42BE65] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:grayscale rounded-none"
        >
          <Zap size={24} strokeWidth={3} />
          {isSaving ? 'BOOTING...' : 'INITIALIZE_SYSTEM'}
        </button>
      </div>
    </div>
  );
};

export default ApiKeyModal;