// Função para salvar os dados no localStorage e enviar para o servidor
function salvarDados(treino = 'A') {
  const dados = [];

  // Coleta os dados dos campos de entrada
  for (let i = 1; i <= 11; i++) {
    const exercicio = document.getElementById(`exercicio${i}`).value;
    const repeticoes = document.getElementById(`repeticoes${i}`).value;
    const carga = document.getElementById(`carga${i}`).value;
    const observacao = document.getElementById(`observacao${i}`).value;

    dados.push({ exercicio, repeticoes, carga, observacao });
  }

  // Salva os dados no localStorage
  localStorage.setItem(`treino_${treino}`, JSON.stringify(dados));

  // Envia os dados para o servidor
  fetch('/salvar-treino', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ treino, dados })
  })
  .then(response => {
    if (response.ok) {
      alert(`Dados do treino ${treino} salvos com sucesso!`);
    } else {
      alert('Erro ao salvar os dados.');
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    alert('Erro ao salvar os dados.');
  });
}

// Função para carregar os dados salvos no localStorage quando a página for carregada
window.onload = function() {
  const treino = 'A'; // Modifique para 'B', 'C' ou 'D' dependendo da página
  const treinoSalvo = JSON.parse(localStorage.getItem(`treino_${treino}`));

  // Se houver dados salvos no localStorage, preenche os campos com esses dados
  if (treinoSalvo) {
    treinoSalvo.forEach((item, index) => {
      document.getElementById(`exercicio${index + 1}`).value = item.exercicio;
      document.getElementById(`repeticoes${index + 1}`).value = item.repeticoes;
      document.getElementById(`carga${index + 1}`).value = item.carga;
      document.getElementById(`observacao${index + 1}`).value = item.observacao;
    });
  }
};
