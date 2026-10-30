export interface PSKCentre {
  id: string;
  name: string;
  code: string;
  state: string;
  city: string;
  address: string;
  type: 'PSK' | 'POPSK';
  availableDates: {
    date: string;
    displayDate: string;
    status: 'available' | 'few_slots' | 'full';
    normalSlotsAvailable: number;
    tatkaalSlotsAvailable: number;
    slots: string[];
  }[];
}

export const PSK_CENTRES: PSKCentre[] = [
  {
    id: 'psk_delhi_herald',
    name: 'PSK New Delhi - Herald House',
    code: 'DL-01',
    state: 'Delhi',
    city: 'New Delhi',
    address: 'Herald House, 5A, Bahadur Shah Zafar Marg, ITO, New Delhi - 110002',
    type: 'PSK',
    availableDates: [
      {
        date: '2026-11-04',
        displayDate: 'Wed, 04 Nov 2026',
        status: 'available',
        normalSlotsAvailable: 42,
        tatkaalSlotsAvailable: 15,
        slots: ['09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM', '02:00 PM', '02:45 PM', '03:30 PM']
      },
      {
        date: '2026-11-05',
        displayDate: 'Thu, 05 Nov 2026',
        status: 'available',
        normalSlotsAvailable: 68,
        tatkaalSlotsAvailable: 22,
        slots: ['09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM', '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM']
      },
      {
        date: '2026-11-06',
        displayDate: 'Fri, 06 Nov 2026',
        status: 'few_slots',
        normalSlotsAvailable: 8,
        tatkaalSlotsAvailable: 2,
        slots: ['02:45 PM', '03:30 PM']
      },
      {
        date: '2026-11-09',
        displayDate: 'Mon, 09 Nov 2026',
        status: 'available',
        normalSlotsAvailable: 110,
        tatkaalSlotsAvailable: 35,
        slots: ['09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM', '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM']
      }
    ]
  },
  {
    id: 'psk_bengaluru_lalbagh',
    name: 'PSK Bengaluru - Lalbagh Road',
    code: 'KA-01',
    state: 'Karnataka',
    city: 'Bengaluru',
    address: 'Sai Arcade, 56/P, Devarabisanahalli, Outer Ring Road & Lalbagh Fort Rd, Bengaluru - 560004',
    type: 'PSK',
    availableDates: [
      {
        date: '2026-11-04',
        displayDate: 'Wed, 04 Nov 2026',
        status: 'available',
        normalSlotsAvailable: 55,
        tatkaalSlotsAvailable: 18,
        slots: ['09:15 AM', '10:00 AM', '10:45 AM', '11:30 AM', '01:45 PM', '02:30 PM', '03:15 PM']
      },
      {
        date: '2026-11-05',
        displayDate: 'Thu, 05 Nov 2026',
        status: 'available',
        normalSlotsAvailable: 84,
        tatkaalSlotsAvailable: 25,
        slots: ['09:15 AM', '10:00 AM', '10:45 AM', '11:30 AM', '01:45 PM', '02:30 PM', '03:15 PM', '04:00 PM']
      },
      {
        date: '2026-11-06',
        displayDate: 'Fri, 06 Nov 2026',
        status: 'few_slots',
        normalSlotsAvailable: 12,
        tatkaalSlotsAvailable: 5,
        slots: ['02:30 PM', '03:15 PM']
      }
    ]
  },
  {
    id: 'psk_mumbai_lower_parel',
    name: 'PSK Mumbai - Lower Parel',
    code: 'MH-01',
    state: 'Maharashtra',
    city: 'Mumbai',
    address: 'Trade World, D-Wing, Ground Floor, Kamala Mills Compound, Senapati Bapat Marg, Lower Parel (W), Mumbai - 400013',
    type: 'PSK',
    availableDates: [
      {
        date: '2026-11-04',
        displayDate: 'Wed, 04 Nov 2026',
        status: 'available',
        normalSlotsAvailable: 34,
        tatkaalSlotsAvailable: 10,
        slots: ['09:45 AM', '10:30 AM', '11:15 AM', '02:15 PM', '03:00 PM']
      },
      {
        date: '2026-11-05',
        displayDate: 'Thu, 05 Nov 2026',
        status: 'available',
        normalSlotsAvailable: 60,
        tatkaalSlotsAvailable: 20,
        slots: ['09:45 AM', '10:30 AM', '11:15 AM', '12:00 PM', '02:15 PM', '03:00 PM', '03:45 PM']
      }
    ]
  },
  {
    id: 'psk_gurugram',
    name: 'PSK Gurugram - MM Tower',
    code: 'HR-01',
    state: 'Haryana',
    city: 'Gurugram',
    address: 'MM Tower, Plot No. 8 & 9, Sub. Major Laxmi Chand Rd, Sector 18, Udyog Vihar, Gurugram - 122015',
    type: 'PSK',
    availableDates: [
      {
        date: '2026-11-04',
        displayDate: 'Wed, 04 Nov 2026',
        status: 'available',
        normalSlotsAvailable: 40,
        tatkaalSlotsAvailable: 12,
        slots: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM']
      },
      {
        date: '2026-11-05',
        displayDate: 'Thu, 05 Nov 2026',
        status: 'available',
        normalSlotsAvailable: 75,
        tatkaalSlotsAvailable: 24,
        slots: ['09:30 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:00 PM', '04:00 PM']
      }
    ]
  },
  {
    id: 'popsk_noida',
    name: 'POPSK Noida - Head Post Office',
    code: 'UP-02',
    state: 'Uttar Pradesh',
    city: 'Noida',
    address: 'Head Post Office Campus, Sector 19, Noida, Uttar Pradesh - 201301',
    type: 'POPSK',
    availableDates: [
      {
        date: '2026-11-05',
        displayDate: 'Thu, 05 Nov 2026',
        status: 'available',
        normalSlotsAvailable: 30,
        tatkaalSlotsAvailable: 0, // POPSK typically normal only
        slots: ['10:00 AM', '11:00 AM', '12:00 PM', '02:30 PM']
      }
    ]
  }
];
