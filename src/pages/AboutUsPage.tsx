import React from 'react';
import { Award, ShieldCheck, Users, Globe, FileText, CheckCircle2 } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#093b74] to-[#05264c] text-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-1.5">
          <Award className="w-5 h-5 text-amber-300" />
          <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Ministry of External Affairs</span>
        </div>
        <h2 className="text-2xl font-black font-serif">Passport Seva Project (PSP)</h2>
        <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed">
          Delivering timely, transparent, accessible, reliable and citizen-friendly passport and related services to Indian nationals at home and abroad.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-6 text-xs text-slate-700 leading-relaxed">
        <div>
          <h3 className="font-bold text-sm text-slate-900 font-serif mb-2">Vision & Mission</h3>
          <p className="mb-2">
            The Passport Seva Project was executed by the Ministry of External Affairs under the National e-Governance Plan (NeGP) in Public-Private-Partnership (PPP) mode with Tata Consultancy Services (TCS). It has transformed the issuance of passports into an efficient, transparent, and technology-driven experience.
          </p>
          <p>
            With over 500 Passport Seva Kendras (PSK) and Post Office Passport Seva Kendras (POPSK) across all parliamentary constituencies in India, citizens no longer have to travel long distances to apply for international travel documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <ShieldCheck className="w-6 h-6 text-blue-700 mb-2" />
            <h4 className="font-bold text-slate-900 mb-1">e-Passports Standard</h4>
            <p className="text-[11px] text-slate-600">
              India's state-of-the-art electronic biometric passports embed an encrypted RFID chip with digital signatures compliant with ICAO 9303.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <Users className="w-6 h-6 text-emerald-700 mb-2" />
            <h4 className="font-bold text-slate-900 mb-1">Citizen Centric</h4>
            <p className="text-[11px] text-slate-600">
              Dedicated counters for senior citizens, infants, visually impaired applicants, and emergency medical departures.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
            <Globe className="w-6 h-6 text-amber-700 mb-2" />
            <h4 className="font-bold text-slate-900 mb-1">Global Integration</h4>
            <p className="text-[11px] text-slate-600">
              Integrated with Indian Missions and Posts abroad (VFS/Embassy networks) for seamless overseas renewal and verification.
            </p>
          </div>
        </div>

        {/* Hackathon Innovation Context */}
        <div className="p-4 rounded-xl bg-orange-50 border-2 border-orange-200 space-y-2">
          <div className="flex items-center gap-2 text-orange-900 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-orange-700" />
            <span>Open Innovation Hackathon: UX & Reliability Prototype</span>
          </div>
          <p className="text-[11px] text-orange-950 leading-relaxed">
            This functional prototype represents an improved iteration of the existing Passport Seva website. Rather than replacing the official portal with a disconnected SaaS platform, we preserve 100% of the authentic government branding, layout hierarchy, and service taxonomy, while surgically embedding five high-impact enhancements:
          </p>
          <ul className="text-[11px] text-orange-900 space-y-1 pl-4 list-disc">
            <li><strong>P0: Smart Document Advisor</strong> – Dynamic rule evaluation replacing confusing static tables.</li>
            <li><strong>P0: Smart Document Upload & Validation</strong> – Immediate file format/size checks and simulated AI classification.</li>
            <li><strong>P1: Resilient Multi-Step Form with Auto-Save</strong> – Eliminates lost drafts and form upload rejections.</li>
            <li><strong>P0: Visual Application Tracking Timeline</strong> – Clear 8-stage progress tracker with concrete next action items.</li>
            <li><strong>P1: Fee Payment & Gateway Simulation</strong> – Real-time payment reconciliation, failure recovery, and official receipt generation.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
