import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard, CheckCircle2, AlertTriangle, RefreshCw, ArrowRight, ShieldCheck,
  Building, QrCode, Download, FileText, Sparkles, Clock, Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApplication } from '../../context/ApplicationContext';
import { PaymentDetails } from '../../types';

export const PaymentGatewaySimulation: React.FC = () => {
  const navigate = useNavigate();
  const { currentARN, formData, paymentDetails, setPaymentDetails } = useApplication();

  const [paymentMode, setPaymentMode] = useState<'sbi_epay' | 'upi' | 'net_banking' | 'debit_card'>('sbi_epay');
  const [paymentStatus, setPaymentStatus] = useState<'IDLE' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'>('IDLE');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const baseFee = formData.passportType === 'tatkaal' ? 3500 : 1500;
  const smsFee = 50;
  const totalAmount = baseFee + smsFee;

  const handleSimulatePayment = (simulatedOutcome: 'SUCCESS' | 'FAILED' | 'REFUNDED') => {
    setIsProcessing(true);
    setPaymentStatus('PENDING');

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus(simulatedOutcome);

      if (simulatedOutcome === 'SUCCESS') {
        const txnId = `TXN-SBI-${Math.floor(100000000 + Math.random() * 900000000)}`;
        const receiptNo = `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
        const details: PaymentDetails = {
          arn: currentARN,
          transactionId: txnId,
          paymentMode,
          amount: totalAmount,
          currency: 'INR',
          status: 'SUCCESS',
          timestamp: new Date().toLocaleString(),
          receiptNumber: receiptNo,
          breakdown: {
            applicationFee: baseFee,
            smsAlertFee: smsFee,
            tax: 0
          }
        };
        setPaymentDetails(details);

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // fallback
        }
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-gradient-to-r from-[#093b74] via-[#0d4d96] to-[#1259ad] text-white p-5 rounded-xl shadow-sm border border-blue-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-amber-400 text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3" />
                Module 5 (P1) – Transparent Payment Simulation
              </span>
              <span className="text-xs text-blue-200">SBI ePay & UPI Integration Simulation</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black font-serif tracking-tight">
              Passport Fee Payment & Electronic Receipt
            </h2>
            <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed">
              Demonstrates simulated payment gateway transitions (Success, Failure & Recovery, and Refund initiated) without charging actual citizen bank accounts.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Payment Options & Fee Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
            <h3 className="font-bold text-sm text-slate-900 font-serif mb-4 flex items-center justify-between">
              <span>Select Online Payment Mechanism</span>
              <span className="text-xs text-slate-500 font-mono">ARN: {currentARN}</span>
            </h3>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMode('sbi_epay')}
                className={`p-3 rounded-lg border text-center transition flex flex-col items-center gap-1.5 ${
                  paymentMode === 'sbi_epay'
                    ? 'border-blue-700 bg-blue-50 font-bold text-blue-900 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Building className="w-5 h-5 text-blue-700" />
                <span>SBI ePay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('upi')}
                className={`p-3 rounded-lg border text-center transition flex flex-col items-center gap-1.5 ${
                  paymentMode === 'upi'
                    ? 'border-blue-700 bg-blue-50 font-bold text-blue-900 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <QrCode className="w-5 h-5 text-purple-700" />
                <span>BHIM / UPI QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('net_banking')}
                className={`p-3 rounded-lg border text-center transition flex flex-col items-center gap-1.5 ${
                  paymentMode === 'net_banking'
                    ? 'border-blue-700 bg-blue-50 font-bold text-blue-900 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Building className="w-5 h-5 text-emerald-700" />
                <span>Internet Banking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('debit_card')}
                className={`p-3 rounded-lg border text-center transition flex flex-col items-center gap-1.5 ${
                  paymentMode === 'debit_card'
                    ? 'border-blue-700 bg-blue-50 font-bold text-blue-900 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-orange-700" />
                <span>Debit / Cards</span>
              </button>
            </div>

            {/* UPI QR Simulation */}
            {paymentMode === 'upi' && (
              <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 text-center mb-4 text-xs">
                <div className="font-bold text-purple-900 mb-1">Scan QR Code via any UPI App</div>
                <div className="text-[11px] text-purple-700 mb-3">Google Pay, PhonePe, Paytm, or BHIM</div>
                <div className="w-36 h-36 mx-auto bg-white p-2 rounded-lg border-2 border-purple-300 shadow-sm flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-1 w-full h-full p-2 bg-slate-900 rounded">
                    <div className="bg-white col-span-2 row-span-2 rounded-xs"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white col-span-2 row-span-2 rounded-xs"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                  </div>
                </div>
                <div className="font-mono text-[11px] text-slate-600 mt-2">
                  UPI ID: passportseva@sbi • Amount: ₹{totalAmount}
                </div>
              </div>
            )}

            {/* Evaluator Simulation Triggers (FR-20) */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 text-xs">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Demonstration Control Panel (FR-20):</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Test how the UI handles each payment state as defined in acceptance criteria.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleSimulatePayment('SUCCESS')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-3 rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Simulate Success</span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleSimulatePayment('FAILED')}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-3 rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Simulate Failure</span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleSimulatePayment('REFUNDED')}
                  className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-3 rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Simulate Refund</span>
                </button>
              </div>

              {isProcessing && (
                <div className="mt-3 flex items-center justify-center gap-2 text-blue-700 font-semibold">
                  <div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
                  <span>Contacting SBI Payment Gateway & Generating Receipt...</span>
                </div>
              )}
            </div>

            {/* Payment Failure Explanation & Auto-Recovery Banner */}
            {paymentStatus === 'FAILED' && (
              <div className="p-4 rounded-xl bg-red-50 border-2 border-red-300 text-xs text-red-900 animate-in fade-in">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[13px] mb-1">
                      Transaction Failed: Bank Server Timeout (Error code: SBI-ERR-902)
                    </div>
                    <p className="text-[11px] leading-relaxed mb-2">
                      No funds were debited. If money was deducted, our automated reconciliation will credit it back to your source account within 48 hours without filing a grievance.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSimulatePayment('SUCCESS')}
                      className="bg-red-700 hover:bg-red-800 text-white font-bold px-3 py-1 rounded text-[11px] transition"
                    >
                      Retry Instant Payment (Auto-Recover)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Refund Initiated Banner */}
            {paymentStatus === 'REFUNDED' && (
              <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-xs text-amber-900 animate-in fade-in">
                <div className="flex items-start gap-2.5">
                  <RefreshCw className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[13px] mb-1">
                      Refund Initiated: Reference REF-2026-88192
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      The amount of ₹{totalAmount} has been queued for reversal via RBI NACH gateway. Expected settlement in 2 business days.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Fee Breakdown & Payment Receipt (FR-21) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Fee Breakdown Box */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
            <h4 className="font-bold text-xs uppercase tracking-wide text-slate-800 font-serif mb-3 flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-blue-700" />
              <span>Payment Particulars & Breakdown</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Application Type:</span>
                <span className="font-semibold">{formData.applicationType === 'fresh' ? 'Fresh Passport' : 'Reissue'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Scheme & Booklet:</span>
                <span className="font-semibold">{formData.passportType.toUpperCase()} ({formData.bookletPages} Pages)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Passport Application Fee:</span>
                <span className="font-mono font-semibold">₹{baseFee}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">SMS Notification Alert Fee:</span>
                <span className="font-mono font-semibold">₹{smsFee}</span>
              </div>
              <div className="flex justify-between py-2 border-t-2 border-slate-200 text-sm font-bold text-slate-900">
                <span>Total Amount Payable:</span>
                <span className="font-mono text-emerald-700">₹{totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Confirmation Receipt (FR-21) */}
          {(paymentStatus === 'SUCCESS' || paymentDetails) && (
            <div className="bg-white rounded-xl shadow-md border-2 border-emerald-400 p-5 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3 mb-3">
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-xs uppercase tracking-wide">
                    Payment Successful (FR-21)
                  </span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Confirmed
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 mb-4 font-mono">
                <div><strong>Transaction ID:</strong> {paymentDetails?.transactionId || 'TXN-SBI-89218204'}</div>
                <div><strong>Receipt No:</strong> {paymentDetails?.receiptNumber || 'REC-2026-10492'}</div>
                <div><strong>Amount Paid:</strong> ₹{totalAmount}</div>
                <div><strong>Date & Time:</strong> {paymentDetails?.timestamp || new Date().toLocaleString()}</div>
                <div><strong>Status:</strong> <span className="text-emerald-700 font-bold">SETTLEMENT SUCCESS</span></div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => alert('Official Passport Seva e-Challan / Tax Invoice downloaded (Demo PDF).')}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2 rounded-lg border border-slate-300 flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Payment Receipt (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/appointment')}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-lg shadow-sm transition flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Book Appointment Slot (P1)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
