let menu = document.getElementById("menu")
let iconeBarras = document.getElementById("icone-barras")
let iconeX = document.getElementById("icone-x")

function abreFechaMenu() {
    // Menu fechado - tem classe menu-fechado
    // Menu fechado - não tem a classe menu-fechado

    // menu.classList.toggle("menu-fechado")
    // Alterna a classe "menu-fechado" no menu

    // Se o menu contém a classe menu-fechado
    if (menu.classList.contains("menu-fechado")) {
        // abrir menu
        menu.classList.remove("menu-fechado")

        // Esconder icone barras
        iconeBarras.style.display = "none"

        // Mostrar o icone do X
        iconeX.style.display = "inline"
    } else {
        // Fechar o menu - adcionar a classe menu-fechado
        menu.classList.add("menu-fechado")

        // Esconder icone do x 
        iconeX.style.display = "none"

        // Mostrar o icone barras
        iconeBarras.style.display = "inline"
    }

}

onresize = () => {
    menu.classList.remove("menu-fechado")

    iconeBarras.style.display = "none"

    iconeX.style.display = "inline"
}
let listaCases = [
]

function renderizarCases() {
    // Encontrar o elemento para inserir os cards
    let containerCards = document.querySelector(".container-cards") 

    // Variavel para guardar o html dos cases montados
    let template = ""
    
    // Para cada case da listaCases
    listaCases.forEach(cardCase => {
        // Montar o html do card , passando os atributos do case
        template += `<div class="card">
            <img src=${cardCase.imagem} alt="">
            <p>${cardCase.descricao}</p>
        </div>`

    })
    
    // inserir html dos cases montados no elemento container-cards
    containerCards.innerHTML = template 
}

function carregarCases () {
    // Método HTTP GET - Read/leitura - Serve para mostrar um item ou uma lista de itens
    fetch("http://localhost:3000/cards")
    // Deserialization - Deserialialização
    .then( (resposta) => resposta.json() )
    .then( (dadosTratados) => {
        console.log(dadosTratados)
        listaCases = dadosTratados
        renderizarCases()

    })
}

function solicitarOrcamento (event){
    // Pegar os valores os inputs
    let valorNome = document.getElementById("campo-nome").value
    let valorEmail = document.getElementById("campo-email").value
    let valorDescricao = document.getElementById("campo-texto").value
   
    console.log(valorNome, valorEmail, valorDescricao);
   
    // Organizar os valores em um objeto 
    let dadosForm = {
        nome: valorNome,
        email: valorEmail,
        descricao: valorDescricao
    }

    // Enviar a requisição para a API
    // Método HTTP POST - Create/Criar - > Cadastrar um novo registro (solicitação)
    fetch("http:///localhost:3000/solicitacoes", {
        method: "POST" ,
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(dadosForm)
    })
        
        // CASO SUCESSO
        .then (resposta => {
            console.log(resposta)
            // Limpar os inputs
            document.querySelector("#contato form").reset()

        // Mostrar um alert de sucesso
        alert("Solicitações enviada com sucesso!!! 👌")
        })
        // CASO ERRO
        .catch(erro => {
            console.log(erro);
            // Mostrar alert com msg de erro
            alert("Erro de requisição 😢")
        })

        event.preventDefault()
}