import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ShieldCheck, Sparkles, Award } from 'lucide-react';

export const GovHeader: React.FC = () => {
  const { language } = useAccessibility();

  return (
    <header className="bg-white border-b border-slate-200">
      {/* Tricolor top line */}
      <div className="h-1.5 w-full flex">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-white"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: National Emblem & Ministry */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3.5 group">
            {/* Ashoka Emblem representation */}
            <div className="w-12 h-14 flex flex-col items-center justify-center text-slate-800">
              <svg viewBox="0 0 100 120" className="w-10 h-12 fill-current text-slate-900" aria-label="National Emblem of India">
                <circle cx="50" cy="22" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M36,22 C36,14 64,14 64,22 C64,28 36,28 36,22 Z" />
                <path d="M42,36 L58,36 L54,58 L46,58 Z" />
                <rect x="30" y="58" width="40" height="8" rx="2" fill="currentColor" />
                <circle cx="50" cy="74" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <line x1="50" y1="67" x2="50" y2="81" stroke="currentColor" strokeWidth="1.5" />
                <line x1="43" y1="74" x2="57" y2="74" stroke="currentColor" strokeWidth="1.5" />
                <line x1="45" y1="69" x2="55" y2="79" stroke="currentColor" strokeWidth="1.5" />
                <line x1="45" y1="79" x2="55" y2="69" stroke="currentColor" strokeWidth="1.5" />
                <rect x="22" y="85" width="56" height="6" rx="1" fill="currentColor" />
                <text x="50" y="103" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="serif">सत्यमेव जयते</text>
              </svg>
            </div>

            <div className="border-l border-slate-300 pl-3.5">
              <div className="text-xs uppercase tracking-wide text-slate-600 font-semibold leading-tight">
                {language === 'hi' ? 'विदेश मंत्रालय' : 'Ministry of External Affairs'}
              </div>
              <div className="text-[13px] text-slate-800 font-medium leading-tight">
                {language === 'hi' ? 'भारत सरकार' : 'Government of India'}
              </div>
              <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                Consular, Passport & Visa Division
              </div>
            </div>
          </Link>
        </div>

        {/* Center / Right: Passport Seva Logo & Brand */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#093b74] to-[#05264c] rounded-lg shadow-sm border border-blue-900 flex items-center justify-center text-white font-serif font-black text-xl tracking-tighter">
              <span className="text-amber-400">P</span><span>S</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#093b74] tracking-tight font-serif">
                  Passport Seva
                </span>
                <span className="bg-amber-100 text-[#b45309] text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Smart v2.0
                </span>
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                {language === 'hi' ? 'सेवा में सदैव तत्पर' : 'PSP – Transforming Passport Services'}
              </div>
            </div>
          </Link>

          {/* e-Passport / ISO badge */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-200">
            <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#093b74]">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-bold text-slate-800 leading-tight flex items-center gap-1">
                <span>e-Passport Enabled</span>
                <Award className="w-3 h-3 text-amber-500" />
              </div>
              <div className="text-[10px] text-slate-500">
                ICAO 9303 Biometric Standard
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
