import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, CheckCircle2, AlertCircle, HelpCircle, FileText, ArrowRight, ShieldCheck, Sparkles, Filter, Info, Eye, Bot, Send } from 'lucide-react';
import { useApplication } from '../../context/ApplicationContext';
import { evaluateRequiredDocuments, DocumentRule } from '../../data/documentRules';
import { askGeminiDocumentAdvisor } from '../../services/geminiService';

export const SmartDocumentAdvisor: React.FC = () => {
  const navigate = useNavigate();
  const { advisorFilters, updateAdvisorFilters, uploadedDocuments } = useApplication();

  // Document status tracking: key = docId, value = 'not_available' | 'available' | 'uploaded'
  const [docStatuses, setDocStatuses] = useState<Record<string, 'not_available' | 'available' | 'uploaded'>>({});
  const [expandedDocId, setExpandedDocId] = useState<string | null>('proof_of_address');

  // Gemini Assistant state
  const [geminiQuestion, setGeminiQuestion] = useState<string>('');
  const [geminiAnswer, setGeminiAnswer] = useState<string | null>(null);
  const [isAskingGemini, setIsAskingGemini] = useState<boolean>(false);

  // Compute required documents dynamically based on filter state
  const requiredDocuments = evaluateRequiredDocuments(advisorFilters);

  // Calculate readiness score
  const mandatoryDocs = requiredDocuments.filter(d => d.requirementType === 'mandatory');
  const totalMandatory = mandatoryDocs.length;
  const readyMandatory = mandatoryDocs.filter(d => {
    const status = docStatuses[d.id];
    const isUploaded = uploadedDocuments.some(u => u.category === d.name || u.category.toLowerCase().includes(d.category));
    return status === 'available' || status === 'uploaded' || isUploaded;
  }).length;

  const readinessPercentage = totalMandatory > 0 ? Math.round((readyMandatory / totalMandatory) * 100) : 100;

  const toggleDocStatus = (id: string, newStatus: 'not_available' | 'available' | 'uploaded') => {
    setDocStatuses(prev => ({
      ...prev,
      [id]: prev[id] === newStatus ? 'not_available' : newStatus
    }));
  };

  const handleAskGemini = async (presetQ?: string) => {
    const q = presetQ || geminiQuestion;
    if (!q.trim()) return;
    setIsAskingGemini(true);
    setGeminiAnswer(null);
    try {
      const answer = await askGeminiDocumentAdvisor(
        q,
        `Application Type: ${advisorFilters.applicationType}, Applicant: ${advisorFilters.applicantType}, AddressChanged: ${advisorFilters.isAddressChanged}`
      );
      setGeminiAnswer(answer);
    } catch (e) {
      setGeminiAnswer('Under Passport Rules 1980, please ensure all submitted documents are valid, legally registered, and carried in physical original to PSK Counter A.');
    } finally {
      setIsAskingGemini(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Advisor Header & Value Proposition */}
      <div className="bg-gradient-to-r from-[#093b74] via-[#0b488f] to-[#1259ad] text-white p-5 rounded-xl shadow-sm border border-blue-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-amber-400 text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3" />
                Step 3: Smart Document Advisor (P0)
              </span>
              <span className="text-xs text-blue-200">Rule-based Personalized Eligibility</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black font-serif tracking-tight">
              Personalized Document Requirement Checker
            </h2>
            <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed">
              Eliminate confusion before visiting the Passport Seva Kendra (PSK). Select your application scenario below to receive an exact, legally-compliant checklist with accepted alternatives.
            </p>
          </div>

          {/* Readiness gauge */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl p-3.5 text-center min-w-[190px] shrink-0">
            <div className="text-[11px] uppercase tracking-wider text-blue-200 font-semibold mb-1">
              Document Readiness
            </div>
            <div className="text-3xl font-black text-amber-300 font-mono">
              {readinessPercentage}%
            </div>
            <div className="text-[11px] text-slate-200 mt-0.5">
              {readyMandatory} of {totalMandatory} Mandatory Arranged
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full transition-all duration-500 ${readinessPercentage === 100 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                style={{ width: `${readinessPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Circumstances (FR-01) & Gemini AI Assistant */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5 mb-3.5 text-slate-900 font-bold text-xs uppercase tracking-wide">
              <Filter className="w-4 h-4 text-blue-700" />
              <span>Part 1: Your Application Circumstances</span>
            </div>

            <div className="space-y-4 text-xs">
              {/* 1. Application Type */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Application Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => updateAdvisorFilters({ applicationType: 'fresh' })}
                    className={`py-2 px-3 rounded-md font-bold text-center border transition ${
                      advisorFilters.applicationType === 'fresh'
                        ? 'bg-[#093b74] text-white border-[#093b74] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Fresh Passport
                  </button>
                  <button
                    type="button"
                    onClick={() => updateAdvisorFilters({ applicationType: 'reissue' })}
                    className={`py-2 px-3 rounded-md font-bold text-center border transition ${
                      advisorFilters.applicationType === 'reissue'
                        ? 'bg-[#093b74] text-white border-[#093b74] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Reissue of Passport
                  </button>
                </div>
              </div>

              {/* 2. Applicant Age Category */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Applicant Age Group <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateAdvisorFilters({ applicantType: 'adult' })}
                    className={`py-1.5 px-2 rounded font-medium text-center border transition text-[11px] ${
                      advisorFilters.applicantType === 'adult'
                        ? 'bg-blue-800 text-white border-blue-800 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Adult (18+)
                  </button>
                  <button
                    type="button"
                    onClick={() => updateAdvisorFilters({ applicantType: 'minor' })}
                    className={`py-1.5 px-2 rounded font-medium text-center border transition text-[11px] ${
                      advisorFilters.applicantType === 'minor'
                        ? 'bg-blue-800 text-white border-blue-800 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Minor (&lt;18)
                  </button>
                  <button
                    type="button"
                    onClick={() => updateAdvisorFilters({ applicantType: 'senior' })}
                    className={`py-1.5 px-2 rounded font-medium text-center border transition text-[11px] ${
                      advisorFilters.applicantType === 'senior'
                        ? 'bg-blue-800 text-white border-blue-800 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Senior (60+)
                  </button>
                </div>
              </div>

              {/* Reissue Reason */}
              {advisorFilters.applicationType === 'reissue' && (
                <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  <label className="block font-semibold text-amber-900 mb-1">
                    Primary Reason for Reissue
                  </label>
                  <select
                    value={advisorFilters.reissueReason || 'expired_3yr'}
                    onChange={(e) => updateAdvisorFilters({ reissueReason: e.target.value as any })}
                    className="w-full p-2 border border-amber-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="expired_3yr">Validity Expired / Due to Expire within 3 years</option>
                    <option value="exhausted">Exhaustion of Visa Pages (Jumbo booklet)</option>
                    <option value="lost_stolen">Lost / Stolen Passport (Requires FIR & Annexure F)</option>
                    <option value="damaged">Damaged / Mutilated Passport</option>
                    <option value="details_change">Change in Personal Details (Address/Name)</option>
                  </select>
                </div>
              )}

              {/* Minor Parental Condition */}
              {advisorFilters.applicantType === 'minor' && (
                <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-200">
                  <label className="block font-semibold text-blue-900 mb-1">
                    Minor Parental Consent Status
                  </label>
                  <select
                    value={advisorFilters.minorParentCondition || 'both_parents'}
                    onChange={(e) => updateAdvisorFilters({ minorParentCondition: e.target.value as any })}
                    className="w-full p-2 border border-blue-300 rounded text-xs bg-white"
                  >
                    <option value="both_parents">Both Parents Residing Together (Annexure D)</option>
                    <option value="single_parent">Single Parent / Unwed Mother (Annexure C)</option>
                    <option value="separated_parents">Separated / Custody with One Parent (Annexure C)</option>
                  </select>
                </div>
              )}

              {/* Address Change toggle */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div>
                  <div className="font-semibold text-slate-800">Address Changed?</div>
                  <div className="text-[10px] text-slate-500">Different from previous records</div>
                </div>
                <input
                  type="checkbox"
                  checked={advisorFilters.isAddressChanged}
                  onChange={(e) => updateAdvisorFilters({ isAddressChanged: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              {/* Name Change toggle */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div>
                  <div className="font-semibold text-slate-800">Name / Surname Change?</div>
                  <div className="text-[10px] text-slate-500">Post-marriage or gazette change</div>
                </div>
                <input
                  type="checkbox"
                  checked={advisorFilters.isNameChanged}
                  onChange={(e) => updateAdvisorFilters({ isNameChanged: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              {/* Educational Qualification for Non-ECR */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Educational Qualification (for Non-ECR)
                </label>
                <select
                  value={advisorFilters.educationalQualification}
                  onChange={(e) => updateAdvisorFilters({ educationalQualification: e.target.value as any })}
                  className="w-full p-2 border border-slate-300 rounded text-xs bg-white"
                >
                  <option value="tenth_or_higher">10th Standard (Matriculation) Pass or Higher</option>
                  <option value="below_tenth">Below 10th Standard</option>
                </select>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  10th pass exempts you from Emigration Check.
                </span>
              </div>

              {/* Income Tax Assessee */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div>
                  <div className="font-semibold text-slate-800">Income Tax Payer?</div>
                  <div className="text-[10px] text-slate-500">ITR filed for last assessment year</div>
                </div>
                <input
                  type="checkbox"
                  checked={advisorFilters.isIncomeTaxPayer}
                  onChange={(e) => updateAdvisorFilters({ isIncomeTaxPayer: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              {/* Government / PSU Employee */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <div>
                  <div className="font-semibold text-slate-800">Govt / PSU Employee?</div>
                  <div className="text-[10px] text-slate-500">Requires Prior Intimation (Annexure H)</div>
                </div>
                <input
                  type="checkbox"
                  checked={advisorFilters.isGovtEmployee}
                  onChange={(e) => updateAdvisorFilters({ isGovtEmployee: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
            </div>
          </div>

          {/* Gemini AI Document Assistant Card */}
          <div className="bg-gradient-to-br from-[#1a1c4b] via-[#241c61] to-[#3b186b] text-white rounded-xl shadow-xs p-4 border border-purple-500/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <h4 className="font-bold text-xs tracking-wide uppercase">
                  Gemini AI Document Advisor
                </h4>
              </div>
              <span className="bg-purple-800 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded text-purple-200 border border-purple-600">
                Live Google AI
              </span>
            </div>

            <p className="text-[11px] text-purple-200 mb-3 leading-snug">
              Have an edge-case or document doubt? Ask Gemini AI for official Ministry of External Affairs compliance guidance.
            </p>

            {/* Quick preset questions */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <button
                type="button"
                onClick={() => {
                  setGeminiQuestion('Is an unregistered rent agreement accepted for address proof?');
                  handleAskGemini('Is an unregistered rent agreement accepted for address proof?');
                }}
                className="text-[10px] bg-purple-900/90 hover:bg-purple-800 px-2 py-1 rounded border border-purple-500/60 text-purple-100 transition"
              >
                Unregistered rent agreement?
              </button>
              <button
                type="button"
                onClick={() => {
                  setGeminiQuestion('Are e-Aadhaar cards accepted at PSK?');
                  handleAskGemini('Are e-Aadhaar cards accepted at PSK?');
                }}
                className="text-[10px] bg-purple-900/90 hover:bg-purple-800 px-2 py-1 rounded border border-purple-500/60 text-purple-100 transition"
              >
                Is e-Aadhaar accepted?
              </button>
              <button
                type="button"
                onClick={() => {
                  setGeminiQuestion('Can married women use husband surname without gazette?');
                  handleAskGemini('Can married women use husband surname without gazette?');
                }}
                className="text-[10px] bg-purple-900/90 hover:bg-purple-800 px-2 py-1 rounded border border-purple-500/60 text-purple-100 transition"
              >
                Married women surname?
              </button>
            </div>

            <div className="flex gap-1.5">
              <input
                type="text"
                value={geminiQuestion}
                onChange={(e) => setGeminiQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskGemini()}
                placeholder="Ask about any document or rule..."
                className="flex-1 bg-purple-950/90 text-white placeholder-purple-300 text-xs px-2.5 py-1.5 rounded-lg border border-purple-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <button
                type="button"
                disabled={isAskingGemini}
                onClick={() => handleAskGemini()}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition shrink-0 flex items-center justify-center"
              >
                {isAskingGemini ? (
                  <div className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {geminiAnswer && (
              <div className="mt-3 p-3 bg-purple-950/90 rounded-lg border border-purple-500 text-xs text-purple-100 leading-relaxed animate-in fade-in">
                <div className="text-[10px] font-bold text-amber-300 uppercase mb-1 flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5 text-amber-300" />
                  <span>Gemini MEA Advisor:</span>
                </div>
                <p className="text-[11px]">{geminiAnswer}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Checklist & Document Details (FR-02, FR-03, FR-04) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900 font-serif flex items-center gap-2">
                  <span>Part 2: Dynamic Document Checklist</span>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {requiredDocuments.length} Documents Applicable
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Click on each document to inspect accepted alternatives, official MEA rules, and mark as Arranged.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Mandatory
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Conditional
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Optional
                </span>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-3">
              {requiredDocuments.map((doc, idx) => {
                const isExpanded = expandedDocId === doc.id;
                const status = docStatuses[doc.id] || 'not_available';
                const isDocUploaded = uploadedDocuments.some(u => u.category === doc.name || u.category.toLowerCase().includes(doc.category));
                const isArranged = status === 'available' || status === 'uploaded' || isDocUploaded;

                return (
                  <div
                    key={doc.id}
                    className={`rounded-lg border transition-all ${
                      isArranged
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : doc.requirementType === 'mandatory'
                        ? 'border-red-200 bg-white'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    {/* Header bar of doc item */}
                    <div className="p-3.5 flex items-start justify-between gap-3">
                      <div
                        className="flex items-start gap-3 flex-1 cursor-pointer"
                        onClick={() => setExpandedDocId(isExpanded ? null : doc.id)}
                      >
                        <div className="mt-0.5">
                          {isArranged ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-500">
                              {idx + 1}
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold text-xs text-slate-900 hover:text-blue-700">
                              {doc.name}
                            </h4>
                            <span
                              className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded ${
                                doc.requirementType === 'mandatory'
                                  ? 'bg-red-100 text-red-800 border border-red-200'
                                  : doc.requirementType === 'conditional'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              }`}
                            >
                              {doc.requirementType}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-600 mt-1">
                            {doc.description}
                          </p>

                          {doc.conditionDescription && (
                            <div className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded mt-1.5 inline-block border border-amber-200">
                              <strong>Why applicable:</strong> {doc.conditionDescription}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right action: Status toggle */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleDocStatus(doc.id, 'available')}
                          className={`text-xs px-2.5 py-1.5 rounded-md font-semibold transition border flex items-center gap-1 ${
                            isArranged
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isArranged ? 'Arranged' : 'Mark Arranged'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Expandable detailed requirements (FR-03) */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/70 rounded-b-lg space-y-3 text-xs">
                        {/* Accepted list */}
                        <div>
                          <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5 text-blue-700" />
                            <span>Accepted Documents (Any ONE of the following):</span>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 pl-2">
                            {doc.acceptedDocuments.map((item, i) => (
                              <li key={i} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                                <span className="text-blue-600 font-bold shrink-0">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Format & verification tip */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                          <div className="bg-white p-2 rounded border border-slate-200 text-[11px]">
                            <span className="font-bold text-slate-700 block mb-0.5">Accepted Formats & Size:</span>
                            <span className="text-slate-600 font-mono">
                              {doc.allowedFormats.join(', ')} • Max {doc.maxSizeMB} MB
                            </span>
                          </div>

                          <div className="bg-amber-50 p-2 rounded border border-amber-200 text-[11px] text-amber-900">
                            <span className="font-bold block mb-0.5 flex items-center gap-1">
                              <Info className="w-3 h-3 text-amber-600" />
                              <span>Official Inspection Tip:</span>
                            </span>
                            <span>{doc.verificationTip}</span>
                          </div>
                        </div>

                        <div className="text-[10px] text-slate-400 font-mono italic">
                          Official Rule: {doc.officialClause}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Navigation CTA */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => navigate('/upload')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2 px-3.5 rounded-lg transition"
              >
                ← Back to Step 2: Document Upload
              </button>

              <button
                type="button"
                onClick={() => navigate('/visa-assist')}
                className="bg-[#003366] hover:bg-[#002244] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition flex items-center gap-2 group"
              >
                <span>Proceed to Visa Assist & Consular Checker</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
