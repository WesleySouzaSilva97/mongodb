/**
 * Processo principal
 * Estudo do CRUD com MongoDB
 */

//importação do módulo de conexão (database.js)
const { conectar, desconectar } = require('./database.js')

//importação do modelo de dados de clientes
const clienteModel = require('./src/models/Clientes.js')

// importação do pacote string-similarity apra aprimorar a busca por nome 
const stringSimilarity = require('string-similarity')

// CRUD Create (função para adicionar um novo cliente)
const criarCliente = async  (nomeCli, foneCli, cpfCli) => {

    try {
        const novoCliente = new clienteModel(
            {
                nomeCliente: nomeCli,
                foneCliente: foneCli,
                cpf: cpfCli
            }

        )    
        
            // a linha abaixo salva os dados do cliente no banco
            await novoCliente.save()
            console.log("Cliente adicionado com sucesso")
        
    } catch (error) {
        //tratamento de exceções especificas
        if(error.code = 11000) {
            console.log(`Erro: O CPF ${cpfCli} já esta cadastrado`) 

        } else {
            console.log(error)
        }
        console.log(error)
    }
}

// CRUD Read - Função para listar todos os clientes cadastrados
const listarClientes = async () => {
    try {
        // A linha a baixo lista todos os clientes cadastrados por ordem alfabetica
        const clientes = await clienteModel.find().sort(
            {
                nomeCliente: 1

        })
        console.log(clientes)

    } catch (error) {
        console.log(error)
    }
}

// CRUD Read - Função para buscar um cliente especifico
const buscarClientes = async (nome) => {
    try {
        // find() é igual a bsucar no banco 
        // nomeCliente: new RegExp(nome) filtro para buscar pelo nome (partes que contenham ( expressão regular))
        //'i' insensitive ignorar letras maiúsculas e minúsculas
        const cliente = await clienteModel.find(
        {
            nomeCliente: new RegExp(nome, 'i')
        }
        )
        
        //calcular a similaridade entre os nimes  retornados e o nome pesquisado
        const nomesClientes = cliente.map(cliente => cliente.nomeCliente)
        const match = stringSimilarity.findBestMatch(nome, nomesClientes)
        if (nomesClientes.length === 0) {
            console.log("Cliente não cadastrado")
        
        } else {
            const match = stringSimilarity.findBestMatch(nome, nomesClientes)
       
        //clientes com melhor similaridade
        const melhorCliente =cliente.find(cliente => cliente. nomeCliente == match.bestMatch.target)
       //formatação da data
       const clienteFormatado = {
        nomeCliente: melhorCliente.nomeCliente,
        foneCliente: melhorCliente.foneCliente,
        cpf: melhorCliente.cpf,
        dataCadastro: melhorCliente.dataCadastro.toLocaleDateString('pt-br')
       }
       console.log(clienteFormatado)
    }
    } catch (error) {
        console.log(error)
    }
}


 
// execução do aplicativo
const app = async() => {
    await conectar()
    // CRUD - Create
    //await criarCliente("Erica Viana", "9099-7542", "976.476.889-10")

    //CRUD - Read (Exemplo 1 - listar todos os clientes)
   //await listarClientes()

   //CRUD - Read (Exemplo 2 - buscar clientes
   await buscarClientes("Elen")

    await desconectar()
}

console.clear()
app()
