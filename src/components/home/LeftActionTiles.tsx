import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, LogIn, Calendar, Search, ArrowRight, ShieldCheck, CheckCircle2, Lock, X, RefreshCw } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const LeftActionTiles: React.FC = () => {
  const { language } = useAccessibility();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('demo.citizen@gmail.com');
  const [captchaInput, setCaptchaInput] = useState('8K29M');
  const [captchaCode, setCaptchaCode] = useState('8K29M');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let res = '';
    for (let i = 0; i < 5; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(res);
    setCaptchaInput(res); // Convenience for quick demo
  };

  const handleSimulatedLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setShowLoginModal(false);
      navigate('/apply');
    }, 700);
  };

  return (
    <div className="space-y-3.5">
      {/* 1. New User Registration */}
      <div className="bg-gradient-to-r from-[#005a9e] to-[#0078d4] text-white rounded-lg shadow-sm overflow-hidden border border-blue-400 group hover:shadow-md transition">
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-blue-100 font-semibold">
                {language === 'hi' ? 'नया उपयोगकर्ता?' : 'First Time User?'}
              </div>
              <div className="font-bold text-sm text-white">
                {language === 'hi' ? 'उपयोगकर्ता पंजीकरण' : 'New User Registration'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="bg-white text-[#005a9e] font-bold text-xs px-3 py-1.5 rounded shadow hover:bg-blue-50 transition flex items-center gap-1"
          >
            <span>Register</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Existing User Login */}
      <div className="bg-gradient-to-r from-[#093b74] to-[#0d4d96] text-white rounded-lg shadow-sm overflow-hidden border border-blue-500 group hover:shadow-md transition">
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <LogIn className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-blue-200 font-semibold">
                {language === 'hi' ? 'मौजूदा उपयोगकर्ता?' : 'Registered User?'}
              </div>
              <div className="font-bold text-sm text-white">
                {language === 'hi' ? 'लॉग इन करें' : 'Existing User Login'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-amber-400 text-slate-900 font-bold text-xs px-3 py-1.5 rounded shadow hover:bg-amber-300 transition flex items-center gap-1"
          >
            <span>Login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Check Appointment Availability */}
      <div className="bg-gradient-to-r from-[#1b6b38] to-[#2e8b57] text-white rounded-lg shadow-sm overflow-hidden border border-emerald-500 group hover:shadow-md transition">
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-emerald-100 font-semibold">
                {language === 'hi' ? 'अपॉइंटमेंट स्लॉट' : 'Live Slot Matrix'}
              </div>
              <div className="font-bold text-sm text-white">
                {language === 'hi' ? 'उपलब्धता जांचें' : 'Check Appointment Availability'}
              </div>
            </div>
          </div>
          <Link
            to="/appointment"
            className="bg-white text-emerald-800 font-bold text-xs px-3 py-1.5 rounded shadow hover:bg-emerald-50 transition flex items-center gap-1"
          >
            <span>Check</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4. Track Application Status */}
      <div className="bg-gradient-to-r from-[#b34700] to-[#e46a1b] text-white rounded-lg shadow-sm overflow-hidden border border-orange-400 group hover:shadow-md transition">
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-orange-100 font-semibold">
                {language === 'hi' ? 'आवेदन स्थिति' : 'Live Timeline P0'}
              </div>
              <div className="font-bold text-sm text-white">
                {language === 'hi' ? 'आवेदन ट्रैक करें' : 'Track Application Status'}
              </div>
            </div>
          </div>
          <Link
            to="/track"
            className="bg-white text-orange-900 font-bold text-xs px-3 py-1.5 rounded shadow hover:bg-orange-50 transition flex items-center gap-1"
          >
            <span>Track</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 5. Authentic "Before You Apply" Information Box */}
      <div className="bg-[#f8fafc] rounded-lg p-3.5 border border-slate-300 text-xs shadow-2xs">
        <div className="font-bold text-[#003366] text-xs uppercase tracking-wide border-b border-slate-200 pb-1.5 mb-2 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Before You Apply Guidelines</span>
        </div>
        <ul className="space-y-1.5 text-[11px] text-slate-700">
          <li className="flex items-start gap-1">
            <span className="text-[#003366] font-bold">•</span>
            <span>Check your document readiness using the <strong>Smart Advisor</strong>.</span>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-[#003366] font-bold">•</span>
            <span>For Reissue, test discrepancies with <strong>Gemini AI</strong>.</span>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-[#003366] font-bold">•</span>
            <span>Carry original documents to PSK on appointment day.</span>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-[#003366] font-bold">•</span>
            <span>No fee is charged for user registration.</span>
          </li>
        </ul>
      </div>

      {/* Simulated Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full border-t-4 border-[#093b74] overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-[#093b74] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-300" />
                <h3 className="font-bold text-sm font-serif">Passport Seva – User Login</h3>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSimulatedLogin} className="p-5 space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-2.5 rounded text-xs text-blue-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Prototype Demo Account:</strong> Pre-filled for convenience. You can click Login directly to jump straight into the application.
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Login ID / Registered Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  defaultValue="Demo@Gov2026"
                  className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Security Captcha <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-slate-200 border border-slate-400 font-mono font-black text-lg px-4 py-1.5 tracking-widest text-slate-800 select-none italic line-through decoration-slate-500">
                    {captchaCode}
                  </div>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="p-1.5 border border-slate-300 rounded hover:bg-slate-100 text-slate-600"
                    title="Refresh Captcha"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter characters displayed above"
                  className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none uppercase"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href="#forgot"
                  onClick={(e) => { e.preventDefault(); alert('Password reset link sent to demo registered email.'); }}
                  className="text-xs text-blue-700 hover:underline"
                >
                  Forgot Password?
                </a>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="bg-[#093b74] text-white px-5 py-2 rounded text-xs font-bold hover:bg-[#062952] transition flex items-center gap-1.5"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simulated Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full border-t-4 border-[#005a9e] overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-[#005a9e] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-amber-300" />
                <h3 className="font-bold text-sm font-serif">User Registration (Simulated)</h3>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3.5">
              <p className="text-xs text-slate-600">
                Register to apply for Fresh Passport, Reissue, PCC, or Diplomatic travel document.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Passport Office Jurisdiction</label>
                <select className="w-full text-xs p-2 border border-slate-300 rounded">
                  <option>RPO Delhi (NCT of Delhi, Gurugram, Faridabad)</option>
                  <option>RPO Bengaluru (Karnataka State)</option>
                  <option>RPO Mumbai (Mumbai Metropolitan Region)</option>
                  <option>RPO Kolkata (West Bengal, Sikkim)</option>
                  <option>RPO Chennai (Tamil Nadu, Puducherry)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Given Name</label>
                  <input type="text" defaultValue="Aarav" className="w-full text-xs p-2 border border-slate-300 rounded" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Surname</label>
                  <input type="text" defaultValue="Sharma" className="w-full text-xs p-2 border border-slate-300 rounded" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
                <input type="date" defaultValue="1998-05-14" className="w-full text-xs p-2 border border-slate-300 rounded" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email ID</label>
                <input type="email" defaultValue="aarav.sharma.demo@gmail.com" className="w-full text-xs p-2 border border-slate-300 rounded" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-xs text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('Registration complete! Verification email simulated. You can now use the portal.');
                    setShowRegisterModal(false);
                    navigate('/apply');
                  }}
                  className="bg-[#005a9e] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-blue-800 transition"
                >
                  Complete Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
