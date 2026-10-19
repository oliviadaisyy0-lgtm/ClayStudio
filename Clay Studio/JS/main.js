



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
  initSellForm();
  initPhotoPreview();
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
   2. LIGHTBOX GALLERY — click a product image to view
      it larger in an overlay
--------------------------------------------------- */
function initLightbox() {
  const images = document.querySelectorAll('.lightbox-trigger img');
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<span class="lightbox-close">&times;</span><img class="lightbox-image" src="" alt="">';
  document.body.appendChild(overlay);

  const lightboxImg = overlay.querySelector('.lightbox-image');
  const closeBtn = overlay.querySelector('.lightbox-close');

  images.forEach(function (img) {
    img.addEventListener('click', function () {
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
   5. ENQUIRY FORM — validates, then shows a
      cost/availability-style response (no page reload)
--------------------------------------------------- */
function initEnquiryForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  const responseBox = document.getElementById('enquiry-response');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('e-name').value.trim();
    const email = document.getElementById('e-email').value.trim();
    const type = document.getElementById('e-type').value;
    const message = document.getElementById('e-message').value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errors = [];

    if (name.length < 2) errors.push('Please enter your full name.');
    if (!emailPattern.test(email)) errors.push('Please enter a valid email address.');
    if (!type) errors.push('Please select what you are enquiring about.');
    if (message.length < 10) errors.push('Please enter a message of at least 10 characters.');

    if (errors.length > 0) {
      responseBox.innerHTML = '<p class="form-error">' + errors.join('<br>') + '</p>';
      responseBox.classList.add('show');
      return;
    }

    // Simulated response based on enquiry type
    let reply = '';
    if (type === 'product') {
      reply = 'Thanks, ' + name + '! Most pieces are in stock and ship within 3-5 business days. We will confirm exact pricing and availability by email shortly.';
    } else if (type === 'custom') {
      reply = 'Thanks, ' + name + '! Custom commissions typically start from R350 and take 2-3 weeks. We will be in touch to discuss details and a final quote.';
    } else if (type === 'class') {
      reply = 'Thanks, ' + name + '! Our beginner classes run on weekends and cost R450 per person. We will email you available dates shortly.';
    } else {
      reply = 'Thanks, ' + name + '! We have received your enquiry and will respond within 1-2 business days.';
    }

        responseBox.innerHTML = '<p class="form-success"></p>';
    responseBox.querySelector('p').textContent = 'Thank you, ' + name + '! Your enquiry has been submitted successfully. We will get back to you soon.';
    responseBox.classList.add('show');
    form.reset();
  });
}

/* ---------------------------------------------------
   6. CONTACT FORM — validates, compiles the message,
      then opens the user's email client via mailto:
--------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const responseBox = document.getElementById('contact-response');
  const RECIPIENT = 'claystudio@gmail.com';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const message = document.getElementById('c-message').value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errors = [];

    if (name.length < 2) errors.push('Please enter your name.');
    if (!emailPattern.test(email)) errors.push('Please enter a valid email address.');
    if (message.length < 5) errors.push('Please enter a message.');

    if (errors.length > 0) {
      responseBox.innerHTML = '<p class="form-error">' + errors.join('<br>') + '</p>';
      responseBox.classList.add('show');
      return;
    }

    const subject = encodeURIComponent('Message from ' + name + ' via Clay Studio website');
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    const mailtoLink = 'mailto:' + RECIPIENT + '?subject=' + subject + '&body=' + body;

    window.location.href = mailtoLink;

    responseBox.innerHTML = '<p class="form-success"></p>';
    responseBox.querySelector('p').textContent = 'Thank you, ' + name + '! Your message has been submitted successfully. We will get back to you soon.';
    form.reset();
    responseBox.classList.add('show');
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

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value.trim().toLowerCase();
    const password = document.getElementById('auth-password').value;
    const name = document.getElementById('auth-name').value.trim();

    let users = JSON.parse(localStorage.getItem('clayUsers') || '{}');

    if (mode === 'signup') {
      if (users[email]) {
        errorBox.textContent = 'An account with that email already exists. Try logging in instead.';
        errorBox.style.display = 'block';
        return;
      }
      users[email] = { name: name || email, password: password };
      localStorage.setItem('clayUsers', JSON.stringify(users));
      localStorage.setItem('clayCurrentUser', email);
      closeModal();
      showLoggedInState(name, email);
    } else {
      const account = users[email];
      if (!account || account.password !== password) {
        errorBox.textContent = 'Incorrect email or password.';
        errorBox.style.display = 'block';
        return;
      }
      localStorage.setItem('clayCurrentUser', email);
      closeModal();
      showLoggedInState(account.name, email);
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