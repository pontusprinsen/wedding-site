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

// Initialize carousel controls and dots
function initCarousel() {
    const viewport = document.querySelector('.carousel__viewport');
    if (!viewport) return;
    const slides = Array.from(viewport.querySelectorAll('.carousel__slide'));
    const prevBtn = document.querySelector('.carousel__control--prev');
    const nextBtn = document.querySelector('.carousel__control--next');
    const dotsContainer = document.querySelector('.carousel__dots');
    if (!dotsContainer) return;

    let currentIndex = 0;
    let scrollTimer = null;

    // build dots
    slides.forEach((slide, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'carousel__dot';
        btn.setAttribute('aria-label', `Go to slide ${i+1}`);
        btn.addEventListener('click', () => {
            slide.scrollIntoView({ behavior: 'smooth', inline: 'start' });
            setActive(i);
            history.replaceState(null, '', `#${slide.id}`);
        });
        dotsContainer.appendChild(btn);
    });

    function setActive(index) {
        currentIndex = index;
        slides[index].focus({ preventScroll: true });
        const allDots = dotsContainer.querySelectorAll('.carousel__dot');
        allDots.forEach((d, di) => d.classList.toggle('active', di === index));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
        const target = (currentIndex - 1 + slides.length) % slides.length;
        slides[target].scrollIntoView({ behavior: 'smooth', inline: 'start' });
        setActive(target);
        history.replaceState(null, '', `#${slides[target].id}`);
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        const target = (currentIndex + 1) % slides.length;
        slides[target].scrollIntoView({ behavior: 'smooth', inline: 'start' });
        setActive(target);
        history.replaceState(null, '', `#${slides[target].id}`);
    });

    // Update active slide on scroll (debounced)
    viewport.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            const slideWidth = viewport.clientWidth;
            const idx = Math.round(viewport.scrollLeft / slideWidth);
            const clamped = Math.min(Math.max(idx, 0), slides.length - 1);
            setActive(clamped);
            history.replaceState(null, '', `#${slides[clamped].id}`);
        }, 80);
    });

    // Initial position from hash or first slide
    const initialHash = window.location.hash.replace('#', '');
    let initialIndex = 0;
    if (initialHash) {
        const el = document.getElementById(initialHash);
        if (el) initialIndex = slides.indexOf(el);
    }
    slides[initialIndex].scrollIntoView({ behavior: 'auto', inline: 'start' });
    setActive(initialIndex);
}

document.addEventListener('DOMContentLoaded', initCarousel);
