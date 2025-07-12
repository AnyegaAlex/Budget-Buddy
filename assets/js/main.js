document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navbar = document.querySelector('.navbar');
  
  mobileMenuToggle.addEventListener('click', function() {
    navbar.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Testimonial carousel
  const testimonialCarousel = document.querySelector('.testimonial-carousel');
  if (testimonialCarousel) {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    testimonialCarousel.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - testimonialCarousel.offsetLeft;
      scrollLeft = testimonialCarousel.scrollLeft;
    });
    
    testimonialCarousel.addEventListener('mouseleave', () => {
      isDown = false;
    });
    
    testimonialCarousel.addEventListener('mouseup', () => {
      isDown = false;
    });
    
    testimonialCarousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - testimonialCarousel.offsetLeft;
      const walk = (x - startX) * 2;
      testimonialCarousel.scrollLeft = scrollLeft - walk;
    });
  }

  // ====== NEW AUTHENTICATION & NAVIGATION CODE ======
  
  // Check authentication state on page load
  checkAuthState();

  // Handle navigation buttons with page transitions
  document.querySelectorAll('[data-auth-action]').forEach(button => {
    button.addEventListener('click', function() {
      const action = this.getAttribute('data-auth-action');
      fadeOutPage(() => {
        if (action === 'login') {
          window.location.href = 'login.html';
        } else if (action === 'signup') {
          window.location.href = 'signup.html';
        }
      });
    });
  });

  // Handle regular links with .html extension
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      fadeOutPage(() => {
        window.location.href = this.getAttribute('href');
      });
    });
  });

  // Handle logout functionality
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('budgetBuddyAuth');
      localStorage.removeItem('budgetBuddyUser');
      localStorage.removeItem('budgetBuddyUserName');
      fadeOutPage(() => {
        window.location.href = 'index.html';
      });
    });
  }
});

// ====== NEW HELPER FUNCTIONS ======

function checkAuthState() {
  const isAuthenticated = localStorage.getItem('budgetBuddyAuth') === 'true';
  const currentPage = window.location.pathname.split('/').pop();

  // Redirect rules:
  // - If logged in and trying to access auth pages, go to dashboard
  // - If not logged in and trying to access dashboard, go to login
  if (isAuthenticated && (currentPage === 'login.html' || currentPage === 'signup.html' || currentPage === 'index.html')) {
    fadeOutPage(() => {
      window.location.href = 'dashboard.html';
    });
  } else if (!isAuthenticated && currentPage === 'dashboard.html') {
    fadeOutPage(() => {
      window.location.href = 'login.html';
    });
  }
}

function fadeOutPage(callback) {
  document.body.classList.add('fade-out');
  setTimeout(callback, 300); // Match this with CSS transition duration
}