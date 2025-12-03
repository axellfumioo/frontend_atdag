"use client";

import { createContext, useContext, useState } from "react";
import id from "@/common/languages/id.json";
import en from "@/common/languages/en.json";

// ----------------------
// TYPES
// ----------------------
type Language = "id" | "en";

interface LanguageProviderType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

// ----------------------
// DATA
// ----------------------
const LANG = { id, en };

// ----------------------
// Helper: get value from nested object using dot notation (e.g. "lp.0.feature_1_title")
// ----------------------
function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => {
    if (acc && acc[key] !== undefined) return acc[key];
    return undefined;
  }, obj);
}

// ----------------------
// CONTEXT
// ----------------------
const LanguageContext = createContext<LanguageProviderType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("id");

  const t = (key: string) => {
    const result = getNestedValue(LANG[lang], key);
    return result ?? key; // fallback: tampilkan key
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
