import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApplicationFormData, UploadedDocument, PaymentDetails, ApplicationTrackingRecord } from '../types';
import { AdvisorFilters } from '../data/documentRules';
import { saveTrackingRecord } from '../data/trackingData';

const DRAFT_STORAGE_KEY = 'passport_seva_form_draft_v1';
const UPLOADS_STORAGE_KEY = 'passport_seva_uploads_v1';

const INITIAL_FORM_DATA: ApplicationFormData = {
  applicationType: 'fresh',
  passportType: 'normal',
  bookletPages: 36,
  validityRequired: '10_years',

  givenName: '',
  surname: '',
  hasAlias: false,
  aliasName: '',
  hasChangedName: false,
  previousName: '',
  gender: 'male',
  dob: '',
  placeOfBirth: '',
  districtOfBirth: '',
  stateOfBirth: 'Delhi',
  countryOfBirth: 'India',
  maritalStatus: 'single',
  citizenshipBy: 'birth',
  panNumber: '',
  voterId: '',
  employmentType: 'private',
  isGovtServantSpouse: false,
  educationalQualification: 'graduate_above',
  isEligibleNonECR: true,
  visibleMark: '',
  aadhaarNumber: '',

  fatherGivenName: '',
  fatherSurname: '',
  motherGivenName: '',
  motherSurname: '',
  legalGuardianGivenName: '',
  legalGuardianSurname: '',
  spouseGivenName: '',
  spouseSurname: '',

  houseNoAndStreet: '',
  villageTownCity: '',
  district: '',
  policeStation: '',
  state: 'Delhi',
  pincode: '',
  mobileNumber: '',
  emailId: '',
  isPermanentSameAsPresent: true,

  emergencyNameAndAddress: '',
  emergencyMobile: '',

  hasPreviousPassport: false,
  previousPassportNo: '',
  previousDateOfIssue: '',
  previousPlaceOfIssue: '',
  hasAppliedAndNotIssued: false,

  agreeToDeclaration: false,
  declarationPlace: '',
  declarationDate: new Date().toISOString().split('T')[0]
};

const INITIAL_ADVISOR_FILTERS: AdvisorFilters = {
  applicationType: 'fresh',
  applicantType: 'adult',
  isAddressChanged: false,
  isNameChanged: false,
  educationalQualification: 'tenth_or_higher',
  isGovtEmployee: false,
  isIncomeTaxPayer: true
};

interface ApplicationContextType {
  formData: ApplicationFormData;
  updateFormData: (updates: Partial<ApplicationFormData>) => void;
  resetFormData: () => void;
  lastSavedTime: string | null;
  isRestoredFromDraft: boolean;
  clearDraft: () => void;

  uploadedDocuments: UploadedDocument[];
  addUploadedDocument: (doc: UploadedDocument) => void;
  removeUploadedDocument: (id: string) => void;
  clearAllUploadedDocuments: () => void;

  advisorFilters: AdvisorFilters;
  updateAdvisorFilters: (updates: Partial<AdvisorFilters>) => void;

  currentARN: string;
  paymentDetails: PaymentDetails | null;
  setPaymentDetails: (details: PaymentDetails | null) => void;
  appointmentSlot: {
    pskName: string;
    pskCode: string;
    city: string;
    address: string;
    date: string;
    displayDate: string;
    time: string;
    batch: string;
  } | null;
  setAppointmentSlot: (slot: any) => void;

  submitApplication: () => string;
  populateDemoData: () => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<ApplicationFormData>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_FORM_DATA, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load draft:', e);
    }
    return INITIAL_FORM_DATA;
  });

  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isRestoredFromDraft, setIsRestoredFromDraft] = useState<boolean>(() => {
    return Boolean(localStorage.getItem(DRAFT_STORAGE_KEY));
  });

  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>(() => {
    try {
      const saved = localStorage.getItem(UPLOADS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load uploads:', e);
    }
    return [];
  });

  const [advisorFilters, setAdvisorFilters] = useState<AdvisorFilters>(INITIAL_ADVISOR_FILTERS);

  const [currentARN, setCurrentARN] = useState<string>(() => {
    const existing = localStorage.getItem('active_arn');
    if (existing) return existing;
    const gen = `ARN-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    localStorage.setItem('active_arn', gen);
    return gen;
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(() => {
    const saved = localStorage.getItem('active_payment');
    return saved ? JSON.parse(saved) : null;
  });

  const [appointmentSlot, setAppointmentSlot] = useState<any>(() => {
    const saved = localStorage.getItem('active_appointment');
    return saved ? JSON.parse(saved) : null;
  });

  // Autosave formData to localStorage on change
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
        const now = new Date();
        const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSavedTime(formatted);
      } catch (e) {
        console.error('Autosave error:', e);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [formData]);

  // Persist uploads to localStorage
  useEffect(() => {
    try {
      // Clean large data before storing to avoid quota limits
      const lightUploads = uploadedDocuments.map(d => ({
        ...d,
        fileDataUrl: d.fileDataUrl.length > 500 ? d.fileDataUrl.substring(0, 500) + '...' : d.fileDataUrl
      }));
      localStorage.setItem(UPLOADS_STORAGE_KEY, JSON.stringify(lightUploads));
    } catch (e) {
      console.error('Could not save uploads:', e);
    }
  }, [uploadedDocuments]);

  // Save active appointment / payment
  useEffect(() => {
    if (paymentDetails) {
      localStorage.setItem('active_payment', JSON.stringify(paymentDetails));
    }
  }, [paymentDetails]);

  useEffect(() => {
    if (appointmentSlot) {
      localStorage.setItem('active_appointment', JSON.stringify(appointmentSlot));
    }
  }, [appointmentSlot]);

  const updateFormData = (updates: Partial<ApplicationFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const resetFormData = () => {
    setFormData(INITIAL_FORM_DATA);
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setLastSavedTime(null);
    setIsRestoredFromDraft(false);
  };

  const clearDraft = () => {
    resetFormData();
  };

  const addUploadedDocument = (doc: UploadedDocument) => {
    setUploadedDocuments(prev => {
      // replace if category already exists
      const filtered = prev.filter(p => p.category !== doc.category);
      return [...filtered, doc];
    });
  };

  const removeUploadedDocument = (id: string) => {
    setUploadedDocuments(prev => prev.filter(p => p.id !== id));
  };

  const clearAllUploadedDocuments = () => {
    setUploadedDocuments([]);
    localStorage.removeItem(UPLOADS_STORAGE_KEY);
  };

  const updateAdvisorFilters = (updates: Partial<AdvisorFilters>) => {
    setAdvisorFilters(prev => ({ ...prev, ...updates }));
  };

  const populateDemoData = () => {
    const demoData: ApplicationFormData = {
      applicationType: 'fresh',
      passportType: 'normal',
      bookletPages: 36,
      validityRequired: '10_years',

      givenName: 'AARAV',
      surname: 'SHARMA',
      hasAlias: false,
      aliasName: '',
      hasChangedName: false,
      previousName: '',
      gender: 'male',
      dob: '1998-05-14',
      placeOfBirth: 'New Delhi',
      districtOfBirth: 'Central Delhi',
      stateOfBirth: 'Delhi',
      countryOfBirth: 'India',
      maritalStatus: 'single',
      citizenshipBy: 'birth',
      panNumber: 'ABCDE1234F',
      voterId: 'DL/04/028/019284',
      employmentType: 'private',
      isGovtServantSpouse: false,
      educationalQualification: 'graduate_above',
      isEligibleNonECR: true,
      visibleMark: 'Small mole on right cheek',
      aadhaarNumber: 'XXXX-XXXX-4892',

      fatherGivenName: 'RAJESH',
      fatherSurname: 'SHARMA',
      motherGivenName: 'SUNITA',
      motherSurname: 'SHARMA',
      legalGuardianGivenName: '',
      legalGuardianSurname: '',
      spouseGivenName: '',
      spouseSurname: '',

      houseNoAndStreet: 'Flat No. 402, Block C, Mayur Vihar Phase 1',
      villageTownCity: 'East Delhi',
      district: 'East Delhi',
      policeStation: 'Mayur Vihar Police Station',
      state: 'Delhi',
      pincode: '110091',
      mobileNumber: '9876543210',
      emailId: 'aarav.sharma.demo@gmail.com',
      isPermanentSameAsPresent: true,

      emergencyNameAndAddress: 'Rajesh Sharma, Flat No. 402, Block C, Mayur Vihar Phase 1, Delhi - 110091',
      emergencyMobile: '9811223344',

      hasPreviousPassport: false,
      previousPassportNo: '',
      previousDateOfIssue: '',
      previousPlaceOfIssue: '',
      hasAppliedAndNotIssued: false,

      agreeToDeclaration: true,
      declarationPlace: 'New Delhi',
      declarationDate: new Date().toISOString().split('T')[0]
    };
    setFormData(demoData);
  };

  const submitApplication = (): string => {
    const arn = currentARN;
    const applicantName = `${formData.givenName} ${formData.surname}`.trim() || 'AARAV SHARMA';
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newRecord: ApplicationTrackingRecord = {
      arn: arn,
      fileNumber: `DL106${Math.floor(100000000 + Math.random() * 900000000)}`,
      applicantName: applicantName,
      applicationType: `${formData.applicationType === 'fresh' ? 'Fresh Passport' : 'Passport Reissue'} (${formData.passportType === 'tatkaal' ? 'Tatkaal' : 'Normal'} - ${formData.bookletPages} Pages)`,
      appliedDate: dateStr,
      currentStatus: 'Application Submitted Online',
      currentStatusDesc: 'Your application form and uploaded documents have been registered successfully. Proceed to Fee Payment and Appointment Scheduling.',
      statusCode: 'SUBMITTED',
      nextExpectedAction: 'Pay processing fee online to unlock slot booking at Passport Seva Kendra.',
      applicantActionRequired: 'Complete payment of ₹1,500 via SBI ePay or UPI.',
      lastUpdated: `${dateStr} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST`,
      timelineStages: [
        { stageId: 1, title: 'Application Submitted', description: 'Application submitted online with local verification.', timestamp: `${dateStr} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, status: 'completed' },
        { stageId: 2, title: 'Fee Payment Pending', description: 'Payment of ₹1,500 pending at payment gateway.', status: 'current' },
        { stageId: 3, title: 'Appointment Scheduling', description: 'Book slot at PSK Herald House or preferred centre.', status: 'pending' },
        { stageId: 4, title: 'Document Verification (PSK)', description: 'Biometric capture and document check.', status: 'pending' },
        { stageId: 5, title: 'Police Verification', description: 'Address verification by local police station.', status: 'pending' },
        { stageId: 6, title: 'Passport Printing', description: 'Personalization & chip encoding at Nashik Press.', status: 'pending' },
        { stageId: 7, title: 'Dispatched via Speed Post', description: 'India Post tracking dispatch.', status: 'pending' },
        { stageId: 8, title: 'Delivered', description: 'Delivery to registered residence address.', status: 'pending' }
      ],
      statusHistory: [
        { date: `${dateStr} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, status: 'Application Submitted', location: 'Passport Seva Portal', remarks: `ARN ${arn} generated with validated draft.` }
      ],
      notifications: [
        { id: `notif-${Date.now()}`, timestamp: `${dateStr}`, channel: 'SMS', content: `MEA INFO: Application ${arn} submitted successfully for ${applicantName}. Please proceed to payment.` }
      ]
    };

    saveTrackingRecord(newRecord);
    return arn;
  };

  return (
    <ApplicationContext.Provider
      value={{
        formData,
        updateFormData,
        resetFormData,
        lastSavedTime,
        isRestoredFromDraft,
        clearDraft,
        uploadedDocuments,
        addUploadedDocument,
        removeUploadedDocument,
        clearAllUploadedDocuments,
        advisorFilters,
        updateAdvisorFilters,
        currentARN,
        paymentDetails,
        setPaymentDetails,
        appointmentSlot,
        setAppointmentSlot,
        submitApplication,
        populateDemoData
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
};
