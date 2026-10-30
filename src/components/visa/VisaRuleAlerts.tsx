import React, { useState } from 'react';
import { AlertTriangle, Bell, ShieldAlert, Sparkles, Filter, ExternalLink, Calendar, Info, CheckCircle2, Search, Globe, ChevronRight } from 'lucide-react';
import { VISA_RULE_ALERTS, VisaRuleAlert } from '../../data/visaData';

export const VisaRuleAlerts: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'student' | 'tourist' | 'business'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<VisaRuleAlert | null>(VISA_RULE_ALERTS[0]);

  const filteredAlerts = VISA_RULE_ALERTS.filter((alert) => {
    const matchesFilter = selectedFilter === 'all' || alert.category === selectedFilter;
    const matchesSearch =
      searchQuery === '' ||
      alert.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* Official Government Header Banner */}
      <div className="bg-gradient-to-r from-[#003366] via-[#004080] to-[#005599] text-white p-5 rounded-lg shadow-sm border border-blue-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1 shadow-xs">
                <Bell className="w-3 h-3" />
                Consular Advisory & Early Warning System
              </span>
              <span className="text-xs text-blue-200">MEA Grievance Prevention</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black font-serif tracking-tight">
              International Visa Rule & Statutory Requirement Change Alerts
            </h2>
            <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed">
              Consular intelligence feed monitoring international immigration rule updates, financial threshold revisions, and biometric requirements to prevent document rejection at foreign embassies and VFS centers.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-lg p-3 text-center min-w-[170px] shrink-0">
            <div className="text-[10px] uppercase tracking-wider text-amber-200 font-bold mb-0.5">
              Active Alerts
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {VISA_RULE_ALERTS.length} Notices
            </div>
            <div className="text-[10px] text-blue-200 mt-0.5">
              Updated for 2025–2026 Travel
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar & Search Bar */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-700 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-blue-700" />
            Category:
          </span>
          {(['all', 'student', 'tourist', 'business'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`text-xs px-3 py-1.5 rounded font-semibold transition uppercase tracking-wider ${
                selectedFilter === cat
                  ? 'bg-[#003366] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat === 'all' ? 'All Alerts' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country or rule..."
            className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-600 focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Main Alert Layout: List on Left, Detailed Notice on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Alerts List (Left Column) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-center text-slate-500 text-xs border border-slate-200">
              No visa alerts match your filter criteria.
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const isSelected = selectedAlert?.id === alert.id;
              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#003366] bg-blue-50/60 ring-2 ring-blue-600/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{alert.flag}</span>
                      <span className="font-bold text-xs text-slate-900">{alert.country}</span>
                    </div>

                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${
                        alert.severity === 'urgent'
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : alert.severity === 'warning'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}
                    >
                      {alert.severity === 'urgent'
                        ? 'CRITICAL UPDATE'
                        : alert.severity === 'warning'
                        ? 'EMBASSY ADVISORY'
                        : 'NOTICE'}
                    </span>
                  </div>

                  <h3 className="font-bold text-xs text-[#003366] mb-1 leading-snug line-clamp-2">
                    {alert.title}
                  </h3>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed mb-2">
                    {alert.summary}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-2 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {alert.effectiveDate}
                    </span>
                    <span className="text-blue-700 font-sans font-bold flex items-center gap-0.5">
                      View Notice <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detailed Alert Preview (Right Column) */}
        <div className="lg:col-span-7">
          {selectedAlert ? (
            <div className="bg-white rounded-lg shadow-xs border border-slate-200 p-5 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-200 pb-3 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{selectedAlert.flag}</span>
                    <span className="font-bold text-sm text-slate-900">{selectedAlert.country}</span>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {selectedAlert.category} Route
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#003366] font-serif leading-snug">
                    {selectedAlert.title}
                  </h3>
                </div>

                <span
                  className={`shrink-0 text-[10px] font-black uppercase px-2.5 py-1 rounded tracking-wider ${
                    selectedAlert.severity === 'urgent'
                      ? 'bg-red-600 text-white'
                      : selectedAlert.severity === 'warning'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {selectedAlert.severity === 'urgent' ? 'Mandatory Rule' : 'Advisory'}
                </span>
              </div>

              {/* Effective Timeline */}
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 flex items-center gap-2 text-xs text-slate-700">
                <Calendar className="w-4 h-4 text-blue-700 shrink-0" />
                <span>
                  <strong>Effective Implementation:</strong> {selectedAlert.effectiveDate}
                </span>
              </div>

              {/* Detailed Summary */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wide text-slate-800 mb-1.5 font-serif">
                  Official Foreign Mission Notice
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-200/60 font-sans">
                  {selectedAlert.detailedNotice}
                </p>
              </div>

              {/* Concrete Impact on Indian Passport Holders */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wide text-slate-800 mb-2 font-serif flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                  <span>Mandatory Action Items for Indian Passport Holders</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedAlert.impactOnIndianApplicants.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded border border-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Official Source Citation */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    <strong>Official Authority:</strong> {selectedAlert.officialSource}
                  </span>
                </div>

                <a
                  href={selectedAlert.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline font-bold flex items-center gap-1"
                >
                  <span>Verify at Official Embassy Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center text-slate-400 text-xs border border-slate-200">
              Select an alert from the left column to view official details and compliance instructions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
