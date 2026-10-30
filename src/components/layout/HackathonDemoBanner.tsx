import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronDown, ChevronUp, Play, CheckCircle2, RotateCcw, FileText, Upload, Compass, Search, Calendar, ShieldAlert, CreditCard } from 'lucide-react';
import { useApplication } from '../../context/ApplicationContext';

export const HackathonDemoBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { populateDemoData, resetFormData, clearAllUploadedDocuments, clearDraft } = useApplication();

  const handleReset = () => {
    if (window.confirm('Reset draft form data and uploads to default state?')) {
      clearDraft();
      clearAllUploadedDocuments();
      alert('Draft reset successfully!');
    }
  };

  const handleFillDemo = () => {
    populateDemoData();
    alert('Demo applicant data (Aarav Sharma) loaded into form draft!');
    navigate('/apply');
  };

  return (
    <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-md border-b-2 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 p-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
          </span>
          <span className="text-xs font-bold tracking-wide">
            HACKATHON EVALUATOR PANEL: <span className="text-yellow-100 font-normal">Passport Seva – Smart Application Experience</span>
          </span>
          <span className="hidden sm:inline bg-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded text-amber-200 border border-amber-500">
            GovTech Prototype
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFillDemo}
            className="text-[11px] bg-white text-orange-900 font-bold px-2 py-0.5 rounded shadow hover:bg-amber-100 transition flex items-center gap-1"
            title="Auto-fill sample form data to save time during review"
          >
            <Play className="w-3 h-3 text-orange-700 fill-orange-700" />
            <span>Pre-fill Demo Applicant</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs bg-amber-800/80 hover:bg-amber-900 px-2 py-0.5 rounded flex items-center gap-1 text-white border border-amber-500"
          >
            <span>{isOpen ? 'Hide Quick Tour' : 'Show Quick Tour'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Quick Guide for Judges */}
      {isOpen && (
        <div className="bg-orange-900/90 text-white text-xs border-t border-amber-500/40 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="font-semibold text-yellow-300 flex items-center gap-1.5 text-xs">
                <span>Core Strategy: 40% Faithful Gov.in Clone + 60% High-Impact UX Improvements</span>
              </div>
              <p className="text-[11px] text-amber-100 leading-tight">
                Addressing MEA Lok Sabha recorded grievances: Document upload errors (492), Lost draft forms (404), and Appointment bottlenecks (5,304).
              </p>
            </div>

            {/* Quick Demo Jump Buttons - Step 3 is Smart Advisor */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => navigate('/apply')}
                className="bg-amber-800/90 hover:bg-amber-700 px-2.5 py-1 rounded border border-amber-400 text-[11px] font-medium flex items-center gap-1 transition"
              >
                <FileText className="w-3 h-3 text-yellow-300" />
                <span>1. Form Auto-Save (P1)</span>
              </button>

              <button
                onClick={() => navigate('/upload')}
                className="bg-amber-800/90 hover:bg-amber-700 px-2.5 py-1 rounded border border-amber-400 text-[11px] font-medium flex items-center gap-1 transition"
              >
                <Upload className="w-3 h-3 text-yellow-300" />
                <span>2. Upload Validation (P0)</span>
              </button>

              <button
                onClick={() => navigate('/advisor')}
                className="bg-amber-800/90 hover:bg-amber-700 px-2.5 py-1 rounded border border-amber-400 text-[11px] font-medium flex items-center gap-1 transition shadow-xs"
              >
                <Compass className="w-3 h-3 text-yellow-300" />
                <span>3. Smart Advisor (P0)</span>
              </button>

              <button
                onClick={() => navigate('/payment')}
                className="bg-amber-800/90 hover:bg-amber-700 px-2.5 py-1 rounded border border-amber-400 text-[11px] font-medium flex items-center gap-1 transition"
              >
                <CreditCard className="w-3.5 h-3.5 text-yellow-300" />
                <span>4. Fee Payment Simulation (P1)</span>
              </button>

              <button
                onClick={() => navigate('/track')}
                className="bg-amber-800/90 hover:bg-amber-700 px-2.5 py-1 rounded border border-amber-400 text-[11px] font-medium flex items-center gap-1 transition"
              >
                <Search className="w-3 h-3 text-yellow-300" />
                <span>5. Visual Tracker (P0)</span>
              </button>

              <button
                onClick={() => navigate('/reissue-check')}
                className="bg-purple-900/90 hover:bg-purple-800 px-2.5 py-1 rounded border border-purple-400 text-[11px] font-medium flex items-center gap-1 transition"
              >
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>Reissue AI Check (Gemini)</span>
              </button>

              <button
                onClick={handleReset}
                className="bg-red-950/70 hover:bg-red-900 px-2 py-1 rounded text-red-200 border border-red-500 text-[11px] flex items-center gap-1"
                title="Reset mock data to test again from scratch"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
