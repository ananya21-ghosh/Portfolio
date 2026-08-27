/* ==========================================================================
   Ananya Ghosh Portfolio - Human-Crafted Interactive Logic Module
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSpotlightFollower();
  init3DCardTilt();
  initNavbarScroll();
  initRoleTypewriter();
  initSkillsFilter();
  initLightboxModal();
  initPremiumScrollAnimations();
  initComponentBoxTilt();
  initContactForm();
});

/* Mouse Spotlight Glow Follower */
function initSpotlightFollower() {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  });
}

/* Hero Portrait 3D Card Tilt */
function init3DCardTilt() {
  const card = document.getElementById('portrait-card');
  const frame = card ? card.querySelector('.portrait-wrapper') : null;
  if (!card || !frame) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 22;
    const rotateY = (centerX - x) / 22;

    frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  });

  card.addEventListener('mouseleave', () => {
    frame.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    frame.style.transition = 'transform 0.5s ease';
  });

  card.addEventListener('mouseenter', () => {
    frame.style.transition = 'transform 0.1s ease-out';
  });
}

/* Navbar Scrolled State */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* Dynamic Typewriter Role Switcher */
function initRoleTypewriter() {
  const targetEl = document.getElementById('typing-text');
  if (!targetEl) return;

  const roles = [
    "Full Stack Developer",
    "Experienced Graphic Designer",
    "Frontend Specialist",
    "Data Science Engineer",
    "Mindful Yoga Practicer"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      targetEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 45;
    } else {
      targetEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typeSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* Technical Skills & Tooling Tab Filter */
function initSkillsFilter() {
  const tabBtns = document.querySelectorAll('.skills-tab-btn');
  const skillCards = document.querySelectorAll('.human-skill-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      skillCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* Image Lightbox Modal */
function initLightboxModal() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');
  const zoomTriggers = document.querySelectorAll('[data-zoom-src]');

  if (!modal || !modalImg) return;

  zoomTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = trigger.getAttribute('data-zoom-src');
      if (imgSrc) {
        modalImg.src = imgSrc;
        modal.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

/* Premium Quality Scroll Component Box Reveal Animations */
function initPremiumScrollAnimations() {
  const revealItems = document.querySelectorAll('.reveal-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 0.08}s`;
    observer.observe(el);
  });
}

/* Dynamic 3D Micro-Tilt Responsiveness on Hover for All Component Boxes */
function initComponentBoxTilt() {
  const boxes = document.querySelectorAll('.glass-panel, .project-card, .human-skill-card');

  boxes.forEach(box => {
    box.addEventListener('mousemove', (e) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 35;
      const rotateY = (centerX - x) / 35;

      box.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    box.addEventListener('mouseleave', () => {
      box.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      box.style.transition = 'transform 0.4s ease';
    });

    box.addEventListener('mouseenter', () => {
      box.style.transition = 'transform 0.08s ease-out';
    });
  });
}

/* Contact Form Submission Feedback */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedbackEl = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = 'Sending Message...';

    setTimeout(() => {
      btn.innerHTML = 'Message Sent! ✓';
      btn.style.background = '#10b981';
      form.reset();

      if (feedbackEl) {
        feedbackEl.textContent = 'Thank you for reaching out! Ananya will respond to your message soon.';
        feedbackEl.style.color = '#10b981';
        feedbackEl.style.display = 'block';
      }

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = origText;
        btn.style.background = '';
        if (feedbackEl) feedbackEl.style.display = 'none';
      }, 4000);
    }, 1200);
  });
}

/* Helper function to copy email */
function copyEmailToClipboard() {
  const email = '07ananyaghosg07@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    alert('Email copied to clipboard: ' + email);
  }).catch(() => {
    prompt('Copy email:', email);
  });
}
