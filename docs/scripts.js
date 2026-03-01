// scripts.js - Shared JavaScript for wedding website

// Language switching (placeholder - implement with i18n library if needed)
function setLanguage(lang) {
    if (!translations[lang]) return;
    // Store language preference
    localStorage.setItem('language', lang);
    // reload page so any dynamic content is reconstructed
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

// simple internationalization support
const translations = {
    en: {
        index: {
            title: 'Hanna & Pontus Wedding',
            prompt: 'Enter your name to continue to wedding site.',
            placeholder: 'First & last name',
            enter: 'Enter',
            errorNotFound: 'Name not found. Please check spelling.'
        },
        wedding: {
            mainHeading: "We're getting married!",
            welcome: 'Join us as we celebrate our love surrounded by the people we cherish most. We can\'t wait to share this special day with you!',
            details: 'We\'re saying our vows on Saturday, June 13th, 2026 at 3:00 PM at the beautiful Kuorasjärven kartano. Please arrive at least 15 minutes before the ceremony starts. After the ceremony, we\'ll celebrate together with food, drinks, and dancing right there at the venue. Our preliminary schedule has the dining starting at 5:00 PM.',
            gift: 'As a wedding gift, we are asking for contributions towards our honeymoon fund. It can be deposited in the following bank account:<br/>IBAN: FI53 3939 0038 8658 12<br/>Recipient: Hanna Koskela<br/>Thank you for helping us create unforgettable memories together!',
            dress: 'Please dress formally — we\'d love for you to look and feel your best as we celebrate together!',
            invite: 'Please respond to the invitation by April 30th 2026. The invite is only valid for the named people.',
            travelTitle: 'Travel & Accommodation',
            travelBus: 'Bus transport to and from Seinäjoki will be provided. Please indicate your need for transport in the RSVP form.',
            travelHotels: 'Below you can find recommended hotels in Seinäjoki close to the train station.',
            venueTitle: 'Venue Details',
            venueAddress: 'Address: Hiidenniementie 11, Sydänmaa, Alavus',
            rsvpButton: 'RSVP Now'
        },
        rsvp: {
            pageTitle: 'RSVP',
            submit: 'Submit RSVP',
            thankYouTitle: 'Thank you!',
            thankYouText: 'Your RSVP has been submitted. You can update it anytime.',
            noGroup: 'No group data found. Please verify again.',
            invalidData: 'Invalid data: groupId or updates missing.',
            submissionFailed: 'Submission failed.',
            attendingLabel: 'Attending:',
            attendingSelectDefault: 'Select',
            yes: 'Yes',
            no: 'No',
            dietaryLabel: 'Dietary Restrictions:',
            dietaryPlaceholder: 'e.g., vegetarian',
            transportLabel: 'Need Bus Transport:'
        }
    },
    sv: {
        index: {
            title: 'Hannas & Pontus bröllop',
            prompt: 'Ange ditt namn för att fortsätta till bröllopssidan.',
            placeholder: 'För- och efternamn',
            enter: 'Sänd',
            errorNotFound: 'Namnet hittades inte. Kontrollera stavningen.'
        },
        wedding: {
            mainHeading: 'Vi gifter oss!',
            welcome: 'Välkomna med och fira vår kärlek. Vi ser fram emot att dela denna speciella dag med er!',
            details: 'Vi avger våra löften lördagen den 13 juni 2026 kl. 15:00 vid Kuorasjärven kartano. Vänligen kom minst 15 minuter innan ceremonins början. Efter ceremonin fortsätter firandet på samma plats med mat, dryck och dans. Enligt vår preliminära tidsplan inleds middagen kl. 17:00.',
            gift: 'Som bröllopsgåva ber vi om bidrag till kassan för vår smekmånad. Gåvan kan sättas in på följande bankkonto:<br/>IBAN: FI53 3939 0038 8658 12<br/>Mottagare: Hanna Koskela<br/>Tack för ert bidrag som hjälper oss skapa oförglömliga minnen tillsammans!',
            dress: 'Vänligen klä er formellt.',
            invite: 'Vänligen anmäl er senast den 30 april 2026. Inbjudan gäller endast för de namngivna personerna.',
            travelTitle: 'Resor & boende',
            travelBus: 'Buss till och från Seinäjoki ordnas. Vänligen ange ert transportbehov i anmälningsformuläret.',
            travelHotels: 'Nedan hittar du rekommenderade hotell i Seinäjoki.',
            venueTitle: 'Platsinformation',
            venueAddress: 'Adress: Hiidenniementie 11, Sydänmaa, Alavus',
            rsvpButton: 'Anmälan'
        },
        rsvp: {
            pageTitle: 'Anmälan',
            submit: 'Skicka anmälan',
            thankYouTitle: 'Tack!',
            thankYouText: 'Din anmälan har skickats. Du kan gå tillbaka och uppdatera den när som helst.',
            noGroup: 'Ingen gruppdata hittades. Verifiera igen.',
            invalidData: 'Ogiltigt data: gruppID eller uppdateringar saknas.',
            submissionFailed: 'Formulärets skickande misslyckades.',
            attendingLabel: 'Närvaro:',
            attendingSelectDefault: 'Välj',
            yes: 'Ja',
            no: 'Nej',
            dietaryLabel: 'Specialkost:',
            dietaryPlaceholder: 't.ex., vegetarisk',
            transportLabel: 'Behöver busstransport (från Seinäjoki):'
        }
    },
    fi: {
        index: {
            title: 'Hanna & Pontus häät',
            prompt: 'Syötä nimesi jatkaaksesi hääsivustolle.',
            placeholder: 'Etunimi & sukunimi',
            enter: 'Lähetä',
            errorNotFound: 'Nimeä ei löytynyt. Tarkista kirjoitusasu.'
        },
        wedding: {
            mainHeading: 'Olemme kihlassa!',
            welcome: 'Liity seuraamme juhlimaan rakkauttamme ihmisten ympäröimänä, joita arvostamme eniten. Emme malta odottaa jakavamme tätä erityistä päivää kanssasi!',
            details: 'Vaihdomme lupauksemme lauantaina 13. kesäkuuta 2026 klo 15.00 kauniissa Kuorasjärven kartanossa. Saavu mielellään vähintään 15 minuuttia ennen seremonian alkua. Seremonian jälkeen juhlimme yhdessä ruokien, juomien ja tanssin parissa. Alustava aikataulumme on, että ruokailu alkaa klo 17.00.',
            gift: 'Häälahjana pyydämme lahjoituksia häämatkaamme varten. Ne voi tallettaa seuraavalle pankkitilille:<br/>IBAN: FI53 3939 0038 8658 12<br/>Saaja: Hanna Koskela<br/>Kiitos, että autat meitä luomaan unohtumattomia muistoja yhdessä!',
            dress: 'Pukeudu virallisesti – haluamme, että näytät ja tunnet olosi parhaaksi juhliessamme yhdessä!',
            invite: 'Ilmoittakaa kutsuun viimeistään 30. huhtikuuta 2026. Kutsu on voimassa vain nimetylle henkilölle.',
            travelTitle: 'Matkustus & majoitus',
            travelBus: 'Bussi Seinäjoelle ja takaisin on järjestetty. Ilmoita kuljetustarpeestasi RSVP-lomakkeessa.',
            travelHotels: 'Alta löydät suositeltuja hotelleja Seinäjoella lähellä rautatieasemaa.',
            venueTitle: 'Paikan tiedot',
            venueAddress: 'Osoite: Hiidenniementie 11, Sydänmaa, Alavus',
            rsvpButton: 'Vastaa kutsuun'
        },
        rsvp: {
            pageTitle: 'RSVP',
            submit: 'Lähetä RSVP',
            thankYouTitle: 'Kiitos!',
            thankYouText: 'RSVP on lähetetty. Voit päivittää sen milloin tahansa.',
            noGroup: 'Ryhmätietoja ei löytynyt. Vahvista uudelleen.',
            invalidData: 'Virheelliset tiedot: puuttuu groupId tai päivityksiä.',
            submissionFailed: 'Lähetys epäonnistui.',
            attendingLabel: 'Osallistuminen:',
            attendingSelectDefault: 'Valitse',
            yes: 'Kyllä',
            no: 'Ei',
            dietaryLabel: 'Ravintorajoitukset:',
            dietaryPlaceholder: 'esim. kasvisruokavalio',
            transportLabel: 'Tarvitseeko bussin:'
        }
    }
};

// determine current language (en/sv/fi)
function getPreferredLanguage() {
    let lang = localStorage.getItem('language');
    if (lang && translations[lang]) return lang;
    const nav = navigator.language || navigator.userLanguage || 'en';
    const short = nav.slice(0,2).toLowerCase();
    if (translations[short]) return short;
    return 'en';
}

function t(key){
    const lang = getPreferredLanguage();
    const parts = key.split('.');
    let obj = translations[lang];
    for(const p of parts){
        if (obj && typeof obj === 'object' && p in obj){
            obj = obj[p];
        } else {
            return key; // fallback to key
        }
    }
    return obj;
}

function applyTranslations(){
    document.documentElement.lang = getPreferredLanguage();
    // update title if translation exists
    const titleKey = 'index.title';
    const titleText = t(titleKey);
    if (titleText && titleText !== titleKey) document.title = titleText;

    document.querySelectorAll('[data-i18n]').forEach(el=>{
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el=>{
        el.innerHTML = t(el.dataset.i18nHtml);
    });
}

// Page-specific logic (called on load)
function initPage() {
    // Apply chosen or browser language
    applyTranslations();

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
