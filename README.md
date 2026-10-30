# Passport Seva – Smart Application Experience
### Improving the Existing Passport Seva Website Without Changing Its Original Functionality

[![GovTech Open Innovation](https://img.shields.io/badge/Category-GovTech%20Innovation-blue.svg)](https://www.passportindia.gov.in/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff.svg)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38b2ac.svg)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/AI-Google%20Gemini%20API-orange.svg)](https://ai.google.dev/)

> **Project Philosophy:** *"First clone the existing Passport Seva website, then modify only the specific sections that need improvement."*  
> (40% faithful replica of [passportindia.gov.in](https://www.passportindia.gov.in/) + 60% targeted high-impact UX enhancements).

---

## 📌 Problem Statement & MEA Lok Sabha Data

According to official Ministry of External Affairs (MEA) data presented in the Lok Sabha on **12 December 2025**, recorded citizen grievances during 2023–2025 included:

| Recorded Lok Sabha Grievance | Complaint Count | Targeted Solution in Our Prototype |
|---|---:|---|
| **Delay in appointment dates** | **5,304** | Live PSK slot availability matrix with transparent booking & 1-click slot rescheduling |
| **Website not working / Outages** | **1,390** | Client-resilient offline SPA architecture with zero-crash fallbacks |
| **Form upload problems** | **655** | Real-time multi-step field validation with inline contextual guidance & schema sanity |
| **Problems attaching documents** | **492** | Pre-submission file format/size checks & **Live Google Gemini AI Verification** |
| **Saved file retrieval issues** | **404** | Real-time browser `localStorage` **Auto-Save** with instant draft restoration |

---

## ✨ 5 Core Enhanced Modules

### 1. Smart Document Advisor (Priority: P0)
- **Personalized Circumstances:** Dynamic rule evaluation for Fresh vs. Reissue, Adult vs. Minor vs. Senior, Address change, Name change, Educational status (10th pass / Non-ECR), and Minor parental custody.
- **Dynamic Checklist:** Auto-categorized into **Mandatory**, **Conditional**, and **Optional** documents citing official MEA legal clauses (*Section 4(2) Passport Rules 1980*).
- **Gemini AI Document Advisor:** Ask conversational questions to Google Gemini regarding complex document rules and edge cases.
- **Readiness Score:** Computes real-time document preparation percentage.

### 2. Smart Document Upload & Live Gemini AI Validation (Priority: P0)
- **Automatic File Sanity:** Checks format (`PDF`, `JPG`, `PNG`) and file size limits (`30 KB` to `2.0 MB`).
- **Google Gemini AI Target Requirement Check:** Powered by Google's `gemini-3.5-flash-lite` API to verify whether the uploaded document legally satisfies the selected target category under Passport Rules 1980.
- **AI Mismatch Detection:** Automatically detects mismatches (e.g., uploading a PAN card for Proof of Address, warning that PAN lacks residential address before PSK rejection).
- **1-Click Auto-Compressor:** Automatically compresses oversized documents to comply with the 2 MB limit.

### 3. Reissue of Passport: Gemini AI Discrepancy & Photo Comparison (Special Feature)
- **Old Passport vs. New Draft Comparison:** Compares previous booklet data (photo, name, address, ECR status) against the live application draft.
- **Photo & Appearance Progression:** Evaluates age progression (e.g. minor to adult), beard, spectacles, or turban changes under ICAO 9303 biometric standard.
- **Counter Objections Breakdown:** Predicts what specific objections **Counter A** (Biometrics/Data), **Counter B** (Verification Officer), and **Counter C** (Granting Officer) will raise.
- **Legal Remedies:** Explicitly provides the required affidavits (Marriage Certificate, Deed Poll, Gazette notification, Annexure E) to prevent application file holds.

### 4. Resilient Multi-Step Form with Auto-Save (Priority: P1)
- **6-Section Form:** Service Required, Applicant Particulars, Family Details, Address, Emergency Contact, and Self Declaration.
- **Real-Time Field Validation:** Immediate flags for missing fields, phone numbers (10 digits), PIN code (6 digits), and date of birth sanity.
- **Contextual Guidance:** Inline tooltips clarifying tricky fields such as ECR vs. Non-ECR rules and Given Name vs. Surname rules.
- **Local Auto-Save:** Automatically persists entries to `localStorage` as you type, displaying a timestamp badge and recovering drafts on refresh.
- **One-Click Pre-fill:** Demo button to populate sample applicant data (Aarav Sharma) for rapid evaluator testing.

### 4. Visual Application Tracker (Priority: P0)
- **8-Stage Visual Timeline:** Application Submitted $\rightarrow$ Payment Confirmed $\rightarrow$ Appointment Scheduled $\rightarrow$ Biometrics at PSK $\rightarrow$ Police Verification $\rightarrow$ Printing $\rightarrow$ Dispatched via Speed Post $\rightarrow$ Delivered.
- **Predefined Demo Records for Evaluators:**
  - `DEMO1001`: Fresh Passport – *Appointment Scheduled* (PSK New Delhi)
  - `DEMO1002`: Reissue – *Police Verification in Progress* (Hauz Khas PS)
  - `DEMO1003`: Fresh Passport – *Dispatched via Speed Post* (`IN892348234IN`)
  - `DEMO1004`: Tatkaal Reissue – *Action Required: Address Clarification*
  - Any new application submitted from Module 3 is automatically saved and tracked!
- **Action Boxes & Alert Feed:** Clear *"Next Expected Action"*, *"Applicant Action Required"*, and automated SMS/Email simulation logs.

### 5. Fee Payment Simulation (Priority: P1)
- **Payment Modes:** SBI ePay, BHIM / UPI QR code simulation, Internet Banking, and Debit Cards.
- **Interactive Test States:** Instant toggles to demonstrate *Payment Success* (with confetti & official downloadable PDF receipt), *Payment Failure with Auto-Recovery*, and *Refund Initiated*.
- **Fee Breakdown:** Application fee (₹1,500 normal / ₹3,500 tatkaal) + SMS notification alert fee (₹50) with automated receipt numbering.
- **Appointment Slot Management:** Transparent Kendra slot calendar across PSK Herald House (Delhi), Bengaluru Lalbagh, Mumbai Lower Parel, Gurugram, and POPSK Noida.

---

## 🏛️ Authentic Gov.in Design & Accessibility

- **National Emblem of India:** Ashoka Lion Capital with *Satyameva Jayate*.
- **Government Accessibility Toolbar:** Font size toggles (`A-`, `A`, `A+`), High Contrast Mode, Screen Reader access, and bilingual toggle (English / हिन्दी).
- **Official 3-Column Layout:** Matches [passportindia.gov.in](https://www.passportindia.gov.in/) with quick registration, user login modal, service cards, and official footer with National Portal of India links.
- **Evaluator Quick Tour Banner:** Floating top banner with direct 1-click jumps to test any module or scenario instantly.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/Shubham-250907/Web-Vision-2.0.git

# Navigate into the project directory
cd Web-Vision-2.0

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **AI Integration:** Google Gemini API (`gemini-3.5-flash-lite`)
- **Icons:** Lucide React
- **Animations:** Canvas Confetti

---

## 📄 License
Created for Open Innovation Hackathon (GovTech Category). All passport terminology and rules referenced from the Ministry of External Affairs, Government of India.
