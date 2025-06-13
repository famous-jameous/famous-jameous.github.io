window.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('blogCarousel');
  const nextBtn = document.getElementById('blogNext');
  const prevBtn = document.getElementById('blogPrev');

  const cardWidth = 324; // Adjust based on your actual card size + gap
  
  let position = 0;
  const totalCards = carousel.children.length;

  // Clone first and last card for infinite effect
  const firstCard = carousel.children[0].cloneNode(true);
  const lastCard = carousel.children[totalCards - 1].cloneNode(true);
  carousel.appendChild(firstCard);
  carousel.insertBefore(lastCard, carousel.children[0]);

  // Adjust scroll to account for the cloned first card
  carousel.scrollLeft = cardWidth;

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });

    setTimeout(() => {
      // If at end (past real last), reset to first
      if (carousel.scrollLeft >= (cardWidth * (totalCards))) {
        carousel.scrollLeft = cardWidth;
      }
    }, 300); // delay must match scroll animation duration
  });

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });

    setTimeout(() => {
      // If at beginning (before real first), reset to last
      if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft = cardWidth * totalCards;
      }
    }, 300);
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

