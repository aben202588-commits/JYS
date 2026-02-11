'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, TranslationState } from '@/lib/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationState;
  images: Record<string, string>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to 'zh' as requested
  const [language, setLanguage] = useState<Language>('zh');
  const [dynamicContent, setDynamicContent] = useState<any>(null);

  // Load content from API
  useEffect(() => {
    fetch('/api/admin/content')
      .then(res => res.json())
      .then(data => setDynamicContent(data))
      .catch(err => console.error('Failed to load dynamic content:', err));
  }, []);

  // Optional: Load preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'zh')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = React.useMemo(() => {
    const baseTranslations = translations[language];
    
    // If we have dynamic content for the current language, merge it
    if (dynamicContent?.text) {
      const merged = { ...baseTranslations };
      
      // Iterate over dynamic keys like "hero.title"
      Object.entries(dynamicContent.text).forEach(([key, values]: [string, any]) => {
        // Only override if there is a value for the current language
        if (values && values[language]) {
            // Need to handle nested keys if translations structure is nested
            // For simplicity, we assume flat keys or we manually map known keys
            // But wait, translations object is nested (e.g. hero: { title: ... })
            // So "hero.title" needs to update merged.hero.title
            
            const parts = key.split('.');
            let current: any = merged;
            for (let i = 0; i < parts.length - 1; i++) {
                if (!current[parts[i]]) current[parts[i]] = {};
                current = current[parts[i]];
            }
            current[parts[parts.length - 1]] = values[language];
        }
      });
      return merged;
    }
    
    return baseTranslations;
  }, [language, dynamicContent]);

  const images = React.useMemo(() => {
    return dynamicContent?.images || {};
  }, [dynamicContent]);

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
    images, // Expose images to context
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
