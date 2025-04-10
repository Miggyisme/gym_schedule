function salvarDados() {
    const dados = [];
  
    for (let i = 1; i <= 11; i++) {
      const exercicio = document.getElementById(`exercicio${i}`).value;
      const repeticoes = document.getElementById(`repeticoes${i}`).value;
      const carga = document.getElementById(`carga${i}`).value;
      const observacao = document.getElementById(`observacao${i}`).value;
  
      dados.push({ exercicio, repeticoes, carga, observacao });
    }
  
    fetch('/salvar-treino', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ treino: 'A', dados })
    })
    .then(response => {
      if (response.ok) {
        alert('Dados salvos com sucesso!');
      } else {
        alert('Erro ao salvar os dados.');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao salvar os dados.');
    });
  }
  