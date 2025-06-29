document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Mobile Navigation Toggle with improved functionality
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', function() {
    // Toggle Navigation
    nav.classList.toggle('nav-active');

    // Burger Animation
    burger.classList.toggle('toggle');

    // Animate Links - add staggered animation to each menu item
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('nav-active')) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');

        navLinks.forEach(link => {
          link.style.animation = '';
        });
      }
    });
  });

  // Scroll to top button
  const backToTopButton = document.getElementById('backToTop');

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Navbar scroll effect with improved performance
  const nav_element = document.querySelector('nav');
  let lastScrollTop = 0;
  const scrollThreshold = 100;

  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > scrollThreshold) {
      nav_element.classList.add('nav-scrolled');
    } else {
      nav_element.classList.remove('nav-scrolled');
    }

    lastScrollTop = scrollTop;
  }, {passive: true});

  // Fade-in animation for sections
  const sections = document.querySelectorAll('.section');

  // Add fade-in class to each section
  sections.forEach((section, index) => {
    section.classList.add('fade-in');
    section.classList.add(`delay-${index % 4 + 1}`);
  });

  // Intersection Observer for scroll animations with improved options for mobile
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        // Stop observing the element
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });

  // Smooth scrolling for anchor links with improved mobile handling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');

      // Scroll to target with offset for fixed header
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add @keyframes for navLinkFade animation
  if (!document.querySelector('#navLinkFadeStyle')) {
    const style = document.createElement('style');
    style.id = 'navLinkFadeStyle';
    style.textContent = `
      @keyframes navLinkFade {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Fix for iOS devices - prevent body scrolling when menu is open
  const body = document.querySelector('body');
  burger.addEventListener('click', function() {
    if (nav.classList.contains('nav-active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  });
});
