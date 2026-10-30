import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, CheckCircle2, AlertTriangle, AlertCircle, Sparkles, ArrowRight, ExternalLink, FileText, Upload, RefreshCw, XCircle, ShieldCheck, Calendar, Info, Globe, ChevronRight, User, BookOpen, Clock, Building, Landmark, Check } from 'lucide-react';
import { VISA_CATALOG, DEMO_TRAVELER_PROFILES, DemoTravelerProfile, VisaRecommendation, VisaDocumentRequirement } from '../../data/visaData';
import { checkVisaDocumentMismatchWithGemini, VisaMismatchResult } from '../../services/geminiService';

export const VisaEligibilityChecker: React.FC = () => {
  const navigate = useNavigate();

  // Selection state
  const [selectedNationality, setSelectedNationality] = useState<string>('Indian');
  const [selectedCountry, setSelectedCountry] = useState<string>('Germany');
  const [selectedPurpose, setSelectedPurpose] = useState<'student' | 'tourist' | 'business'>('student');
  const [applicantName, setApplicantName] = useState<string>('Aarav Sharma');
  const [passportNumber, setPassportNumber] = useState<string>('Z8924108');
  const [durationOfStay, setDurationOfStay] = useState<string>('2 Years (4 Semesters)');
  const [travelDate, setTravelDate] = useState<string>('2026-09-15');
  const [intendedHost, setIntendedHost] = useState<string>('Technical University of Munich (TUM)');
  const [fundingSource, setFundingSource] = useState<string>('Personal Sperrkonto (Blocked Account)');

  // Document checklist completion state
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  // Gemini AI Mismatch & Screening state
  const [isScreening, setIsScreening] = useState<boolean>(false);
  const [mismatchResult, setMismatchResult] = useState<VisaMismatchResult | null>(null);
  const [activeTestedDoc, setActiveTestedDoc] = useState<string | null>(null);

  // Active Visa Recommendation based on selection
  const currentRecommendation: VisaRecommendation =
    VISA_CATALOG[selectedCountry]?.[selectedPurpose] ||
    VISA_CATALOG['Germany']['student'];

  // Load a demo profile
  const handleLoadDemoProfile = (profile: DemoTravelerProfile) => {
    setApplicantName(profile.applicantName);
    setPassportNumber(profile.passportNumber);
    setSelectedCountry(profile.destinationCountry);
    setSelectedPurpose(profile.purposeOfVisit);
    setDurationOfStay(profile.durationOfStay);
    setIntendedHost(profile.intendedInstitutionOrHost);
    setFundingSource(profile.fundingSource);
    setMismatchResult(null);
    setActiveTestedDoc(null);
    setCheckedDocs({});
  };

  // Toggle document checklist
  const toggleDocCheck = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Trigger Gemini AI Document Screening
  const handleScreenSampleDocument = async (scenario: 'mismatch_blocked_account' | 'valid_blocked_account' | 'valid_admission' | 'missing_aps') => {
    setIsScreening(true);
    setMismatchResult(null);

    let docName = 'Blocked_Account_Confirmation_Fintiba_9500EUR.pdf';
    let docCategory = 'Proof of Financial Resources (Sperrkonto)';
    let snippet = 'Account balance: €9,500.00 | Monthly payout: €791.00';

    if (scenario === 'valid_blocked_account') {
      docName = 'Blocked_Account_Confirmation_Expatrio_11904EUR_Valid.pdf';
      docCategory = 'Proof of Financial Resources (Sperrkonto)';
      snippet = 'Account balance: €11,904.00 | Monthly payout: €992.00 | Statutory German requirement satisfied.';
    } else if (scenario === 'valid_admission') {
      docName = 'TUM_Unconditional_Admission_Letter_MSc_Informatics.pdf';
      docCategory = 'German University Admission Letter (Zulassungsbescheid)';
      snippet = 'Unconditional admission granted to Aarav Sharma for M.Sc. Informatics starting Winter Semester 2026/27.';
    } else if (scenario === 'missing_aps') {
      docName = 'Provisional_Marksheet_Without_APS.pdf';
      docCategory = 'APS Certificate (Akademische Prüfstelle India)';
      snippet = 'Indian University Provisional Transcript without APS verification QR code.';
    }

    setActiveTestedDoc(docName);

    try {
      const res = await checkVisaDocumentMismatchWithGemini({
        destinationCountry: selectedCountry,
        visaType: currentRecommendation.visaCategoryName,
        applicantName,
        passportNumber,
        intendedInstitutionOrHost: intendedHost,
        durationOfStay,
        fundingSource,
        documentName: docName,
        documentCategory: docCategory,
        documentSnippet: snippet
      });
      setMismatchResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsScreening(false);
    }
  };

  // Fix mismatch shortcut
  const handleFixMismatch = () => {
    handleScreenSampleDocument('valid_blocked_account');
  };

  const completedCount = currentRecommendation.requiredDocuments.filter((d) => checkedDocs[d.id]).length;
  const totalCount = currentRecommendation.requiredDocuments.length;
  const readinessPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#003366] via-[#004080] to-[#005599] text-white p-5 rounded-lg shadow-sm border border-blue-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1 shadow-xs">
                <Compass className="w-3 h-3" />
                Visa Assist & Consular Verification Platform
              </span>
              <span className="text-xs text-blue-200">Consular, Passport & Visa Division</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black font-serif tracking-tight">
              Intelligent Visa Eligibility Checker & Personalized Document Advisor
            </h2>
            <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed">
              Plan your international travel with confidence. Select your destination, purpose, and duration to generate statutory document checklists, screen files with Gemini AI for consular mismatches, and access official VFS and embassy portals.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-lg p-3 text-center min-w-[180px] shrink-0">
            <div className="text-[10px] uppercase tracking-wider text-amber-200 font-bold mb-0.5">
              Checklist Readiness
            </div>
            <div className="text-2xl font-black text-amber-300 font-mono">
              {readinessPercent}%
            </div>
            <div className="text-[10px] text-blue-200 mt-0.5">
              {completedCount} of {totalCount} Items Arranged
            </div>
          </div>
        </div>
      </div>

      {/* Evaluator Quick Demo Scenarios (PRD Walkthrough for Judges) */}
      <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Judge Demo Scenarios (1-Click Walkthrough):</span>
          </div>
          <span className="text-[11px] text-amber-800 font-medium">Click any scenario to pre-fill traveler profile and test AI mismatch detection</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {DEMO_TRAVELER_PROFILES.map((profile) => (
            <button
              key={profile.id}
              type="button"
              onClick={() => handleLoadDemoProfile(profile)}
              className={`text-xs px-3 py-1.5 rounded font-bold shadow-2xs transition flex items-center gap-1.5 ${
                profile.id === 'demo-student-germany'
                  ? 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-400/50'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300'
              }`}
            >
              <span>{profile.id === 'demo-student-germany' ? '⭐' : '✈️'}</span>
              <span>{profile.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Parameters on Left, Output & AI Verification on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Traveler Details & Selection Parameters */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-lg shadow-xs border border-slate-200 p-4 space-y-3.5">
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900 font-serif flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-700" />
                <span>Traveler Profile & Travel Intent</span>
              </h3>
              <span className="text-[10px] text-blue-700 font-mono font-bold">Passport: {passportNumber}</span>
            </div>

            {/* Applicant Name & Passport */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Applicant Name
                </label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded bg-slate-50 font-medium focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Nationality
                </label>
                <select
                  value={selectedNationality}
                  onChange={(e) => setSelectedNationality(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded bg-slate-50 font-medium focus:ring-1 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="Indian">Indian (Passport Holder) 🇮🇳</option>
                  <option value="Other">Other Nationality</option>
                </select>
              </div>
            </div>

            {/* Destination Country */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Destination Country <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded bg-slate-50 font-bold text-blue-900 focus:ring-1 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Germany">Germany (Federal Republic of Germany) 🇩🇪</option>
                <option value="France">France (Schengen Area) 🇫🇷</option>
                <option value="United Kingdom">United Kingdom (Great Britain) 🇬🇧</option>
              </select>
            </div>

            {/* Purpose of Visit */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Purpose of Visit <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['student', 'tourist', 'business'] as const).map((purpose) => (
                  <button
                    key={purpose}
                    type="button"
                    onClick={() => {
                      setSelectedPurpose(purpose);
                      setMismatchResult(null);
                      setCheckedDocs({});
                    }}
                    className={`text-xs py-2 px-1 rounded font-bold capitalize transition text-center border ${
                      selectedPurpose === purpose
                        ? 'bg-[#003366] text-white border-[#003366] shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {purpose}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration of Stay & Travel Date */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Duration of Stay
                </label>
                <input
                  type="text"
                  value={durationOfStay}
                  onChange={(e) => setDurationOfStay(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded bg-slate-50 font-medium focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Intended Travel Date
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded bg-slate-50 font-medium focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Intended Institution / Host */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {selectedPurpose === 'student'
                  ? 'University / Higher Education Institution'
                  : selectedPurpose === 'business'
                  ? 'Inviting Partner / Host Entity'
                  : 'Primary Accommodation / Hotel'}
              </label>
              <input
                type="text"
                value={intendedHost}
                onChange={(e) => setIntendedHost(e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded bg-slate-50 font-medium focus:ring-1 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Funding Source */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Primary Financial / Funding Source
              </label>
              <input
                type="text"
                value={fundingSource}
                onChange={(e) => setFundingSource(e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded bg-slate-50 font-medium focus:ring-1 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Consular Alert Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3.5 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#003366]">
              <Landmark className="w-4 h-4 text-blue-700" />
              <span>Consular Notice for {selectedCountry}:</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-snug">
              {selectedCountry === 'Germany'
                ? 'German Missions in India strictly enforce the €11,904 Sperrkonto balance and APS certificate requirement. Applications submitted with the old €9,500 / €11,208 limits will be rejected at VFS.'
                : selectedCountry === 'France'
                ? 'Schengen Area travel insurance must have zero deductible, cover minimum €30,000, and include repatriation of remains.'
                : 'UK Visitor visas require proof of ongoing ties to India and employment letter confirming resume date.'}
            </p>
          </div>
        </div>

        {/* Right Column: Recommended Visa Category, Dynamic Checklist, and AI Mismatch Screening */}
        <div className="lg:col-span-8 space-y-4">
          {/* Recommendation Card */}
          <div className="bg-white rounded-lg shadow-xs border-2 border-blue-900 p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Recommended Visa Category for {selectedNationality} Citizen
                </span>
                <h3 className="text-base font-black text-[#003366] font-serif">
                  {currentRecommendation.visaCategoryName}
                </h3>
                <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                  {currentRecommendation.visaSubtype}
                </span>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-500 block">Standard Visa Fee</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  ₹{currentRecommendation.estimatedVisaFeeINR.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400 block">{currentRecommendation.standardProcessingTime}</span>
              </div>
            </div>

            {/* Key Criteria Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block mb-0.5">Passport Validity Required:</span>
                <span className="text-slate-800 font-medium leading-snug block">
                  {currentRecommendation.keyCriteria.passportValidityRequired}
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block mb-0.5">Financial Threshold:</span>
                <span className="text-slate-800 font-medium leading-snug block">
                  {currentRecommendation.keyCriteria.financialProofRequired}
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block mb-0.5">Health Cover Required:</span>
                <span className="text-slate-800 font-medium leading-snug block">
                  {currentRecommendation.keyCriteria.healthInsuranceRequired}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Document Checklist (FR for Visa Assist) */}
          <div className="bg-white rounded-lg shadow-xs border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wide text-slate-900 font-serif">
                  Personalized Statutory Document Checklist ({currentRecommendation.requiredDocuments.length} Items)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Mark documents as arranged before scheduling your embassy or VFS appointment.
                </p>
              </div>

              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {completedCount}/{totalCount} Arranged
              </span>
            </div>

            <div className="space-y-2">
              {currentRecommendation.requiredDocuments.map((doc, idx) => {
                const isChecked = Boolean(checkedDocs[doc.id]);
                return (
                  <div
                    key={doc.id}
                    onClick={() => toggleDocCheck(doc.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'border-emerald-300 bg-emerald-50/40 text-emerald-950'
                        : 'border-slate-200 hover:border-blue-400 bg-white'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center transition ${
                          isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-slate-50'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-xs text-slate-900 hover:text-blue-700">
                          {doc.name}
                        </span>
                        <span
                          className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                            doc.requirementType === 'mandatory'
                              ? 'bg-red-100 text-red-800'
                              : doc.requirementType === 'financial'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {doc.requirementType}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-snug">
                        {doc.description}
                      </p>

                      <div className="text-[10px] text-amber-900 bg-amber-50 p-1.5 rounded mt-1.5 border border-amber-200/60">
                        <strong>Official Consular Rule:</strong> {doc.officialRuleTip}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Document Screening & Live Gemini AI Mismatch Detection (Steps 6-8 of Walkthrough) */}
          <div className="bg-white rounded-lg shadow-xs border-2 border-purple-300 p-5 space-y-4">
            <div className="flex items-start justify-between border-b border-purple-200 pb-2.5">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Pre-Submission Consular AI Document Screening</span>
                </div>
                <h4 className="font-bold text-sm text-[#003366] font-serif mt-0.5">
                  Detect Discrepancies & Outdated Requirements Before VFS Submission
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Cross-examine your uploaded document against your selected travel particulars using Google Gemini AI.
                </p>
              </div>

              <span className="bg-purple-100 text-purple-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-purple-300 shrink-0">
                gemini-3.5-flash-lite
              </span>
            </div>

            {/* Test Trigger Buttons for Judges */}
            <div>
              <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                Test Document Screening Scenarios (Demonstrates Error Catch & Recovery):
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleScreenSampleDocument('mismatch_blocked_account')}
                  className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold px-3 py-1.5 rounded shadow-xs transition flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-yellow-300" />
                  <span>1. Test Mismatch: Outdated €9,500 Blocked Account (AI Rejection Catch)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleScreenSampleDocument('missing_aps')}
                  className="bg-orange-700 hover:bg-orange-800 text-white text-xs font-bold px-3 py-1.5 rounded shadow-xs transition flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-white" />
                  <span>2. Test Mismatch: Missing APS Certificate</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleScreenSampleDocument('valid_blocked_account')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded shadow-xs transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>3. Test Compliant: Valid €11,904 Blocked Account (Pass)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleScreenSampleDocument('valid_admission')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded shadow-xs transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>4. Test Compliant: TUM Admission Letter (Pass)</span>
                </button>
              </div>
            </div>

            {/* Loading State */}
            {isScreening && (
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-300 flex items-center gap-3 animate-pulse">
                <div className="w-5 h-5 border-2 border-purple-700 border-t-transparent rounded-full animate-spin shrink-0" />
                <div className="text-xs text-purple-950">
                  <span className="font-bold block">
                    Google Gemini Consular AI Cross-Examining Document "{activeTestedDoc}"...
                  </span>
                  <span className="text-[11px] text-purple-700">
                    Checking financial statutory limits, course start date alignment, and mandatory APS credentials.
                  </span>
                </div>
              </div>
            )}

            {/* Live Gemini AI Result Card */}
            {mismatchResult && !isScreening && (
              <div
                className={`p-4 rounded-lg border-2 space-y-3 transition-all animate-in fade-in ${
                  mismatchResult.hasMismatch
                    ? 'border-red-500 bg-red-50/70 text-red-950'
                    : 'border-emerald-500 bg-emerald-50/70 text-emerald-950'
                }`}
              >
                <div className="flex items-center justify-between border-b border-current/20 pb-2">
                  <div className="flex items-center gap-2">
                    {mismatchResult.hasMismatch ? (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                    <span className="font-black text-xs uppercase tracking-wide">
                      {mismatchResult.title}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      mismatchResult.hasMismatch
                        ? 'bg-red-200 text-red-900 border border-red-400'
                        : 'bg-emerald-200 text-emerald-900 border border-emerald-400'
                    }`}
                  >
                    {mismatchResult.confidence}% AI Confidence
                  </span>
                </div>

                <p className="text-xs leading-relaxed font-semibold">
                  {mismatchResult.mismatchExplanation}
                </p>

                {/* Detected Details Grid */}
                {mismatchResult.detectedParticulars && (
                  <div className="bg-white/90 p-2.5 rounded border border-slate-200 text-xs space-y-1">
                    <span className="font-bold text-slate-800 text-[11px] block">
                      Consular AI Extraction Particulars:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-700">
                      <div>
                        <strong>Document Analyzed:</strong> {mismatchResult.detectedParticulars.documentDetected}
                      </div>
                      {Object.entries(mismatchResult.detectedParticulars.extractedDetails).map(([k, v], i) => (
                        <div key={i}>
                          <strong>{k}:</strong> {v}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actionable Remedies */}
                {mismatchResult.actionableCorrection.length > 0 && (
                  <div className="bg-white/95 p-3 rounded border border-current/20 space-y-1 text-xs">
                    <span className="font-bold text-slate-900 block text-[11px]">
                      Required Pre-Submission Correction Steps:
                    </span>
                    {mismatchResult.actionableCorrection.map((step, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-slate-700 text-[11px]">
                        <span className="font-bold text-blue-700">•</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Discrepancy Resolution CTA */}
                {mismatchResult.hasMismatch && (
                  <div className="flex items-center justify-between pt-2 border-t border-red-300">
                    <span className="text-[11px] font-bold text-red-800">
                      Correction Needed before VFS Appointment
                    </span>
                    <button
                      type="button"
                      onClick={handleFixMismatch}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded shadow-xs transition flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                      <span>1-Click Fix: Upload Updated €11,904 Certificate</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Official Portals & Appointment Links (Step 9 of Demo) */}
          <div className="bg-slate-50 rounded-lg border border-slate-300 p-4 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wide text-slate-800 font-serif flex items-center gap-1.5">
              <ExternalLink className="w-4 h-4 text-blue-700" />
              <span>Official Diplomatic Portals & Biometric Booking Links</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <a
                href={currentRecommendation.officialPortal.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition group flex items-start justify-between"
              >
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Official Online Application</span>
                  <span className="font-bold text-slate-900 group-hover:text-blue-800 block text-xs">
                    {currentRecommendation.officialPortal.portalName}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Generate the official barcoded visa application form.
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0 mt-0.5" />
              </a>

              <a
                href={currentRecommendation.officialPortal.appointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/30 transition group flex items-start justify-between"
              >
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Biometrics & Submission Center</span>
                  <span className="font-bold text-slate-900 group-hover:text-blue-800 block text-xs">
                    {currentRecommendation.officialPortal.appointmentProvider}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Schedule biometric appointment at New Delhi, Mumbai, or regional centers.
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0 mt-0.5" />
              </a>
            </div>
          </div>

          {/* Unified Simulated Visa Application Timeline (Step 10 of Demo) */}
          <div className="bg-white rounded-lg shadow-xs border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Simulated End-to-End Workflow
                </span>
                <h4 className="font-bold text-sm text-[#003366] font-serif mt-1">
                  Unified Consular Visa Application Timeline
                </h4>
                <p className="text-[11px] text-slate-500">
                  Real-time status progression from Passport Seva profile extraction to embassy visa stamping.
                </p>
              </div>

              <span className="font-mono text-xs font-bold text-slate-700">
                Application Ref: VIS-DEU-2026-9921
              </span>
            </div>

            {/* 7-Stage Horizontal Stepper */}
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 text-center text-xs">
              {[
                { stage: '1', title: 'Passport Verified', desc: 'UIDAI & MEA', done: true },
                { stage: '2', title: 'Eligibility Evaluated', desc: 'Type D Student', done: true },
                { stage: '3', title: 'Checklist Generated', desc: '7 Mandatory Docs', done: true },
                { stage: '4', title: 'AI Screened', desc: 'Mismatch Cleared', done: true },
                { stage: '5', title: 'VIDEX Form Ready', desc: 'Barcoded Form', done: true },
                { stage: '6', title: 'VFS Slotted', desc: 'Biometrics Scheduled', done: false, active: true },
                { stage: '7', title: 'Visa Stamped', desc: 'Passport Return', done: false }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded border flex flex-col justify-between ${
                    step.done
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : step.active
                      ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-600/20 text-blue-950'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-center mb-1">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step.done
                          ? 'bg-emerald-600 text-white'
                          : step.active
                          ? 'bg-blue-700 text-white'
                          : 'bg-slate-300 text-slate-600'
                      }`}
                    >
                      {step.done ? '✓' : step.stage}
                    </span>
                  </div>
                  <div className="font-bold text-[11px] leading-tight mb-0.5">{step.title}</div>
                  <div className="text-[9px] text-slate-500 font-sans">{step.desc}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-slate-700 font-medium">
                  <strong>Current Stage:</strong> Ready for Biometric Submission at VFS Global New Delhi.
                </span>
              </div>

              <button
                type="button"
                onClick={() => alert('Demo simulated appointment confirmation slip downloaded! Reference: VFS-DEU-IND-77821')}
                className="bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold px-3 py-1.5 rounded transition"
              >
                Download VFS Appointment Letter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
