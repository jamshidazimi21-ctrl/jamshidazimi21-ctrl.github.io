const form = document.getElementById('contactForm');
const status = document.getElementById('form-status');
const popup = document.getElementById('popup');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const response = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    // Show popup animation
    popup.classList.add('active');
    form.reset();

    // Hide popup after 3 seconds
    setTimeout(() => {
      popup.classList.remove('active');
    }, 3000);

  } else {
    status.textContent = '❌ Oops! Something went wrong. Please try again.';
    status.style.color = 'red';
  }
});
