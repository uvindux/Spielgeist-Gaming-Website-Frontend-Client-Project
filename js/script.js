// ========== Get the navItem attribute ==========
const currentScript = document.currentScript;
const navItem = currentScript?.getAttribute("navItem");

// ========== Load Navbar based on navItem ==========
document.addEventListener('DOMContentLoaded', function () {
  const navbarContainer = document.getElementById('Navbar');
  if (!navbarContainer) return;

  const navbarFile = navItem === "10" ? 'NavbarH.html' : 'Navbar.html';

  fetch(navbarFile)
    .then(response => response.text())
    .then(data => {
      navbarContainer.innerHTML = data;
      attachNavbarEvents(); // Initialize navbar behavior *after* loading
    })
    .catch(err => console.error('Error loading navbar:', err));
});

// ========== Attach Night Mode Listener ==========
function attachNightModeListener() {
  let mode = 0;
  const nightModeButton = document.getElementById('nightMode');

  if (nightModeButton) {
    nightModeButton.addEventListener('click', function () {
      if (mode === 0) {
        document.body.style.backgroundColor = "#09182b";
        document.querySelectorAll("p").forEach(p => p.style.color = "#ffffff");
        console.log("Switched to dark mode");
        mode = 1;
      } else {
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

// ========== Navbar and Menu Logic ==========
function attachNavbarEvents() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  const headerRight = document.querySelector('.header-right');
  const body = document.body;
  const dropdownBtns = document.querySelectorAll('.dropdown .dropbtn');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', function () {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    headerRight?.classList.toggle('active');
    body.classList.toggle('menu-open');

    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
  });

  // Dropdown handling
  dropdownBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      if (window.innerWidth <= 767) {
        e.preventDefault();
        e.stopPropagation();

        dropdownBtns.forEach(otherBtn => {
          if (otherBtn !== this) {
            otherBtn.parentElement.classList.remove('active');
            otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        const isActive = this.parentElement.classList.contains('active');
        this.parentElement.classList.toggle('active');
        this.setAttribute('aria-expanded', !isActive);
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 767) {
      const isMenuOpen = navMenu.classList.contains('active');
      const isClickInside = navMenu.contains(e.target) ||
        menuToggle.contains(e.target) ||
        headerRight?.contains(e.target);

      if (isMenuOpen && !isClickInside) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        headerRight?.classList.remove('active');
        body.classList.remove('menu-open');
      }
    }
  });

  // Reset on resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 767) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      headerRight?.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });

  attachNightModeListener(); // initialize dark mode once navbar exists
}

// ========== Live Search ==========
document.addEventListener("keyup", function (event) {
  const searchBar = document.getElementById("search");
  if (!searchBar) return;

  let filter = searchBar.value.toLowerCase();
  let games = document.querySelectorAll(".game");

  games.forEach(game => {
    let title = game.querySelector("h3").innerText.toLowerCase();
    game.style.display = title.includes(filter) ? "block" : "none";
  });
});

// ========== Register Form Validation ==========
document.getElementById("registerForm")?.addEventListener("submit", function (event) {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    event.preventDefault();
  }
});

// ========== Contact Form Validation ==========
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    if (nameInput.value.trim() === '') { nameError.style.display = 'block'; isValid = false; }
    else { nameError.style.display = 'none'; }

    if (!emailRegex.test(emailInput.value)) { emailError.style.display = 'block'; isValid = false; }
    else { emailError.style.display = 'none'; }

    if (messageInput.value.trim() === '') { messageError.style.display = 'block'; isValid = false; }
    else { messageError.style.display = 'none'; }

    if (isValid) alert('Form submitted successfully!');
  });
});

// ========== Back to Top ==========
let mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
