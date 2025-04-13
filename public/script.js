// Função para processar as repetições e carga
function processarRepeticoes(repeticoesText, carga) {
  const regex = /(\d+)\s*x\s*(\d+)\s*a\s*(\d+)/; // Padrão: "2x de 10 a 12"
  const match = repeticoesText.match(regex);

  if (match) {
    const series = parseInt(match[1]);
    const minRepeticoes = parseInt(match[2]);
    const cargaNum = parseFloat(carga); // Usando parseFloat para garantir que seja um número
    return series * minRepeticoes * cargaNum;
  } else {
    console.error("Formato de repetições não reconhecido");
    return 0;
  }
}

// Função para categorizar o exercício
function categorizarExercicio(exercicio) {
  const categorias = {
    "peitoral": ["crucifixo", "supino", "flexão"],
    "costas": ["pulley", "barra", "remada"],
    "ombros": ["desenvolvimento", "elevação", "front raise"],
    "biceps": ["rosca", "alternada", "martelo"],
    "triceps": ["triceps", "pulley", "mergulhos"],
    "pernas": ["agachamento", "leg press", "extensão"]
  };

  for (let categoria in categorias) {
    if (categorias[categoria].some(ex => exercicio.toLowerCase().includes(ex))) {
      return categoria;
    }
  }

  return "outro"; // Caso o exercício não se encaixe em nenhuma categoria
}

// Função para processar os dados de treino e calcular os totais
function processarTreino() {
  let totalPeitoral = 0;
  let totalCostas = 0;
  let totalOmbros = 0;
  let totalBiceps = 0;
  let totalTriceps = 0;
  let totalPernas = 0;

  for (let i = 1; i <= 11; i++) {
    const exercicio = document.getElementById(`exercicio${i}`).value;
    const repeticoes = document.getElementById(`repeticoes${i}`).value;
    const carga = document.getElementById(`carga${i}`).value;

    if (exercicio && repeticoes && carga) {
      const cargaTotal = processarRepeticoes(repeticoes, carga);
      const categoria = categorizarExercicio(exercicio);

      switch (categoria) {
        case "peitoral":
          totalPeitoral += cargaTotal;
          break;
        case "costas":
          totalCostas += cargaTotal;
          break;
        case "ombros":
          totalOmbros += cargaTotal;
          break;
        case "biceps":
          totalBiceps += cargaTotal;
          break;
        case "triceps":
          totalTriceps += cargaTotal;
          break;
        case "pernas":
          totalPernas += cargaTotal;
          break;
        default:
          break;
      }
    }
  }

  // Salvar os totais de volume no localStorage
  const totals = {
    peitoral: totalPeitoral,
    costas: totalCostas,
    ombros: totalOmbros,
    biceps: totalBiceps,
    triceps: totalTriceps,
    pernas: totalPernas
  };

  localStorage.setItem('totals', JSON.stringify(totals));

  // Exibir os totais no HTML
  document.getElementById("peitoral-total").textContent = `Peitoral: ${totalPeitoral}`;
  document.getElementById("costas-total").textContent = `Costas: ${totalCostas}`;
  document.getElementById("ombros-total").textContent = `Ombros: ${totalOmbros}`;
  document.getElementById("biceps-total").textContent = `Bíceps: ${totalBiceps}`;
  document.getElementById("triceps-total").textContent = `Tríceps: ${totalTriceps}`;
  document.getElementById("pernas-total").textContent = `Pernas: ${totalPernas}`;
}

// Função para carregar os dados do localStorage ao carregar a página
function carregarDados() {
  const treinoId = document.title.toLowerCase().replace(/\s/g, '_');  // Substitui espaços por "_"
  const dadosTreinoSalvos = JSON.parse(localStorage.getItem(treinoId));
  
  if (dadosTreinoSalvos) {
    // Preenche os campos com os dados salvos
    dadosTreinoSalvos.forEach((dados, i) => {
      document.getElementById(`exercicio${i + 1}`).value = dados.exercicio;
      document.getElementById(`repeticoes${i + 1}`).value = dados.repeticoes;
      document.getElementById(`carga${i + 1}`).value = dados.carga;
      document.getElementById(`observacao${i + 1}`).value = dados.observacao;
    });
  }
}

// Função para atualizar o volume dos treinos na página principal
function atualizarVolumeTreinos() {
  const totals = JSON.parse(localStorage.getItem('totals'));

  if (totals) {
    // Exibir os totais, mas exibir apenas o total de peitoral se preferir
    document.getElementById("peitoral-total").textContent = `Peitoral: ${totals.peitoral || 0}`;
    document.getElementById("costas-total").textContent = `Costas: ${totals.costas || 0}`;
    document.getElementById("ombros-total").textContent = `Ombros: ${totals.ombros || 0}`;
    document.getElementById("biceps-total").textContent = `Bíceps: ${totals.biceps || 0}`;
    document.getElementById("triceps-total").textContent = `Tríceps: ${totals.triceps || 0}`;
    document.getElementById("pernas-total").textContent = `Pernas: ${totals.pernas || 0}`;
  }
}

// Função para salvar os dados e imprimir no console
function salvarDados() {
  console.log("Função salvarDados chamada");
  const treinoId = document.title.toLowerCase().replace(/\s/g, '_');  // Substitui espaços por "_"
  
  const dadosTreino = [];

  for (let i = 1; i <= 11; i++) {
    const exercicio = document.getElementById(`exercicio${i}`);
    const repeticoes = document.getElementById(`repeticoes${i}`);
    const carga = document.getElementById(`carga${i}`);
    const observacao = document.getElementById(`observacao${i}`);

    // Verifica se os elementos existem antes de tentar acessar os valores
    if (exercicio && repeticoes && carga && observacao) {
      dadosTreino.push({
        exercicio: exercicio.value,
        repeticoes: repeticoes.value,
        carga: carga.value,
        observacao: observacao.value
      });
    } else {
      console.error(`Elemento não encontrado para o Bloco ${i}`);
    }
  }
  
  // Salva os dados no localStorage usando o treinoId (que é o título da página)
  localStorage.setItem(treinoId, JSON.stringify(dadosTreino));

  // Processa as informações de treino
  processarTreino();

  alert("Dados salvos e calculados!");
}

// Carregar os dados e atualizar o volume quando a página for carregada
window.onload = function() {
  carregarDados();
  atualizarVolumeTreinos();  // Atualiza os volumes calculados
};
