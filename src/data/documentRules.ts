import { DocumentRule } from '../types';
export type { DocumentRule };

export interface AdvisorFilters {
  applicationType: 'fresh' | 'reissue';
  applicantType: 'adult' | 'minor' | 'senior';
  isAddressChanged: boolean;
  isNameChanged: boolean;
  reissueReason?: 'expired_3yr' | 'exhausted' | 'lost_stolen' | 'damaged' | 'details_change';
  educationalQualification: 'tenth_or_higher' | 'below_tenth';
  isGovtEmployee: boolean;
  minorParentCondition?: 'both_parents' | 'single_parent' | 'separated_parents';
  isIncomeTaxPayer: boolean;
}

export const BASE_DOCUMENT_RULES: DocumentRule[] = [
  {
    id: 'proof_of_address',
    name: 'Proof of Present Address',
    category: 'address',
    requirementType: 'mandatory',
    description: 'Mandatory proof showing current residence address where applicant has lived for the past 1 year.',
    acceptedDocuments: [
      'Aadhaar Card with full current address',
      'Electricity Bill (latest 3 months in applicant or parent name)',
      'Water Bill (latest 3 months)',
      'Active Bank Account Passbook (Scheduled Public/Private Sector Bank)',
      'Valid Rent Agreement (Registered under Indian Registration Act)',
      'Telephone/Broadband Landline Bill'
    ],
    allowedFormats: ['PDF', 'JPG', 'PNG'],
    maxSizeMB: 2,
    officialClause: 'Section 4(2) Passport Rules 1980 - Residential Jurisdiction Verification',
    verificationTip: 'Ensure house number, street name, and pincode match your application form exactly.'
  },
  {
    id: 'proof_of_dob',
    name: 'Proof of Date of Birth (DOB)',
    category: 'dob',
    requirementType: 'mandatory',
    description: 'Verifiable document confirming the legal date and place of birth of applicant.',
    acceptedDocuments: [
      'Birth Certificate issued by Registrar of Births and Deaths / Municipal Corporation',
      'Transfer / School Leaving / Matriculation Certificate issued by recognized Board',
      'PAN Card issued by Income Tax Department',
      'Aadhaar Card / e-Aadhaar showing DOB',
      'Driving Licence issued by RTO'
    ],
    allowedFormats: ['PDF', 'JPG', 'PNG'],
    maxSizeMB: 2,
    officialClause: 'Circular No. VI/401/2/5/2001 - Acceptable Date of Birth Proofs',
    verificationTip: 'For applicants born on or after 26/01/1989, Municipal Birth Certificate is strongly recommended.'
  },
  {
    id: 'non_ecr_proof',
    name: 'Document Supporting Non-ECR Status',
    category: 'non-ecr',
    requirementType: 'conditional',
    description: 'Exempts applicant from Emigration Check Required (ECR) stamp, enabling unrestricted international travel.',
    conditionDescription: 'Required if applicant is 10th Standard pass or higher, Income Tax assessee, or eligible under 14 MEA categories.',
    acceptedDocuments: [
      'Matriculation (10th Pass) Marksheet or Higher Educational Degree Certificate',
      'Income Tax Assessment Order / ITR-V for the last assessment year',
      'Professional Degree (MBBS, B.Tech, CA, LLB, etc.)',
      'Permanent Retirement Certificate (Ex-Defence / Gazetted Officers)'
    ],
    allowedFormats: ['PDF', 'JPG', 'PNG'],
    maxSizeMB: 2,
    officialClause: 'Emigration Act 1983 - Emigration Clearance Exemption Categories',
    verificationTip: 'If you do not submit 10th pass or tax proof, an ECR stamp will be placed on your passport.'
  },
  {
    id: 'old_passport_copies',
    name: 'Old Passport Book (Original & Self-attested copies)',
    category: 'identity',
    requirementType: 'conditional',
    description: 'Copies of first two pages, last two pages, and ECR/Non-ECR page of existing passport.',
    conditionDescription: 'Mandatory for all Reissue of Passport applications.',
    acceptedDocuments: [
      'Original Old Passport Booklet',
      'Self-attested photocopies of first two and last two pages',
      'Self-attested copy of validity extension page / observation page (if any)'
    ],
    allowedFormats: ['PDF', 'JPG', 'PNG'],
    maxSizeMB: 2,
    officialClause: 'Passport Manual Chapter 8 - Cancellation & Reissue Procedures',
    verificationTip: 'Keep physical booklet ready for stamping "CANCELLED" at Counter A of PSK.'
  },
  {
    id: 'name_change_proof',
    name: 'Deed Poll / Gazette Notification / Marriage Certificate for Name Change',
    category: 'special',
    requirementType: 'conditional',
    description: 'Legal proof supporting change in given name, surname, or addition of spouse name.',
    conditionDescription: 'Required when applicant name differs from old passport or birth records.',
    acceptedDocuments: [
      'Gazette Notification published in Union/State Official Gazette for change of name',
      'Two original clippings of prominent daily newspaper advertisements (one in English, one in regional)',
      'Registered Marriage Certificate / Divorce Decree'
    ],
    allowedFormats: ['PDF', 'JPG', 'PNG'],
    maxSizeMB: 2,
    officialClause: 'MEA Gazette Order F.No.VI/401/1/2016 regarding Change of Name',
    verificationTip: 'Newspaper clipping must show the date and publication name clearly.'
  },
  {
    id: 'minor_annexure_d',
    name: 'Annexure "D" - Declaration by Parents for Minor Passport',
    category: 'annexure',
    requirementType: 'conditional',
    description: 'Affidavit affirming consent of both parents for issuance of passport to minor child.',
    conditionDescription: 'Required for minor applicants where both parents are residing together.',
    acceptedDocuments: [
      'Prescribed Annexure "D" signed by both father and mother',
      'Self-attested passport copies of both parents (if parents hold passports)',
      'Present address proof in name of either parent'
    ],
    allowedFormats: ['PDF', 'JPG'],
    maxSizeMB: 2,
    officialClause: 'Passport Rules 1980, Schedule III - Minor Application Protocol',
    verificationTip: 'Either parent can accompany minor child to PSK with original Annexure D.'
  },
  {
    id: 'minor_annexure_c',
    name: 'Annexure "C" - Declaration by Single / Separated Parent',
    category: 'annexure',
    requirementType: 'conditional',
    description: 'Affidavit when child passport is applied by one parent without consent of other parent.',
    conditionDescription: 'Required in case of estranged/single parent or unwed mother.',
    acceptedDocuments: [
      'Prescribed Annexure "C" executed before Executive Magistrate or Notary Public',
      'Court custody order (if granted by Family Court)'
    ],
    allowedFormats: ['PDF'],
    maxSizeMB: 2,
    officialClause: 'Hon\'ble Delhi High Court Guidelines on Single Parent Passport Issuance',
    verificationTip: 'Must state reasons why consent of the other parent cannot be obtained.'
  },
  {
    id: 'lost_passport_fir',
    name: 'Police Report (FIR / Lost Article Report) & Annexure "F"',
    category: 'special',
    requirementType: 'conditional',
    description: 'Police report recording loss/theft of passport along with applicant affidavit on circumstances.',
    conditionDescription: 'Required when reissuing due to lost or stolen passport.',
    acceptedDocuments: [
      'Original Police GD / FIR copy mentioning lost passport number',
      'Annexure "F" affidavit stating date, time, and circumstances of loss'
    ],
    allowedFormats: ['PDF', 'JPG'],
    maxSizeMB: 2,
    officialClause: 'Section 12(1)(b) Passport Act 1967 - Notification of Lost Travel Document',
    verificationTip: 'Ensure FIR explicitly mentions passport number or date of issue.'
  },
  {
    id: 'damaged_passport_annexure_l',
    name: 'Annexure "L" & Damaged Passport Book',
    category: 'special',
    requirementType: 'conditional',
    description: 'Affidavit explaining damage to passport (e.g. water damage, torn pages) and original booklet.',
    conditionDescription: 'Required when reissuing due to physical damage or mutilation.',
    acceptedDocuments: [
      'Affidavit in prescribed Annexure "L" format',
      'Physical damaged passport for surrender at PSK'
    ],
    allowedFormats: ['PDF'],
    maxSizeMB: 2,
    officialClause: 'Passport Manual Guidelines on Mutilated and Defaced Passports',
    verificationTip: 'If passport is damaged beyond recognition, it may be treated under Lost category.'
  },
  {
    id: 'govt_noc_annexure_h',
    name: 'Prior Intimation Letter (Annexure H) / NOC (Annexure G)',
    category: 'annexure',
    requirementType: 'conditional',
    description: 'Official clearance or intimation letter from employer department for Government/PSU employees.',
    conditionDescription: 'Required for all Central/State Government, PSU, and Autonomous Body staff.',
    acceptedDocuments: [
      'Annexure "H" - Prior Intimation Letter acknowledged by Administrative Department',
      'Annexure "G" - No Objection Certificate signed by Competent Cadre Authority'
    ],
    allowedFormats: ['PDF'],
    maxSizeMB: 2,
    officialClause: 'DoPT O.M. No. 11012/8/2000-Estt.(A) - Passport Clearances for Public Servants',
    verificationTip: 'Must carry the official seal and dispatch number of issuing department.'
  },
  {
    id: 'standard_affidavit_annexure_e',
    name: 'Standard Affidavit (Annexure "E")',
    category: 'annexure',
    requirementType: 'optional',
    description: 'Self-declaration regarding citizenship, criminal proceedings, and personal particulars.',
    conditionDescription: 'Recommended for Tatkaal applications to expedite preliminary scrutiny.',
    acceptedDocuments: [
      'Signed Annexure "E" on plain paper (Notarization not required for normal cases)'
    ],
    allowedFormats: ['PDF'],
    maxSizeMB: 2,
    officialClause: 'Standard Declaration under Section 5 Passport Act',
    verificationTip: 'Ensure all 8 declarations are ticked and signed with place and date.'
  }
];

export function evaluateRequiredDocuments(filters: AdvisorFilters): DocumentRule[] {
  const result: DocumentRule[] = [];

  // Address proof is always mandatory
  const addressRule = BASE_DOCUMENT_RULES.find(r => r.id === 'proof_of_address')!;
  result.push({
    ...addressRule,
    requirementType: 'mandatory'
  });

  // DOB proof is mandatory for Fresh applications or if details changed
  const dobRule = BASE_DOCUMENT_RULES.find(r => r.id === 'proof_of_dob')!;
  result.push({
    ...dobRule,
    requirementType: filters.applicationType === 'fresh' || filters.isNameChanged ? 'mandatory' : 'conditional'
  });

  // Old Passport is mandatory for Reissue
  if (filters.applicationType === 'reissue') {
    const oldPass = BASE_DOCUMENT_RULES.find(r => r.id === 'old_passport_copies')!;
    result.push({
      ...oldPass,
      requirementType: 'mandatory',
      conditionDescription: 'Required for verification and physical cancellation of prior travel booklet.'
    });
  }

  // Non-ECR condition
  if (filters.educationalQualification === 'tenth_or_higher' || filters.isIncomeTaxPayer) {
    const nonEcr = BASE_DOCUMENT_RULES.find(r => r.id === 'non_ecr_proof')!;
    result.push({
      ...nonEcr,
      requirementType: 'mandatory',
      conditionDescription: filters.educationalQualification === 'tenth_or_higher'
        ? 'Qualified via Matriculation / 10th Pass or Higher Education.'
        : 'Qualified as active Income Tax Assessee.'
    });
  }

  // Name change condition
  if (filters.isNameChanged) {
    const nameChange = BASE_DOCUMENT_RULES.find(r => r.id === 'name_change_proof')!;
    result.push({
      ...nameChange,
      requirementType: 'mandatory',
      conditionDescription: 'Applicant indicated change of name or addition of spouse surname.'
    });
  }

  // Minor conditions
  if (filters.applicantType === 'minor') {
    if (filters.minorParentCondition === 'single_parent' || filters.minorParentCondition === 'separated_parents') {
      const annC = BASE_DOCUMENT_RULES.find(r => r.id === 'minor_annexure_c')!;
      result.push({ ...annC, requirementType: 'mandatory' });
    } else {
      const annD = BASE_DOCUMENT_RULES.find(r => r.id === 'minor_annexure_d')!;
      result.push({ ...annD, requirementType: 'mandatory' });
    }
  }

  // Reissue specific reasons
  if (filters.applicationType === 'reissue') {
    if (filters.reissueReason === 'lost_stolen') {
      const lostFir = BASE_DOCUMENT_RULES.find(r => r.id === 'lost_passport_fir')!;
      result.push({ ...lostFir, requirementType: 'mandatory' });
    } else if (filters.reissueReason === 'damaged') {
      const damagedRule = BASE_DOCUMENT_RULES.find(r => r.id === 'damaged_passport_annexure_l')!;
      result.push({ ...damagedRule, requirementType: 'mandatory' });
    }
  }

  // Govt Employee
  if (filters.isGovtEmployee) {
    const govtRule = BASE_DOCUMENT_RULES.find(r => r.id === 'govt_noc_annexure_h')!;
    result.push({ ...govtRule, requirementType: 'mandatory' });
  }

  // Standard Annexure E (Optional/Supporting)
  const annE = BASE_DOCUMENT_RULES.find(r => r.id === 'standard_affidavit_annexure_e')!;
  result.push({ ...annE, requirementType: 'optional' });

  return result;
}
