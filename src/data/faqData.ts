export interface FaqItem {
  id: string;
  category: 'General' | 'Documents' | 'Appointments' | 'Payment' | 'Police Verification';
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is the difference between Normal and Tatkaal scheme?',
    answer: 'Under the Normal scheme, passport applications undergo standard police verification and processing, taking typically 15 to 30 working days. Under the Tatkaal scheme, verification is expedited, and the passport is dispatched within 1 to 3 working days subject to submission of required proof documents.'
  },
  {
    id: 'faq-2',
    category: 'Documents',
    question: 'Is physical Aadhaar card mandatory, or is e-Aadhaar accepted?',
    answer: 'Both physical Aadhaar Card and digitally signed e-Aadhaar (downloaded from the UIDAI portal with valid digital signature) are accepted as valid proof of address and date of birth at all Passport Seva Kendras.'
  },
  {
    id: 'faq-3',
    category: 'Documents',
    question: 'What qualifies an applicant for Non-ECR (Emigration Check Not Required)?',
    answer: 'Applicants holding matriculation (Class 10th pass) or higher educational degrees, taxpayers who have filed income tax returns, persons over 50 years of age, or children below 18 years qualify for Non-ECR status.'
  },
  {
    id: 'faq-4',
    category: 'Appointments',
    question: 'How many times can I reschedule my appointment?',
    answer: 'Applicants can reschedule or cancel their appointment up to two (2) times within one year from the original appointment date. If not attended within this period, the application fee is forfeited.'
  },
  {
    id: 'faq-5',
    category: 'Payment',
    question: 'What if money is deducted from my bank but the application status still shows Pending?',
    answer: 'In case of payment deduction without instant acknowledgement, wait for 48 hours for bank reconciliation. If the status remains pending, the payment gateway will auto-reverse the amount to the original payment source.'
  },
  {
    id: 'faq-6',
    category: 'Police Verification',
    question: 'What documents are required during physical police verification?',
    answer: 'The local police beat officer typically checks original address proof, identity proof, utility bill of residence, and contact details of two respectable neighbours who can vouch for your continuous residence.'
  }
];
