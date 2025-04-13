// Função para calcular o total de carga levantada
function calcularTotais() {
    // Carregar os dados de contas do localStorage
    const dadosContas = JSON.parse(localStorage.getItem('contas'));
  
    if (dadosContas) {
      let totalGeral = 0;  // Variável para somar o total de carga de todos os exercícios
  
      dadosContas.forEach((item, index) => {
        // Cálculo do total de carga levantada para cada exercício
        const totalPorExercicio = item.set * item.minRep * parseFloat(item.carga);
        totalGeral += totalPorExercicio;
  
        console.log(`Bloco ${index + 1}:`);
        console.log(`Séries: ${item.set}`);
        console.log(`Repetições: de ${item.minRep}`);
        console.log(`Carga: ${item.carga}`);
        console.log(`Total de carga levantada: ${totalPorExercicio} kg`);
      });
  
      // Exibindo o total geral de carga levantada
      console.log(`Total geral de carga levantada: ${totalGeral} kg`);
    } else {
      console.log("Nenhum dado de contas encontrado.");
    }
  }
  
  // Chama a função de cálculo quando a página é carregada
  window.onload = calcularTotais;
  