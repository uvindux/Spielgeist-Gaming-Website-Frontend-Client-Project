const tabBtns = document.querySelectorAll('.tab-btn');
const dealCards = document.querySelectorAll('.deal-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
     
        tabBtns.forEach(b => b.classList.remove('active'));
        
       
        btn.classList.add('active');
        
        const tabCategory = btn.dataset.tab;
        
        // Filter deal cards
        dealCards.forEach(card => {
            if (tabCategory === 'all') {
                card.style.display = 'block';
            } else {
                if (card.dataset.category && card.dataset.category.includes(tabCategory)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const hours = 24 - now.getHours();
    const minutes = 59 - now.getMinutes();
    const seconds = 59 - now.getSeconds();
    
    document.getElementById('countdown-timer').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
/*Registration form*/
const form = document.getElementById('registrationForm');
        
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (validateForm()) {
        document.getElementById('successMessage').style.display = 'block';
        form.reset();
    }
});

function validateForm() {
    let isValid = true;
    
    // Reset errors
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.style.display = 'none';
    });
    
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    inputs.forEach(input => {
        input.classList.remove('input-error');
    });
    
    // Validate first name
    const firstName = document.getElementById('firstName').value.trim();
    if (firstName === '') {
        document.getElementById('firstNameError').style.display = 'block';
        document.getElementById('firstName').classList.add('input-error');
        isValid = false;
    }
    
    // Validate last name
    const lastName = document.getElementById('lastName').value.trim();
    if (lastName === '') {
        document.getElementById('lastNameError').style.display = 'block';
        document.getElementById('lastName').classList.add('input-error');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailPattern.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        document.getElementById('email').classList.add('input-error');
        isValid = false;
    }
    
    // Validate phone
    const phone = document.getElementById('phone').value.trim();
    const phonePattern = /^\d{10}$/;
    if (phone === '' || !phonePattern.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        document.getElementById('phone').classList.add('input-error');
        isValid = false;
    }
    
    // Validate gender
    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (!genderSelected) {
        document.getElementById('genderError').style.display = 'block';
        isValid = false;
    }
    
    return isValid;
}

// Hide success message when typing starts
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        document.getElementById('successMessage').style.display = 'none';
    });
});
