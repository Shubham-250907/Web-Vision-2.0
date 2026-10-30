import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Phone, Eye, Type, Globe } from 'lucide-react';

export const TopAccessibilityBar: React.FC = () => {
  const { textSize, setTextSize, language, setLanguage, highContrast, toggleHighContrast } = useAccessibility();

  return (
    <div className="bg-[#05264c] text-white text-xs border-b border-blue-900 select-none">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Ministry identity */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-200">
            {language === 'hi' ? 'भारत सरकार | विदेश मंत्रालय' : 'Government of India | Ministry of External Affairs'}
          </span>
          <span className="hidden md:inline text-blue-300 text-xs">|</span>
          <span className="hidden md:flex items-center gap-1 text-amber-300 font-medium">
            <Phone className="w-3.5 h-3.5" />
            <span>Toll Free: 1800-258-1800</span>
          </span>
        </div>

        {/* Right: Accessibility Controls */}
        <div className="flex items-center gap-4">
          {/* Skip link */}
          <a
            href="#main-content"
            className="hidden sm:inline hover:underline text-slate-300 focus:text-white"
          >
            {language === 'hi' ? 'मुख्य सामग्री पर जाएं' : 'Skip to Main Content'}
          </a>

          {/* Screen Reader Access */}
          <button
            onClick={() => alert('Screen Reader Optimization is active on this portal.')}
            className="hidden lg:flex items-center gap-1 hover:text-amber-300 text-slate-300"
            title="Screen Reader Access"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Screen Reader</span>
          </button>

          {/* Text Size Resizer (A- / A / A+) */}
          <div className="flex items-center bg-blue-950/60 rounded px-1.5 py-0.5 border border-blue-800 text-slate-200">
            <span className="text-[10px] mr-1 text-slate-400 flex items-center">
              <Type className="w-3 h-3" />
            </span>
            <button
              onClick={() => setTextSize('sm')}
              className={`px-1.5 hover:text-white ${textSize === 'sm' ? 'text-amber-300 font-bold' : ''}`}
              title="Decrease Font Size"
            >
              A-
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setTextSize('base')}
              className={`px-1.5 hover:text-white ${textSize === 'base' ? 'text-amber-300 font-bold' : ''}`}
              title="Normal Font Size"
            >
              A
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setTextSize('lg')}
              className={`px-1.5 hover:text-white ${textSize === 'lg' ? 'text-amber-300 font-bold' : ''}`}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`px-2 py-0.5 rounded border text-[11px] font-medium transition-colors ${
              highContrast
                ? 'bg-yellow-400 text-black border-yellow-300 font-bold'
                : 'bg-blue-900/60 text-slate-200 border-blue-700 hover:bg-blue-800'
            }`}
            title="Toggle High Contrast Mode"
          >
            {highContrast ? 'Standard' : 'Contrast'}
          </button>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 text-[11px]">
            <Globe className="w-3 h-3 text-slate-400" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-1 ${language === 'en' ? 'text-amber-300 font-bold underline' : 'text-slate-300 hover:text-white'}`}
            >
              English
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1 ${language === 'hi' ? 'text-amber-300 font-bold underline' : 'text-slate-300 hover:text-white'}`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
