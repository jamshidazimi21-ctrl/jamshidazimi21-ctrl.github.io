// 🌸 ------------------------------
// Holistic Design - Main Script
// -------------------------------

// 🪷 Page Loader Animation
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  // wait 2.2 s max, then hide after the animation finishes [cite: 2]
  setTimeout(() => {
    if (loader) loader.classList.add("hidden");
  }, 2200);

  // Reset contact form message on page load
  const formMessage = document.getElementById("form-message");
  if (formMessage) formMessage.classList.add("hidden");
});

// 🌿 Navbar Fade-in + Shrink on Scroll
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("visible");
  } else {
    navbar.classList.remove("visible");
  }

  if (window.scrollY > 200) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});

// 🌿 Smooth Scroll for Internal Links (including Services → Contact)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});

// 🌿 Scroll-based Fade-in Animations
const fadeElements = document.querySelectorAll(".fade-in, .service-card");

function handleScrollFade() {
  const triggerBottom = window.innerHeight * 0.85;
  fadeElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", handleScrollFade);
window.addEventListener("load", handleScrollFade);

// 🌿 Back to Top Button
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });
  // 🌿 Active Navigation Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function handleScrollActiveNav() {
  let current = "";

  // Loop through sections to find which one is currently in view
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    // Set a window buffer so the link changes slightly before the section hits the top
    const sectionHeight = section.clientHeight;
    
    // Check if the current scroll position is past the top of the section
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  // Apply the 'active' class to the corresponding navigation link
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
}

// Attach the function to scroll and load events
window.addEventListener("scroll", handleScrollActiveNav);
window.addEventListener("load", handleScrollActiveNav);

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// 🌿 Contact Form Handling (Moved from the bottom of index.html)
document.getElementById("contact-form").addEventListener("submit", async function(event) {
  event.preventDefault(); // stop form from refreshing the page

  const form = event.target;
  const data = new FormData(form);
  const successMessage = document.getElementById("success-message");
  const button = form.querySelector(".contact-btn");
  const buttonText = button.querySelector(".btn-text");
  const spinner = button.querySelector(".spinner");

  // 🌿 Show spinner, hide text, and disable button
  buttonText.style.display = "none";
  spinner.style.display = "inline-block";
  button.disabled = true;

  try {
    const response = await fetch("https://formspree.io/f/manplpjo", {
      method: "POST",
      body: data, // Form data is sent in the body [cite: 12]
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
     // 1. Show the message (CSS sets opacity: 1 and visibility: visible)
      successMessage.classList.add("show");
      
      // 2. Set a timeout to remove the 'show' class after 4 seconds
      setTimeout(() => {
        successMessage.classList.remove("show"); 
      }, 4000); // <-- Message visible for 4 seconds
      
    } else {
      alert("⚠️ There was a problem sending your message. Please try again later."); 
    }
  } catch (error) {
    alert("⚠️ Error: " + error.message); // Alert for network or fetch errors [cite: 15]
  } finally {
    // 🌸 Hide spinner, show text again, and re-enable button
    spinner.style.display = "none"; // Hide spinner [cite: 15]
    buttonText.style.display = "inline"; // Show button text [cite: 16]
    button.disabled = false; // Re-enable button [cite: 16]
  }
});


