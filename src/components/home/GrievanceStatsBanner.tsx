import React from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, FileX, Clock, Database, Layers } from 'lucide-react';

export const GrievanceStatsBanner: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 mt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded border border-red-300">
              Lok Sabha Data • MEA Official Grievances (2023–2025)
            </span>
            <span className="text-xs font-semibold text-slate-500">Problem Statement Analysis</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1 font-serif">
            How Our Smart Enhancements Directly Address Recorded Citizen Grievances
          </h3>
        </div>
        <div className="text-xs text-slate-500">
          Source: MEA Lok Sabha Reply, 12 Dec 2025
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Card 1: 5,304 Appointment delays */}
        <div className="p-3 rounded-lg bg-orange-50/60 border border-orange-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-orange-900">Appointment Delays</span>
            <Clock className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-black text-orange-700 font-mono">
            5,304
          </div>
          <div className="text-[11px] text-slate-600 mt-1">
            <strong>Smart Fix:</strong> Live slot matrix with 1-click slot rescheduling & immediate confirmation.
          </div>
        </div>

        {/* Card 2: 1,390 Website not working */}
        <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-blue-900">Website Outages</span>
            <Database className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-700 font-mono">
            1,390
          </div>
          <div className="text-[11px] text-slate-600 mt-1">
            <strong>Smart Fix:</strong> Client-resilient offline SPA architecture with zero-crash fallback.
          </div>
        </div>

        {/* Card 3: 655 Form upload problems */}
        <div className="p-3 rounded-lg bg-purple-50/60 border border-purple-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-purple-900">Form Upload Fails</span>
            <FileX className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-700 font-mono">
            655
          </div>
          <div className="text-[11px] text-slate-600 mt-1">
            <strong>Smart Fix:</strong> Real-time field validation with contextual tooltips & instant error flags.
          </div>
        </div>

        {/* Card 4: 492 Problems attaching documents */}
        <div className="p-3 rounded-lg bg-red-50/60 border border-red-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-red-900">Attachment Errors</span>
            <Layers className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-red-700 font-mono">
            492
          </div>
          <div className="text-[11px] text-slate-600 mt-1">
            <strong>Smart Fix:</strong> Instant file size/format check, OCR preview & automated compressor tip.
          </div>
        </div>

        {/* Card 5: 404 Saved file retrieval issues */}
        <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-emerald-900">Lost Draft Files</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">
            404
          </div>
          <div className="text-[11px] text-slate-600 mt-1">
            <strong>Smart Fix:</strong> Real-time browser auto-save preserving application drafts on refresh.
          </div>
        </div>
      </div>
    </div>
  );
};
