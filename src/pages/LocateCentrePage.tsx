import React, { useState } from 'react';
import { MapPin, Search, Phone, Calendar, Clock, Building, ArrowRight } from 'lucide-react';
import { PSK_CENTRES, PSKCentre } from '../data/pskCentres';
import { Link } from 'react-router-dom';

export const LocateCentrePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const states = ['All', 'Delhi', 'Karnataka', 'Maharashtra', 'Haryana', 'Uttar Pradesh'];

  const filteredCentres = PSK_CENTRES.filter(centre => {
    const matchesState = selectedState === 'All' || centre.state === selectedState;
    const matchesSearch = centre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          centre.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          centre.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1b6b38] to-[#2e8b57] text-white p-5 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-5 h-5 text-amber-300" />
          <h2 className="text-xl font-bold font-serif">Locate Passport Seva Kendra (PSK / POPSK)</h2>
        </div>
        <p className="text-xs text-emerald-100">
          Find your nearest passport office, operational hours, address, and live appointment slot availability.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by city, centre name or landmark..."
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="font-bold text-slate-700 whitespace-nowrap">Filter State:</span>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="p-2 border border-slate-300 rounded-lg bg-slate-50 font-medium w-full sm:w-auto"
          >
            {states.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Centres List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCentres.map((centre) => (
          <div key={centre.id} className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    centre.type === 'PSK' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {centre.type} (Code: {centre.code})
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">
                    {centre.name}
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {centre.city}, {centre.state}
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-3 flex items-start gap-1.5 leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{centre.address}</span>
              </p>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1 mb-4">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Working Hours: 09:00 AM – 05:30 PM (Mon to Fri)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Next Available Normal Slot: <strong>{centre.availableDates[0].displayDate}</strong></span>
                </div>
              </div>
            </div>

            <Link
              to="/appointment"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-3 rounded-lg transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Book Appointment at this Kendra</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
