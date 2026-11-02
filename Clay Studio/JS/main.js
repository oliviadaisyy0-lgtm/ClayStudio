

document.addEventListener('DOMContentLoaded', function () {
  renderNewListings();   // must run first so its tab exists before tabs are wired up
  initShopTabs();
  initLightbox();
  initAccordion();
  initShopSearch();
  initEnquiryForm();
  initContactForm();
  initAuth();
  initSellForm();
  initPhotoPreview();
  initStudioMap();
  initShopSort();
});

/* ---------------------------------------------------
   1. SHOP TABS — click a category to show only that
      section's products (Cute Clay / Cups / Necklaces / Vases)
--------------------------------------------------- */
function initShopTabs() {
  const tabButtons = document.querySelectorAll('.shop-tab');
  const sections = document.querySelectorAll('.page-section[data-category]');
  if (!tabButtons.length) return;

  function showCategory(category) {
    sections.forEach(function (section) {
      section.style.display = (section.dataset.category === category) ? 'block' : 'none';
    });
    tabButtons.forEach(function (btn) {
      btn.classList.toggle('active-tab', btn.dataset.category === category);
    });
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      showCategory(btn.dataset.category);
      history.replaceState(null, '', '#' + btn.dataset.category);
    });
  });

  // Show the category named in the URL hash (e.g. products.html#cups),
  // falling back to the first tab if there is no hash or it is unknown.
  function applyHash() {
    const hash = window.location.hash.replace('#', '');
    const hashIsValid = Array.prototype.some.call(tabButtons, function (btn) {
      return btn.dataset.category === hash;
    });
    const category = hashIsValid ? hash : tabButtons[0].dataset.category;
    showCategory(category);

    // Scroll down so the chosen products are actually in view
    if (hashIsValid) {
      const target = document.querySelector('.page-section[data-category="' + category + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  applyHash();                                  // on page load
  window.addEventListener('hashchange', applyHash); // when a dropdown link is clicked while already on the Shop page
}

/* ---------------------------------------------------
   2. LIGHTBOX GALLERY — click a picture (hero, About,
      Shop products, Shop scrolling strip) to view it
      larger in an overlay
--------------------------------------------------- */
function initLightbox() {
  const images = document.querySelectorAll(
    '.lightbox-trigger img, .pic-card img, .about-photo img, .product-card img, .auto-scroll-track img'
  );
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<span class="lightbox-close">&times;</span><img class="lightbox-image" src="" alt="">';
  document.body.appendChild(overlay);

  const lightboxImg = overlay.querySelector('.lightbox-image');
  const closeBtn = overlay.querySelector('.lightbox-close');

  images.forEach(function (img) {
    img.addEventListener('click', function (e) {
      e.preventDefault();   // stops the image's link (if it has one) from navigating
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      overlay.classList.add('open');
    });
  });

  function closeLightbox() {
    overlay.classList.remove('open');
  }

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ---------------------------------------------------
   3. ACCORDION — FAQ-style expand/collapse (Contact page)
--------------------------------------------------- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach(function (item) {
    const question = item.querySelector('.accordion-question');
    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      items.forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ---------------------------------------------------
   4. SHOP SEARCH — live filter of product cards by title
--------------------------------------------------- */
function initShopSearch() {
  const input = document.getElementById('shop-search-input');
  const cards = document.querySelectorAll('.product-card');
  if (!input || !cards.length) return;

  // If arriving from the nav search (?search=term), pre-fill and filter
  const params = new URLSearchParams(window.location.search);
  const presetTerm = params.get('search');
  if (presetTerm) {
    input.value = presetTerm;
    filterCards(presetTerm);
  }

  input.addEventListener('input', function () {
    filterCards(input.value);
  });

  function filterCards(term) {
    const lowerTerm = term.trim().toLowerCase();
    cards.forEach(function (card) {
      const title = card.querySelector('p').textContent.toLowerCase();
      card.style.display = title.includes(lowerTerm) ? 'block' : 'none';
    });
  }
}

/* ---------------------------------------------------
   SHARED HELPERS FOR THE ENQUIRY AND CONTACT FORMS
--------------------------------------------------- */

// The email address that receives every message (the "recipient stated in the code")
const FORM_EMAIL = 'claystudio@gmail.com';
// AJAX endpoint of a free form-to-email service (formsubmit.co)
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + FORM_EMAIL;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// South African phone numbers: 0821234567, 082 123 4567 or +27 82 123 4567
function isValidPhone(text) {
  const cleaned = text.replace(/[\s\-()]/g, '');
  return /^(\+27|0)[1-9]\d{8}$/.test(cleaned);
}

// Today's date as YYYY-MM-DD in the visitor's own timezone
function todayAsText() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + month + '-' + day;
}

// Show a green (success) or red (error) message. 'lines' is a string or a list of strings.
// textContent is used so anything typed by the visitor can never be run as HTML.
// If the message box is missing from the page, a pop-up is used so the visitor still sees it.
function showMessage(box, type, lines) {
  if (!box) {
    alert([].concat(lines).join('\n'));
    return;
  }
  box.innerHTML = '';
  const p = document.createElement('p');
  p.className = (type === 'success') ? 'form-success' : 'form-error';
  [].concat(lines).forEach(function (line, i) {
    if (i > 0) p.appendChild(document.createElement('br'));
    p.appendChild(document.createTextNode(line));
  });
  box.appendChild(p);
  box.classList.add('show');
  box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// AJAX: send the form data to the email service WITHOUT reloading the page.
// Gives up after 10 seconds so the visitor is never left waiting forever.
function sendFormByAjax(fields) {
  const controller = new AbortController();
  const timer = setTimeout(function () { controller.abort(); }, 10000);

  return fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(Object.assign({ _captcha: 'false', _template: 'table' }, fields)),
    signal: controller.signal
  }).then(function (response) {
    if (!response.ok) throw new Error('Server replied ' + response.status);
    return response.json();
  }).then(function (data) {
    if (data.success !== true && data.success !== 'true') {
      throw new Error(data.message || 'Message was not sent');
    }
    return data;
  }).finally(function () {
    clearTimeout(timer);
  });
}

// Backup plan if AJAX fails (offline, blocked): open the visitor's own email program
function openEmailProgram(subject, body) {
  window.location.href = 'mailto:' + FORM_EMAIL +
    '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

/* ---------------------------------------------------
   5. ENQUIRY FORM - validates, sends by AJAX, then shows a
      thank-you plus cost/availability information
--------------------------------------------------- */
function initEnquiryForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  const responseBox = document.getElementById('enquiry-response');
  const submitBtn = form.querySelector('button[type="submit"]');
  const dateInput = document.getElementById('e-date');
  if (dateInput) dateInput.min = todayAsText(); // HTML5: the date picker blocks past days

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('e-name').value.trim();
    const email = document.getElementById('e-email').value.trim();
    const type = document.getElementById('e-type').value;
    const item = document.getElementById('e-item').value.trim();
    const date = dateInput ? dateInput.value : '';
    const message = document.getElementById('e-message').value.trim();

    const errors = [];
    if (name.length < 2) errors.push('Please enter your full name.');
    if (!EMAIL_PATTERN.test(email)) errors.push('Please enter a valid email address.');
    if (!type) errors.push('Please select what you are enquiring about.');
    if (!date) errors.push('Please choose a preferred date.');
    if (date && date < todayAsText()) errors.push('The preferred date cannot be in the past.');
    if (message.length < 10) errors.push('Please enter a message of at least 10 characters.');

    if (errors.length > 0) {
      showMessage(responseBox, 'error', errors);
      return;
    }

    // Extra detail based on enquiry type (cost / availability)
    let detail = '';
    if (type === 'product') {
      detail = 'Most pieces are in stock and ship within 3-5 business days.';
    } else if (type === 'custom') {
      detail = 'Custom commissions typically start from R350 and take 2-3 weeks.';
    } else if (type === 'class') {
      detail = 'Our beginner classes run on weekends and cost R450 per person.';
    } else {
      detail = 'We usually respond within 1-2 business days.';
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    showMessage(responseBox, 'success', 'Sending your enquiry, please wait...');

    sendFormByAjax({
      _subject: 'New enquiry from ' + name + ' (Clay Studio website)',
      name: name, email: email, enquiry_type: type, item: item,
      preferred_date: date || 'not given', message: message
    }).then(function () {
      showMessage(responseBox, 'success', [
        'Thank you, ' + name + '! Your enquiry has been submitted successfully. We will get back to you soon.',
        detail
      ]);
      form.reset();
    }).catch(function () {
      showMessage(responseBox, 'error',
        'We could not send your enquiry automatically, so we are opening your email program. Please press Send there.');
      openEmailProgram('New enquiry from ' + name + ' (Clay Studio website)',
        'Enquiry type: ' + type + '\nItem: ' + item + '\nPreferred date: ' + (date || 'not given') +
        '\n\n' + message + '\n\n- ' + name + ' (' + email + ')');
    }).finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Enquiry';
    });
  });
}

/* ---------------------------------------------------
   6. CONTACT FORM - validates, sends by AJAX, then shows a thank-you
--------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const responseBox = document.getElementById('contact-response');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const phone = document.getElementById('c-phone').value.trim();
    const messageType = document.getElementById('c-type').value;
    const message = document.getElementById('c-message').value.trim();

    const errors = [];
    if (name.length < 2) errors.push('Please enter your name.');
    if (!EMAIL_PATTERN.test(email)) errors.push('Please enter a valid email address.');
    if (!isValidPhone(phone)) errors.push('Please enter a valid phone number, for example 082 123 4567 or +27 82 123 4567.');
    if (!messageType) errors.push('Please select the type of message.');
    if (message.length < 5) errors.push('Please enter a message.');

    if (errors.length > 0) {
      showMessage(responseBox, 'error', errors);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    showMessage(responseBox, 'success', 'Sending your message, please wait...');

    sendFormByAjax({
      _subject: 'Message from ' + name + ' via Clay Studio website',
      name: name, email: email, phone: phone, message_type: messageType, message: message
    }).then(function () {
      showMessage(responseBox, 'success',
        'Thank you, ' + name + '! Your message has been submitted successfully. We will get back to you soon.');
      form.reset();
    }).catch(function () {
      showMessage(responseBox, 'error',
        'We could not send your message automatically, so we are opening your email program. Please press Send there.');
      openEmailProgram('Message from ' + name + ' via Clay Studio website',
      'Type of message: ' + messageType + '\n\n' + message + '\n\n- ' + name + ' (' + email + ', ' + phone + ')');
    }).finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
  });
}
/* ---------------------------------------------------
   7. LOGIN / SIGN UP (client-side only, using localStorage)

   IMPORTANT: this is NOT secure real authentication.
   Passwords are stored in plain text in the browser's
   localStorage, visible to anyone using that browser/device.
   This exists to demonstrate JavaScript form handling and
   DOM manipulation for the assignment, not as production-
   ready account security. A real login system needs a
   server, a database, and encrypted password storage.
--------------------------------------------------- */
function initAuth() {
  const openLogin = document.getElementById('open-login');
  const openSignup = document.getElementById('open-signup');
  const overlay = document.getElementById('auth-overlay');
  const closeBtn = document.getElementById('auth-close');
  const form = document.getElementById('auth-form');
  const title = document.getElementById('auth-modal-title');
  const submitBtn = document.getElementById('auth-submit-btn');
  const nameField = document.getElementById('signup-name-field');
  const errorBox = document.getElementById('auth-error');
  const loggedOutBox = document.getElementById('auth-buttons-logged-out');
  const loggedInBox = document.getElementById('auth-buttons-logged-in');
  const welcomeMsg = document.getElementById('welcome-message');
  const logoutBtn = document.getElementById('logout-btn');

  if (!overlay) return; // only runs on pages that have the modal (homepage)

  let mode = 'login';

  function openModal(selectedMode) {
    mode = selectedMode;
    title.textContent = (mode === 'login') ? 'Login' : 'Sign Up';
    submitBtn.textContent = (mode === 'login') ? 'Login' : 'Create Account';
    nameField.style.display = (mode === 'signup') ? 'block' : 'none';
    errorBox.style.display = 'none';
    form.reset();
    overlay.classList.add('open');
  }

  function closeModal() {
    overlay.classList.remove('open');
  }

  if (openLogin) openLogin.addEventListener('click', function () { openModal('login'); });
  if (openSignup) openSignup.addEventListener('click', function () { openModal('signup'); });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });

  function showLoggedInState(name, email) {
    loggedOutBox.style.display = 'none';
    loggedInBox.style.display = 'flex';
    welcomeMsg.textContent = 'Welcome back, ' + (name || email) + '!';
  }

   form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value.trim().toLowerCase();
    const password = document.getElementById('auth-password').value;
    const name = document.getElementById('auth-name').value.trim();

    if (!window.crypto || !window.crypto.subtle) {
      errorBox.textContent = 'Accounts need a secure (https) connection. Please use the live website.';
      errorBox.style.display = 'block';
      return;
    }

    let users = JSON.parse(localStorage.getItem('clayUsers') || '{}');

    if (mode === 'signup') {
      if (users[email]) {
        errorBox.textContent = 'An account with that email already exists. Try logging in instead.';
        errorBox.style.display = 'block';
        return;
      }
      // Store a salted hash, never the password itself
      const salt = makeSalt();
      users[email] = { name: name || email, salt: salt, hash: await hashPassword(password, salt) };
      localStorage.setItem('clayUsers', JSON.stringify(users));
      localStorage.setItem('clayCurrentUser', email);
      closeModal();
      showLoggedInState(name, email);
    } else {
      const account = users[email];
      let passwordOk = false;
      if (account && account.hash) {
        passwordOk = (await hashPassword(password, account.salt)) === account.hash;
      } else if (account && account.password !== undefined) {
        // older account saved before hashing was added: check it, then upgrade it
        passwordOk = (account.password === password);
        if (passwordOk) {
          const salt = makeSalt();
          users[email] = { name: account.name, salt: salt, hash: await hashPassword(password, salt) };
          localStorage.setItem('clayUsers', JSON.stringify(users));
        }
      }
      if (!passwordOk) {
        errorBox.textContent = 'Incorrect email or password.';
        errorBox.style.display = 'block';
        return;
      }
      localStorage.setItem('clayCurrentUser', email);
      closeModal();
      showLoggedInState(users[email].name, email);
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('clayCurrentUser');
      loggedInBox.style.display = 'none';
      loggedOutBox.style.display = 'flex';
    });
  }

  // Restore logged-in state on page load, if a session exists
  const currentEmail = localStorage.getItem('clayCurrentUser');
  if (currentEmail) {
    const users = JSON.parse(localStorage.getItem('clayUsers') || '{}');
    const account = users[currentEmail];
    if (account) showLoggedInState(account.name, currentEmail);
  }
}

/* ---------------------------------------------------
   8. SELL FORM — saves the submitted item (photo as a
      data URL, title, price, category) into localStorage,
      then redirects to the Shop page where it appears
      under a new "Just Added By Sellers" tab.
--------------------------------------------------- */
function initSellForm() {
  const form = document.getElementById('sell-form');
  if (!form) return;

  const responseBox = document.getElementById('sell-response');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const photoInput = document.getElementById('s-photo');
    const title = document.getElementById('s-title').value.trim();
    const price = document.getElementById('s-price').value;
    const category = document.getElementById('s-category').value;
    const file = photoInput.files[0];

    let errors = [];
    if (!file) errors.push('Please upload a photo.');
    if (title.length < 2) errors.push('Please enter a title for your design.');
    if (!price || Number(price) <= 0) errors.push('Please enter a valid price.');
    if (!category) errors.push('Please choose a category.');

    if (errors.length > 0) {
      responseBox.innerHTML = '<p class="form-error">' + errors.join('<br>') + '</p>';
      responseBox.classList.add('show');
      return;
    }

    // Phone photos are several MB, but localStorage only holds ~5MB in total.
    // So we shrink the photo (max 800px, JPEG) before saving it.
    const reader = new FileReader();
    reader.onerror = function () {
      responseBox.innerHTML = '<p class="form-error">Could not read that photo. Please try a different image.</p>';
      responseBox.classList.add('show');
    };
    reader.onload = function () {
      const img = new Image();
      img.onerror = function () {
        responseBox.innerHTML = '<p class="form-error">That file does not look like a valid image.</p>';
        responseBox.classList.add('show');
      };
      img.onload = function () {
        const MAX = 800;
        let w = img.width;
        let h = img.height;
        if (w > MAX || h > MAX) {
          const ratio = Math.min(MAX / w, MAX / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        const smallImage = canvas.toDataURL('image/jpeg', 0.8);

        const listing = {
          title: title,
          price: price,
          category: category,
          image: smallImage
        };

        try {
          const listings = JSON.parse(localStorage.getItem('clayListings') || '[]');
          listings.push(listing);
          localStorage.setItem('clayListings', JSON.stringify(listings));
        } catch (err) {
          responseBox.innerHTML = '<p class="form-error">Could not save your piece - the browser storage is full. Try again with a smaller photo.</p>';
          responseBox.classList.add('show');
          return;
        }

        responseBox.innerHTML = '<p class="form-success">Your piece has been posted! Taking you to the Shop...</p>';
        responseBox.classList.add('show');

        setTimeout(function () {
          window.location.href = 'products.html#new-listings';
        }, 900);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ---------------------------------------------------
   9. RENDER NEW LISTINGS — on the Shop page, reads any
      seller-submitted items from localStorage and injects
      them as product cards + a "New Listings" tab.
--------------------------------------------------- */
function renderNewListings() {
  const grid = document.getElementById('new-listings-grid');
  const section = document.getElementById('new-listings-section');
  const tabsNav = document.querySelector('.shop-tabs');
  if (!grid || !section || !tabsNav) return; // only runs on products.html

  const listings = JSON.parse(localStorage.getItem('clayListings') || '[]');
  if (listings.length === 0) return;

  // Build a tab button for "New Listings"
  const tabBtn = document.createElement('button');
  tabBtn.className = 'shop-tab';
  tabBtn.dataset.category = 'new-listings';
  tabBtn.textContent = 'Just Added';
  tabsNav.appendChild(tabBtn);

  // Populate the product cards
  listings.forEach(function (item, index) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const pic = document.createElement('div');
    pic.className = 'explore-pic lightbox-trigger';
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    pic.appendChild(img);

    const name = document.createElement('p');
    name.textContent = item.title;

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = 'R' + item.price;

    // Remove button - deletes this listing from localStorage
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-listing';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function () {
      if (!confirm('Remove "' + item.title + '" from the shop?')) return;
      const current = JSON.parse(localStorage.getItem('clayListings') || '[]');
      current.splice(index, 1);
      localStorage.setItem('clayListings', JSON.stringify(current));
      window.location.reload(); // redraw the page without the removed item
    });

    card.appendChild(pic);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(removeBtn);
    grid.appendChild(card);
  });

  section.style.display = 'block';
}
/* 10. PHOTO PREVIEW - show the chosen photo on the Sell page before posting */
function initPhotoPreview() {
  const input = document.getElementById('s-photo');
  const preview = document.getElementById('photo-preview');
  if (!input || !preview) return; // only runs on sell.html

  const box = input.closest('.upload-box');
  let currentUrl = null;

  function clearPreview() {
    if (currentUrl) URL.revokeObjectURL(currentUrl);
    currentUrl = null;
    preview.removeAttribute('src');
    box.classList.remove('has-photo');
  }

  input.addEventListener('change', function () {
    const file = input.files[0];
    clearPreview();
    if (!file) return; // the picker was cancelled

    currentUrl = URL.createObjectURL(file);
    preview.onerror = clearPreview; // a file the browser cannot display
    preview.src = currentUrl;
    box.classList.add('has-photo');
  });
}

/* ---------------------------------------------------
   12. PASSWORD HASHING (used by Login / Sign Up)
       The browser's built-in Web Crypto API turns the password into a
       SHA-256 hash with a random salt, so the real password is never saved.
--------------------------------------------------- */
function makeSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(salt + password);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
}

/* ---------------------------------------------------
   13. SHOP SORT - reorder the product cards (price or name)
--------------------------------------------------- */
function initShopSort() {
  const select = document.getElementById('shop-sort');
  const grids = document.querySelectorAll('.product-grid');
  if (!select || !grids.length) return;

  // Remember the original order so "Featured" can put things back
  grids.forEach(function (grid) {
    Array.prototype.forEach.call(grid.children, function (card, i) { card.dataset.order = i; });
  });

  function priceOf(card) {
    return parseFloat(card.querySelector('.price').textContent.replace(/[^\d.]/g, '')) || 0;
  }
  function nameOf(card) {
    return card.querySelector('p').textContent.toLowerCase();
  }

  select.addEventListener('change', function () {
    const mode = select.value;
    grids.forEach(function (grid) {
      const cards = Array.prototype.slice.call(grid.children);
      cards.sort(function (a, b) {
        if (mode === 'price-asc') return priceOf(a) - priceOf(b);
        if (mode === 'price-desc') return priceOf(b) - priceOf(a);
        if (mode === 'name') return nameOf(a).localeCompare(nameOf(b));
        return a.dataset.order - b.dataset.order;
      });
      cards.forEach(function (card) { grid.appendChild(card); });
    });
  });
}

/* ---------------------------------------------------
   14. STUDIO MAP - Leaflet map with + / - buttons, drag to move.
       Clicking the pin opens a card with a link to Google Maps.
--------------------------------------------------- */
function initStudioMap() {
  const mapBox = document.getElementById('map');
  if (!mapBox) return; // only runs on contact.html

  if (typeof L === 'undefined') { // the Leaflet library did not load
    mapBox.textContent = 'The map could not be loaded. Please check your internet connection.';
    mapBox.classList.add('map-failed');
    return;
  }

  const lat = -26.1677063;
  const lng = 28.0868186;
  const googleLink = 'https://www.google.com/maps/place/10+Babington+St,+Fairwood,+Johannesburg,+2192/data=!4m2!3m1!1s0x1e950dbf8856f525:0xef786137c8fe3407?sa=X&ved=1t:242&ictx=111';

  const map = L.map('map', { scrollWheelZoom: false }).setView([lat, lng], 16);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // The card that opens when the pin is pressed
  const popup = document.createElement('div');
  const title = document.createElement('strong');
  title.textContent = 'Clay Studio';
  const address = document.createElement('div');
  address.textContent = '10 Babington Street, Fairwood, Johannesburg';
  const link = document.createElement('a');
  link.href = googleLink;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Open in Google Maps';
  popup.appendChild(title);
  popup.appendChild(address);
  popup.appendChild(link);

  L.marker([lat, lng]).addTo(map).bindPopup(popup).openPopup();

  // Mouse wheel zooms only after you click the map, so it doesn't block page scrolling
  map.on('click', function () { map.scrollWheelZoom.enable(); });
  map.on('mouseout', function () { map.scrollWheelZoom.disable(); });
}