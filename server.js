const express = require("express")
const cors = require("cors")
const dados = require("./dados.json")

//Funções e códigos auxiliares, tipo: autoIncrement, totais, cálculos...
function autoIncrement() {
    return Number(dados[dados.length - 1].id) + 1
}


//Controllers CRUD [create, read, update, delete]
const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}


//Cadastrar equipamento
const createEnergia = (req, res) => {
    const energia = req.body
    energia.id = autoIncrement()
    dados.push(energia)

    res.status(201).json(energia)
}


//Listar equipamentos
const readEnergia = (req, res) => {
    res.json(dados)
}


//Buscar pelo id
const buscaEnergia = (req, res) => {
    const energia = dados.find(e => e.id == Number(req.params.id))

    if (energia) {
        res.json(energia)
    } else {
        res.status(404).json("Id não encontrado")
    }
}


//Buscar pelo equipamento
const buscaEquipamento = (req, res) => {
    const equipamento = req.params.equipamento

    const resultado = dados.filter(e =>
        e.equipamento.toLowerCase() == equipamento.toLowerCase()
    )

    if (resultado.length > 0) {
        res.json(resultado)
    } else {
        res.status(404).json("Equipamento não encontrado")
    }
}


//Buscar pelo local
const buscaLocal = (req, res) => {
    const local = req.params.local

    const resultado = dados.filter(e =>
        e.local.toLowerCase() == local.toLowerCase()
    )

    if (resultado.length > 0) {
        res.json(resultado)
    } else {
        res.status(404).json("Local não encontrado")
    }
}


//Atualizar equipamento
const updateEnergia = (req, res) => {
    const id = req.params.id
    const novosDados = req.body
    novosDados.id = Number(id)

    let status = 0

    dados.forEach((energia, indice) => {
        if (energia.id == id) {
            dados[indice] = novosDados
            status = 1
        }
    })

    if (status == 1) {
        res.status(202).json(novosDados)
    } else {
        res.status(404).send("Equipamento não encontrado")
    }
}


//Excluir equipamento
const deleteEnergia = (req, res) => {
    const id = req.params.id
    let status = 0

    dados.forEach((energia, indice) => {
        if (energia.id == id) {
            dados.splice(indice, 1)
            status = 1
        }
    })

    if (status == 1) {
        res.json("Equipamento excluido com sucesso")
    } else {
        res.status(404).send("Equipamento não encontrado")
    }
}


//Configurações do servidor
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const porta = 3000


//Rotas REST [post, get, put, patch, delete]
app.get('/', rotaInicial)

app.post('/energia', createEnergia)

app.get('/energia', readEnergia)

app.get('/energia/:id', buscaEnergia)

app.get('/equipamento/:equipamento', buscaEquipamento)

app.get('/local/:local', buscaLocal)

app.put('/energia/:id', updateEnergia)

app.delete('/energia/:id', deleteEnergia)


//Porta de entrada do servidor e saída do console
app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`)
})