document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const email = form.querySelector('input[name="email"]');
      const password = form.querySelector('input[name="password"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email.value.trim() || !password.value.trim()) {
        alert('Por favor, completa todos los campos.');
        e.preventDefault();
        return;
      }

      if (!emailRegex.test(email.value)) {
        alert('Por favor, ingresa un correo válido.');
        e.preventDefault();
        return;
      }
    });
  }
});
