import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Calculator, MapPin, Download, FileText, ShieldAlert, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const RightToolsWidget: React.FC = () => {
  const { language } = useAccessibility();

  return (
    <div className="space-y-3.5">
      {/* 1. Enhanced Document Advisor Box */}
      <div className="bg-gradient-to-br from-[#093b74] to-[#05264c] text-white rounded-lg p-4 shadow-sm border-2 border-amber-400 relative overflow-hidden">
        <div className="absolute top-2 right-2">
          <span className="bg-amber-400 text-slate-950 font-black text-[9px] uppercase px-1.5 py-0.5 rounded shadow">
            Enhanced P0
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-5 h-5 text-amber-300" />
          <h4 className="font-bold text-sm text-white font-serif">
            Smart Document Advisor
          </h4>
        </div>

        <p className="text-[11px] text-slate-200 mb-3 leading-snug">
          Confused about which documents to carry? Get a customized checklist tailored to your age, reissue type, and circumstances.
        </p>

        <div className="bg-white/10 rounded p-2 text-[10px] text-amber-200 mb-3 flex items-center gap-1.5 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-300" />
          <span>Dynamic classification: Mandatory, Conditional & Non-ECR rules.</span>
        </div>

        <Link
          to="/advisor"
          className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs py-2 px-3 rounded flex items-center justify-center gap-1.5 transition shadow"
        >
          <span>Launch Document Advisor</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 2. Fee Calculator Link Tile */}
      <div className="bg-white rounded-lg p-3.5 shadow-xs border border-slate-200 hover:border-blue-400 transition">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2 text-[#093b74]">
            <Calculator className="w-4 h-4 text-blue-700" />
            <h4 className="font-bold text-xs text-slate-900">
              Fee Calculator
            </h4>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">Updated 2026</span>
        </div>
        <p className="text-[11px] text-slate-600 mb-2.5">
          Compute fee for Normal, Tatkaal, 36/60 pages, and senior concessions.
        </p>
        <Link
          to="/fee-calculator"
          className="text-xs text-[#093b74] font-bold hover:underline flex items-center gap-1"
        >
          <span>Calculate Applicable Fee</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3. Locate PSK / POPSK */}
      <div className="bg-white rounded-lg p-3.5 shadow-xs border border-slate-200 hover:border-emerald-400 transition">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2 text-emerald-800">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <h4 className="font-bold text-xs text-slate-900">
              Locate Passport Kendra
            </h4>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">500+ Centres</span>
        </div>
        <p className="text-[11px] text-slate-600 mb-2.5">
          Find your nearest Passport Seva Kendra (PSK) or Post Office PSK (POPSK).
        </p>
        <Link
          to="/locate-centre"
          className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-1"
        >
          <span>Search Kendra by PIN / State</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4. Official Annexures Download List */}
      <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 text-xs">
        <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold">
          <Download className="w-4 h-4 text-slate-600" />
          <span>Official Prescribed Formats</span>
        </div>
        <ul className="space-y-1 text-[11px] text-slate-600">
          <li className="flex items-center justify-between hover:text-blue-700 cursor-pointer" onClick={() => alert('Annexure D: Affidavit by parents for minor child passport downloaded (Demo).')}>
            <span>• Annexure "D" (Minor Consent)</span>
            <span className="text-[10px] text-slate-400">PDF</span>
          </li>
          <li className="flex items-center justify-between hover:text-blue-700 cursor-pointer" onClick={() => alert('Annexure E: Standard self-declaration for Tatkaal downloaded (Demo).')}>
            <span>• Annexure "E" (Tatkaal Affidavit)</span>
            <span className="text-[10px] text-slate-400">PDF</span>
          </li>
          <li className="flex items-center justify-between hover:text-blue-700 cursor-pointer" onClick={() => alert('Annexure F: Affidavit for lost or damaged passport downloaded (Demo).')}>
            <span>• Annexure "F" (Lost Passport)</span>
            <span className="text-[10px] text-slate-400">PDF</span>
          </li>
          <li className="flex items-center justify-between hover:text-blue-700 cursor-pointer" onClick={() => alert('Annexure H: Prior intimation letter for Government servants downloaded (Demo).')}>
            <span>• Annexure "H" (Govt / PSU NOC)</span>
            <span className="text-[10px] text-slate-400">PDF</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
