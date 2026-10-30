import React, { useState } from 'react';
import {
  Search, CheckCircle2, Clock, AlertTriangle, ArrowRight, Truck, FileText,
  Shield, Printer, MapPin, Bell, Calendar, Sparkles, ExternalLink, RefreshCw
} from 'lucide-react';
import { getTrackingRecords } from '../../data/trackingData';
import { useApplication } from '../../context/ApplicationContext';
import { ApplicationTrackingRecord } from '../../types';

export const ApplicationTracker: React.FC = () => {
  const { currentARN } = useApplication();
  const [searchArn, setSearchArn] = useState<string>('DEMO1001');
  const [activeRecord, setActiveRecord] = useState<ApplicationTrackingRecord | null>(() => {
    const records = getTrackingRecords();
    return records['DEMO1001'] || null;
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = (arnToLookup?: string) => {
    const target = (arnToLookup || searchArn).trim().toUpperCase();
    setErrorMessage(null);

    const records = getTrackingRecords();
    if (records[target]) {
      setActiveRecord(records[target]);
      setSearchArn(target);
    } else {
      setErrorMessage(`No application record found for ARN "${target}". Try DEMO1001, DEMO1002, DEMO1003, or DEMO1004.`);
      setActiveRecord(null);
    }
  };

  const getStageIcon = (stageId: number, status: string) => {
    switch (stageId) {
      case 1: return FileText;
      case 2: return CheckCircle2;
      case 3: return Calendar;
      case 4: return Shield;
      case 5: return MapPin;
      case 6: return Printer;
      case 7: return Truck;
      case 8: return CheckCircle2;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-gradient-to-r from-[#b34700] via-[#c95304] to-[#e46a1b] text-white p-5 rounded-xl shadow-sm border border-orange-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-amber-300 text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3" />
                Module 4 (P0) – Enhanced Application Tracker
              </span>
              <span className="text-xs text-orange-100">Visual Stage Timeline & Transparent Action Items</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black font-serif tracking-tight">
              Track Passport Application Status (Live Timeline)
            </h2>
            <p className="text-xs text-orange-100 mt-1 max-w-2xl leading-relaxed">
              Understand exactly where your application is in the 8-stage issuance lifecycle, what happens next, and whether any action is required from your side.
            </p>
          </div>
        </div>
      </div>

      {/* Lookup Bar (FR-15) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
          Enter Application Reference Number (ARN) or File Number
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-2 max-w-2xl">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchArn}
              onChange={(e) => setSearchArn(e.target.value.toUpperCase())}
              placeholder="e.g. DEMO1001, DEMO1002, DEMO1003, DEMO1004"
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg font-mono font-bold uppercase focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => handleSearch()}
            className="w-full sm:w-auto bg-[#b34700] hover:bg-[#8f3900] text-white px-5 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <span>Track Status</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick select buttons for judges */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500 text-[11px]">Demo Profiles for Evaluators:</span>

          <button
            type="button"
            onClick={() => handleSearch('DEMO1001')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition ${
              searchArn === 'DEMO1001' ? 'bg-orange-600 text-white border-orange-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            DEMO1001 (Appointment Scheduled)
          </button>

          <button
            type="button"
            onClick={() => handleSearch('DEMO1002')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition ${
              searchArn === 'DEMO1002' ? 'bg-orange-600 text-white border-orange-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            DEMO1002 (Police Verification)
          </button>

          <button
            type="button"
            onClick={() => handleSearch('DEMO1003')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition ${
              searchArn === 'DEMO1003' ? 'bg-orange-600 text-white border-orange-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            DEMO1003 (Dispatched via Speed Post)
          </button>

          <button
            type="button"
            onClick={() => handleSearch('DEMO1004')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition ${
              searchArn === 'DEMO1004' ? 'bg-red-700 text-white border-red-700' : 'bg-red-50 hover:bg-red-100 text-red-800 border-red-300'
            }`}
          >
            DEMO1004 (Action Required: Address Issue)
          </button>

          {currentARN && (
            <button
              type="button"
              onClick={() => handleSearch(currentARN)}
              className="px-2.5 py-1 rounded text-[11px] font-semibold bg-blue-50 text-blue-900 border border-blue-300 hover:bg-blue-100"
            >
              Active Draft ({currentARN})
            </button>
          )}
        </div>

        {errorMessage && (
          <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Active Record Display */}
      {activeRecord && (
        <div className="space-y-6">
          {/* Current Status Highlights (FR-17) */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-200 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-500 font-mono">ARN: {activeRecord.arn}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 font-mono">File No: {activeRecord.fileNumber}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {activeRecord.applicantName}
                </h3>
                <div className="text-xs text-slate-600 mt-0.5">
                  {activeRecord.applicationType} • Applied on {activeRecord.appliedDate}
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  activeRecord.statusCode === 'ACTION_REQUIRED'
                    ? 'bg-red-100 text-red-800 border border-red-300 animate-pulse'
                    : activeRecord.statusCode === 'DISPATCHED'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : activeRecord.statusCode === 'APPOINTMENT_SCHEDULED'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span>{activeRecord.currentStatus}</span>
                </span>
                <div className="text-[11px] text-slate-400 mt-1">
                  Last Updated: {activeRecord.lastUpdated}
                </div>
              </div>
            </div>

            {/* Current status description */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 mb-4 text-xs text-slate-800 leading-relaxed">
              <strong>Official Status Description:</strong> {activeRecord.currentStatusDesc}
            </div>

            {/* Next expected action & applicant action required */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3.5">
                <div className="font-bold text-blue-950 flex items-center gap-1.5 mb-1">
                  <Clock className="w-4 h-4 text-blue-700" />
                  <span>Next Expected Processing Step:</span>
                </div>
                <p className="text-blue-900 text-[11px] leading-relaxed">
                  {activeRecord.nextExpectedAction}
                </p>
              </div>

              <div className={`p-3.5 rounded-lg border ${
                activeRecord.applicantActionRequired
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}>
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <AlertTriangle className={`w-4 h-4 ${activeRecord.applicantActionRequired ? 'text-amber-700' : 'text-emerald-700'}`} />
                  <span>Applicant Action Required:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {activeRecord.applicantActionRequired || 'None at this stage. Keep tracking updates.'}
                </p>
              </div>
            </div>

            {/* Speed post tracking if dispatched */}
            {activeRecord.trackingNumber && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-300 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-900">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>
                    <strong>India Post Speed Post Tracking:</strong> {activeRecord.trackingNumber}
                  </span>
                </div>
                <a
                  href="https://www.indiapost.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-800 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Track on India Post</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* Visual 8-Stage Timeline (FR-16) */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6">
            <h3 className="font-bold text-sm text-slate-900 font-serif mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-700" />
              <span>Visual Application Processing Lifecycle (FR-16)</span>
            </h3>

            <div className="relative pl-6 md:pl-8 border-l-2 border-slate-200 space-y-6 my-2">
              {activeRecord.timelineStages.map((stage) => {
                const Icon = getStageIcon(stage.stageId, stage.status);
                const isCompleted = stage.status === 'completed';
                const isCurrent = stage.status === 'current';
                const isActionNeeded = stage.status === 'action_needed';

                return (
                  <div key={stage.stageId} className="relative group">
                    {/* Circle icon on the timeline line */}
                    <div className={`absolute -left-[35px] md:-left-[43px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition ${
                      isCompleted
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-amber-500 border-amber-400 text-white animate-bounce shadow-md'
                        : isActionNeeded
                        ? 'bg-red-600 border-red-500 text-white animate-pulse'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Stage details */}
                    <div className={`p-3.5 rounded-lg border text-xs transition ${
                      isCurrent
                        ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                        : isActionNeeded
                        ? 'bg-red-50 border-red-300'
                        : isCompleted
                        ? 'bg-slate-50/60 border-slate-200'
                        : 'bg-white border-slate-200 opacity-60'
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs">
                            Stage {stage.stageId}: {stage.title}
                          </span>
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                            isCompleted ? 'bg-emerald-100 text-emerald-800' : isCurrent ? 'bg-amber-200 text-amber-900' : isActionNeeded ? 'bg-red-200 text-red-900' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {stage.status.replace('_', ' ')}
                          </span>
                        </div>
                        {stage.timestamp && (
                          <span className="text-[10px] text-slate-500 font-mono">
                            {stage.timestamp}
                          </span>
                        )}
                      </div>

                      <p className="text-slate-600 text-[11px]">
                        {stage.description}
                      </p>

                      {stage.remarks && (
                        <div className="mt-1.5 text-[10px] text-red-700 bg-red-100/60 p-1.5 rounded border border-red-200 font-medium">
                          <strong>Official Remark:</strong> {stage.remarks}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chronological Status History & Notification Feed (FR-18, FR-19) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status History */}
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
              <h4 className="font-bold text-xs uppercase tracking-wide text-slate-800 font-serif mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-700" />
                <span>Status Audit Log (FR-18)</span>
              </h4>

              <div className="space-y-3">
                {activeRecord.statusHistory.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-xs">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mb-1">
                      <span>{item.date}</span>
                      <span>{item.location}</span>
                    </div>
                    <div className="font-bold text-slate-900 text-xs">{item.status}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{item.remarks}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Dispatch Feed */}
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
              <h4 className="font-bold text-xs uppercase tracking-wide text-slate-800 font-serif mb-3 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-amber-600" />
                <span>Automated Citizen SMS & Email Alerts (FR-19)</span>
              </h4>

              <div className="space-y-3">
                {activeRecord.notifications.map((notif) => (
                  <div key={notif.id} className="p-3 rounded-lg border border-blue-200 bg-blue-50/50 text-xs">
                    <div className="flex justify-between items-center text-[10px] text-blue-700 font-semibold mb-1">
                      <span>Channel: {notif.channel} Gateway</span>
                      <span className="font-mono">{notif.timestamp}</span>
                    </div>
                    <p className="text-slate-800 text-[11px] font-mono leading-relaxed bg-white p-2 rounded border border-blue-100">
                      {notif.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
