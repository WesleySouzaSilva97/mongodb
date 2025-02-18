/** 
 * Módulo de conexão com o banco de dados 
 * Uso do framework mongoose
 */

// importação do mongoose
const mongoose= require('mongoose')

// configuração do banco de dados
// ip/link do servidor, autenticação
const url = 'mongodb+srv://admin:123Senac@wesley.gehb2.mongodb.net/'

// validação (evitar a abertura de varias conexões) 
let conectado = false

// método o para conectar com o banco de dados
const conectar = async () => {
    // se não estiver conectado
    if (!conectado) {
        //conectado com o banco de dados

    }

}

// método o para conectar com o banco de dados
const desconectar = async () => {
    // se stiver conectado
    if (conectado) {
        // desconectado
    }
}