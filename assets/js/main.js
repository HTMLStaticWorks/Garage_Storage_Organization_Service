/**
 * ==========================================================================
 * GARAGEPRO — MAIN JAVASCRIPT ENGINE
 * Handles: Nav Drawer, Theme Toggle, RTL Toggle, Before/After Slider,
 * Form Validation, FAQ Accordion, Dynamic Estimator, Animated Counters
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeToggle();
  initRTLToggle();
  initBeforeAfterSliders();
  initFAQAccordions();
  initFormValidation();
  initStatsCounter();
  initGarageEstimator();
});

/* --------------------------------------------------------------------------
   1. NAVIGATION & SCROLL BEHAVIOR
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const drawerCloseBtn = document.querySelector('.drawer-close');

  // Sticky Scroll Class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Open Mobile Drawer
  const openDrawer = () => {
    mobileDrawer?.classList.add('active');
    drawerBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Close Mobile Drawer
  const closeDrawer = () => {
    mobileDrawer?.classList.remove('active');
    drawerBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburgerBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Active Link Highlighting based on current path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link, .drawer-link');
  
  allNavLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   2. THEME TOGGLE (Light / Dark Mode with Persistence)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('garagepro_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  themeToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(activeTheme);
      localStorage.setItem('garagepro_theme', activeTheme);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  // Update icons on all theme toggle buttons
  const themeIcons = document.querySelectorAll('.theme-toggle-btn .theme-icon');
  themeIcons.forEach((iconWrap) => {
    if (theme === 'dark') {
      // Show Sun icon (to switch to light)
      iconWrap.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    } else {
      // Show Moon icon (to switch to dark)
      iconWrap.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    }
  });
}

/* --------------------------------------------------------------------------
   3. RTL TOGGLE (Left-to-Right / Right-to-Left with ⇆ Icon)
   -------------------------------------------------------------------------- */
function initRTLToggle() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  const storedRTL = localStorage.getItem('garagepro_rtl') === 'true';

  applyRTL(storedRTL);

  rtlToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      const newRTL = !isRTL;
      applyRTL(newRTL);
      localStorage.setItem('garagepro_rtl', newRTL.toString());
      // Re-adjust slider positions
      initBeforeAfterSliders();
    });
  });
}

function applyRTL(isRTL) {
  if (isRTL) {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl');
  } else {
    document.documentElement.removeAttribute('dir');
    document.body.classList.remove('rtl');
  }
}

/* --------------------------------------------------------------------------
   4. INTERACTIVE BEFORE / AFTER TRANSFORMATION SLIDERS
   -------------------------------------------------------------------------- */
function initBeforeAfterSliders() {
  const containers = document.querySelectorAll('.before-after-container');

  containers.forEach((container) => {
    const beforeImgWrap = container.querySelector('.ba-image-before');
    const beforeImg = beforeImgWrap?.querySelector('img');
    const handle = container.querySelector('.ba-handle');
    if (!beforeImgWrap || !handle) return;

    let isDragging = false;

    // Synchronize inner image width to match parent container width
    const syncImageWidth = () => {
      const containerWidth = container.offsetWidth;
      if (beforeImg && containerWidth > 0) {
        beforeImg.style.width = `${containerWidth}px`;
      }
    };

    syncImageWidth();
    window.addEventListener('resize', syncImageWidth, { passive: true });

    const updateSliderPosition = (xPos) => {
      const rect = container.getBoundingClientRect();
      let percent = ((xPos - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));

      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      
      if (isRTL) {
        beforeImgWrap.style.width = `${100 - percent}%`;
        handle.style.left = `${percent}%`;
      } else {
        beforeImgWrap.style.width = `${percent}%`;
        handle.style.left = `${percent}%`;
      }
    };

    const onStart = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSliderPosition(clientX);
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSliderPosition(clientX);
    };

    const onEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    container.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
  });
}

/* --------------------------------------------------------------------------
   5. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFAQAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      faqItems.forEach((other) => other.classList.remove('active'));
      
      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. CLIENT-SIDE FORM VALIDATION (Step 12)
   -------------------------------------------------------------------------- */
function initFormValidation() {
  const forms = document.querySelectorAll('.validate-form');

  forms.forEach((form) => {
    const inputs = form.querySelectorAll('input, textarea, select');
    const successAlert = form.querySelector('.form-success-alert');

    // Real-time field validation on blur / input
    inputs.forEach((input) => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    });

    // Form submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      inputs.forEach((input) => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (isValid) {
        // Show inline animated success message without reload
        if (successAlert) {
          successAlert.style.display = 'block';
          successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        form.reset();
        inputs.forEach((input) => input.classList.remove('is-valid'));

        setTimeout(() => {
          if (successAlert) successAlert.style.display = 'none';
        }, 5000);
      }
    });
  });
}

function validateField(input) {
  const value = input.value.trim();
  const isRequired = input.hasAttribute('required');
  const type = input.getAttribute('type');
  const name = input.getAttribute('name') || input.id;
  let valid = true;

  // Required check
  if (isRequired && !value && type !== 'checkbox') {
    valid = false;
  }

  // Checkbox required check
  if (isRequired && type === 'checkbox' && !input.checked) {
    valid = false;
  }

  // Email check
  if (valid && type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      valid = false;
    }
  }

  // Password min 8 chars
  if (valid && type === 'password' && name !== 'confirmPassword' && value) {
    if (value.length < 8) {
      valid = false;
    }
  }

  // Confirm password match
  if (valid && (name === 'confirmPassword' || input.id === 'confirmPassword')) {
    const passwordInput = input.closest('form')?.querySelector('input[type="password"]:not([id="confirmPassword"]):not([name="confirmPassword"])');
    if (passwordInput && value !== passwordInput.value) {
      valid = false;
    }
  }

  // Apply UI classes
  const checkboxWrap = input.closest('.form-checkbox-wrap');
  if (valid) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    checkboxWrap?.classList.remove('is-invalid');
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    checkboxWrap?.classList.add('is-invalid');
  }

  return valid;
}

/* --------------------------------------------------------------------------
   7. STATS COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1500;
          const stepTime = Math.abs(Math.floor(duration / target));

          const timer = setInterval(() => {
            count += Math.ceil(target / 40);
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.textContent = count + suffix;
          }, stepTime || 30);

          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((num) => observer.observe(num));
}

/* --------------------------------------------------------------------------
   8. INTERACTIVE GARAGE ESTIMATOR (Home 2 / Services)
   -------------------------------------------------------------------------- */
function initGarageEstimator() {
  const sizeSelect = document.getElementById('calc-size');
  const floorCheck = document.getElementById('calc-floor');
  const cabinetCheck = document.getElementById('calc-cabinet');
  const overheadCheck = document.getElementById('calc-overhead');
  const totalDisplay = document.getElementById('calc-total');

  if (!sizeSelect || !totalDisplay) return;

  const calculateTotal = () => {
    let base = parseInt(sizeSelect.value, 10) || 2500;
    if (floorCheck?.checked) base += 1800;
    if (cabinetCheck?.checked) base += 3200;
    if (overheadCheck?.checked) base += 950;

    totalDisplay.textContent = `$${base.toLocaleString()}`;
  };

  sizeSelect.addEventListener('change', calculateTotal);
  floorCheck?.addEventListener('change', calculateTotal);
  cabinetCheck?.addEventListener('change', calculateTotal);
  overheadCheck?.addEventListener('change', calculateTotal);
}
