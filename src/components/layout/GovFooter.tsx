import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ExternalLink, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const GovFooter: React.FC = () => {
  const { language } = useAccessibility();

  return (
    <footer className="bg-[#05264c] text-slate-300 text-xs border-t-4 border-[#e46a1b] mt-12">
      {/* Top quick links */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-blue-900/60">
        <div>
          <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-1.5 font-serif">
            <span className="w-2 h-2 bg-amber-400 rounded-full inline-block"></span>
            Passport Seva Project
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed mb-3">
            The Consular, Passport and Visa (CPV) Division of the Ministry of External Affairs delivers world-class, transparent and citizen-friendly passport services across India and missions abroad.
          </p>
          <div className="text-[11px] text-amber-300 bg-blue-950/80 p-2 rounded border border-blue-800">
            <strong>National Call Centre:</strong> 1800-258-1800 (Toll Free)
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-1.5 font-serif">
            <span className="w-2 h-2 bg-amber-400 rounded-full inline-block"></span>
            Smart Improvements
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <Link to="/advisor" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                <span>• Smart Document Advisor (P0)</span>
              </Link>
            </li>
            <li>
              <Link to="/upload" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                <span>• Upload & File Validation (P0)</span>
              </Link>
            </li>
            <li>
              <Link to="/apply" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                <span>• Resilient Form with Auto-Save (P1)</span>
              </Link>
            </li>
            <li>
              <Link to="/track" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                <span>• Visual Tracking Timeline (P0)</span>
              </Link>
            </li>
            <li>
              <Link to="/payment" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                <span>• Fee Payment & Gateway Simulation (P1)</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-1.5 font-serif">
            <span className="w-2 h-2 bg-amber-400 rounded-full inline-block"></span>
            Citizen Services
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li><Link to="/fee-calculator" className="hover:text-amber-300">Fee Calculator & Matrix</Link></li>
            <li><Link to="/locate-centre" className="hover:text-amber-300">Locate Passport Seva Kendra (PSK/POPSK)</Link></li>
            <li><Link to="/faq" className="hover:text-amber-300">Frequently Asked Questions (FAQ)</Link></li>
            <li><a href="#rules" onClick={(e) => { e.preventDefault(); alert('The Passports Act 1967 regulates issuance of passports and travel documents to Indian citizens.'); }} className="hover:text-amber-300">Passports Act, 1967 & Rules 1980</a></li>
            <li><a href="#annexures" onClick={(e) => { e.preventDefault(); alert('Standard Annexures (A to M) available in the Document Advisor section.'); }} className="hover:text-amber-300">Download Official Annexures</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-1.5 font-serif">
            <span className="w-2 h-2 bg-amber-400 rounded-full inline-block"></span>
            National Portals
          </h4>
          <div className="space-y-2">
            <a
              href="https://www.india.gov.in"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2 rounded bg-blue-950 hover:bg-blue-900 border border-blue-800 transition-colors"
            >
              <div>
                <div className="font-semibold text-white text-[11px]">National Portal of India</div>
                <div className="text-[10px] text-slate-400">india.gov.in</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <div className="p-2.5 rounded bg-blue-950/60 border border-blue-800 text-[11px] text-slate-300">
              <div className="text-emerald-400 font-bold flex items-center gap-1 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Hackathon Prototype</span>
              </div>
              <span>
                Demonstrating enhanced user experience without altering original Passport Seva workflows.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom legal notice */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span>Website Content Managed by Ministry of External Affairs, Government of India</span>
          <span>•</span>
          <span>Designed & Hosted with NIC Standards</span>
        </div>

        <div className="flex items-center gap-4 text-slate-300">
          <Link to="/faq" className="hover:underline">Privacy Policy</Link>
          <span>|</span>
          <Link to="/faq" className="hover:underline">Terms & Conditions</Link>
          <span>|</span>
          <Link to="/faq" className="hover:underline">Accessibility Statement</Link>
        </div>
      </div>
    </footer>
  );
};
