import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sparkles, Compass, Upload, FileText, Search, Calendar, CreditCard, Calculator, MapPin, HelpCircle } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const MainNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language } = useAccessibility();

  const navLinks = [
    { to: '/', label: language === 'hi' ? 'मुख्य पृष्ठ' : 'Home' },
    {
      to: '/advisor',
      label: language === 'hi' ? 'दस्तावेज़ सलाहकार' : 'Document Advisor',
      badge: 'Smart P0'
    },
    {
      to: '/upload',
      label: language === 'hi' ? 'दस्तावेज़ अपलोड' : 'Smart Upload & Check',
      badge: 'Gemini AI'
    },
    {
      to: '/reissue-check',
      label: language === 'hi' ? 'पुनर्निर्गम तुलना' : 'Reissue AI Check',
      badge: 'Gemini AI'
    },
    {
      to: '/apply',
      label: language === 'hi' ? 'ऑनलाइन आवेदन' : 'Apply Online',
      badge: 'Auto-Save'
    },
    {
      to: '/track',
      label: language === 'hi' ? 'आवेदन स्थिति' : 'Track Application',
      badge: 'Timeline P0'
    },
    {
      to: '/payment',
      label: language === 'hi' ? 'शुल्क भुगतान' : 'Fee Payment',
      badge: 'Simulated P1'
    },
    {
      to: '/appointment',
      label: language === 'hi' ? 'अपॉइंटमेंट' : 'Appointments & Slots'
    },
    {
      to: '/fee-calculator',
      label: language === 'hi' ? 'शुल्क कैलकुलेटर' : 'Fee Calculator'
    },
    {
      to: '/locate-centre',
      label: language === 'hi' ? 'केन्द्र खोजें' : 'Locate PSK'
    },
    {
      to: '/faq',
      label: language === 'hi' ? 'सामान्य प्रश्न' : 'FAQ'
    }
  ];

  return (
    <nav className="bg-[#093b74] text-white border-b-2 border-amber-500 shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 overflow-x-auto py-0.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2.5 text-xs font-semibold tracking-wide uppercase transition-colors relative flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#05264c] text-amber-300 border-b-2 border-amber-400'
                    : 'text-slate-100 hover:bg-[#0d478a] hover:text-white'
                }`
              }
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center justify-between w-full py-2">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Passport Seva Menu
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded bg-[#05264c] text-white hover:bg-[#073262]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#05264c] border-t border-blue-900 px-4 py-2 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded text-xs font-medium ${
                  isActive
                    ? 'bg-[#093b74] text-amber-300 font-bold'
                    : 'text-slate-200 hover:bg-[#08305e]'
                }`
              }
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};
