function pesquisar() {
    // Obtém a seção HTML onde os resultados serão renderizados
    let section = document.getElementById
    ("resultados-pesquisa");

    let campoPesquisa = document.getElementById
    ("campo-pesquisa").value;
 
    //se campoPesquisa for uma string sem nada
    if (!campoPesquisa){
        section.innerHTML = "<p>Nada foi encontrado. Campo vazio</p>"
        return
    }

    campoPesquisa = campoPesquisa.toLowerCase()


    // Inicializa uma string vazia para concatenar os resultados
    let resultados = "";
    let titulo = "";
    let descricao = "";
    let tags = "";


    // Itera sobre cada dado na lista de dados
    for (let dado of dados) {
        
        titulo = dado.titulo.toLowerCase()
        descricao=dado.descricao.toLowerCase()
        tags = dado.tags.toLowerCase()


        if (dado.titulo.includes(campoPesquisa) || dado.descricao.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
            // Constrói o HTML para cada item do resultado
            resultados += `
            <div class="item-resultado">
                <h2>${dado.titulo}</h2> <p class="descricao-meta">${dado.descricao}</p> </div>
        `;
        }
 
        
    }

    //se resultados nao tiver nada, se resultados nao existir, tome essa determinada ação
    if (!resultados) {
        resultados = "<p>Nada foi encontrado</p>"
    }

    // Atribui o HTML gerado para o conteúdo interno da seção
    section.innerHTML = resultados;
}


