import { ApplicationTrackingRecord } from '../types';

export const INITIAL_TRACKING_RECORDS: Record<string, ApplicationTrackingRecord> = {
  DEMO1001: {
    arn: 'DEMO1001',
    fileNumber: 'DL1062947192026',
    applicantName: 'PRIYA SHARMA',
    applicationType: 'Fresh Passport (Normal - 36 Pages)',
    appliedDate: '24-Oct-2026',
    currentStatus: 'Appointment Scheduled at PSK',
    currentStatusDesc: 'Your biometric appointment is scheduled at Passport Seva Kendra (PSK) Herald House, ITO, New Delhi on Wednesday, 05-Nov-2026 at 10:15 AM (Batch: A-14).',
    statusCode: 'APPOINTMENT_SCHEDULED',
    nextExpectedAction: 'Visit PSK Herald House with printed ARN slip and original physical documents.',
    applicantActionRequired: 'Carry Original Aadhaar, Class 10th Certificate, and 2 recent passport-size photographs (in case biometric facial scanner needs verification).',
    lastUpdated: '28-Oct-2026 14:30 IST',
    timelineStages: [
      { stageId: 1, title: 'Application Submitted', description: 'Application submitted online successfully.', timestamp: '24-Oct-2026 11:20 AM', status: 'completed' },
      { stageId: 2, title: 'Fee Payment Confirmed', description: 'Payment of ₹1,500 received via SBI Internet Banking.', timestamp: '24-Oct-2026 11:25 AM', status: 'completed' },
      { stageId: 3, title: 'Appointment Scheduled', description: 'Slot confirmed at PSK New Delhi Herald House for 05-Nov-2026.', timestamp: '24-Oct-2026 11:32 AM', status: 'current' },
      { stageId: 4, title: 'Document Scrutiny (PSK)', description: 'Biometric capture, photo & document verification at Counters A, B & C.', status: 'pending' },
      { stageId: 5, title: 'Police Verification', description: 'Address & antecedents inquiry by assigned local Police Station.', status: 'pending' },
      { stageId: 6, title: 'Passport Printing', description: 'Security printing and electronic chip encoding at India Security Press, Nashik.', status: 'pending' },
      { stageId: 7, title: 'Dispatched via Speed Post', description: 'Postal tracking ID generation and handover to India Post.', status: 'pending' },
      { stageId: 8, title: 'Passport Delivered', description: 'Physical delivery to registered residence address.', status: 'pending' }
    ],
    statusHistory: [
      { date: '28-Oct-2026 14:30', status: 'Appointment Reminder Sent', location: 'System Automated MEA Gateway', remarks: 'SMS reminder triggered to registered mobile 98******10.' },
      { date: '24-Oct-2026 11:32', status: 'Appointment Booked', location: 'PSK Herald House, New Delhi', remarks: 'Batch A-14 allotted. Reporting time 10:00 AM.' },
      { date: '24-Oct-2026 11:25', status: 'Payment Successful', location: 'SBI ePay Gateway', remarks: 'TXN: CPB391823901. Status: Settlement complete.' },
      { date: '24-Oct-2026 11:20', status: 'Application Saved & ARN Generated', location: 'Passport Seva Portal', remarks: 'Form validation score: 100% complete.' }
    ],
    notifications: [
      { id: 'notif-1', timestamp: '28-Oct-2026 14:30', channel: 'SMS', content: 'MEA ALERT: Dear Priya, your PSK appointment at Herald House New Delhi is on 05-Nov-2026 at 10:15 AM. Report 15 mins prior with original docs.' },
      { id: 'notif-2', timestamp: '24-Oct-2026 11:25', channel: 'EMAIL', content: 'Payment of Rs. 1500 for ARN DEMO1001 confirmed. Receipt reference: REC-2026-99214.' }
    ]
  },

  DEMO1002: {
    arn: 'DEMO1002',
    fileNumber: 'DL1062947192027',
    applicantName: 'ROHIT VERMA',
    applicationType: 'Passport Reissue (Exhaustion of Pages)',
    appliedDate: '12-Oct-2026',
    currentStatus: 'Police Verification in Progress',
    currentStatusDesc: 'Police Verification Request has been dispatched to Special Branch / Hauz Khas Police Station, South Delhi. Local beat officer has been assigned.',
    statusCode: 'POLICE_VERIFICATION',
    nextExpectedAction: 'Verification officer will visit your residence or summon you for brief document verification.',
    applicantActionRequired: 'Keep self-attested copies of address proof, current utility bill, and contact numbers of two local neighbours ready.',
    lastUpdated: '29-Oct-2026 16:45 IST',
    timelineStages: [
      { stageId: 1, title: 'Application Submitted', description: 'Application submitted online.', timestamp: '12-Oct-2026 10:05 AM', status: 'completed' },
      { stageId: 2, title: 'Fee Payment Confirmed', description: '₹2,000 paid for 60-page Jumbo booklet.', timestamp: '12-Oct-2026 10:10 AM', status: 'completed' },
      { stageId: 3, title: 'Appointment Completed', description: 'Attended PSK Gurugram.', timestamp: '18-Oct-2026 11:00 AM', status: 'completed' },
      { stageId: 4, title: 'Document Scrutiny (PSK)', description: 'Biometrics recorded, old passport stamped CANCELLED.', timestamp: '18-Oct-2026 12:30 PM', status: 'completed' },
      { stageId: 5, title: 'Police Verification', description: 'File pending at Hauz Khas Police Station for physical report upload.', timestamp: '22-Oct-2026 09:00 AM', status: 'current' },
      { stageId: 6, title: 'Passport Printing', description: 'Awaiting police report clearance.', status: 'pending' },
      { stageId: 7, title: 'Dispatched via Speed Post', description: 'India Post dispatch.', status: 'pending' },
      { stageId: 8, title: 'Passport Delivered', description: 'Doorstep delivery.', status: 'pending' }
    ],
    statusHistory: [
      { date: '29-Oct-2026 16:45', status: 'Police Verification Dispatched', location: 'Hauz Khas Police Station, Delhi', remarks: 'Assigned to Sub-Inspector R.K. Yadav (Mob: 9811XXXXXX).' },
      { date: '18-Oct-2026 12:30', status: 'Granting Officer Cleared', location: 'PSK Gurugram - Counter C', remarks: 'Original old passport cancelled and returned to applicant.' },
      { date: '18-Oct-2026 11:45', status: 'Biometrics & Photo Captured', location: 'PSK Gurugram - Counter A', remarks: 'Fingerprints and iris scanned.' }
    ],
    notifications: [
      { id: 'notif-3', timestamp: '22-Oct-2026 09:15', channel: 'SMS', content: 'MEA UPDATE: Police Verification initiated for ARN DEMO1002. Your file is sent to Hauz Khas PS. Officer will contact you shortly.' }
    ]
  },

  DEMO1003: {
    arn: 'DEMO1003',
    fileNumber: 'DL1062947192028',
    applicantName: 'ANANYA IYER',
    applicationType: 'Fresh Passport (Normal - 36 Pages)',
    appliedDate: '02-Oct-2026',
    currentStatus: 'Passport Dispatched via India Post Speed Post',
    currentStatusDesc: 'Your passport has been printed, laminated with e-Chip, and dispatched via Speed Post tracking number IN892348234IN on 28-Oct-2026.',
    statusCode: 'DISPATCHED',
    nextExpectedAction: 'Delivery expected within 2 to 3 business days at registered residence address.',
    applicantActionRequired: 'Ensure applicant or an authorized adult family member with valid ID is available to sign receipt.',
    lastUpdated: '30-Oct-2026 09:15 IST',
    trackingNumber: 'IN892348234IN',
    timelineStages: [
      { stageId: 1, title: 'Application Submitted', description: 'Application filed online.', timestamp: '02-Oct-2026', status: 'completed' },
      { stageId: 2, title: 'Fee Payment Confirmed', description: '₹1,500 received.', timestamp: '02-Oct-2026', status: 'completed' },
      { stageId: 3, title: 'Appointment Completed', description: 'Attended PSK Bengaluru Lalbagh.', timestamp: '08-Oct-2026', status: 'completed' },
      { stageId: 4, title: 'Document Scrutiny (PSK)', description: 'Counter A, B, C approved without objection.', timestamp: '08-Oct-2026', status: 'completed' },
      { stageId: 5, title: 'Police Verification Clear', description: 'Clear report received from Indiranagar PS.', timestamp: '17-Oct-2026', status: 'completed' },
      { stageId: 6, title: 'Passport Printed', description: 'Printed at India Security Press, Nashik.', timestamp: '25-Oct-2026', status: 'completed' },
      { stageId: 7, title: 'Dispatched via Speed Post', description: 'Tracking No: IN892348234IN handed to India Post.', timestamp: '28-Oct-2026', status: 'current' },
      { stageId: 8, title: 'Passport Delivered', description: 'Out for physical delivery.', status: 'pending' }
    ],
    statusHistory: [
      { date: '30-Oct-2026 08:30', status: 'Out for Delivery', location: 'Bengaluru GPO Sorting Hub', remarks: 'Consignment IN892348234IN out for delivery with Postman.' },
      { date: '28-Oct-2026 17:00', status: 'Item Dispatched', location: 'Speed Post Hub, New Delhi', remarks: 'Dispatched to Bengaluru City TMO.' },
      { date: '25-Oct-2026 14:10', status: 'Passport Printed & Chip Signed', location: 'Security Press Nashik', remarks: 'Digital signature verified on biometric chip.' }
    ],
    notifications: [
      { id: 'notif-4', timestamp: '28-Oct-2026 18:20', channel: 'SMS', content: 'INDIA POST: Passport for ARN DEMO1003 dispatched via Speed Post No. IN892348234IN. Track at indiapost.gov.in.' }
    ]
  },

  DEMO1004: {
    arn: 'DEMO1004',
    fileNumber: 'DL1062947192029',
    applicantName: 'MOHAMMED ARIF',
    applicationType: 'Tatkaal Reissue (Change of Address)',
    appliedDate: '26-Oct-2026',
    currentStatus: 'Action Required: Address Clarification Needed',
    currentStatusDesc: 'During initial scrutiny at PSK, the uploaded Rent Agreement was found unregistered. Please upload a valid registered lease deed or latest Electricity Bill in applicant name.',
    statusCode: 'ACTION_REQUIRED',
    nextExpectedAction: 'Upload the corrected proof of address document via the Smart Document Upload portal or submit at RPO within 15 days.',
    applicantActionRequired: 'Upload Registered Rent Agreement (with sub-registrar stamp) or Bank Passbook showing 1 year transaction history.',
    lastUpdated: '29-Oct-2026 11:20 IST',
    timelineStages: [
      { stageId: 1, title: 'Application Submitted', description: 'Tatkaal application submitted.', timestamp: '26-Oct-2026', status: 'completed' },
      { stageId: 2, title: 'Fee Payment Confirmed', description: '₹3,500 Tatkaal fee paid.', timestamp: '26-Oct-2026', status: 'completed' },
      { stageId: 3, title: 'Appointment Attended', description: 'Attended PSK Mumbai Lower Parel.', timestamp: '28-Oct-2026', status: 'completed' },
      { stageId: 4, title: 'Document Verification Objection', description: 'Counter B raised objection on unregistered rent agreement.', timestamp: '28-Oct-2026', status: 'action_needed', remarks: 'Unregistered notarized agreement not acceptable under Rule 4(2).' },
      { stageId: 5, title: 'Police Verification', description: 'Post-issuance verification pending.', status: 'pending' },
      { stageId: 6, title: 'Passport Printing', description: 'Held pending document clearance.', status: 'pending' },
      { stageId: 7, title: 'Dispatched via Speed Post', description: 'Pending clearance.', status: 'pending' },
      { stageId: 8, title: 'Passport Delivered', description: 'Pending.', status: 'pending' }
    ],
    statusHistory: [
      { date: '29-Oct-2026 11:20', status: 'Discrepancy Letter Issued', location: 'RPO Mumbai - Grievance Cell', remarks: 'Applicant notified via SMS and email to upload compliant address proof.' },
      { date: '28-Oct-2026 12:45', status: 'Objection Raised at Counter B', location: 'PSK Lower Parel, Mumbai', remarks: 'Notarized rent agreement submitted; Registered agreement mandated.' }
    ],
    notifications: [
      { id: 'notif-5', timestamp: '29-Oct-2026 11:25', channel: 'SMS', content: 'URGENT MEA: Action required for Tatkaal ARN DEMO1004. Please upload registered address proof online or visit RPO within 15 days.' }
    ]
  }
};

const STORAGE_KEY = 'passport_seva_tracking_db';

export function getTrackingRecords(): Record<string, ApplicationTrackingRecord> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...INITIAL_TRACKING_RECORDS, ...parsed };
    }
  } catch (e) {
    console.error('Error loading stored tracking records:', e);
  }
  return INITIAL_TRACKING_RECORDS;
}

export function saveTrackingRecord(record: ApplicationTrackingRecord) {
  try {
    const current = getTrackingRecords();
    current[record.arn] = record;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Error saving tracking record:', e);
  }
}
