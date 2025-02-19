/** 
 * Módulo de conexão com o banco de dados 
 * Uso do framework mongoose
 */

// importação do mongoose
const mongoose= require('mongoose')

// configuração do banco de dados
// ip/link do servidor, autenticação
// ao final da URL definir o nome do banco  de dados 
// exemplo: /dbclientes
const url = 'mongodb+srv://admin:123Senac@wesley.gehb2.mongodb.net/dbclientes'

// validação (evitar a abertura de varias conexões) 
let conectado = false

// método o para conectar com o banco de dados
const conectar = async () => {
    // se não estiver conectado
    if (!conectado) {
        //conectado com o banco de dados
        try {
            await mongoose.connect(url) //conectar
            conectado = true // setar a variavel
            console.log("MongoDB Conectado")
        } catch (error) {
            console.error(error)
        }

    }

}

// método o para conectar com o banco de dados
const desconectar = async () => {
    // se stiver conectado
    if (conectado) {
        // desconectado
        try {
            await mongoose.disconnect(url) //desconectado
            conectado = false // setar a variavel 
            console.log("MongoDB desconectado")  
        } catch (error) {
            console.error(error)
        }
    }
}
//exportar para o main os métodos conectar e desconectar
module.exports = {conectar, desconectar}