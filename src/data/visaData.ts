// Visa Rules, Alerts, and Eligibility Data for Passport Seva Visa Assist
// Includes official 2024-2026 guidelines for Germany, Schengen, UK, USA, Canada, and UAE

export interface VisaRuleAlert {
  id: string;
  country: string;
  countryCode: string;
  flag: string;
  category: 'student' | 'tourist' | 'business' | 'general';
  severity: 'urgent' | 'warning' | 'info';
  title: string;
  effectiveDate: string;
  summary: string;
  detailedNotice: string;
  impactOnIndianApplicants: string[];
  officialSource: string;
  sourceUrl: string;
}

export interface VisaDocumentRequirement {
  id: string;
  name: string;
  requirementType: 'mandatory' | 'conditional' | 'financial' | 'optional';
  description: string;
  acceptedFormats: string[];
  maxSizeMB: number;
  officialRuleTip: string;
  commonMistakes: string;
}

export interface VisaRecommendation {
  country: string;
  purpose: string;
  visaCategoryName: string;
  visaSubtype: string;
  validityDescription: string;
  permittedStay: string;
  standardProcessingTime: string;
  estimatedVisaFeeINR: number;
  eligibilitySummary: string[];
  keyCriteria: {
    passportValidityRequired: string;
    financialProofRequired: string;
    healthInsuranceRequired: string;
    specialRequirements?: string;
  };
  requiredDocuments: VisaDocumentRequirement[];
  officialPortal: {
    portalName: string;
    portalUrl: string;
    appointmentProvider: string;
    appointmentUrl: string;
  };
}

// 1. Official Visa Rule & Requirement Change Alerts
export const VISA_RULE_ALERTS: VisaRuleAlert[] = [
  {
    id: 'alert-ger-blocked-account-2026',
    country: 'Germany',
    countryCode: 'DE',
    flag: '🇩🇪',
    category: 'student',
    severity: 'urgent',
    title: 'Germany: Blocked Account (Sperrkonto) Annual Minimum Increased to €11,904',
    effectiveDate: 'September 1, 2024 (Active for 2025/2026 Batches)',
    summary: 'German Federal Foreign Office has revised the minimum subsistence funds for international students from €11,208 to €11,904 (€992 per month).',
    detailedNotice: 'Under Section 16b of the German Residence Act (AufenthG), all international students applying for a National Visa (Category D) must provide evidence of sufficient financial resources through a certified Blocked Account (Sperrkonto) with a recognized provider (e.g., Expatrio, Coracle, Fintiba). Any application submitted with the old €11,208 or €934/month balance will face immediate rejection at VFS Global / German Missions.',
    impactOnIndianApplicants: [
      'Proof must show at least €11,904 deposited before your VFS appointment date.',
      'Monthly release limit is fixed at €992 per month.',
      'Scholarship holders (DAAD, Erasmus) are exempt if the award meets or exceeds €992/month.'
    ],
    officialSource: 'German Federal Foreign Office (Auswärtiges Amt) Circular 2024/25',
    sourceUrl: 'https://india.diplo.de/in-en/service/visa-einreise/student-visa'
  },
  {
    id: 'alert-ger-aps-cert',
    country: 'Germany',
    countryCode: 'DE',
    flag: '🇩🇪',
    category: 'student',
    severity: 'urgent',
    title: 'Germany: Mandatory APS Certificate for All Indian Academic Applicants',
    effectiveDate: 'Mandatory since November 1, 2022',
    summary: 'The Academic Evaluation Centre (APS India) certificate is strictly mandatory for all Indian students prior to filing a German student visa application.',
    detailedNotice: 'The German Embassy New Delhi and Consulates General require an original digital APS certificate verifying the authenticity of Indian higher secondary and university degree certificates. Visa applications without an APS verification will not be accepted at VFS Global counters.',
    impactOnIndianApplicants: [
      'Must possess a valid digital APS Certificate with verification QR code.',
      'Students with non-Indian degrees or German school leaving qualifications are exempt.',
      'Apply for APS at aps-india.de at least 4-6 weeks before intended visa filing.'
    ],
    officialSource: 'Akademische Prüfstelle (APS India) & Embassy of the Federal Republic of Germany',
    sourceUrl: 'https://aps-india.de/'
  },
  {
    id: 'alert-schengen-ees-biometrics',
    country: 'Schengen Area',
    countryCode: 'EU',
    flag: '🇪🇺',
    category: 'tourist',
    severity: 'warning',
    title: 'Schengen: Rollout of Entry/Exit System (EES) & 3-Month Passport Rule',
    effectiveDate: 'Active 2025-2026',
    summary: 'Automated biometric border checks introduced across all 29 Schengen member states. Strict enforcement of 3-month passport validity beyond departure.',
    detailedNotice: 'Indian travelers holding short-stay Schengen visas (Type C) will have fingerprints and facial scans recorded at Schengen border control kiosks. Passports must have been issued within the last 10 years and must remain valid for a minimum of 3 months after the scheduled departure date from the Schengen territory.',
    impactOnIndianApplicants: [
      'Passport must have at least 2 blank visa pages.',
      'Passport cannot be more than 10 years old on entry date.',
      'Travel health insurance must cover minimum €30,000 across all Schengen countries.'
    ],
    officialSource: 'European Commission Migration and Home Affairs (EES Regulation)',
    sourceUrl: 'https://travel-europe.europa.eu/ees_en'
  },
  {
    id: 'alert-uk-evisa-transition',
    country: 'United Kingdom',
    countryCode: 'GB',
    flag: '🇬🇧',
    category: 'general',
    severity: 'info',
    title: 'United Kingdom: Full Transition from Physical BRP Cards to Digital eVisa',
    effectiveDate: 'Mandatory by End of 2025',
    summary: 'UK Visas and Immigration (UKVI) is replacing physical Biometric Residence Permits (BRPs) and passport vignette stickers with digital eVisas.',
    detailedNotice: 'Indian nationals holding long-term student, work, or family visas for the UK must create a UK Visas and Immigration (UKVI) account to access their digital immigration status (eVisa). Airlines will verify digital status linked directly to your Indian passport number.',
    impactOnIndianApplicants: [
      'Keep your UKVI account updated with your latest passport number.',
      'Carry physical BRP if not yet expired while traveling until digital transition is universal.'
    ],
    officialSource: 'UK Visas and Immigration (UKVI) / Home Office',
    sourceUrl: 'https://www.gov.uk/evisa'
  },
  {
    id: 'alert-usa-ds160-barcodes',
    country: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    category: 'general',
    severity: 'warning',
    title: 'USA: Strict DS-160 Barcode Match Policy at VAC Centers Across India',
    effectiveDate: 'Enforced Across New Delhi, Mumbai, Chennai, Hyderabad, Kolkata',
    summary: 'The DS-160 confirmation barcode entered during appointment scheduling must match the exact DS-160 application brought to the Visa Application Center.',
    detailedNotice: 'U.S. Mission India will turn away applicants at the Visa Application Center (VAC) if the DS-160 confirmation number on the appointment appointment letter does not match the printed confirmation sheet. No manual barcode modifications are permitted on the day of the biometrics appointment.',
    impactOnIndianApplicants: [
      'Do not book appointments using placeholder or dummy DS-160 numbers.',
      'If you update your DS-160 form, you must update the appointment profile at least 48 hours prior.'
    ],
    officialSource: 'U.S. Embassy & Consulates in India Official Notice',
    sourceUrl: 'https://in.usembassy.gov/visas/'
  },
  {
    id: 'alert-canada-sds-update',
    country: 'Canada',
    countryCode: 'CA',
    flag: '🇨🇦',
    category: 'student',
    severity: 'warning',
    title: 'Canada: PAL (Provincial Attestation Letter) & Study Permit Financial Criteria',
    effectiveDate: 'Active 2025-2026 Academic Year',
    summary: 'All undergraduate and college study permit applications require a Provincial Attestation Letter (PAL) from the territorial province.',
    detailedNotice: 'Immigration, Refugees and Citizenship Canada (IRCC) requires post-secondary students to have a verified PAL before submitting online. The cost-of-living financial requirement for study permit applicants is set at $20,635 CAD in a verified Guaranteed Investment Certificate (GIC).',
    impactOnIndianApplicants: [
      'Obtain PAL directly from your Canadian Designated Learning Institution (DLI).',
      'Purchase GIC of at least $20,635 CAD from approved Canadian banks (Scotiabank, ICICI Canada, SBI Canada).'
    ],
    officialSource: 'Immigration, Refugees and Citizenship Canada (IRCC)',
    sourceUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship.html'
  }
];

// 2. Comprehensive Destination Visa Catalog & Recommendations
export const VISA_CATALOG: Record<string, Record<string, VisaRecommendation>> = {
  Germany: {
    student: {
      country: 'Germany',
      purpose: 'student',
      visaCategoryName: 'National Visa (Category D) for Study Purposes',
      visaSubtype: 'Section 16b AufenthG (Higher Education Degree)',
      validityDescription: 'Initial entry visa valid for 3 to 6 months; converted into German Residence Permit upon city registration (Bürgeramt/Ausländerbehörde).',
      permittedStay: 'Duration of academic program (typically 1.5 to 3 years) + 18-month post-study job seeker visa.',
      standardProcessingTime: '4 to 8 weeks after VFS biometrics appointment',
      estimatedVisaFeeINR: 6750, // €75
      eligibilitySummary: [
        'Confirmed unconditionally accepted letter of admission (Zulassungsbescheid) from a recognized German State or State-accredited University.',
        'Academic Evaluation Centre (APS) digital verification certificate issued for Indian academic records.',
        'Proof of financial sustenance: Sperrkonto (Blocked Account) of minimum €11,904/year (€992/month).',
        'Incoming Travel Health Insurance covering min. €30,000 for arrival, followed by statutory German Public Health Insurance (TK, Barmer, DAK) or equivalent.'
      ],
      keyCriteria: {
        passportValidityRequired: 'Minimum 12 months validity from intended travel date, issued within last 10 years, min. 2 blank visa pages.',
        financialProofRequired: 'Blocked Account (Sperrkonto) with minimum €11,904 balance OR official formal obligation (Verpflichtungserklärung).',
        healthInsuranceRequired: 'Incoming travel health insurance covering min. €30,000 and valid for at least 180 days from entry date.',
        specialRequirements: 'Original APS Certificate with valid cryptographic verification QR code.'
      },
      requiredDocuments: [
        {
          id: 'doc-ger-stu-01',
          name: 'German University Admission Letter (Zulassungsbescheid)',
          requirementType: 'mandatory',
          description: 'Official unconditional admission letter from the German university specifying program name, semester, language of instruction, and exact starting date.',
          acceptedFormats: ['PDF', 'JPG'],
          maxSizeMB: 2,
          officialRuleTip: 'Ensure the semester start date on letter is after your intended VFS appointment date.',
          commonMistakes: 'Uploading conditional language course letter without conditional university guarantee.'
        },
        {
          id: 'doc-ger-stu-02',
          name: 'Proof of Financial Resources (Sperrkonto Blocked Account)',
          requirementType: 'financial',
          description: 'Official confirmation letter from a licensed German blocked account provider (Expatrio, Coracle, Fintiba) confirming deposit of at least €11,904.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Must display €11,904 total and €992 monthly payout limit. Old €11,208 deposits will be rejected.',
          commonMistakes: 'Uploading bank transfer receipt instead of final Blocked Amount Confirmation letter.'
        },
        {
          id: 'doc-ger-stu-03',
          name: 'APS Certificate (Akademische Prüfstelle India)',
          requirementType: 'mandatory',
          description: 'Original digital APS certificate issued by the German Embassy New Delhi verifying your Bachelor degree / Class 12 transcripts.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'QR code must be intact and scannable by consular officers.',
          commonMistakes: 'Applying before receiving the completed APS evaluation.'
        },
        {
          id: 'doc-ger-stu-04',
          name: 'Valid Indian Passport (Front, Back & Visa Pages)',
          requirementType: 'mandatory',
          description: 'Original passport valid for at least 12 months beyond intended arrival in Germany, with at least 2 empty pages.',
          acceptedFormats: ['PDF', 'JPG'],
          maxSizeMB: 2,
          officialRuleTip: 'Must be issued within the last 10 years. Damaged or handwritten passports not accepted.',
          commonMistakes: 'Passport expiring within 6 months of course start date.'
        },
        {
          id: 'doc-ger-stu-05',
          name: 'Travel Health Insurance & German Statutory Health Coverage',
          requirementType: 'mandatory',
          description: 'Incoming travel insurance policy with min. €30,000 emergency medical coverage, plus proof of statutory health insurance registration (TK, Barmer, etc.).',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Deductible must be zero or max €100. Policy must cover repatriation.',
          commonMistakes: 'Purchasing local Indian medical cover without international repatriation clause.'
        },
        {
          id: 'doc-ger-stu-06',
          name: 'Academic Certificates (Degree & Transcripts)',
          requirementType: 'mandatory',
          description: 'Attested copies of 10th marksheet, 12th marksheet, and Bachelor degree diploma with chronological transcripts.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Names on marksheets must match passport name exactly.',
          commonMistakes: 'Spelling mismatch between university marksheet and passport.'
        },
        {
          id: 'doc-ger-stu-07',
          name: 'Motivation Letter & Curriculum Vitae (Europass CV)',
          requirementType: 'conditional',
          description: 'Signed letter explaining your academic goals in Germany and why this specific university program was chosen.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Must be original, signed, and not a generic internet template.',
          commonMistakes: 'Copy-pasting generic statements without program-specific details.'
        }
      ],
      officialPortal: {
        portalName: 'VIDEX Online National Visa Form (diplo.de)',
        portalUrl: 'https://videx.diplo.de/videx/desktop/index.html#start',
        appointmentProvider: 'VFS Global Germany (India)',
        appointmentUrl: 'https://visa.vfsglobal.com/ind/en/deu/book-an-appointment'
      }
    },
    tourist: {
      country: 'Germany',
      purpose: 'tourist',
      visaCategoryName: 'Schengen Visa (Category C) for Tourism / Family Visit',
      visaSubtype: 'Uniform Schengen Short-Stay Visa',
      validityDescription: 'Single or Multiple entry; valid for up to 90 days within any 180-day period.',
      permittedStay: 'Up to 90 days.',
      standardProcessingTime: '15 calendar days from appointment date',
      estimatedVisaFeeINR: 8100, // €90
      eligibilitySummary: [
        'Confirmed round-trip flight reservations and hotel bookings for the entire duration of stay.',
        'Proof of financial solvency: Bank statements for the last 3 months with stamp and signature showing min. ₹2.5 - ₹3 Lakhs.',
        'Income Tax Returns (ITR-V) for the last 2 financial years.',
        'Leave sanction letter / NOC from Indian employer or business registration certificate.'
      ],
      keyCriteria: {
        passportValidityRequired: 'Minimum 3 months validity beyond intended departure from Schengen area; 2 blank pages.',
        financialProofRequired: 'Bank account statements (3 months stamped) showing minimum €45 - €50 per day of planned stay.',
        healthInsuranceRequired: 'Schengen-approved medical travel insurance covering minimum €30,000 for all 29 member states.'
      },
      requiredDocuments: [
        {
          id: 'doc-ger-tou-01',
          name: 'Confirmed Round-Trip Flight Reservation',
          requirementType: 'mandatory',
          description: 'Detailed itinerary showing entry into and exit from the Schengen territory with PNR.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Do not purchase non-refundable flight tickets until visa approval.',
          commonMistakes: 'One-way booking without return date.'
        },
        {
          id: 'doc-ger-tou-02',
          name: 'Confirmed Accommodation Proof (Hotel / Airbnb)',
          requirementType: 'mandatory',
          description: 'Hotel reservations covering every night of stay in Germany and other visited Schengen states.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Dates must perfectly align with flight dates.',
          commonMistakes: 'Gap in accommodation between travel dates.'
        },
        {
          id: 'doc-ger-tou-03',
          name: 'Personal Bank Account Statements (Last 3 Months)',
          requirementType: 'financial',
          description: 'Original stamped and signed bank statements showing active salary credits and sufficient balance.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Avoid sudden unexplained large deposits right before statement generation.',
          commonMistakes: 'Uploading internet banking printouts without bank seal and sign.'
        },
        {
          id: 'doc-ger-tou-04',
          name: 'Travel Medical Insurance (€30,000 Coverage)',
          requirementType: 'mandatory',
          description: 'Policy covering emergency medical, hospitalization, and repatriation across all Schengen states.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Policy must explicitly state "Valid for all Schengen States".',
          commonMistakes: 'Buying domestic travel insurance.'
        },
        {
          id: 'doc-ger-tou-05',
          name: 'Income Tax Return (ITR-V) for Last 2 Years',
          requirementType: 'mandatory',
          description: 'ITR acknowledgement forms verifying domestic economic ties to India.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Provides strong proof of intent to return to India after trip.',
          commonMistakes: 'Submitting PAN card alone without filed tax returns.'
        }
      ],
      officialPortal: {
        portalName: 'VIDEX Short-Stay Schengen Application',
        portalUrl: 'https://videx.diplo.de/',
        appointmentProvider: 'VFS Global Germany',
        appointmentUrl: 'https://visa.vfsglobal.com/ind/en/deu'
      }
    },
    business: {
      country: 'Germany',
      purpose: 'business',
      visaCategoryName: 'Schengen Business Visa (Category C)',
      visaSubtype: 'Business / Trade Fair / Corporate Delegation',
      validityDescription: 'Single or Multiple entry; valid for 90 days in 180 days.',
      permittedStay: 'As requested per business invitation letter.',
      standardProcessingTime: '10 to 15 calendar days',
      estimatedVisaFeeINR: 8100, // €90
      eligibilitySummary: [
        'Official invitation letter from German partner company or trade fair entry badge.',
        'Employer dispatch letter confirming Indian company covers all travel and lodging expenses.',
        'Proof of commercial operations between Indian and German entities.'
      ],
      keyCriteria: {
        passportValidityRequired: 'Minimum 3 months validity beyond trip; min. 2 blank pages.',
        financialProofRequired: 'Corporate bank guarantee or expense coverage declaration under §§ 66-68 AufenthG.',
        healthInsuranceRequired: 'Schengen medical insurance covering min. €30,000.'
      },
      requiredDocuments: [
        {
          id: 'doc-ger-biz-01',
          name: 'Official German Company Invitation Letter',
          requirementType: 'mandatory',
          description: 'Formal letter on company letterhead detailing purpose of visit, schedule, and cost assumption.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Must state whether the German host covers accommodation and expenses.',
          commonMistakes: 'Omitting company registration number (Handelsregister) of the German inviter.'
        },
        {
          id: 'doc-ger-biz-02',
          name: 'Employer Company Deputation & NOC Letter',
          requirementType: 'mandatory',
          description: 'Letter from your Indian employer confirming designation, salary, duration of leave, and purpose.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Must confirm applicant will resume employment upon return.',
          commonMistakes: 'Missing official company seal and authorized signatory designation.'
        }
      ],
      officialPortal: {
        portalName: 'VIDEX Business Portal',
        portalUrl: 'https://videx.diplo.de/',
        appointmentProvider: 'VFS Global Germany',
        appointmentUrl: 'https://visa.vfsglobal.com/ind/en/deu'
      }
    }
  },
  France: {
    tourist: {
      country: 'France',
      purpose: 'tourist',
      visaCategoryName: 'France Short-Stay Tourist Visa (Schengen Type C)',
      visaSubtype: 'Tourism / Vacation',
      validityDescription: 'Up to 90 days in 180 days.',
      permittedStay: 'Up to 90 days.',
      standardProcessingTime: '10 to 15 working days',
      estimatedVisaFeeINR: 8100,
      eligibilitySummary: [
        'Confirmed flight and hotel bookings across France and European destinations.',
        'Bank statements showing min. ₹2.5 Lakhs balance with salary credits.',
        'Schengen insurance min. €30,000.'
      ],
      keyCriteria: {
        passportValidityRequired: '3 months beyond intended departure from Schengen zone.',
        financialProofRequired: 'Proof of min. €65/day if hotel booked, or €120/day without pre-booking.',
        healthInsuranceRequired: '€30,000 minimum medical and repatriation coverage.'
      },
      requiredDocuments: [
        {
          id: 'doc-fra-01',
          name: 'France-Visas Application Receipt',
          requirementType: 'mandatory',
          description: 'Completed application submitted on official France-Visas portal.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Barcoded registration receipt is required at VFS.',
          commonMistakes: 'Filling incorrect travel dates.'
        },
        {
          id: 'doc-fra-02',
          name: 'Confirmed Hotel Reservations & Flights',
          requirementType: 'mandatory',
          description: 'Vouchers with hotel address, phone number, and applicant name.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Must cover complete itinerary.',
          commonMistakes: 'Reservations not showing the applicant name.'
        }
      ],
      officialPortal: {
        portalName: 'France-Visas Official Portal',
        portalUrl: 'https://france-visas.gouv.fr/',
        appointmentProvider: 'VFS Global France',
        appointmentUrl: 'https://visa.vfsglobal.com/ind/en/fra'
      }
    }
  },
  'United Kingdom': {
    business: {
      country: 'United Kingdom',
      purpose: 'business',
      visaCategoryName: 'Standard Visitor Visa (Business & Academic Visits)',
      visaSubtype: 'UKVI Business Visitor',
      validityDescription: '6 months, 2 years, 5 years, or 10 years multiple entry.',
      permittedStay: 'Up to 6 months per visit.',
      standardProcessingTime: '3 to 6 weeks from VFS appointment',
      estimatedVisaFeeINR: 12200, // £115
      eligibilitySummary: [
        'Valid Indian passport with at least 6 months validity.',
        'Letter of invitation from UK host company or conference organizer.',
        'Letter from Indian employer stating business purpose and financial sponsorship.',
        'Bank statements showing sufficient funds.'
      ],
      keyCriteria: {
        passportValidityRequired: 'Valid for the duration of the intended stay.',
        financialProofRequired: '6 months bank statements showing strong financial solvency.',
        healthInsuranceRequired: 'Not mandatory for short-stay UK visitor visa, but recommended.'
      },
      requiredDocuments: [
        {
          id: 'doc-uk-biz-01',
          name: 'UK Conference / Business Invitation Letter',
          requirementType: 'mandatory',
          description: 'Official invitation stating conference agenda, company registration, and role.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Must state whether the UK entity pays for accommodation.',
          commonMistakes: 'Generic flyer instead of personalized invitation.'
        },
        {
          id: 'doc-uk-biz-02',
          name: 'Indian Employer Sponsorship / Deputation Letter',
          requirementType: 'mandatory',
          description: 'Employer letter detailing role, salary, and confirmation of expense coverage.',
          acceptedFormats: ['PDF'],
          maxSizeMB: 2,
          officialRuleTip: 'Original letterhead with HR manager contact details.',
          commonMistakes: 'Missing company contact information.'
        }
      ],
      officialPortal: {
        portalName: 'AccessUK (gov.uk)',
        portalUrl: 'https://www.gov.uk/standard-visitor',
        appointmentProvider: 'VFS Global UK',
        appointmentUrl: 'https://visa.vfsglobal.com/ind/en/gbr'
      }
    }
  }
};

// 3. Demo Profiles for Evaluators / Hackathon Judges
export interface DemoTravelerProfile {
  id: string;
  label: string;
  badge: string;
  applicantName: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  nationality: string;
  destinationCountry: string;
  purposeOfVisit: 'student' | 'tourist' | 'business';
  durationOfStay: string;
  travelDate: string;
  intendedInstitutionOrHost: string;
  fundingSource: string;
  estimatedBudgetINR: string;
  sampleMismatchScenario: {
    description: string;
    badDocumentName: string;
    badDocumentType: string;
    badDocSnippet: string;
    mismatchReason: string;
    correctDocumentName: string;
    correctionAdvice: string;
  };
}

export const DEMO_TRAVELER_PROFILES: DemoTravelerProfile[] = [
  {
    id: 'demo-student-germany',
    label: 'Judges Scenario 1: Indian Student → Germany (TUM Master\'s)',
    badge: 'Core Hackathon Demo Walkthrough',
    applicantName: 'Aarav Sharma',
    passportNumber: 'Z8924108',
    passportIssueDate: '15/06/2021',
    passportExpiryDate: '14/06/2031',
    nationality: 'Indian',
    destinationCountry: 'Germany',
    purposeOfVisit: 'student',
    durationOfStay: '2 Years (4 Semesters)',
    travelDate: '15/09/2026',
    intendedInstitutionOrHost: 'Technical University of Munich (TUM) - M.Sc. Informatics',
    fundingSource: 'Personal Sperrkonto (Blocked Account)',
    estimatedBudgetINR: '₹12,50,000 (Blocked Deposit €11,904)',
    sampleMismatchScenario: {
      description: 'Outdated Blocked Account Balance Deposit Mismatch',
      badDocumentName: 'Blocked_Account_Confirmation_Fintiba_9500EUR.pdf',
      badDocumentType: 'Proof of Financial Resources (Sperrkonto)',
      badDocSnippet: 'Account balance: €9,500.00 | Monthly payout: €791.00',
      mismatchReason: 'German Federal Foreign Office has increased the statutory annual requirement to €11,904 (€992/month). Uploaded document shows €9,500, which will cause immediate visa rejection under Section 16b AufenthG.',
      correctDocumentName: 'Blocked_Account_Confirmation_Expatrio_11904EUR_Valid.pdf',
      correctionAdvice: 'Top up your Blocked Account with the remaining €2,404 and re-generate the 06-Page Sperrkonto Confirmation Certificate before your VFS appointment.'
    }
  },
  {
    id: 'demo-tourist-france',
    label: 'Scenario 2: Tourist Vacation → France (15-Day Schengen)',
    badge: 'Short-Stay Tourist',
    applicantName: 'Priya Patel',
    passportNumber: 'K4491209',
    passportIssueDate: '10/01/2020',
    passportExpiryDate: '09/01/2030',
    nationality: 'Indian',
    destinationCountry: 'France',
    purposeOfVisit: 'tourist',
    durationOfStay: '15 Days',
    travelDate: '10/11/2026',
    intendedInstitutionOrHost: 'Le Marais Boutique Hotel, Paris & Nice Riviera',
    fundingSource: 'Self-Funded Savings Account',
    estimatedBudgetINR: '₹3,20,000',
    sampleMismatchScenario: {
      description: 'Missing International Repatriation Clause in Travel Insurance',
      badDocumentName: 'Domestic_Health_Cover_Policy.pdf',
      badDocumentType: 'Travel Medical Insurance',
      badDocSnippet: 'Coverage: ₹5,00,000 in India only. Excludes European repatriation.',
      mismatchReason: 'Schengen Regulation (EC) No 810/2009 requires all tourists to hold an international travel insurance policy covering at least €30,000 across all Schengen member states with medical evacuation.',
      correctDocumentName: 'Schengen_Travel_Insurance_30k_EUR_Approved.pdf',
      correctionAdvice: 'Purchase a Schengen-compliant international travel policy with min. €30,000 cover and emergency medical evacuation.'
    }
  },
  {
    id: 'demo-business-uk',
    label: 'Scenario 3: Corporate Delegate → United Kingdom (Tech Conference)',
    badge: 'Business Visitor',
    applicantName: 'Vikramaditya Sengupta',
    passportNumber: 'T7712398',
    passportIssueDate: '04/04/2022',
    passportExpiryDate: '03/04/2032',
    nationality: 'Indian',
    destinationCountry: 'United Kingdom',
    purposeOfVisit: 'business',
    durationOfStay: '10 Days',
    travelDate: '05/12/2026',
    intendedInstitutionOrHost: 'London Tech Week 2026 & FinTech Corp UK Ltd',
    fundingSource: 'Corporate Employer Sponsorship',
    estimatedBudgetINR: '₹4,50,000',
    sampleMismatchScenario: {
      description: 'Invitation Letter Lacking Employer Cost Assumption Clause',
      badDocumentName: 'Draft_Invitation_No_Sponsorship.pdf',
      badDocumentType: 'Official Invitation Letter',
      badDocSnippet: 'You are invited to attend London Tech Week. Living expenses to be borne by traveler.',
      mismatchReason: 'Applicant indicated corporate sponsorship, but the uploaded invitation states personal expense assumption without company endorsement letter.',
      correctDocumentName: 'Official_UK_Company_Sponsored_Invitation_Signed.pdf',
      correctionAdvice: 'Attach your Indian employer deputation letter confirming complete assumption of hotel, flight, and daily per diem costs.'
    }
  }
];
