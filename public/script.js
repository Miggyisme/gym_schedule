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
    "costas": ["puxada", "remada"],
    "ombros": ["desenvolvimento", "elevação"],
    "biceps": ["rosca", "biceps","bíceps","martelo"],
    "triceps": ["triceps","tríceps","pulley"],
    "pernas": ["agachamento", "leg","cadeira"]
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

  // Calcular os totais para cada exercício
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

  // Carregar os totais existentes do localStorage
  const totalsExistentes = JSON.parse(localStorage.getItem('totals')) || {
    peitoral: 0,
    costas: 0,
    ombros: 0,
    biceps: 0,
    triceps: 0,
    pernas: 0
  };

  // Somar os novos totais com os existentes
  const totals = {
    peitoral: totalsExistentes.peitoral + totalPeitoral,
    costas: totalsExistentes.costas + totalCostas,
    ombros: totalsExistentes.ombros + totalOmbros,
    biceps: totalsExistentes.biceps + totalBiceps,
    triceps: totalsExistentes.triceps + totalTriceps,
    pernas: totalsExistentes.pernas + totalPernas
  };

  // Salvar os totais atualizados no localStorage
  localStorage.setItem('totals', JSON.stringify(totals));

  // Exibir os totais no HTML
  document.getElementById("peitoral-total").textContent = `Peitoral: ${totals.peitoral}`;
  document.getElementById("costas-total").textContent = `Costas: ${totals.costas}`;
  document.getElementById("ombros-total").textContent = `Ombros: ${totals.ombros}`;
  document.getElementById("biceps-total").textContent = `Bíceps: ${totals.biceps}`;
  document.getElementById("triceps-total").textContent = `Tríceps: ${totals.triceps}`;
  document.getElementById("pernas-total").textContent = `Pernas: ${totals.pernas}`;
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
    // Exibir os totais acumulados
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

// Função para resetar os totais
function resetarTotais() {
  // Resetando os totais para zero
  const totalsResetados = {
    peitoral: 0,
    costas: 0,
    ombros: 0,
    biceps: 0,
    triceps: 0,
    pernas: 0
  };

  // Salvar os totais resetados no localStorage
  localStorage.setItem('totals', JSON.stringify(totalsResetados));

  // Exibir os totais resetados no HTML
  document.getElementById("peitoral-total").textContent = `Peitoral: ${totalsResetados.peitoral}`;
  document.getElementById("costas-total").textContent = `Costas: ${totalsResetados.costas}`;
  document.getElementById("ombros-total").textContent = `Ombros: ${totalsResetados.ombros}`;
  document.getElementById("biceps-total").textContent = `Bíceps: ${totalsResetados.biceps}`;
  document.getElementById("triceps-total").textContent = `Tríceps: ${totalsResetados.triceps}`;
  document.getElementById("pernas-total").textContent = `Pernas: ${totalsResetados.pernas}`;
}

// Função para carregar os dados e atualizar o volume quando a página for carregada
window.onload = function() {
  carregarDados();
  atualizarVolumeTreinos();  // Atualiza os volumes calculados

  // Adicionar o evento de clique no botão "Resetar Totais"
  document.getElementById("resetar-btn").addEventListener("click", resetarTotais);
};
