
function attachNightModeListener() {
    let mode = 0; 
    
    // Find the night mode button
    const nightModeButton = document.getElementById('nightMode'); // Use your actual button ID
    
    
    if (nightModeButton) {
        nightModeButton.addEventListener('click', function() {
            if (mode === 0) {
                // Switch to Dark Mode
                document.body.style.backgroundColor = "#09182b";
                document.querySelectorAll("p").forEach(p => p.style.color = "#ffffff");
                console.log("Switched to dark mode");
                mode = 1;
            } else {
                // Switch to Light Mode
                document.body.style.backgroundColor = "#ffffff";
                document.querySelectorAll("p").forEach(p => p.style.color = "#000000");
                console.log("Switched to light mode");
                mode = 0;
            }
        });
    } else {
        console.error("Night mode button not found!");
    }
}

// Call the function when the document is ready
document.addEventListener('DOMContentLoaded', attachNightModeListener);
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const headerRight = document.querySelector('.header-right');
    const body = document.body;
    const dropdownBtns = document.querySelectorAll('.dropdown .dropbtn');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        headerRight.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Accessibility
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
    });
    
    // Handle dropdown on mobile
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Handle clicks for mobile view
            if (window.innerWidth <= 767) { // Changed from 900 to match CSS media query
                e.preventDefault();
                e.stopPropagation(); // Prevent event bubbling
                
                // Close other open dropdowns first
                dropdownBtns.forEach(otherBtn => {
                    if (otherBtn !== this) {
                        otherBtn.parentElement.classList.remove('active');
                        otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current dropdown
                const isActive = this.parentElement.classList.contains('active');
                this.parentElement.classList.toggle('active');
                
               
                this.setAttribute('aria-expanded', !isActive);
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 767) { 
            const isMenuOpen = navMenu.classList.contains('active');
            const isClickInside = navMenu.contains(e.target) || 
                                  menuToggle.contains(e.target) || 
                                  headerRight.contains(e.target);
            
            if (isMenuOpen && !isClickInside) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                headerRight.classList.remove('active');
                body.classList.remove('menu-open');
                
                
                dropdownBtns.forEach(btn => {
                    btn.parentElement.classList.remove('active');
                    btn.setAttribute('aria-expanded', 'false');
                });
                
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Close menu when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) 
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            headerRight.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Reset dropdowns
            dropdownBtns.forEach(btn => {
                btn.parentElement.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            });
            
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    
    function myFunction() {
        
    }
    
    // Live Search Bar Functionality
    const searchBar = document.getElementById("search");
    if (searchBar) {
        searchBar.addEventListener("keyup", function() {
            let filter = this.value.toLowerCase();
            let games = document.querySelectorAll(".game");
            
            games.forEach(game => {
                let title = game.querySelector("h3").innerText.toLowerCase();
                if (title.includes(filter)) {
                    game.style.display = "block";
                } else {
                    game.style.display = "none";
                }
            });
        });
    }
});

// Registration Form Validation
document.getElementById("registerForm")?.addEventListener("submit", function (event) {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        event.preventDefault();
    }
});


//Game Product, popular games javascript code
document.querySelectorAll('.product-image').forEach(image => {
    image.addEventListener('click', function () {
        // Remove enlarged class from any previously enlarged image
        const currentEnlarged = document.querySelector('.product-image.enlarged');
        if (currentEnlarged) {
            currentEnlarged.classList.remove('enlarged');
        }

        // Toggle enlarged class on clicked image
        this.classList.toggle('enlarged');

       
        if (this.classList.contains('enlarged')) {
            const removeEnlargement = (e) => {
                if (!this.contains(e.target)) {
                    this.classList.remove('enlarged');
                    document.removeEventListener('click', removeEnlargement);
                }
            };
            document.addEventListener('click', removeEnlargement);
        }
    });
});document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Function to show error message
    function showError(input, errorElement) {
        errorElement.style.display = 'block';
        input.classList.add('error');
    }
    
    // Function to hide error message
    function hideError(input, errorElement) {
        errorElement.style.display = 'none';
        input.classList.remove('error');
    }
    
    // Initial state 
    hideError(nameInput, nameError);
    hideError(emailInput, emailError);
    hideError(messageInput, messageError);
    
    // Real-time validation for name
    nameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            showError(nameInput, nameError);
        } else {
            hideError(nameInput, nameError);
        }
    });
    
    // Real-time validation for email
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            showError(emailInput, emailError);
        } else {
            hideError(emailInput, emailError);
        }
    });
    
    // Real-time validation for message
    messageInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            showError(messageInput, messageError);
        } else {
            hideError(messageInput, messageError);
        }
    });
    
    // Form submission handling
    form.addEventListener('submit', function(event) {
        
        event.preventDefault();
        
        let isValid = true;
        
        // Name validation -
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError);
            isValid = false;
        } else {
            hideError(nameInput, nameError);
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, emailError);
            isValid = false;
        } else {
            hideError(emailInput, emailError);
        }
        
        // Message validation
        if (messageInput.value.trim() === '') {
            showError(messageInput, messageError);
            isValid = false;
        } else {
            hideError(messageInput, messageError);
        }
        

        if (isValid) {
            alert('Form submitted successfully!');
            
        }
    });
}
);

//Back to top button js code

let mybutton = document.getElementById("myBtn");


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0;
}
