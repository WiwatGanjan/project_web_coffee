/**
 * lang.js — TH / EN language switcher
 * Reads data-th and data-en attributes from elements.
 * Persists the chosen language in localStorage so it survives page navigation.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'coffeeshop_lang';
  const btn = document.getElementById('langToggle');

  // ----------------------------------------------------------------
  // Determine current language (default: 'th')
  // ----------------------------------------------------------------
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'th';

  // ----------------------------------------------------------------
  // Apply language to all translatable elements
  // ----------------------------------------------------------------
  function applyLang(lang) {
    // Update <html lang> attribute
    document.documentElement.lang = lang;

    // Update every element that has data-th AND data-en
    const elements = document.querySelectorAll('[data-th][data-en]');
    elements.forEach(function (el) {
      const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-th');
      // Use innerHTML to support <br /> in address fields
      el.innerHTML = text;
    });

    // Update button label (show the OTHER language as the option)
    if (btn) {
      btn.textContent = lang === 'en' ? 'TH' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Thai' : 'Switch to English');
    }

    // Persist choice
    localStorage.setItem(STORAGE_KEY, lang);
    currentLang = lang;
  }

  // ----------------------------------------------------------------
  // Toggle on button click
  // ----------------------------------------------------------------
  if (btn) {
    btn.addEventListener('click', function () {
      applyLang(currentLang === 'th' ? 'en' : 'th');
    });
  }

  // ----------------------------------------------------------------
  // Apply on page load
  // ----------------------------------------------------------------
  applyLang(currentLang);

})();
