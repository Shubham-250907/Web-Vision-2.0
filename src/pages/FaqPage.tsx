import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, FileText } from 'lucide-react';
import { FAQ_DATA, FaqItem } from '../data/faqData';

export const FaqPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const categories = ['All', 'General', 'Documents', 'Appointments', 'Payment', 'Police Verification'];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#093b74] to-[#005a9e] text-white p-5 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <HelpCircle className="w-5 h-5 text-amber-300" />
          <h2 className="text-xl font-bold font-serif">Frequently Asked Questions (FAQ)</h2>
        </div>
        <p className="text-xs text-blue-100">
          Find answers to common citizen queries regarding passport applications, document requirements, appointments, and fees.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 space-y-3 text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions by keyword (e.g. tatkaal, aadhaar, rescheduling, payment)..."
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition border ${
                activeCategory === cat
                  ? 'bg-[#093b74] text-white border-[#093b74]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = expandedId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setExpandedId(isOpen ? null : faq.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                  <span className="font-bold text-xs text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                </div>
                <div className="text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  <p>{faq.answer}</p>
                  <div className="mt-2 text-[10px] text-slate-400 font-medium">
                    Category: {faq.category} • Passport Seva Official Guidelines
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
