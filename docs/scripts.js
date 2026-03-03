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
            details: 'We\'re saying our vows on Saturday, June 13th, 2026 at 3:00 PM at the beautiful Kuorasjärven kartano. Please arrive at least 15 minutes before the ceremony starts. After the ceremony, we\'ll celebrate together with food, drinks, and dancing right there at the venue. Please note that according to our preliminary schedule the dining starts at 5:00 PM.',
            gift: 'Your presence is the greatest gift we could ask for. However, if you wish to give a wedding gift, we kindly invite you to contribute to our honeymoon fund. Contributions can be made to the following bank account:<br/>IBAN: FI53 3939 0038 8658 12<br/>Recipient: Hanna Koskela<br/>Thank you for helping us create unforgettable memories together!',
            dress: 'The dress code for our wedding is formal attire. We hope you will feel comfortable and at your best as we celebrate together.',
            invite: 'Please respond to the invitation by April 30th 2026. The invite is only valid for the named people.',
            travelTitle: 'Travel & Accommodation',
            travelBus: 'The bride and groom will provide bus transportation back and forth from Seinäjoki. Please indicate your need for transport in the RSVP form.',
            travelHotels: 'Below you can find recommended hotels in Seinäjoki. They are all located close to the train station.',
            venueTitle: 'Venue Details',
            venueAddress: 'Address: Hiidenniementie 11, Sydänmaa, Alavus',
            rsvpButton: 'RSVP Now',
            footerText: '© 2026 Hanna & Pontus.',
            hotels: [
                { name: 'Hotel Alma', info: 'Discount: -15% from 12.-14.6. with code Prinsén2026' },
                { name: 'Original Sokos Hotel Vaakuna', info: '' },
                { name: 'Original Sokos Hotel Lakeus', info: '' },
                { name: 'Scandic Seinäjoki', info: '' }
            ]
        },
        rsvp: {
            pageTitle: 'RSVP',
            submit: 'Submit RSVP',
            thankYouTitle: 'Thank you!',
            thankYouText: 'Your answer has been submitted. You can come back and update it anytime.',
            noGroup: 'No group data found. Please verify again.',
            invalidData: 'Invalid data: groupId or updates missing.',
            submissionFailed: 'Submission failed.',
            attendingLabel: 'Attendance:',
            attendingSelectDefault: 'Select',
            yes: 'Yes',
            no: 'No',
            dietaryLabel: 'Dietary Restrictions:',
            dietaryPlaceholder: 'e.g., vegetarian',
            transportLabel: 'Require bus transport from Seinäjoki:',
            footerText: '© 2026 Hanna & Pontus.'
        },
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
            welcome: 'Varmt välkomna att fira vår kärlek tillsammans med oss. Vi ser fram emot att dela denna speciella dag med er.',
            details: 'Vi avger våra löften lördagen den 13 juni 2026 kl. 15:00 vid Kuorasjärven kartano. Vänligen anländ minst 15 minuter innan ceremonins början. Efter ceremonin fortsätter firandet på samma plats med mat, dryck och dans. Enligt vår preliminära tidsplan inleds middagen kl. 17:00.',
            gift: 'Er närvaro är allt vi önskar. Om ni ändå vill uppmärksamma vår dag med en gåva uppskattar vi ett bidrag till vår bröllopsresa. Eventuella bidrag kan sättas in på följande konto:<br/>IBAN: FI53 3939 0038 8658 12<br/>Mottagare: Hanna Koskela<br/>Tack för ert bidrag som hjälper oss skapa oförglömliga minnen tillsammans!',
            dress: 'Vänligen klä er festligt. Vi hoppas att ni känner er bekväma och som ert bästa jag när vi firar tillsammans.',
            invite: 'Vi ber er vänligen att anmäla ert deltagande senast den 30 april 2026. Inbjudan gäller endast för de namngivna personerna.',
            travelTitle: 'Resor & boende',
            travelBus: 'Brudparet står för busstransport från och till Seinäjoki. Vänligen ange ert behov av transport i anmälningsformuläret.',
            travelHotels: 'Nedan hittar du rekommenderade hotell i Seinäjoki.',
            venueTitle: 'Information om festplatsen',
            venueAddress: 'Adress: Hiidenniementie 11, Sydänmaa, Alavus',
            rsvpButton: 'Anmälan',
            footerText: '© 2026 Hanna & Pontus.',
            hotels: [
                { name: 'Hotell Alma', info: 'Rabatt: -15% från 12.-14.6. med koden Prinsén2026' },
                { name: 'Original Sokos Hotel Vaakuna', info: '' },
                { name: 'Original Sokos Hotel Lakeus', info: '' },
                { name: 'Scandic Seinäjoki', info: '' }
            ]
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
            transportLabel: 'Behöver busstransport (från Seinäjoki):',
            footerText: '© 2026 Hanna & Pontus.'
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
            mainHeading: 'Me mennään naimisiin!',
            welcome: 'Liity seuraamme, kun juhlistamme rakkauttamme meille tärkeimpien ihmisten ympäröimänä. Emme malta odottaa, että pääsemme jakamaan meille hyvin erityisen päivän teidän kaikkien kanssa!',
            details: 'Vaihdomme lupauksemme lauantaina 13. kesäkuuta 2026 klo 15.00 kauniissa Kuorasjärven kartanossa. Saavu mielellään vähintään 15 minuuttia ennen seremonian alkua. Seremonian jälkeen juhlimme yhdessä ruokien, juomien ja tanssin parissa. Alustava aikataulumme on, että ruokVannomme valamme lauantaina 13. kesäkuuta 2026 klo 15:00 kauniilla Kuorasjärven kartanolla. Pyydämme teitä saapumaan vähintään 15 minuuttia ennen seremonian alkua. Seremonian jälkeen juhlat jatkuvat samassa paikassa kera ruuan, juoman ja tanssin. Pyydämme huomioimaan, että alustavan aikataulun mukaisesti ruokailu alkaa klo 17:00.',
            gift: 'Meille tärkeintä on, että olette läsnä juhlissamme. Halutessanne muistaa meitä muutenkin kuin läsnäolollanne, toivomme kontribuutiota häämatkaamme varten. Tämän voi osoittaa yhteiselle pankkitilillemme:<br/>IBAN: FI53 3939 0038 8658 12<br/>Saaja: Hanna Koskela<br/>Kiitämme päästessämme luomaan lisää unohtumattomia muistoja yhdessä!',
            dress: 'Häidemme pukukoodi on juhlallinen pukeutuminen. Toivomme, että tunnet olosi parhaaksi juhliessamme yhdessä!',
            invite: 'Pyydämme teitä ystävällisesti ilmoittamaan osallistumisestanne taikka esteestänne osallistua viimeistään 30. huhtikuuta 2026. Kutsu on voimassa vain erikseen nimetyille henkilöille.',
            travelTitle: 'Matkustus & majoitus',
            travelBus: 'Olemme järjestäneet bussikuljetuksen Seinäjoelta hääpaikalle ja takaisin. Pyydämme ilmoittamaan tarpeestasi kuljetukseen ilmoittautumislomakkeessa.',
            travelHotels: 'Alta löydät suositeltuja hotelleja Seinäjoella lähellä rautatieasemaa',
            venueTitle: 'Juhlapaikan tiedot',
            venueAddress: 'Osoite: Hiidenniementie 11, Sydänmaa, Alavus',
            rsvpButton: 'Vastaa kutsuun',
            footerText: '© 2026 Hanna & Pontus.',
            hotels: [
                { name: 'Hotelli Alma', info: 'Alennus: -15% 12.-14.6. koodilla Prinsén2026' },
                { name: 'Original Sokos Hotel Vaakuna', info: '' },
                { name: 'Original Sokos Hotel Lakeus', info: '' },
                { name: 'Scandic Seinäjoki', info: '' }
            ]
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
            transportLabel: 'Tarvitseeko bussin:',
            footerText: '© 2026 Hanna & Pontus.'
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
    
    // Handle footer text
    const footerEl = document.getElementById('footer-text');
    if (footerEl) {
        footerEl.textContent = t('wedding.footerText') || t('rsvp.footerText') || '© 2026 Hanna & Pontus.';
    }
    
    // Populate hotels list on wedding page
    const hotelsList = document.getElementById('hotels-list');
    if (hotelsList) {
        const lang = getPreferredLanguage();
        const hotels = translations[lang].wedding.hotels || [];
        hotelsList.innerHTML = hotels.map(h => 
            `<div class="hotel-item"><h4>${h.name}</h4>${h.info ? `<p>${h.info}</p>` : ''}</div>`
        ).join('');
    }
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
