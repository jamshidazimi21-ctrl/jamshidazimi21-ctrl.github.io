window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  // wait 2.2 s max, then hide even if animations glitch
  setTimeout(() => {
    if (loader) loader.classList.add("hidden");
  }, 2200);
});


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

<!-- 🌱 Contact Form Script -->
<script>
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
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      successMessage.classList.add("show");
      setTimeout(() => {
        successMessage.classList.remove("show");
      }, 6000);
    } else {
      alert("⚠️ There was a problem sending your message. Please try again later.");
    }
  } catch (error) {
    alert("⚠️ Error: " + error.message);
  } finally {
    // 🌸 Hide spinner, show text again, and re-enable button
    spinner.style.display = "none";
    buttonText.style.display = "inline";
    button.disabled = false;
  }
});
  


