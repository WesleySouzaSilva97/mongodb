/**
 * Processo principal
 * Estudo do CRUD com MongoDB
 */

//importação do módulo de conexão (database.js)
const { conectar, desconectar } = require('./database.js')

//importação do modelo de dados de clientes
const clienteModel = require('./src/models/Clientes.js')

// CRUD Create (função para adicionar um novo cliente)
const criarCliente = async  (nomeCli, foneCli) => {

    try {
        const novoCliente = new clienteModel(
            {
                nomeCliente: nomeCli,
                foneCliente: foneCli
            }

        )    
        
            // a linha abaixo salva os dados do cliente no banco
            await novoCliente.save()
            console.log("Cliente adicionado com sucesso")
        
    } catch (error) {
        console.log(error)
    }
}

// execução do aplicativo
const app = async() => {
    await conectar()
    await criarCliente("Robson Vaamonde", "9999-0000")
   
    await desconectar()
}

console.clear()
app()
