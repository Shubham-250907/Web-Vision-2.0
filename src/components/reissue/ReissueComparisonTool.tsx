import React, { useState } from 'react';
import {
  Sparkles, CheckCircle2, AlertTriangle, XCircle, ArrowRight, FileText,
  Shield, User, Home, Award, RefreshCw, Eye, Camera, Clock, CheckSquare
} from 'lucide-react';
import { compareReissueWithGemini, ReissueComparisonInput, ReissueComparisonResult } from '../../services/geminiService';

const DEMO_PRESETS: { name: string; description: string; data: ReissueComparisonInput }[] = [
  {
    name: 'Scenario 1: Surname Changed Post-Marriage + Address Change',
    description: 'Applicant married, surname appended with spouse name, relocated from Bengaluru to East Delhi.',
    data: {
      oldPassport: {
        passportNo: 'Z3918291',
        issueDate: '12-May-2014',
        expiryDate: '11-May-2024',
        givenName: 'PRIYA',
        surname: 'SHARMA',
        address: '14/2, 8th Main, Malleshwaram, Bengaluru, Karnataka - 560003',
        dob: '14-05-1996',
        maritalStatus: 'Single',
        spouseName: '',
        ecrStatus: 'Non-ECR',
        photoDescription: '2014 photograph: 18-year-old female, unmarried, no jewelry or vermilion, hair tied back.'
      },
      newDraft: {
        givenName: 'PRIYA',
        surname: 'SHARMA-VERMA',
        address: 'Flat 402, Block C, Mayur Vihar Phase 1, East Delhi - 110091',
        dob: '14-05-1996',
        maritalStatus: 'Married',
        spouseName: 'ROHIT VERMA',
        educationalQualification: 'Graduate and Above (M.Sc)',
        isNonECR: true,
        photoDescription: '2026 photograph: 28-year-old adult female, wears mangalsutra, new hair style, high-definition photo.',
        reissueReason: 'Validity Expired & Change in Personal Particulars (Surname & Address)'
      }
    }
  },
  {
    name: 'Scenario 2: Minor to Adult Transition (Beard + Spectacles + Non-ECR)',
    description: 'Old passport issued when applicant was 15 (clean-shaven minor, ECR). Now 25, adult with beard & spectacles.',
    data: {
      oldPassport: {
        passportNo: 'K8920192',
        issueDate: '18-Aug-2015',
        expiryDate: '17-Aug-2025',
        givenName: 'AARAV',
        surname: 'MALHOTRA',
        address: 'House 55, Sector 14, Gurugram, Haryana - 122001',
        dob: '18-08-2000',
        maritalStatus: 'Single',
        spouseName: '',
        ecrStatus: 'ECR (Minor without 10th marksheet in 2015)',
        photoDescription: '2015 photograph: 15-year-old clean-shaven minor boy, no facial hair, no spectacles.'
      },
      newDraft: {
        givenName: 'AARAV',
        surname: 'MALHOTRA',
        address: 'House 55, Sector 14, Gurugram, Haryana - 122001',
        dob: '18-08-2000',
        maritalStatus: 'Single',
        spouseName: '',
        educationalQualification: 'Graduate (B.Tech) - Non-ECR Claimed',
        isNonECR: true,
        photoDescription: '2026 photograph: 26-year-old adult male with dense trimmed beard, mustache, and corrective spectacles.',
        reissueReason: 'Exhaustion of Pages & Minor to Adult 10-Year Conversion'
      }
    }
  },
  {
    name: 'Scenario 3: Standard Clean Reissue (Zero Discrepancies)',
    description: 'Simple renewal within 3 years of expiry with identical personal particulars and residence.',
    data: {
      oldPassport: {
        passportNo: 'M1029384',
        issueDate: '10-Nov-2016',
        expiryDate: '09-Nov-2026',
        givenName: 'RAJESH',
        surname: 'KUMAR',
        address: 'A-22, Defence Colony, New Delhi - 110024',
        dob: '25-12-1980',
        maritalStatus: 'Married',
        spouseName: 'SUNITA KUMAR',
        ecrStatus: 'Non-ECR',
        photoDescription: 'Adult male, formal attire, clean appearance.'
      },
      newDraft: {
        givenName: 'RAJESH',
        surname: 'KUMAR',
        address: 'A-22, Defence Colony, New Delhi - 110024',
        dob: '25-12-1980',
        maritalStatus: 'Married',
        spouseName: 'SUNITA KUMAR',
        educationalQualification: 'Graduate and Above',
        isNonECR: true,
        photoDescription: 'Adult male, formal attire, current digital photograph.'
        ,reissueReason: 'Validity Expired / Due to Expire within 1 Year'
      }
    }
  }
];

export const ReissueComparisonTool: React.FC = () => {
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [currentInput, setCurrentInput] = useState<ReissueComparisonInput>(DEMO_PRESETS[0].data);
  const [comparisonResult, setComparisonResult] = useState<ReissueComparisonResult | null>(null);
  const [isComparing, setIsComparing] = useState<boolean>(false);

  const handleSelectPreset = (idx: number) => {
    setActivePresetIndex(idx);
    setCurrentInput(DEMO_PRESETS[idx].data);
    setComparisonResult(null);
  };

  const handleRunComparison = async () => {
    setIsComparing(true);
    try {
      const result = await compareReissueWithGemini(currentInput);
      setComparisonResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#003366] via-[#094179] to-[#0d5299] text-white p-5 rounded-lg shadow-sm border border-blue-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3" />
                Live Google Gemini AI Feature
              </span>
              <span className="text-xs text-blue-200">Reissue of Passport Protocol</span>
            </div>
            <h2 className="text-xl font-bold font-serif tracking-tight">
              Reissue Discrepancy & Photo Comparison Engine
            </h2>
            <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed">
              Compares your <strong>Old Passport particulars & photograph</strong> against your <strong>New Application Draft</strong> using Google Gemini. Detects name changes, address relocations, photo/appearance progression, and tells you what objections Counter A, B, or C officers will raise before you visit the PSK!
            </p>
          </div>

          <button
            type="button"
            onClick={handleRunComparison}
            disabled={isComparing}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-md shadow-md transition flex items-center justify-center gap-2 shrink-0 group"
          >
            {isComparing ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Gemini Analyzing Discrepancies...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>Run Gemini AI Comparison</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Scenarios Selector for Judges */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-300 p-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#003366]" />
            <span>Select Demonstration Reissue Profile:</span>
          </span>
          <span className="text-[11px] text-slate-500">Click to load realistic Government of India cases</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {DEMO_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(idx)}
              className={`p-2.5 rounded-md text-left text-xs border transition ${
                activePresetIndex === idx
                  ? 'border-[#003366] bg-blue-50/70 font-bold shadow-xs'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="text-slate-900 font-semibold">{preset.name}</div>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug">{preset.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix (Old Passport vs New Draft) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Old Passport Card */}
        <div className="bg-white rounded-lg shadow-xs border border-slate-300 overflow-hidden">
          <div className="bg-[#002b49] text-white px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-300" />
              <h3 className="font-bold text-xs uppercase tracking-wider font-serif">
                1. Previous Passport Particulars (Old Booklet)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-300">Booklet #{currentInput.oldPassport.passportNo}</span>
          </div>

          <div className="p-4 space-y-2.5 text-xs text-slate-700">
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Applicant Full Name:</span>
              <span className="font-bold text-slate-900">{currentInput.oldPassport.givenName} {currentInput.oldPassport.surname}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Validity Period:</span>
              <span className="font-mono">{currentInput.oldPassport.issueDate} to {currentInput.oldPassport.expiryDate}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Date of Birth:</span>
              <span className="font-mono">{currentInput.oldPassport.dob}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Marital Status:</span>
              <span>{currentInput.oldPassport.maritalStatus} {currentInput.oldPassport.spouseName && `(Spouse: ${currentInput.oldPassport.spouseName})`}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Emigration Check:</span>
              <span className="font-semibold">{currentInput.oldPassport.ecrStatus}</span>
            </div>
            <div className="border-b pb-1">
              <span className="text-slate-500 block mb-0.5">Recorded Address:</span>
              <span className="text-[11px] font-medium text-slate-800">{currentInput.oldPassport.address}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-600 flex items-center gap-1 mb-1">
                <Camera className="w-3.5 h-3.5 text-slate-500" />
                <span>Old Photo / Appearance Record:</span>
              </span>
              <p className="text-[11px] text-slate-600 leading-snug">{currentInput.oldPassport.photoDescription}</p>
            </div>
          </div>
        </div>

        {/* New Application Draft Card */}
        <div className="bg-white rounded-lg shadow-xs border border-blue-300 overflow-hidden">
          <div className="bg-[#005a9e] text-white px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-amber-300" />
              <h3 className="font-bold text-xs uppercase tracking-wider font-serif">
                2. New Application Draft (Form No. 1)
              </h3>
            </div>
            <span className="text-[10px] bg-blue-800 px-1.5 py-0.2 rounded font-semibold text-blue-100">Live Draft</span>
          </div>

          <div className="p-4 space-y-2.5 text-xs text-slate-700">
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Applicant Full Name:</span>
              <span className={`font-bold ${currentInput.newDraft.surname !== currentInput.oldPassport.surname ? 'text-amber-700 bg-amber-50 px-1 rounded' : 'text-slate-900'}`}>
                {currentInput.newDraft.givenName} {currentInput.newDraft.surname}
              </span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Reason for Reissue:</span>
              <span className="font-semibold text-blue-900">{currentInput.newDraft.reissueReason}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Date of Birth:</span>
              <span className="font-mono">{currentInput.newDraft.dob}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Marital Status:</span>
              <span className={`font-semibold ${currentInput.newDraft.maritalStatus !== currentInput.oldPassport.maritalStatus ? 'text-amber-700 bg-amber-50 px-1 rounded' : ''}`}>
                {currentInput.newDraft.maritalStatus} {currentInput.newDraft.spouseName && `(Spouse: ${currentInput.newDraft.spouseName})`}
              </span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Education & Non-ECR:</span>
              <span className="font-semibold text-emerald-700">{currentInput.newDraft.educationalQualification}</span>
            </div>
            <div className="border-b pb-1">
              <span className="text-slate-500 block mb-0.5">Present Residence:</span>
              <span className={`text-[11px] font-medium ${currentInput.newDraft.address !== currentInput.oldPassport.address ? 'text-amber-800 bg-amber-50 px-1 rounded block' : 'text-slate-800'}`}>
                {currentInput.newDraft.address}
              </span>
            </div>
            <div className="bg-blue-50/60 p-2.5 rounded border border-blue-200">
              <span className="text-[10px] uppercase font-bold text-blue-800 flex items-center gap-1 mb-1">
                <Camera className="w-3.5 h-3.5 text-blue-600" />
                <span>New Photo / Current Appearance:</span>
              </span>
              <p className="text-[11px] text-blue-900 leading-snug">{currentInput.newDraft.photoDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Gemini AI Analysis Card */}
      {comparisonResult && (
        <div className="bg-white rounded-lg shadow-md border-2 border-purple-500 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <h3 className="font-bold text-sm uppercase tracking-wide">
                  Gemini AI Discrepancy & Objection Analysis
                </h3>
              </div>
              <p className="text-[11px] text-purple-200 mt-0.5">
                Evaluated under Section 5(2) Passports Act 1967 & Chapter 8 Passport Manual Guidelines.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider ${
                comparisonResult.riskLevel === 'HIGH'
                  ? 'bg-red-500 text-white animate-pulse'
                  : comparisonResult.riskLevel === 'MEDIUM'
                  ? 'bg-amber-400 text-slate-900'
                  : 'bg-emerald-500 text-white'
              }`}>
                Risk Level: {comparisonResult.riskLevel}
              </span>
            </div>
          </div>

          <div className="p-5 space-y-4 text-xs">
            {/* 1. Differences Found Table */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wide text-slate-800 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>1. Discrepancies Detected Between Old Passport & Application Draft ({comparisonResult.differencesFound.length})</span>
              </h4>

              {comparisonResult.differencesFound.length === 0 ? (
                <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No discrepancies found. All personal particulars and address match your previous booklet.</span>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold text-[11px] uppercase border-b">
                      <tr>
                        <th className="p-2.5">Field</th>
                        <th className="p-2.5">Old Passport Record</th>
                        <th className="p-2.5">New Application Draft</th>
                        <th className="p-2.5">Impact</th>
                        <th className="p-2.5">Why PSK Officer Will Check</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {comparisonResult.differencesFound.map((diff, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-2.5 font-bold text-slate-900">{diff.field}</td>
                          <td className="p-2.5 text-slate-600 font-mono text-[11px]">{diff.oldValue}</td>
                          <td className="p-2.5 font-mono text-[11px] font-semibold text-blue-900">{diff.newValue}</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              diff.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {diff.impact}
                            </span>
                          </td>
                          <td className="p-2.5 text-[11px] text-slate-600 leading-snug">{diff.officerConcern}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* 2. Anticipated PSK Counter Objections */}
            {comparisonResult.potentialObjections.length > 0 && (
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wide text-slate-800 mb-2 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-blue-700" />
                  <span>2. Anticipated Objections at PSK Counters & Exact Legal Remedies</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {comparisonResult.potentialObjections.map((obj, i) => (
                    <div key={i} className="p-3 rounded-lg border border-red-200 bg-red-50/40 text-xs space-y-1">
                      <div className="flex items-center justify-between text-red-900 font-bold">
                        <span>{obj.counter}</span>
                        <span className="text-[10px] uppercase bg-red-200 text-red-900 px-1.5 py-0.2 rounded font-black">Objection Flag</span>
                      </div>
                      <p className="text-red-950 text-[11px] font-medium leading-snug">{obj.objection}</p>
                      <div className="pt-1.5 text-slate-700 text-[11px] bg-white p-2 rounded border border-red-100">
                        <strong className="text-emerald-800">Legal Remedy:</strong> {obj.remedy}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Appearance, Photo & Police Verification Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-xs space-y-1">
                <span className="font-bold text-blue-950 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-blue-700" />
                  <span>Photo & Appearance Progression Analysis (ICAO 9303):</span>
                </span>
                <p className="text-blue-900 text-[11px] leading-relaxed">
                  {comparisonResult.appearancePhotoAnalysis}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>Police Verification Procedure Impact:</span>
                </span>
                <p className="text-amber-900 text-[11px] leading-relaxed">
                  {comparisonResult.policeVerificationImpact}
                </p>
              </div>
            </div>

            {/* 4. Mandatory Documents to Carry */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>Mandatory Documents to Carry to PSK Counter A (to Prevent Application File Hold):</span>
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-[11px] text-slate-700 pt-1">
                {comparisonResult.mandatoryDocumentsToCarry.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t font-mono">
              <span>Engine: {comparisonResult.modelUsed}</span>
              <span>Analysis Completed: {comparisonResult.timestamp}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
