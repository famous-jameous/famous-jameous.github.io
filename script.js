

window.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('blogCarousel');
  const cards = carousel.querySelectorAll('.blog-card');
  const nextBtn = document.getElementById('blogNext');
  const prevBtn = document.getElementById('blogPrev');

  let currentIndex = 0;

  function scrollToCard(index) {
    const cardWidth = carousel.offsetWidth;
    carousel.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  }

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    scrollToCard(currentIndex);
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    scrollToCard(currentIndex);
  });

const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
  });
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
          });
      }
  });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');

  if (window.scrollY > 100) {
    header.style.background = 'linear-gradient(to bottom, rgba(30, 60, 114, 0.95) 0%, rgba(30, 60, 114, 0.5) 75%, rgba(30, 60, 114, 0) 100%)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = 'linear-gradient(to bottom, rgba(30, 60, 114, 1) 0%, rgba(30, 60, 114, 0.25) 75%, rgba(30, 60, 114, 0) 100%)';
    header.style.backdropFilter = 'blur(8px)';
  }
});

// Form submission is now handled by FormSubmit
// The form will automatically redirect after submission

// Optional: Add loading state when form is submitted
document.getElementById('contactForm').addEventListener('submit', function(e) {
  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // FormSubmit will handle the actual submission and redirect
  // This just provides visual feedback
});

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.service-card, .stat-item, .featured-card');
  const windowHeight = window.innerHeight;
  
  elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - 100) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
      }
  });
}

// Initialize animation styles
document.querySelectorAll('.service-card, .stat-item, .featured-card').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'all 0.6s ease';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Run animation check on load
animateOnScroll();

// Active navigation highlighting
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  let current = '';
  sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
      }
  });
  
  navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
      }
  });
  document.getElementById('hamburger').addEventListener('click', function () {
  document.getElementById('navLinks').classList.toggle('active');
  });
});

