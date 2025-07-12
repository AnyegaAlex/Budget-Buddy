document.addEventListener('DOMContentLoaded', function() {
  // Password visibility toggle
  document.querySelectorAll('.show-password').forEach(button => {
    button.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      const icon = this.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });

  // Password strength indicator
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      const strengthMeter = this.closest('.form-group').querySelector('.strength-meter');
      const strengthBar = strengthMeter.querySelector('.strength-bar');
      const strengthText = strengthMeter.nextElementSibling;
      
      const password = this.value;
      let strength = 0;
      
      // Length check
      if (password.length >= 8) strength++;
      if (password.length >= 12) strength++;
      
      // Character variety checks
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      
      // Update UI
      strengthBar.className = 'strength-bar';
      if (password.length === 0) {
        strengthText.textContent = '';
      } else if (strength <= 2) {
        strengthBar.classList.add('weak');
        strengthText.textContent = 'Weak password';
      } else if (strength <= 4) {
        strengthBar.classList.add('medium');
        strengthText.textContent = 'Medium password';
      } else {
        strengthBar.classList.add('strong');
        strengthText.textContent = 'Strong password';
      }
    });
  }

  // Form validation
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      const email = this.elements.email.value;
      const password = this.elements.password.value;
      
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      // Simulate login - in a real app, this would be an API call
      simulateLogin(email, password);
    });
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = this.elements.name.value;
      const email = this.elements.email.value;
      const password = this.elements.password.value;
      const confirmPassword = this.elements.confirmPassword.value;
      const terms = this.elements.terms.checked;
      
      // Validation
      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (!terms) {
        alert('Please agree to the terms and conditions');
        return;
      }
      
      // Simulate signup - in a real app, this would be an API call
      simulateSignup(name, email, password);
    });
  }

  // Social login buttons
  document.querySelectorAll('.btn-social').forEach(button => {
    button.addEventListener('click', function() {
      const provider = this.classList.contains('btn-google') ? 'Google' : 'Apple';
      alert(`In a real app, this would redirect to ${provider} authentication`);
    });
  });
});

// Simulated authentication functions
function simulateLogin(email, password) {
  console.log('Login attempt with:', email, password);
  
  // Show loading state
  const submitButton = document.querySelector('#loginForm [type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
  submitButton.disabled = true;
  
  // Simulate API delay
  setTimeout(() => {
    // For demo purposes, accept any non-empty password
    if (email && password) {
      // Store user session
      localStorage.setItem('budgetBuddyAuth', 'true');
      localStorage.setItem('budgetBuddyUser', email);
      
      // Redirect to dashboard
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials');
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }, 1500);
}

function simulateSignup(name, email, password) {
  console.log('Signup attempt with:', name, email, password);
  
  // Show loading state
  const submitButton = document.querySelector('#signupForm [type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
  submitButton.disabled = true;
  
  // Simulate API delay
  setTimeout(() => {
    // Store user data (in a real app, this would be a backend API call)
    localStorage.setItem('budgetBuddyAuth', 'true');
    localStorage.setItem('budgetBuddyUser', email);
    localStorage.setItem('budgetBuddyUserName', name);
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
  }, 2000);
}

// Check authentication state on page load
function checkAuth() {
  const isAuthenticated = localStorage.getItem('budgetBuddyAuth') === 'true';
  const currentPage = window.location.pathname.split('/').pop();
  
  if (isAuthenticated && (currentPage === 'login.html' || currentPage === 'signup.html')) {
    window.location.href = 'dashboard.html';
  } else if (!isAuthenticated && currentPage === 'dashboard.html') {
    window.location.href = 'login.html';
  }
}

// Run auth check when the page loads
checkAuth();