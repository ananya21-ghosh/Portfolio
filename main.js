// Ananya Ghosh Portfolio Interactivity & Form Script

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggleBtn && mobileDrawer) {
    menuToggleBtn.addEventListener('click', () => {
      const isActive = mobileDrawer.classList.toggle('active');
      menuToggleBtn.textContent = isActive ? '✕' : '☰';
      menuToggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        menuToggleBtn.textContent = '☰';
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mouse Spotlight Follower (Fine pointer / Desktop only)
  const spotlight = document.getElementById('spotlight');
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    });
  }

  // 3D Card Hover Tilt Effect for Desktop Showcase
  const portraitCard = document.getElementById('portrait-card');
  if (portraitCard && window.matchMedia('(pointer: fine)').matches) {
    const frame = portraitCard.querySelector('.cinematic-frame');
    portraitCard.addEventListener('mousemove', (e) => {
      const rect = portraitCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 18;
      const rotateY = (centerX - x) / 18;
      if (frame) {
        frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      }
    });

    portraitCard.addEventListener('mouseleave', () => {
      if (frame) {
        frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      }
    });
  }

  // Navbar Scroll Listener
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Typewriter Role Switcher (Clean Natural Developer Roles)
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    const roles = [
      'web applications',
      'full-stack systems',
      'responsive interfaces',
      'data-driven tools'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 95;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // Technical Skills Category Tabs
  const tabButtons = document.querySelectorAll('.skills-tab-btn');
  const skillCards = document.querySelectorAll('.human-skill-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 280);
        }
      });
    });
  });

  // Lightbox Zoom Modal
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');
  const zoomTriggers = document.querySelectorAll('[data-zoom-src]');

  zoomTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = trigger.getAttribute('data-zoom-src');
      if (imgSrc && modal && modalImg) {
        modalImg.src = imgSrc;
        modal.classList.add('active');
      }
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Keyboard Escape Key to Close Lightbox Modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });

  // Scroll Reveal Intersection Observer
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-scroll').forEach(el => {
    revealObserver.observe(el);
  });

  // Contact Form Client-side Validation & Toast Feedback
  const contactForm = document.getElementById('contact-form');
  const toastFeedback = document.getElementById('toast-feedback');

  if (contactForm && toastFeedback) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const isValidEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    const showToast = (message, type) => {
      toastFeedback.className = `toast-feedback ${type}`;
      toastFeedback.innerHTML = message;
      toastFeedback.style.display = 'flex';

      if (type === 'success') {
        setTimeout(() => {
          toastFeedback.style.display = 'none';
        }, 6000);
      }
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      [nameInput, emailInput, messageInput].forEach(field => {
        if (field) field.classList.remove('invalid-field');
      });

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      if (!nameVal) {
        if (nameInput) nameInput.classList.add('invalid-field');
        showToast('❌ Please enter your name.', 'error');
        nameInput.focus();
        return;
      }

      if (!emailVal || !isValidEmail(emailVal)) {
        if (emailInput) emailInput.classList.add('invalid-field');
        showToast('❌ Please enter a valid email address.', 'error');
        emailInput.focus();
        return;
      }

      if (!messageVal || messageVal.length < 5) {
        if (messageInput) messageInput.classList.add('invalid-field');
        showToast('❌ Please write a message (at least 5 characters).', 'error');
        messageInput.focus();
        return;
      }

      const mailtoSubject = encodeURIComponent(`Portfolio Message from ${nameVal}`);
      const mailtoBody = encodeURIComponent(`Name: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}`);
      const mailtoUrl = `mailto:07ananyaghosg07@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      showToast(`✓ Thank you ${nameVal}! Your message is prepared. Opening email app...`, 'success');

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 1000);

      contactForm.reset();
    });
  }
});

// Copy Direct Email Helper
function copyEmailToClipboard() {
  const email = '07ananyaghosg07@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    alert('Email copied to clipboard: 07ananyaghosg07@gmail.com');
  }).catch(() => {
    alert('Direct Email: 07ananyaghosg07@gmail.com');
  });
}
