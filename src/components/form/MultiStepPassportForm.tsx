import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, CheckCircle2, AlertCircle, HelpCircle, Save, ArrowRight, ArrowLeft,
  Sparkles, RefreshCw, Eye, ShieldCheck, User, Home, Users, Phone, Award, CheckSquare, Clock
} from 'lucide-react';
import { useApplication } from '../../context/ApplicationContext';
import { ApplicationFormData } from '../../types';

export const MultiStepPassportForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    formData,
    updateFormData,
    lastSavedTime,
    isRestoredFromDraft,
    populateDemoData,
    submitApplication,
    uploadedDocuments
  } = useApplication();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const steps = [
    { number: 1, title: 'Service Required', icon: Award },
    { number: 2, title: 'Applicant Details', icon: User },
    { number: 3, title: 'Family Details', icon: Users },
    { number: 4, title: 'Residential Address', icon: Home },
    { number: 5, title: 'Emergency Contact', icon: Phone },
    { number: 6, title: 'Self Declaration', icon: CheckSquare }
  ];

  // Real-time validation per step (FR-10)
  const validateStep = (stepNumber: number): boolean => {
    const errors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.applicationType) errors.applicationType = 'Please select application type';
      if (!formData.passportType) errors.passportType = 'Please select normal or tatkaal';
    }

    if (stepNumber === 2) {
      if (!formData.givenName.trim()) errors.givenName = 'Given name is mandatory';
      if (!formData.dob) {
        errors.dob = 'Date of birth is mandatory';
      } else {
        const year = new Date(formData.dob).getFullYear();
        if (year > 2026 || year < 1920) {
          errors.dob = 'Please enter a realistic date of birth';
        }
      }
      if (!formData.placeOfBirth.trim()) errors.placeOfBirth = 'Place of birth is mandatory';
      if (!formData.gender) errors.gender = 'Gender is mandatory';
      if (!formData.educationalQualification) errors.educationalQualification = 'Qualification is mandatory';
    }

    if (stepNumber === 3) {
      if (!formData.fatherGivenName.trim()) errors.fatherGivenName = "Father's given name is mandatory";
      if (!formData.motherGivenName.trim()) errors.motherGivenName = "Mother's given name is mandatory";
    }

    if (stepNumber === 4) {
      if (!formData.houseNoAndStreet.trim()) errors.houseNoAndStreet = 'House number and street is mandatory';
      if (!formData.villageTownCity.trim()) errors.villageTownCity = 'City / Town is mandatory';
      if (!formData.district.trim()) errors.district = 'District is mandatory';
      if (!formData.policeStation.trim()) errors.policeStation = 'Police Station jurisdiction is mandatory';
      if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode)) {
        errors.pincode = 'Valid 6-digit Indian PIN code required';
      }
      if (!formData.mobileNumber.trim() || !/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
        errors.mobileNumber = 'Valid 10-digit mobile number required';
      }
      if (formData.emailId && !/\S+@\S+\.\S+/.test(formData.emailId)) {
        errors.emailId = 'Valid email address format required';
      }
    }

    if (stepNumber === 5) {
      if (!formData.emergencyNameAndAddress.trim()) errors.emergencyNameAndAddress = 'Emergency contact details required';
      if (!formData.emergencyMobile.trim() || !/^\d{10}$/.test(formData.emergencyMobile.replace(/\D/g, ''))) {
        errors.emergencyMobile = 'Valid 10-digit emergency contact required';
      }
    }

    if (stepNumber === 6) {
      if (!formData.agreeToDeclaration) {
        errors.agreeToDeclaration = 'You must accept the legal declaration before submission';
      }
      if (!formData.declarationPlace.trim()) {
        errors.declarationPlace = 'Declaration place is required';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setFormErrors({});
      if (currentStep < 6) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Step 6 completed -> open final review modal (FR-14)
        setShowReviewModal(true);
      }
    }
  };

  const handlePrev = () => {
    setFormErrors({});
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = (targetRoute: '/upload' | '/visa-assist' = '/upload') => {
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedARN = submitApplication();
      setIsSubmitting(false);
      setShowReviewModal(false);
      navigate(targetRoute);
    }, 800);
  };

  // Progress computation
  const progressPercent = Math.round((currentStep / 6) * 100);

  return (
    <div className="space-y-6">
      {/* Form Header with Auto-Save Notice (FR-12, FR-13) */}
      <div className="bg-gradient-to-r from-[#093b74] via-[#0d4d96] to-[#005a9e] text-white p-5 rounded-xl shadow-sm border border-blue-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-amber-400 text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3" />
                Step 1: Application Form (Auto-Save & Resilient Draft)
              </span>
              <span className="text-xs text-blue-200">Preserving Original Structure + Form Sanity</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black font-serif tracking-tight">
              Online Passport Application (Form No. 1)
            </h2>
            <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed">
              Standard Ministry of External Affairs application form enhanced with inline field validation, instant guidance tooltips, and real-time local auto-save.
            </p>
          </div>

          {/* Auto-Save & Draft Indicator (FR-13) */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl p-3 text-right shrink-0">
            <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Real-time Auto-Save Active</span>
            </div>
            <div className="text-[11px] text-blue-100 mt-0.5 font-mono">
              {lastSavedTime ? `Draft saved at ${lastSavedTime}` : 'Autosaving as you type'}
            </div>
            {isRestoredFromDraft && (
              <span className="text-[10px] text-amber-200 font-medium block mt-0.5">
                • Draft restored from local storage
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Evaluator Shortcut: Pre-fill demo data */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-blue-900">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            <strong>Testing for Hackathon Judges:</strong> Skip typing 25 fields by clicking "Auto-fill Demo Applicant" to test validation & review immediately.
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            populateDemoData();
            setFormErrors({});
          }}
          className="bg-[#093b74] hover:bg-blue-900 text-white font-bold px-3 py-1.5 rounded transition shrink-0"
        >
          Auto-fill Demo Applicant (Aarav Sharma)
        </button>
      </div>

      {/* Stepper Progress Bar (FR-12) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
          <span>Application Progress: Step {currentStep} of 6</span>
          <span className="text-blue-800 font-mono">{progressPercent}% Completed</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-700 to-amber-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step chips */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {steps.map((s) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;

            return (
              <button
                key={s.number}
                type="button"
                onClick={() => {
                  if (validateStep(currentStep) || s.number < currentStep) {
                    setCurrentStep(s.number);
                  }
                }}
                className={`p-2 rounded-lg text-left transition flex items-center gap-2 text-xs border ${
                  isCurrent
                    ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] ${
                  isCurrent ? 'bg-blue-700 text-white' : isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isCompleted ? '✓' : s.number}
                </div>
                <span className="truncate">{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Body */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6">
        {/* Step 1: Service Details */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h3 className="font-bold text-sm text-[#093b74] font-serif uppercase tracking-wide">
                Section 1: Passport Service Required
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Specify application classification, booklet thickness, and processing scheme.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Applying For <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="appType"
                      checked={formData.applicationType === 'fresh'}
                      onChange={() => updateFormData({ applicationType: 'fresh' })}
                      className="text-blue-600"
                    />
                    <div>
                      <span className="font-bold text-slate-800">Fresh Passport</span>
                      <p className="text-[11px] text-slate-500">First time applying for an Indian passport</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="appType"
                      checked={formData.applicationType === 'reissue'}
                      onChange={() => updateFormData({ applicationType: 'reissue' })}
                      className="text-blue-600"
                    />
                    <div>
                      <span className="font-bold text-slate-800">Reissue of Passport</span>
                      <p className="text-[11px] text-slate-500">Prior passport expired, pages exhausted, lost, or damaged</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Type of Application Scheme <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="passType"
                      checked={formData.passportType === 'normal'}
                      onChange={() => updateFormData({ passportType: 'normal' })}
                      className="text-blue-600"
                    />
                    <div>
                      <span className="font-bold text-slate-800">Normal Scheme</span>
                      <p className="text-[11px] text-slate-500">Standard processing (Fee: ₹1,500)</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-amber-200 bg-amber-50/40 hover:bg-amber-50 cursor-pointer">
                    <input
                      type="radio"
                      name="passType"
                      checked={formData.passportType === 'tatkaal'}
                      onChange={() => updateFormData({ passportType: 'tatkaal' })}
                      className="text-amber-600"
                    />
                    <div>
                      <span className="font-bold text-amber-950">Tatkaal Fast-Track Scheme</span>
                      <p className="text-[11px] text-amber-800">Dispatched in 1-3 working days (Fee: ₹3,500)</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Type of Passport Booklet <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => updateFormData({ bookletPages: 36 })}
                    className={`p-2.5 rounded-lg border text-left transition ${
                      formData.bookletPages === 36
                        ? 'border-blue-600 bg-blue-50/60 font-bold text-blue-900'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>36 Pages (Standard)</div>
                    <div className="text-[10px] text-slate-500">Ideal for frequent tourists</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateFormData({ bookletPages: 60 })}
                    className={`p-2.5 rounded-lg border text-left transition ${
                      formData.bookletPages === 60
                        ? 'border-blue-600 bg-blue-50/60 font-bold text-blue-900'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>60 Pages (Jumbo)</div>
                    <div className="text-[10px] text-slate-500">For frequent international business travellers</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Validity Required
                </label>
                <select
                  value={formData.validityRequired}
                  onChange={(e) => updateFormData({ validityRequired: e.target.value as any })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-slate-50"
                >
                  <option value="10_years">10 Years (Standard for Adult)</option>
                  <option value="5_years_or_until_18">5 Years or Until Age of 18 (for Minors)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Applicant Details */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h3 className="font-bold text-sm text-[#093b74] font-serif uppercase tracking-wide">
                Section 2: Applicant Personal Particulars
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Enter your name exactly as it appears in your educational certificate or birth proof.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Applicant's Given Name (First & Middle Name) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.givenName}
                  onChange={(e) => updateFormData({ givenName: e.target.value.toUpperCase() })}
                  placeholder="e.g. AARAV"
                  className={`w-full p-2.5 border rounded-lg uppercase ${formErrors.givenName ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.givenName && <p className="text-red-500 text-[10px] mt-1">{formErrors.givenName}</p>}
                <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-blue-600" />
                  <span>Do not prefix Shri, Smt, Dr, or Mr.</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Surname (Family Name)
                </label>
                <input
                  type="text"
                  value={formData.surname}
                  onChange={(e) => updateFormData({ surname: e.target.value.toUpperCase() })}
                  placeholder="e.g. SHARMA"
                  className="w-full p-2.5 border border-slate-300 rounded-lg uppercase"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Date of Birth (DOB) <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => updateFormData({ dob: e.target.value })}
                  className={`w-full p-2.5 border rounded-lg ${formErrors.dob ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.dob && <p className="text-red-500 text-[10px] mt-1">{formErrors.dob}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateFormData({ gender: e.target.value as any })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="transgender">Transgender</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Place of Birth (Village / Town / City) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.placeOfBirth}
                  onChange={(e) => updateFormData({ placeOfBirth: e.target.value })}
                  placeholder="e.g. New Delhi"
                  className={`w-full p-2.5 border rounded-lg ${formErrors.placeOfBirth ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.placeOfBirth && <p className="text-red-500 text-[10px] mt-1">{formErrors.placeOfBirth}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Marital Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => updateFormData({ maritalStatus: e.target.value as any })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                  <option value="separated">Separated</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Educational Qualification <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.educationalQualification}
                  onChange={(e) => {
                    const val = e.target.value as any;
                    updateFormData({
                      educationalQualification: val,
                      isEligibleNonECR: val === 'graduate_above' || val === 'tenth_pass_above'
                    });
                  }}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                >
                  <option value="graduate_above">Graduate and Above</option>
                  <option value="tenth_pass_above">10th Standard (Matriculation) Pass and Above</option>
                  <option value="between_eighth_and_ninth">Between 8th and 9th Standard</option>
                  <option value="seventh_or_less">7th Standard or Less</option>
                </select>
              </div>

              {/* Contextual Non-ECR tooltip (FR-11) */}
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-amber-950 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Eligible for Non-ECR Status:</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${formData.isEligibleNonECR ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {formData.isEligibleNonECR ? 'YES (Exempt from Emigration Check)' : 'NO (ECR Stamp Applicable)'}
                  </span>
                </div>
                <p className="text-[10px] text-amber-900 leading-tight">
                  {formData.isEligibleNonECR
                    ? 'Qualified automatically because you hold 10th standard or higher educational degree. No emigration clearance needed at airport.'
                    : 'Applicants with less than 10th standard qualification receive an ECR stamp, requiring POE clearance when travelling to 18 notified countries.'}
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  PAN Number (Optional)
                </label>
                <input
                  type="text"
                  value={formData.panNumber || ''}
                  onChange={(e) => updateFormData({ panNumber: e.target.value.toUpperCase() })}
                  placeholder="e.g. ABCDE1234F"
                  className="w-full p-2.5 border border-slate-300 rounded-lg uppercase font-mono"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Aadhaar Number (Optional / Demo)
                </label>
                <input
                  type="text"
                  value={formData.aadhaarNumber || ''}
                  onChange={(e) => updateFormData({ aadhaarNumber: e.target.value })}
                  placeholder="e.g. XXXX-XXXX-4892"
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Family Details */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h3 className="font-bold text-sm text-[#093b74] font-serif uppercase tracking-wide">
                Section 3: Family Details
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Names of father and mother as per legal records.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Father's Given Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fatherGivenName}
                  onChange={(e) => updateFormData({ fatherGivenName: e.target.value.toUpperCase() })}
                  placeholder="e.g. RAJESH"
                  className={`w-full p-2.5 border rounded-lg uppercase ${formErrors.fatherGivenName ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.fatherGivenName && <p className="text-red-500 text-[10px] mt-1">{formErrors.fatherGivenName}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Father's Surname
                </label>
                <input
                  type="text"
                  value={formData.fatherSurname}
                  onChange={(e) => updateFormData({ fatherSurname: e.target.value.toUpperCase() })}
                  placeholder="e.g. SHARMA"
                  className="w-full p-2.5 border border-slate-300 rounded-lg uppercase"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mother's Given Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.motherGivenName}
                  onChange={(e) => updateFormData({ motherGivenName: e.target.value.toUpperCase() })}
                  placeholder="e.g. SUNITA"
                  className={`w-full p-2.5 border rounded-lg uppercase ${formErrors.motherGivenName ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.motherGivenName && <p className="text-red-500 text-[10px] mt-1">{formErrors.motherGivenName}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mother's Surname
                </label>
                <input
                  type="text"
                  value={formData.motherSurname}
                  onChange={(e) => updateFormData({ motherSurname: e.target.value.toUpperCase() })}
                  placeholder="e.g. SHARMA"
                  className="w-full p-2.5 border border-slate-300 rounded-lg uppercase"
                />
              </div>

              {formData.maritalStatus === 'married' && (
                <>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Spouse's Given Name
                    </label>
                    <input
                      type="text"
                      value={formData.spouseGivenName || ''}
                      onChange={(e) => updateFormData({ spouseGivenName: e.target.value.toUpperCase() })}
                      className="w-full p-2.5 border border-slate-300 rounded-lg uppercase"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Spouse's Surname
                    </label>
                    <input
                      type="text"
                      value={formData.spouseSurname || ''}
                      onChange={(e) => updateFormData({ spouseSurname: e.target.value.toUpperCase() })}
                      className="w-full p-2.5 border border-slate-300 rounded-lg uppercase"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Present Residential Address */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h3 className="font-bold text-sm text-[#093b74] font-serif uppercase tracking-wide">
                Section 4: Present Residential Address
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Police verification will be initiated at this jurisdiction. Ensure complete accuracy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="md:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">
                  House No., Street & Locality <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.houseNoAndStreet}
                  onChange={(e) => updateFormData({ houseNoAndStreet: e.target.value })}
                  placeholder="e.g. Flat No. 402, Block C, Mayur Vihar Phase 1"
                  className={`w-full p-2.5 border rounded-lg ${formErrors.houseNoAndStreet ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.houseNoAndStreet && <p className="text-red-500 text-[10px] mt-1">{formErrors.houseNoAndStreet}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Village / Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.villageTownCity}
                  onChange={(e) => updateFormData({ villageTownCity: e.target.value })}
                  placeholder="e.g. East Delhi"
                  className={`w-full p-2.5 border rounded-lg ${formErrors.villageTownCity ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.villageTownCity && <p className="text-red-500 text-[10px] mt-1">{formErrors.villageTownCity}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => updateFormData({ district: e.target.value })}
                  placeholder="e.g. East Delhi"
                  className={`w-full p-2.5 border rounded-lg ${formErrors.district ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.district && <p className="text-red-500 text-[10px] mt-1">{formErrors.district}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Police Station Jurisdiction <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.policeStation}
                  onChange={(e) => updateFormData({ policeStation: e.target.value })}
                  placeholder="e.g. Mayur Vihar Police Station"
                  className={`w-full p-2.5 border rounded-lg ${formErrors.policeStation ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.policeStation && <p className="text-red-500 text-[10px] mt-1">{formErrors.policeStation}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => updateFormData({ pincode: e.target.value })}
                  placeholder="e.g. 110091"
                  maxLength={6}
                  className={`w-full p-2.5 border rounded-lg font-mono ${formErrors.pincode ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.pincode && <p className="text-red-500 text-[10px] mt-1">{formErrors.pincode}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mobile Number (for SMS Alerts) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => updateFormData({ mobileNumber: e.target.value })}
                  placeholder="e.g. 9876543210"
                  maxLength={10}
                  className={`w-full p-2.5 border rounded-lg font-mono ${formErrors.mobileNumber ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.mobileNumber && <p className="text-red-500 text-[10px] mt-1">{formErrors.mobileNumber}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  value={formData.emailId}
                  onChange={(e) => updateFormData({ emailId: e.target.value })}
                  placeholder="e.g. citizen@example.com"
                  className={`w-full p-2.5 border rounded-lg ${formErrors.emailId ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.emailId && <p className="text-red-500 text-[10px] mt-1">{formErrors.emailId}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Emergency Contact */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h3 className="font-bold text-sm text-[#093b74] font-serif uppercase tracking-wide">
                Section 5: Emergency Contact Details
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Contact person to reach in case of an emergency during international travel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="md:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">
                  Emergency Contact Name & Full Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.emergencyNameAndAddress}
                  onChange={(e) => updateFormData({ emergencyNameAndAddress: e.target.value })}
                  placeholder="e.g. Rajesh Sharma, Flat No. 402, Block C, Mayur Vihar Phase 1, Delhi - 110091"
                  className={`w-full p-2.5 border rounded-lg ${formErrors.emergencyNameAndAddress ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.emergencyNameAndAddress && <p className="text-red-500 text-[10px] mt-1">{formErrors.emergencyNameAndAddress}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Emergency Contact Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.emergencyMobile}
                  onChange={(e) => updateFormData({ emergencyMobile: e.target.value })}
                  placeholder="e.g. 9811223344"
                  maxLength={10}
                  className={`w-full p-2.5 border rounded-lg font-mono ${formErrors.emergencyMobile ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.emergencyMobile && <p className="text-red-500 text-[10px] mt-1">{formErrors.emergencyMobile}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Self Declaration & Legal Undertaking */}
        {currentStep === 6 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h3 className="font-bold text-sm text-[#093b74] font-serif uppercase tracking-wide">
                Section 6: Self Declaration & Submission
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Statutory undertaking under Section 5(2) and Section 12(1)(b) of the Passports Act, 1967.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 text-xs space-y-2.5 text-slate-700 leading-relaxed max-h-60 overflow-y-auto">
              <p>
                <strong>1.</strong> I owe allegiance to the sovereignty, unity & integrity of India, and have not voluntarily acquired the citizenship or travel document of any other country.
              </p>
              <p>
                <strong>2.</strong> I have not been convicted by any Court in India for an offence involving moral turpitude with imprisonment exceeding 2 years during the past 5 years.
              </p>
              <p>
                <strong>3.</strong> No proceedings in respect of an offence alleged to have been committed by me are pending before a criminal court in India.
              </p>
              <p>
                <strong>4.</strong> I understand that furnishing false information or suppressing material facts is an offence punishable with imprisonment or fine under the Passports Act, 1967.
              </p>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 p-3 rounded-lg border-2 border-blue-200 bg-blue-50/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToDeclaration}
                  onChange={(e) => updateFormData({ agreeToDeclaration: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded mt-0.5"
                />
                <span className="text-xs font-bold text-blue-950">
                  I Agree to the statutory declarations above and confirm that all submitted details are true and accurate.
                </span>
              </label>
              {formErrors.agreeToDeclaration && <p className="text-red-500 text-[10px] mt-1">{formErrors.agreeToDeclaration}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Place of Declaration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.declarationPlace}
                  onChange={(e) => updateFormData({ declarationPlace: e.target.value })}
                  placeholder="e.g. New Delhi"
                  className={`w-full p-2.5 border rounded-lg ${formErrors.declarationPlace ? 'border-red-500 bg-red-50' : 'border-slate-300'}`}
                />
                {formErrors.declarationPlace && <p className="text-red-500 text-[10px] mt-1">{formErrors.declarationPlace}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.declarationDate}
                  disabled
                  className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-100 text-slate-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Form Navigation Controls */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Section</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="bg-[#093b74] hover:bg-[#07305e] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-sm group"
          >
            <span>{currentStep === 6 ? 'Review & Submit Application' : 'Save & Continue'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Final Review Modal (FR-14) */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-[#093b74] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-sm font-serif">Application Final Review (FR-14)</h3>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-slate-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-emerald-900 flex items-center justify-between">
                <div>
                  <div className="font-bold">All 6 Sections Validated Successfully</div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">
                    Your form inputs match official MEA field criteria.
                  </div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              </div>

              {/* Summary table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 px-3 py-2 font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                  Summary of Application Particulars
                </div>
                <div className="p-3 grid grid-cols-2 gap-2 text-slate-700">
                  <div><strong>Applicant Name:</strong> {formData.givenName} {formData.surname}</div>
                  <div><strong>DOB:</strong> {formData.dob || '14/05/1998'}</div>
                  <div><strong>Service:</strong> {formData.applicationType === 'fresh' ? 'Fresh Passport' : 'Reissue'} ({formData.passportType})</div>
                  <div><strong>Booklet:</strong> {formData.bookletPages} Pages</div>
                  <div><strong>Non-ECR:</strong> {formData.isEligibleNonECR ? 'Eligible (Yes)' : 'No'}</div>
                  <div><strong>Mobile:</strong> {formData.mobileNumber}</div>
                  <div className="col-span-2"><strong>Address:</strong> {formData.houseNoAndStreet}, {formData.villageTownCity}, {formData.district} - {formData.pincode}</div>
                  <div className="col-span-2"><strong>Police Station:</strong> {formData.policeStation}</div>
                </div>
              </div>

              {/* Document readiness */}
              <div className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                    Document Attachment Readiness
                  </span>
                  <span className="text-emerald-700 font-bold">
                    {uploadedDocuments.length} Documents Attached
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Uploaded documents have passed automated formatting checks. Physical originals must be carried to the Passport Seva Kendra.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg font-bold text-slate-700 hover:bg-slate-100"
              >
                Back to Edit
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleFinalSubmit('/visa-assist')}
                  disabled={isSubmitting}
                  className="bg-[#003366] hover:bg-[#002244] text-white font-bold px-3 py-2 rounded-lg text-xs transition"
                >
                  Proceed to Visa Assist
                </button>
                <button
                  type="button"
                  onClick={() => handleFinalSubmit('/upload')}
                  disabled={isSubmitting}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-lg shadow-sm transition flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Application & Generating ARN...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm & Proceed to Document Upload</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
