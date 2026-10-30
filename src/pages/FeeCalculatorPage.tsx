import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import { calculatePassportFee, FeeCalculationParams } from '../data/feeStructure';
import { Link } from 'react-router-dom';

export const FeeCalculatorPage: React.FC = () => {
  const [params, setParams] = useState<FeeCalculationParams>({
    service: 'fresh',
    ageGroup: 'adult',
    pages: 36,
    scheme: 'normal',
    optSmsAlerts: true
  });

  const calculation = calculatePassportFee(params);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#093b74] to-[#0d4d96] text-white p-5 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="w-5 h-5 text-amber-300" />
          <h2 className="text-xl font-bold font-serif">Passport Seva Fee Calculator</h2>
        </div>
        <p className="text-xs text-blue-100">
          Compute the official government fee payable for various passport categories, pages, and delivery schemes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Form controls */}
        <div className="md:col-span-7 bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Passport Service</label>
            <select
              value={params.service}
              onChange={(e) => setParams(prev => ({ ...prev, service: e.target.value as any }))}
              className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 font-medium"
            >
              <option value="fresh">Fresh Passport</option>
              <option value="reissue">Reissue of Passport</option>
              <option value="pcc">Police Clearance Certificate (PCC)</option>
              <option value="surrender">Surrender Certificate / Renunciation</option>
            </select>
          </div>

          {params.service !== 'pcc' && params.service !== 'surrender' && (
            <>
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Applicant Age Group</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setParams(prev => ({ ...prev, ageGroup: 'adult' }))}
                    className={`p-2 rounded-lg border text-center font-medium ${
                      params.ageGroup === 'adult' ? 'bg-[#093b74] text-white border-[#093b74] font-bold' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Adult (18-59)
                  </button>
                  <button
                    type="button"
                    onClick={() => setParams(prev => ({ ...prev, ageGroup: 'minor' }))}
                    className={`p-2 rounded-lg border text-center font-medium ${
                      params.ageGroup === 'minor' ? 'bg-[#093b74] text-white border-[#093b74] font-bold' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Minor (&lt;18)
                  </button>
                  <button
                    type="button"
                    onClick={() => setParams(prev => ({ ...prev, ageGroup: 'senior' }))}
                    className={`p-2 rounded-lg border text-center font-medium ${
                      params.ageGroup === 'senior' ? 'bg-[#093b74] text-white border-[#093b74] font-bold' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Senior (60+)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Application Scheme</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setParams(prev => ({ ...prev, scheme: 'normal' }))}
                    className={`p-2 rounded-lg border text-center font-medium ${
                      params.scheme === 'normal' ? 'bg-blue-800 text-white border-blue-800 font-bold' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Normal (Standard)
                  </button>
                  <button
                    type="button"
                    onClick={() => setParams(prev => ({ ...prev, scheme: 'tatkaal' }))}
                    className={`p-2 rounded-lg border text-center font-medium ${
                      params.scheme === 'tatkaal' ? 'bg-amber-600 text-white border-amber-600 font-bold' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Tatkaal (Fast Track)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Booklet Size</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setParams(prev => ({ ...prev, pages: 36 }))}
                    className={`p-2 rounded-lg border text-center font-medium ${
                      params.pages === 36 ? 'bg-blue-800 text-white border-blue-800 font-bold' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    36 Pages
                  </button>
                  <button
                    type="button"
                    onClick={() => setParams(prev => ({ ...prev, pages: 60 }))}
                    className={`p-2 rounded-lg border text-center font-medium ${
                      params.pages === 60 ? 'bg-blue-800 text-white border-blue-800 font-bold' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    60 Pages (Jumbo)
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-800">SMS Notification Alert Service</div>
              <div className="text-[10px] text-slate-500">Real-time SMS updates at every step (+₹50)</div>
            </div>
            <input
              type="checkbox"
              checked={params.optSmsAlerts}
              onChange={(e) => setParams(prev => ({ ...prev, optSmsAlerts: e.target.checked }))}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </div>
        </div>

        {/* Calculated Output Card */}
        <div className="md:col-span-5 bg-white rounded-xl shadow-md border-2 border-blue-200 p-5 space-y-4 text-xs">
          <h3 className="font-bold text-sm text-[#093b74] font-serif border-b border-slate-200 pb-2.5">
            Applicable Fee Breakdown
          </h3>

          <div className="space-y-2.5">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Base Application Fee:</span>
              <span className="font-mono font-bold">₹{calculation.baseFee}</span>
            </div>

            {calculation.tatkaalSurcharge > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-100 text-amber-800">
                <span>Tatkaal Surcharge:</span>
                <span className="font-mono font-bold">+₹{calculation.tatkaalSurcharge}</span>
              </div>
            )}

            <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
              <span>SMS Alert Fee:</span>
              <span className="font-mono font-bold">+₹{calculation.smsFee}</span>
            </div>

            <div className="flex justify-between py-3 border-t-2 border-slate-200 text-base font-bold text-slate-900">
              <span>Total Payable Amount:</span>
              <span className="font-mono text-emerald-700 text-lg">₹{calculation.totalFee}</span>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-[11px] text-blue-900 leading-snug">
            <strong>Payment Modes Accepted:</strong> SBI Internet Banking, Debit/Credit Cards, UPI QR, or SBI branch challan.
          </div>

          <Link
            to="/apply"
            className="w-full bg-[#093b74] hover:bg-[#07305e] text-white font-bold text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>Proceed to Online Application</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
