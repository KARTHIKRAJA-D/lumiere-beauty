/* ═══════════════════════════════════════
   LUMIÈRE BEAUTY — Main Script
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile menu toggle ──
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.classList.add('open');
      menuBtn.classList.add('hamburger-open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('hamburger-open');
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu on nav link click
  document.querySelectorAll('.mobile-nav').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('hamburger-open');
      document.body.style.overflow = '';
    });
  });

  // ── Smooth scroll for all anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Active nav highlight on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('text-[#c8a97e]');
          if (item.getAttribute('href') === `#${id}`) {
            item.style.color = '#c8a97e';
          } else {
            item.style.color = '';
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // ── Scroll reveal with IntersectionObserver ──
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger children in the same parent if multiple
          const delay = parseFloat(entry.target.style.animationDelay) || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay * 1000);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );
  revealElements.forEach(el => revealObserver.observe(el));

  // ── Contact form submission ──
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderBottomColor = 'rgba(200,80,80,0.6)';
          valid = false;
          setTimeout(() => {
            field.style.borderBottomColor = '';
          }, 2000);
        }
      });
      if (!valid) return;

      // Email format check
      const emailField = form.querySelector('[type="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        emailField.style.borderBottomColor = 'rgba(200,80,80,0.6)';
        setTimeout(() => { emailField.style.borderBottomColor = ''; }, 2000);
        return;
      }

      // Simulate submission
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';

      await new Promise(resolve => setTimeout(resolve, 1400));

      // Success state
      form.style.opacity = '0';
      form.style.transform = 'translateY(-10px)';
      form.style.transition = 'all 0.4s ease';
      
      setTimeout(() => {
        form.style.display = 'none';
        successMsg.classList.remove('hidden');
        successMsg.style.opacity = '0';
        successMsg.style.transform = 'translateY(10px)';
        successMsg.style.transition = 'all 0.5s ease';
        setTimeout(() => {
          successMsg.style.opacity = '1';
          successMsg.style.transform = 'translateY(0)';
        }, 50);
      }, 400);
    });

    // Live border feedback on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        if (field.value.trim()) {
          field.style.borderBottomColor = 'rgba(200, 169, 126, 0.5)';
        }
      });
      field.addEventListener('blur', () => {
        if (!field.value.trim() && field.hasAttribute('required')) {
          field.style.borderBottomColor = '';
        }
      });
    });
  }

  // ── Parallax hero orbs on mouse move ──
  const heroSection = document.getElementById('home');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const orbs = heroSection.querySelectorAll('.rounded-full.blur-\\[120px\\], .rounded-full.blur-\\[100px\\]');
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xRatio = (clientX / innerWidth - 0.5) * 2;
      const yRatio = (clientY / innerHeight - 0.5) * 2;
      
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 12;
        orb.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
        orb.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  }

  // ── Service card number hover effect ──
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // ── Cursor trail (subtle sparkle effect) ──
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen;
    opacity: 0.5;
  `;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const particles = [];
  let mouseX = 0, mouseY = 0;
  let lastMouseX = 0, lastMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    
    if (speed > 3) {
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 10,
          y: mouseY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          size: Math.random() * 2 + 0.5,
          alpha: 0.6,
          color: Math.random() > 0.5 ? '200,169,126' : '232,180,100'
        });
      }
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    }
  });

  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= 0.02;
      p.alpha -= 0.018;
      p.size *= 0.97;
      
      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      ctx.fill();
    }
    
    requestAnimationFrame(animateParticles);
  };
  animateParticles();

  // ── Limit particles on mobile to save performance ──
  if (window.innerWidth < 768) {
    canvas.style.display = 'none';
  }

  // ── Image lazy loading enhancement ── 
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.addEventListener('load', () => {
          entry.target.style.transition = 'opacity 0.6s ease';
          entry.target.style.opacity = '1';
        });
        imageObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  images.forEach(img => imageObserver.observe(img));

});
