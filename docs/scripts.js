// scripts.js - Shared JavaScript for wedding website

// Language switching (placeholder - implement with i18n library if needed)
function setLanguage(lang) {
    // Store language preference
    localStorage.setItem('language', lang);
    // Reload page or update text dynamically
    location.reload();
}

// Verification token management
function setVerificationToken(name) {
    sessionStorage.setItem('verifiedGuest', name);
}

function getVerificationToken() {
    return sessionStorage.getItem('verifiedGuest');
}

function clearVerificationToken() {
    sessionStorage.removeItem('verifiedGuest');
}

// Group data management
function setGroupData(group) {
    sessionStorage.setItem('groupData', JSON.stringify(group));
}

function getGroupData() {
    const data = sessionStorage.getItem('groupData');
    return data ? JSON.parse(data) : null;
}

// API endpoints (Google Apps Script URLs - CORS handled by GitHub Pages HTTPS)
const API_BASE = 'https://script.google.com/macros/s/AKfycbygi1KN85bAjT8rhjnzI3JJNfdooP02jpoAA1ioIZJ8cY5ZTCRwCJR1Sti5bocI10vF/exec';


const VERIFY_ENDPOINT = `${API_BASE}?action=verify`;
const RSVP_ENDPOINT = `${API_BASE}?action=rsvp`;

// Verify guest name
async function verifyGuest(name) {
    try {
        const response = await fetch(`${VERIFY_ENDPOINT}&name=${encodeURIComponent(name)}`);
        const data = await response.json();
        if (data.success) {
            setVerificationToken(name);
            setGroupData(data.group);
            return { success: true, group: data.group };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Verification error:', error);
        return { success: false, message: 'Network error. Please try again.' };
    }
}

// Submit RSVP
async function submitRSVP(rsvpData) {
  const body = 'payload=' + encodeURIComponent(JSON.stringify(rsvpData));
  return fetch(RSVP_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body,
    credentials: 'omit'
  })
  .then(res => res.json());
}

// Utility: Get URL parameter
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Page-specific logic (called on load)
function initPage() {
    // Language setup
    const lang = localStorage.getItem('language') || 'en';
    document.documentElement.lang = lang;

    // Check verification on protected pages
    if (window.location.pathname.includes('wedding.html') || window.location.pathname.includes('rsvp.html')) {
        const verified = getVerificationToken();
        if (!verified) {
            window.location.href = 'index.html';
        } else {
            // Display guest name
            const nameElements = document.querySelectorAll('#guestname');
            nameElements.forEach(el => el.textContent = verified);
        }
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', initPage);