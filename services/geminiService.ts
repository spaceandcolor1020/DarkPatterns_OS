import { GoogleGenerativeAI } from "@google/generative-ai";
import { AuditResponse } from "../types"; // Adjust path if needed

// SAFE KEY RETRIEVAL HELPER
const getApiKey = (): string | null => {
  // 1. Try Local Storage (User entered key)
  const stored = localStorage.getItem('gemini_api_key');
  if (stored) return stored;

  // 2. Try Vite Env Variable (Developer key)
  // CRITICAL: Do NOT use process.env here
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }

  return null;
};

// SYSTEM PROMPT (Keep your existing long prompt here)
const SYSTEM_PROMPT = `
  You are a Dark Pattern Forensic Auditor. 
  Your goal is to analyze the user-provided text/HTML and identify deceptive UX patterns.
  
  Format your response as a JSON object with this exact structure:
  {
    "deception_score": number (0-100),
    "dark_patterns": [
      {
        "category": string,
        "location": string,
        "detected_copy": string,
        "ethical_rewrite": string,
        "cognitive_exploit": string,
        "severity": "High" | "Medium" | "Low",
        "remediation_code": string (React snippet),
        "business_impact": string
      }
    ],
    "ethics_scorecard": {
      "user_agency_grade": "A"|"B"|"C"|"F",
      "safety_grade": "A"|"B"|"C"|"F",
      "transparency_grade": "A"|"B"|"C"|"F"
    },
    "ai_transparency_signals": {
      "turing_scale": "Black Box" | "Grey Box" | "Glass Box" | "N/A",
      "trust_score": number (0-100),
      "pair_compliance": number (0-100)
    },
    "is_ai_present": boolean,
    "citations": string[]
  }
`;

export const analyzeDarkPatterns = async (content: string): Promise<AuditResponse> => {
  const API_KEY = getApiKey();

  if (!API_KEY) {
    throw new Error("MISSING_KEY");
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Enforce JSON format
    const result = await model.generateContent(
      `${SYSTEM_PROMPT}\n\nANALYZE THIS CONTENT:\n"${content}"\n\nRESPONSE (JSON ONLY):`
    );
    
    const response = await result.response;
    const text = response.text();

    // Sanitize and Parse JSON
    // Sometimes Gemini wraps JSON in markdown blocks ```json ... ```
    const cleanJson = text.replace(/```json|```/g, '').trim();
    
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
