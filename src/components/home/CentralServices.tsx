import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Clock, FileCheck, CheckCircle2, ChevronRight, ChevronLeft, Award, Globe, Users } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const CentralServices: React.FC = () => {
  const { language } = useAccessibility();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Enhanced Smart Passport Application Experience',
      subtitle: 'Zero Confusion • Real-Time Document Validation • Automatic Local Draft Recovery',
      badge: 'Hackathon Innovation',
      ctaText: 'Start Smart Fresh Passport Journey',
      ctaLink: '/advisor',
      bgGradient: 'from-[#093b74] via-[#0b488f] to-[#1259ad]',
      highlight: 'Personalized checklists eliminate avoidable visits to PSK'
    },
    {
      title: 'Rollout of Next-Generation Biometric e-Passports',
      subtitle: 'Embedded electronic chip conforming to ICAO 9303 international standards',
      badge: 'Govt of India Initiative',
      ctaText: 'Check e-Passport Guidelines',
      ctaLink: '/faq',
      bgGradient: 'from-[#043322] via-[#094c35] to-[#126b4d]',
      highlight: 'Advanced facial & fingerprint biometric security at international border gates'
    },
    {
      title: 'Transparent Appointment Scheduling & Rescheduling',
      subtitle: 'Real-time PSK slot availability with one-click slot management',
      badge: 'Public Grievance Redressal',
      ctaText: 'View Available PSK Slots',
      ctaLink: '/appointment',
      bgGradient: 'from-[#542104] via-[#753008] to-[#9c430e]',
      highlight: 'Directly addressing 5,304 recorded appointment delay grievances'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="space-y-4">
      {/* Central Hero Slider */}
      <div className={`rounded-xl shadow-md overflow-hidden text-white bg-gradient-to-r ${heroSlides[currentSlide].bgGradient} p-6 relative transition-all duration-500`}>
        <div className="flex items-center justify-between mb-3">
          <span className="bg-amber-400 text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3 h-3" />
            {heroSlides[currentSlide].badge}
          </span>
          <div className="flex items-center gap-1.5">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${currentSlide === i ? 'w-6 bg-amber-400' : 'w-2 bg-white/40'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-black font-serif tracking-tight mb-2 leading-snug">
          {heroSlides[currentSlide].title}
        </h2>

        <p className="text-xs md:text-sm text-slate-100 max-w-2xl mb-4 leading-relaxed">
          {heroSlides[currentSlide].subtitle}
        </p>

        <div className="bg-black/25 backdrop-blur-xs border border-white/20 rounded-md px-3 py-2 mb-4 text-xs flex items-center gap-2 max-w-xl">
          <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="text-slate-100 font-medium">
            {heroSlides[currentSlide].highlight}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={heroSlides[currentSlide].ctaLink}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-md shadow-md transition flex items-center gap-2 group"
          >
            <span>{heroSlides[currentSlide].ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/track"
            className="bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs font-semibold px-4 py-2.5 rounded-md transition"
          >
            Track Existing Application
          </Link>
        </div>
      </div>

      {/* Services Grid (Authentic Passport Seva Categories) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#093b74] rounded-xs"></span>
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide font-serif">
              {language === 'hi' ? 'पासपोर्ट सेवाएँ' : 'Passport Services Available Online'}
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Click any service to view eligibility & requirements
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Fresh Passport */}
          <Link
            to="/apply"
            className="p-3.5 rounded-lg border-2 border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-500 transition group flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded bg-blue-700 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-[#093b74] group-hover:text-blue-800">
                  Fresh Passport Application
                </h4>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-emerald-300">
                  Step 1: Auto-Save Form
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Fill Form No. 1 with real-time field validation, Non-ECR guidance, and automatic draft save.
              </p>
            </div>
          </Link>

          {/* Reissue of Passport */}
          <Link
            to="/reissue-check"
            className="p-3.5 rounded-lg border-2 border-purple-200 bg-purple-50/40 hover:bg-purple-50 hover:border-purple-500 transition group flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded bg-purple-800 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-purple-950 group-hover:text-purple-800">
                  Reissue of Passport
                </h4>
                <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-purple-300">
                  Gemini AI Comparison
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Compare old passport photo & details with new draft to detect officer objections before PSK visit.
              </p>
            </div>
          </Link>

          {/* Police Clearance Certificate (PCC) */}
          <div
            onClick={() => alert('Police Clearance Certificate (PCC) is issued for employment, immigration, or education abroad. Fee: ₹500.')}
            className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-900">
                  Police Clearance Certificate (PCC)
                </h4>
                <span className="text-[10px] text-slate-500">₹500 Fee</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Mandatory document issued for Indian nationals travelling abroad for employment or permanent residency.
              </p>
            </div>
          </div>

          {/* Tatkaal Passport Scheme */}
          <Link
            to="/fee-calculator"
            className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-400 transition group flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded bg-amber-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-amber-950">
                  Tatkaal Fast-Track Scheme
                </h4>
                <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-1.5 py-0.2 rounded">
                  1-3 Days Dispatch
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Urgent passport issuance subject to submission of Annexure E and verified proof of address.
              </p>
            </div>
          </Link>
        </div>

        {/* Other Authentic Services row */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
          <span className="font-semibold text-slate-700">Other Services:</span>
          <button onClick={() => alert('Diplomatic / Official Passports are issued by CPV Division, Patiala House, New Delhi for authorized government delegations.')} className="hover:text-blue-700 hover:underline">
            Diplomatic/Official Passport
          </button>
          <span>•</span>
          <button onClick={() => alert('Surrender Certificate / Renunciation of Indian Citizenship fee is ₹1,000.')} className="hover:text-blue-700 hover:underline">
            Surrender Certificate
          </button>
          <span>•</span>
          <button onClick={() => alert('Identity Certificates are issued to Tibetan refugees and stateless persons.')} className="hover:text-blue-700 hover:underline">
            Identity Certificate
          </button>
          <span>•</span>
          <button onClick={() => alert('Background verification for US Global Entry Program (GEP) processed through PSK.')} className="hover:text-blue-700 hover:underline">
            GEP Verification
          </button>
        </div>
      </div>
    </div>
  );
};
