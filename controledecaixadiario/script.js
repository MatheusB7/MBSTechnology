let movimentacoes = [];

// Verifica se o plano premium está ativado
const isPremium = localStorage.getItem('plano_ativado') === 'premium';

// Evento para tecla Enter no campo de valor
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("valor").addEventListener("keydown", (e) => {
    if (e.key === "Enter") registrar();
  });
});

// Função principal para registrar uma movimentação
function registrar() {
  const tipo = document.getElementById("tipo").value;
  const forma = document.getElementById("forma").value;
  const descricao = document.getElementById("descricao").value.trim();
  const valor = parseFloat(document.getElementById("valor").value);

  if (!descricao || isNaN(valor) || valor <= 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const registro = { tipo, forma, descricao, valor, hora };
  movimentacoes.push(registro);

  atualizarTabela();
  atualizarResumo();
  limparCampos();
}

// Atualiza a tabela com as movimentações registradas
function atualizarTabela() {
  const tbody = document.getElementById("lista-movimentacoes");
  tbody.innerHTML = "";

  movimentacoes.forEach((m, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${m.tipo}</td>
      <td>${m.forma}</td>
      <td>${m.descricao}</td>
      <td>R$ ${m.valor.toFixed(2)}</td>
      <td>${m.hora}</td>
      <td>${isPremium ? `<button onclick="excluir(${index})">Excluir</button>` : '-'}</td>
    `;

    tbody.appendChild(tr);
  });
}

// Calcula e atualiza o resumo financeiro (entradas, saídas, saldo)
function atualizarResumo() {
  let totalEntradas = 0;
  let totalSaidas = 0;

  movimentacoes.forEach(m => {
    if (m.tipo === "entrada") totalEntradas += m.valor;
    else totalSaidas += m.valor;
  });

  document.getElementById("total-entradas").innerText = totalEntradas.toFixed(2);
  document.getElementById("total-saidas").innerText = totalSaidas.toFixed(2);
  document.getElementById("saldo-final").innerText = (totalEntradas - totalSaidas).toFixed(2);
}

// Limpa os campos do formulário após registrar
function limparCampos() {
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
}

// Exclui uma movimentação (somente para usuários Premium)
function excluir(index) {
  if (!isPremium) return;

  movimentacoes.splice(index, 1);
  atualizarTabela();
  atualizarResumo();
}

// --------- Código de ativação premium ------------

// Código base fixo (somente números)
const codigoBaseNumeros = "202506122024";

// Função que gera o código premium esperado conforme mês atual
function gerarCodigoEsperado() {
  const mes = new Date().getMonth() + 1; // Janeiro = 0, por isso +1
  const multiplicador = mes * 2;

  let codigoNumerico = "";

  for (let i = 0; i < codigoBaseNumeros.length; i++) {
    const digito = parseInt(codigoBaseNumeros[i], 10);
    const mult = digito * multiplicador;
    // Pega apenas o último dígito do resultado da multiplicação
    const ultimoDigito = mult % 10;
    codigoNumerico += ultimoDigito;
  }

  // Formatar no padrão MBS-XXXX-XXXX-XXXX
  return `MBS-${codigoNumerico.slice(0,4)}-${codigoNumerico.slice(4,8)}-${codigoNumerico.slice(8,12)}`;
}

// Função para validar e ativar o plano premium
function ativarPremium(codigoDigitado) {
  codigoDigitado = codigoDigitado.trim().toUpperCase();
  const codigoEsperado = gerarCodigoEsperado();

  if (codigoDigitado === codigoEsperado) {
    localStorage.setItem("plano_ativado", "premium");
    localStorage.setItem("premium_ativado_em", new Date().toISOString());
    localStorage.setItem("premium_dias", "30"); // 30 dias padrão
    alert("Plano Premium ativado com sucesso!");
    // Você pode redirecionar ou atualizar a interface aqui
    location.reload();
    return true;
  } else {
    alert("Código inválido. Verifique e tente novamente.");
    return false;
  }
}

// Exporta funções para acesso externo se quiser chamar ativarPremium em outro script
window.ativarPremium = ativarPremium;
window.gerarCodigoEsperado = gerarCodigoEsperado;
