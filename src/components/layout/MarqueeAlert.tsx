import React from 'react';
import { AlertTriangle, Bell, Sparkles } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const MarqueeAlert: React.FC = () => {
  const { language } = useAccessibility();

  return (
    <div className="bg-[#fff3cd] border-y border-amber-300 text-amber-950 text-xs py-1.5 px-4 flex items-center overflow-hidden shadow-inner">
      <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-red-700 bg-red-100 px-2 py-0.5 rounded border border-red-300 shrink-0 mr-3 shadow-xs">
        <Bell className="w-3.5 h-3.5 animate-pulse" />
        <span>{language === 'hi' ? 'महत्वपूर्ण सूचना' : 'IMPORTANT ADVISORY'}</span>
      </div>

      <div className="overflow-hidden whitespace-nowrap w-full relative">
        <div className="animate-marquee inline-block text-slate-800 font-medium">
          <span className="font-semibold text-red-800">
            {language === 'hi'
              ? 'सावधानी: पासपोर्ट सेवाओं के लिए केवल आधिकारिक पोर्टल passportindia.gov.in का उपयोग करें। किसी भी फर्जी वेबसाइट या अनधिकृत एजेंटों के झांसे में न आएं।'
              : 'Caution: Use only the official portal passportindia.gov.in for passport appointments and applications. No extra fee is charged for user registration.'}
          </span>
          <span className="mx-6 text-slate-400 font-bold">•</span>
          <span className="text-[#093b74] font-semibold inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 inline" />
            <span>
              Smart Upgrade Active: Try the new <strong>Personalized Document Advisor</strong> and <strong>Smart Document Upload Validation</strong> to prevent application rejections.
            </span>
          </span>
          <span className="mx-6 text-slate-400 font-bold">•</span>
          <span className="text-emerald-800 font-semibold">
            Grievance Resolution Initiative: Resilient offline draft autosave enabled to eliminate form loss issues.
          </span>
        </div>
      </div>
    </div>
  );
};
