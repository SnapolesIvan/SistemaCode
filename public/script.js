document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const inputs = form.querySelectorAll('input');
      for (let input of inputs) {
        if (!input.value.trim()) {
          alert('Por favor, completa todos los campos.');
          e.preventDefault();
          return;
        }
      }
    });
  }
});

