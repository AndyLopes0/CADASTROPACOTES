function vizualizar(pagina, novo=false, idAtual=null){
    document.body.setAttribute('page', pagina)
    if(pagina === 'cadastro'){
        if(novo) limpar()
        if(idAtual){
            const pacote = listaPacotes.pacotes.find(pacote => pacote.idAtual == idAtual)
            if(pacote){
                document.getElementById('id').value = pacote.idAtual
                document.getElementById('cidade').value = pacote.cidade
                document.getElementById('duracao').value = pacote.duracao
                document.getElementById('hospedagem').value = pacote.hospedagem
                document.getElementById('valor').value = pacote.valor
            }
        }
    }
}

var listaPacotes = {
    id: 0,
    pacotes:[]
}

function inserir(cidade, duracao, hospedagem, valor){
    const idAtual = listaPacotes.id + 1;
    listaPacotes.id = idAtual
    listaPacotes.pacotes.push({
        idAtual, cidade, duracao, hospedagem, valor
    })
    salvar()
    renderizar()
    vizualizar('lista')
}

function editar(idAtual, cidade, duracao, hospedagem, valor){
    var pacote = listaPacotes.pacotes.find(pacote => pacote.idAtual == idAtual)
    pacote.cidade = cidade;
    pacote.duracao = duracao;
    pacote.hospedagem = hospedagem;
    pacote.valor = valor;
    salvar()
    renderizar()
    vizualizar('lista')
}

function excluir(idAtual){
    listaPacotes.pacotes = listaPacotes.pacotes.filter( pacote => {
        return pacote.idAtual != idAtual
    } )
    renderizar()
    salvar()
}

function perguntaExcluir(idAtual){
    if(confirm('Tem certeza que deseja deletar este pacote? A ação não poderá ser desfeita!')){
        excluir(idAtual)
    }
}

function renderizar(){
    const tbody = document.getElementById('listaPacotesCorpo')
    if(tbody){
        tbody.innerHTML = listaPacotes.pacotes
        .map( pacote => {
            return `<tr>
                <td>${pacote.idAtual}</td>
                <td>${pacote.cidade}</td>
                <td>${pacote.duracao}</td>
                <td>${pacote.hospedagem}</td>
                <td>${pacote.valor}</td>
                <td>
                    <button onclick="vizualizar('cadastro', false, ${pacote.idAtual})">Editar</button>
                    <button class="deletar" onclick="perguntaExcluir(${pacote.idAtual})">Deletar</button>
                </td>
            </tr>`
     
    }).join('')
    }
}

function submeter(e){
    e.preventDefault()
    const data = {
        idAtual: document.getElementById('id').value,
        cidade: document.getElementById('cidade').value,
        duracao: document.getElementById('duracao').value,
        hospedagem: document.getElementById('hospedagem').value,
        valor: document.getElementById('valor').value
    }
    if(data.idAtual){
        editar(data.idAtual, data.cidade, data.duracao, data.hospedagem, data.valor)
    }
    else{
        inserir(data.cidade, data.duracao, data.hospedagem, data.valor)
    }
}

const KEY = '@pacotesCadas'

function salvar(){
    localStorage.setItem(KEY, JSON.stringify(listaPacotes))
}

function lerPacote(){
    const data = localStorage.getItem(KEY)
    if(data){
        listaPacotes = JSON.parse(data)
    }
    renderizar()
}

function limpar(){
    document.getElementById('id').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('duracao').value = ''
    document.getElementById('hospedagem').value = ''
    document.getElementById('valor').value = ''
}

window.addEventListener('load', () =>{
    lerPacote()
    document.getElementById('form').addEventListener('submit', submeter )
})