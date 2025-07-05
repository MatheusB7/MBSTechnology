function gerarComprovante() {
  const cliente = document.getElementById("cliente").value;
  const vendedor = document.getElementById("vendedor").value;
  const cpf = document.getElementById("cpf").value;
  const item = document.getElementById("item").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const valor = parseFloat(document.getElementById("valor").value);

  if (!cliente || !vendedor || !item || isNaN(quantidade) || isNaN(valor)) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  const total = (quantidade * valor).toFixed(2);
  const data = new Date().toLocaleString();

  // Usando template string com crases para multiline e variáveis
  const conteudo = `
MBS Technology - Comprovante de Venda

Cliente: ${cliente}
Vendedor: ${vendedor}
${cpf ? "CPF: " + cpf + "\n" : ""}
Item: ${item}
Quantidade: ${quantidade}
Valor Unitário: R$ ${valor.toFixed(2)}
Total: R$ ${total}

Data/Hora: ${data}

Documento Não Válido Como
Comprovante Fiscal
  `;

  document.getElementById("info").innerText = conteudo.trim();
  document.getElementById("comprovante").style.display = "block";
}

function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const texto = document.getElementById("info").innerText;

  if (!texto) {
    alert("Gere o comprovante primeiro.");
    return;
  }

  const cliente = document.getElementById("cliente").value || "cliente";
  const data = new Date();
  // Template string para formar nome do arquivo
  const dataStr = `${data.getDate()}-${data.getMonth() + 1}-${data.getFullYear()}_${data.getHours()}h${data.getMinutes()}`;
  const nomeArquivo = `${cliente}_${dataStr}.pdf`;

  doc.setFont("courier");
  doc.setFontSize(12);
  const linhas = texto.split("\n");
  linhas.forEach((linha, i) => {
    doc.text(linha, 10, 10 + i * 7);
  });

  doc.save(nomeArquivo);
}

function enviarWhatsApp() {
  const texto = document.getElementById("info").innerText;
  if (!texto) {
    alert("Gere o comprovante primeiro.");
    return;
  }

  const mensagem = encodeURIComponent(texto);
  // URL precisa ser string com crases para interpolação
  const url = `https://wa.me/?text=${mensagem}`;
  window.open(url, "_blank");
}

function enviarEmail() {
  const texto = document.getElementById("info").innerText;
  if (!texto) {
    alert("Gere o comprovante primeiro.");
    return;
  }

  const assunto = encodeURIComponent("Comprovante de Venda - MBS Technology");
  const corpo = encodeURIComponent(texto);
  // URL mailto deve estar entre aspas e com template string
  const url = `mailto:?subject=${assunto}&body=${corpo}`;
  window.open(url);
}