import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, CheckCircle2, AlertTriangle, ArrowRight, Sparkles,
  Download, RefreshCw, FileText, ShieldCheck, CheckSquare, Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApplication } from '../../context/ApplicationContext';
import { PSK_CENTRES, PSKCentre } from '../../data/pskCentres';

export const AppointmentBooking: React.FC = () => {
  const navigate = useNavigate();
  const { currentARN, appointmentSlot, setAppointmentSlot, formData } = useApplication();

  const [selectedPSK, setSelectedPSK] = useState<PSKCentre>(PSK_CENTRES[0]);
  const [selectedDate, setSelectedDate] = useState<string>(PSK_CENTRES[0].availableDates[0].date);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('10:15 AM');
  const [isRescheduling, setIsRescheduling] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(Boolean(appointmentSlot));

  const currentDateObj = selectedPSK.availableDates.find(d => d.date === selectedDate) || selectedPSK.availableDates[0];

  const handleBookSlot = (isRescheduleAction: boolean = false) => {
    const batchNumber = `A-${Math.floor(10 + Math.random() * 40)}`;
    const slotData = {
      pskName: selectedPSK.name,
      pskCode: selectedPSK.code,
      city: selectedPSK.city,
      address: selectedPSK.address,
      date: selectedDate,
      displayDate: currentDateObj.displayDate,
      time: selectedSlotTime,
      batch: batchNumber
    };

    setAppointmentSlot(slotData);
    setBookingSuccess(true);
    setIsRescheduling(false);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-gradient-to-r from-[#1b6b38] via-[#238045] to-[#2e8b57] text-white p-5 rounded-xl shadow-sm border border-emerald-600">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-amber-300 text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3" />
                Module 5 (P1) – Appointment Scheduling & 1-Click Rescheduling
              </span>
              <span className="text-xs text-emerald-100">Directly Solves 5,304 Recorded Delay Grievances</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black font-serif tracking-tight">
              Passport Seva Kendra (PSK) Biometric Appointment Booking
            </h2>
            <p className="text-xs text-emerald-100 mt-1 max-w-2xl leading-relaxed">
              Transparent slot inventory across all Passport Seva Kendras (PSK) and Post Office PSKs (POPSK). Test instant slot booking or effortless 1-click rescheduling.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: PSK Selector, Calendar & Time Slot Matrix (FR-22) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
            <h3 className="font-bold text-sm text-slate-900 font-serif mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Step 1: Select Passport Seva Kendra (PSK / POPSK)</span>
              </span>
              <span className="text-xs text-slate-500 font-mono">ARN: {currentARN}</span>
            </h3>

            {/* PSK Dropdown */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Passport Office & Kendra Location <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedPSK.id}
                onChange={(e) => {
                  const psk = PSK_CENTRES.find(p => p.id === e.target.value) || PSK_CENTRES[0];
                  setSelectedPSK(psk);
                  setSelectedDate(psk.availableDates[0].date);
                }}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-slate-50 font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                {PSK_CENTRES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.city}, {p.state}) - [{p.type}]
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{selectedPSK.address}</span>
              </p>
            </div>

            {/* Date Selection Grid (FR-22) */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>Step 2: Choose Available Appointment Date</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedPSK.availableDates.map((dateObj) => (
                  <button
                    key={dateObj.date}
                    type="button"
                    onClick={() => setSelectedDate(dateObj.date)}
                    className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between ${
                      selectedDate === dateObj.date
                        ? 'border-emerald-600 bg-emerald-50/80 font-bold shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs text-slate-900">{dateObj.displayDate}</span>
                    <span className={`text-[10px] font-semibold mt-1 px-1.5 py-0.2 rounded inline-block w-fit ${
                      dateObj.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {dateObj.normalSlotsAvailable} slots open
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slot Time Picker */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>Step 3: Choose Reporting Time Batch</span>
              </label>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {currentDateObj.slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlotTime(slot)}
                    className={`p-2 text-xs rounded-lg border text-center transition font-mono ${
                      selectedSlotTime === slot
                        ? 'border-emerald-700 bg-emerald-700 text-white font-bold shadow-xs'
                        : 'border-slate-300 hover:bg-emerald-50 text-slate-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Booking action button */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Selected: <strong>{currentDateObj.displayDate}</strong> at <strong>{selectedSlotTime}</strong>
              </span>

              <button
                type="button"
                onClick={() => handleBookSlot(isRescheduling)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition flex items-center gap-2"
              >
                <span>{isRescheduling ? 'Confirm Rescheduled Slot' : 'Confirm Appointment Booking'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Appointment Confirmation Slip & Rescheduling (FR-23, FR-24) */}
        <div className="lg:col-span-5 space-y-4">
          {appointmentSlot ? (
            <div className="bg-white rounded-xl shadow-md border-2 border-emerald-500 p-5 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3 mb-3">
                <div className="flex items-center gap-2 text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-xs uppercase tracking-wide">
                    Appointment Confirmed (FR-23)
                  </span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                  Batch: {appointmentSlot.batch}
                </span>
              </div>

              {/* Official appointment slip particulars */}
              <div className="bg-emerald-50/50 rounded-lg p-3 border border-emerald-200 text-xs space-y-1.5 text-slate-800 mb-3">
                <div><strong>ARN:</strong> <span className="font-mono">{currentARN}</span></div>
                <div><strong>Applicant:</strong> {formData.givenName} {formData.surname || 'AARAV SHARMA'}</div>
                <div><strong>Centre:</strong> {appointmentSlot.pskName}</div>
                <div><strong>Address:</strong> {appointmentSlot.address}</div>
                <div><strong>Appointment Date:</strong> <span className="text-emerald-800 font-bold">{appointmentSlot.displayDate || appointmentSlot.date}</span></div>
                <div><strong>Reporting Time:</strong> <span className="text-emerald-800 font-bold">{appointmentSlot.time}</span> (Arrive 15 mins prior)</div>
              </div>

              {/* Instructions on documents to carry */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-700 mb-4 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1 mb-1">
                  <FileText className="w-3.5 h-3.5 text-blue-700" />
                  <span>Mandatory Items to Carry to PSK:</span>
                </div>
                <div>• Printed copy of this ARN Appointment Slip</div>
                <div>• Original Aadhaar Card / Proof of Present Address</div>
                <div>• Original Date of Birth Proof (Birth Certificate / 10th Pass)</div>
                <div>• Old Passport Book (if applying under Reissue category)</div>
              </div>

              {/* Reschedule demonstration button (FR-24) */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setIsRescheduling(true)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 px-3 rounded-lg transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Demonstrate Rescheduling Slot (FR-24)</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert('Official Appointment Receipt / Token Slip generated for printing (Demo PDF).')}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2 px-3 rounded-lg border border-slate-300 flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print Appointment Slip</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/track')}
                  className="w-full bg-[#093b74] hover:bg-[#07305e] text-white font-bold text-xs py-2.5 px-3 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Track Application Progress (Module 4)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8 text-center text-xs text-slate-500">
              <Calendar className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="font-semibold text-slate-700">No Active Slot Booked Yet</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Select your preferred Kendra and date slot on the left to confirm your appointment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
