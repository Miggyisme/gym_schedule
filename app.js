// Captura o evento de clique no botão
document.getElementById('salvar')?.addEventListener('click', () => {
    // Captura os dados dos campos
    const exercicio = (document.getElementById('exercicio') as HTMLInputElement).value;
    const repeticoes = (document.getElementById('repeticoes') as HTMLInputElement).value;
    const carga = (document.getElementById('carga') as HTMLInputElement).value;
    const observacao = (document.getElementById('observacao') as HTMLInputElement).value;

    // Cria um objeto com os dados
    const dados = {
        exercicio,
        repeticoes,
        carga,
        observacao
    };

    // Envia os dados para o servidor (usando fetch)
    fetch('http://seu-servidor.com/api/salvar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        alert('Dados salvos com sucesso!');
        console.log(data);
    })
    .catch(error => {
        console.error('Erro ao salvar os dados:', error);
    });
});
