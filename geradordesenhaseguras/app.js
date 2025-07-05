const form = document.getElementById('comprovanteForm');
const loading = document.getElementById('loading');
const mensagem = document.getElementById('mensagem');
const submitButton = document.getElementById('submitButton');

// Quando o formulário for enviado
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Impede o envio padrão

  loading.style.display = 'block'; // Exibe a animação de carregamento
  mensagem.textContent = ''; // Limpa a mensagem anterior
  submitButton.disabled = true; // Desativa o botão de envio para evitar múltiplos envios

  // Realiza o envio do formulário via Fetch API
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form)
  })
    .then(response => {
      if (response.ok) {
        // Se a resposta for bem-sucedida
        mensagem.textContent = '✅ Comprovante enviado com sucesso!';
        mensagem.style.color = 'green';
      } else {
        // Caso haja erro no envio
        mensagem.textContent = '❌ Ocorreu um erro ao enviar o comprovante. Tente novamente.';
        mensagem.style.color = 'red';
      }
    })
    .catch(error => {
      // Em caso de erro ao enviar
      mensagem.textContent = '❌ Ocorreu um erro ao enviar o comprovante. Tente novamente.';
      mensagem.style.color = 'red';
    })
    .finally(() => {
      loading.style.display = 'none'; // Oculta a animação de carregamento
      submitButton.disabled = false; // Reativa o botão de envio
    });
});