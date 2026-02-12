# Wedding Website – Project Specification for Copilot

## 🎯 Project Goal
Build a wedding website that provides invited guests with secure access to event details and a guided RSVP experience. The site must verify each guest’s identity, display content only to authorized users, and collect RSVP information for the guest and any eligible linked guests.

---

## 🧭 Core Functional Requirements

### 1. Identity Verification
- Validate guest names against the official guest list before granting access to the site content.
- Support minor input variations such as capitalization or spacing.
- Avoid revealing guest list data during the verification process.

### 2. Access Control
- Restrict content access to verified guests only.
- Prevent exposure of other guests’ data under all circumstances.

### 3. Information Delivery
Verified guests should be able to view:

- Full event schedule  
- Venue details and directions  
- Dress code guidance  
- Travel and accommodation info  
- Additional host‑defined details  

### 4. RSVP Workflow
The system must provide the following for the identified guest and any other people with the same Group ID:

- Collect attendance status  
- Record dietary restrictions  
- Record whether the guest need bus transport to the venue
- Present a confirmation summary before submission  
- Display a completion message after submission
- If guest return to site at later stage, show their submitted RSVP details with option to update
---

## 🔐 Security & Privacy Requirements
- Never expose the guest list or imply who is invited.  
- Avoid confirming other guests’ identities.  
- Block access to restricted content without successful verification.  
- Require explicit confirmation before modifying RSVP data.

---

## 🧱 Data Model Assumptions
The data is stored in a google sheet in google drive. This sheet is the master source of truth for the guest list and RSVP data. Hence the site must always read from and write to this sheet.

Each guest record includes:

- Full name  
- A Group ID indicating which other guests (e.g., +1s, family) they are linked to
- RSVP status and details  
- Dietary restrictions  
- Transport needs

The Copilot agent may assume this structure when assisting with development tasks.

---

## 🧭 User Experience & Content Style
Guest‑facing UI copy should be:
- Friendly and warm
- Clear and concise
- Reflective of the couple's personalities
- Encouraging and inclusive
- Responsive and mobile-friendly