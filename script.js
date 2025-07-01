const themeToggle = document.getElementById('theme-toggle');

// Alterna entre tema claro e escuro
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  themeToggle.textContent = isLight ? '🌙' : '☀️';
});

// Confirmação de envio de formulário
const form = document.getElementById('form-contato');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Mensagem enviada com sucesso! Obrigado por entrar em contato.');
  form.reset();
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
});
