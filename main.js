// Ananya Ghosh Portfolio Interactivity Script

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer Toggle for Android Devices
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggleBtn && mobileDrawer) {
    menuToggleBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      menuToggleBtn.textContent = mobileDrawer.classList.contains('active') ? '✕' : '☰';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        menuToggleBtn.textContent = '☰';
      });
    });
  }

  // Mouse Spotlight Follower (Disabled on Touch Screen / Android)
  const spotlight = document.getElementById('spotlight');
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    });
  }

  // 3D Card Hover Tilt Effect for Desktop
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
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Typewriter Role Switcher
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    const roles = [
      'Full Stack Developer',
      'Experienced Graphic Designer',
      'Handshake AI Specialist',
      'Data Science Engineer'
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
        typingSpeed = 50;
      } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2200; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // Skills Filtering Tabs
  const tabButtons = document.querySelectorAll('.skills-tab-btn');
  const skillCards = document.querySelectorAll('.human-skill-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
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

  // Scroll Reveal Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-scroll').forEach(el => {
    revealObserver.observe(el);
  });

  // Contact Form Feedback
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formFeedback.style.display = 'block';
      formFeedback.style.color = '#10b981';
      formFeedback.textContent = '✓ Thank you! Your message has been sent successfully. Ananya will respond shortly.';
      contactForm.reset();
      setTimeout(() => {
        formFeedback.style.display = 'none';
      }, 5000);
    });
  }
});

// Email Clipboard Helper
function copyEmailToClipboard() {
  const email = '07ananyaghosg07@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    alert('Email copied to clipboard: 07ananyaghosg07@gmail.com');
  }).catch(err => {
    alert('Direct Email: 07ananyaghosg07@gmail.com');
  });
}
