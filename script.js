// 🌸 ------------------------------
// Holistic Design - Main Script
// -------------------------------

// 🪷 Page Loader Animation
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 2200); // Wait for logo + text animation before hiding loader

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

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// 🌿 Contact Form Handling
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    const formMessage = document.getElementById("form-message");
    if (formMessage) {
      formMessage.textContent = "Your message has been sent successfully!";
      formMessage.classList.remove("hidden");
      formMessage.style.color = "#0077b6";
    }

    contactForm.reset();
  });
}
