const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Middleware para permitir que o servidor leia JSON no corpo da requisição
app.use(express.json());

// Rota para salvar dados do Treino A
app.post('/salvar-treino-a', (req, res) => {
    const dados = req.body;

    fs.writeFile('treino_A.json', JSON.stringify(dados, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar os dados:', err);
            return res.status(500).json({ mensagem: 'Erro ao salvar os dados' });
        }

        res.json({ mensagem: 'Dados salvos com sucesso!' });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
