document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Mobile Navigation Toggle
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  burger.addEventListener('click', function() {
    // Toggle Navigation
    nav.classList.toggle('nav-active');

    // Burger Animation
    burger.classList.toggle('toggle');
  });

  // Scroll to top button
  const backToTopButton = document.getElementById('backToTop');

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Navbar scroll effect
  const nav_element = document.querySelector('nav');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      nav_element.classList.add('nav-scrolled');
    } else {
      nav_element.classList.remove('nav-scrolled');
    }
  });

  // Fade-in animation for sections
  const sections = document.querySelectorAll('.section');

  // Add fade-in class to each section
  sections.forEach((section, index) => {
    section.classList.add('fade-in');
    section.classList.add(`delay-${index % 4 + 1}`);
  });

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        // Stop observing the element
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0.15
  });

  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');

      // Close mobile menu if open
      if (nav.classList.contains('nav-active')) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
      }

      // Scroll to target
      if (targetId !== '#') {
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Skill section hover effects
  const skillCategories = document.querySelectorAll('.skill-category');

  skillCategories.forEach(skill => {
    skill.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });

    skill.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});
