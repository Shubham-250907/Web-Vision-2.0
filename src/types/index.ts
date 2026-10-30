// Type definitions for Passport Seva Smart Application Experience

export type ApplicationType = 'fresh' | 'reissue';
export type ApplicantType = 'adult' | 'minor' | 'senior';
export type PassportType = 'normal' | 'tatkaal';
export type BookletPages = 36 | 60;

export interface DocumentRule {
  id: string;
  name: string;
  category: 'address' | 'dob' | 'identity' | 'non-ecr' | 'annexure' | 'special';
  requirementType: 'mandatory' | 'conditional' | 'optional';
  description: string;
  conditionDescription?: string;
  acceptedDocuments: string[];
  allowedFormats: string[];
  maxSizeMB: number;
  officialClause: string;
  verificationTip: string;
}

export interface UploadedDocument {
  id: string;
  category: string;
  fileName: string;
  fileSizeKB: number;
  fileType: string;
  fileDataUrl: string;
  uploadTimestamp: string;
  status: 'valid' | 'invalid' | 'warning';
  classificationResult?: {
    detectedType: string;
    confidence: number;
    extractedDetails?: Record<string, string>;
  };
  errors?: string[];
  warnings?: string[];
}

export interface ApplicationFormData {
  // Service Details
  applicationType: ApplicationType;
  passportType: PassportType;
  bookletPages: BookletPages;
  validityRequired?: '10_years' | '5_years_or_until_18';

  // Applicant Details
  givenName: string;
  surname: string;
  hasAlias: boolean;
  aliasName?: string;
  hasChangedName: boolean;
  previousName?: string;
  gender: 'male' | 'female' | 'transgender';
  dob: string;
  placeOfBirth: string;
  districtOfBirth: string;
  stateOfBirth: string;
  countryOfBirth: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | 'separated';
  citizenshipBy: 'birth' | 'descent' | 'registration' | 'naturalization';
  panNumber?: string;
  voterId?: string;
  employmentType: 'private' | 'government' | 'homemaker' | 'student' | 'retired' | 'self_employed' | 'business' | 'other';
  isGovtServantSpouse: boolean;
  educationalQualification: 'graduate_above' | 'tenth_pass_above' | 'between_eighth_and_ninth' | 'seventh_or_less';
  isEligibleNonECR: boolean;
  visibleMark: string;
  aadhaarNumber?: string;

  // Family Details
  fatherGivenName: string;
  fatherSurname: string;
  motherGivenName: string;
  motherSurname: string;
  legalGuardianGivenName?: string;
  legalGuardianSurname?: string;
  spouseGivenName?: string;
  spouseSurname?: string;

  // Present Address
  houseNoAndStreet: string;
  villageTownCity: string;
  district: string;
  policeStation: string;
  state: string;
  pincode: string;
  mobileNumber: string;
  emailId: string;
  isPermanentSameAsPresent: boolean;

  // Emergency Contact
  emergencyNameAndAddress: string;
  emergencyMobile: string;

  // Previous Passport / References
  hasPreviousPassport: boolean;
  previousPassportNo?: string;
  previousDateOfIssue?: string;
  previousPlaceOfIssue?: string;
  hasAppliedAndNotIssued: boolean;

  // Self Declaration
  agreeToDeclaration: boolean;
  declarationPlace: string;
  declarationDate: string;
}

export interface ApplicationTrackingRecord {
  arn: string;
  fileNumber: string;
  applicantName: string;
  applicationType: string;
  appliedDate: string;
  currentStatus: string;
  currentStatusDesc: string;
  statusCode: 'SUBMITTED' | 'PAYMENT_DONE' | 'APPOINTMENT_SCHEDULED' | 'DOC_VERIFIED' | 'POLICE_VERIFICATION' | 'PRINTING' | 'DISPATCHED' | 'DELIVERED' | 'ACTION_REQUIRED';
  nextExpectedAction: string;
  applicantActionRequired?: string;
  lastUpdated: string;
  timelineStages: {
    stageId: number;
    title: string;
    description: string;
    timestamp?: string;
    status: 'completed' | 'current' | 'pending' | 'action_needed';
    remarks?: string;
  }[];
  statusHistory: {
    date: string;
    status: string;
    location: string;
    remarks: string;
  }[];
  notifications: {
    id: string;
    timestamp: string;
    channel: 'SMS' | 'EMAIL';
    content: string;
  }[];
  trackingNumber?: string; // Speed post tracking
}

export interface AppointmentSlot {
  pskCode: string;
  pskName: string;
  city: string;
  address: string;
  date: string;
  slotTime: string;
  availableCount: number;
  totalSlots: number;
  isTatkaalOnly: boolean;
}

export interface PaymentDetails {
  arn: string;
  transactionId: string;
  paymentMode: 'sbi_epay' | 'net_banking' | 'upi' | 'debit_card' | 'credit_card' | 'challan';
  amount: number;
  currency: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  timestamp: string;
  receiptNumber: string;
  breakdown: {
    applicationFee: number;
    tatkaalFee?: number;
    smsAlertFee: number;
    tax: number;
  };
}
