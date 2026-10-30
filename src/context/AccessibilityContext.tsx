import React, { createContext, useContext, useState, useEffect } from 'react';

type TextSize = 'sm' | 'base' | 'lg';
type Language = 'en' | 'hi';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
  resetTextSize: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSize] = useState<TextSize>('base');
  const [language, setLanguage] = useState<Language>('en');
  const [highContrast, setHighContrast] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (textSize === 'sm') {
      root.style.fontSize = '14px';
    } else if (textSize === 'lg') {
      root.style.fontSize = '18px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [textSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('contrast-125');
    } else {
      document.body.classList.remove('contrast-125');
    }
  }, [highContrast]);

  const increaseTextSize = () => {
    if (textSize === 'sm') setTextSize('base');
    else if (textSize === 'base') setTextSize('lg');
  };

  const decreaseTextSize = () => {
    if (textSize === 'lg') setTextSize('base');
    else if (textSize === 'base') setTextSize('sm');
  };

  const resetTextSize = () => {
    setTextSize('base');
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        increaseTextSize,
        decreaseTextSize,
        resetTextSize,
        language,
        setLanguage,
        highContrast,
        toggleHighContrast
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
