require("dotenv").config();
const mysql = require("mysql2/promise");


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

async function adicionarCliente(nome, email, telefone, endereco) {
    try {
        const [resultado] = await pool.query(
            "INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)",
            [nome, email, telefone, endereco]
        );
        return { id: resultado.insertId, nome, email, telefone, endereco };
    } catch (error) {
        console.error("Erro ao adicionar cliente:", error);
        throw error;
    }
}

// Função para buscar cliente por ID
async function buscarClientePorId(id) {
    try {
        const [resultado] = await pool.query("SELECT * FROM clientes WHERE id = ?", [id]);
        return resultado[0] || null;
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        throw error;
    }
}


async function listarTodosClientes() {
    try {
        const [resultado] = await pool.query("SELECT * FROM clientes");
        return resultado;
    } catch (error) {
        console.error("Erro ao listar clientes:", error);
        throw error;
    }
}

async function atualizarCliente(id, dados) {
    const { nome, email, telefone, endereco } = dados;
    try {
        const [resultado] = await pool.query(
            "UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?",
            [nome, email, telefone, endereco, id]
        );
        return resultado.affectedRows > 0;
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        throw error;
    }
}


async function excluirCliente(id) {
    try {
        const [resultado] = await pool.query("DELETE FROM clientes WHERE id = ?", [id]);
        return resultado.affectedRows > 0;
    } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        throw error;
    }
}

module.exports = {
    adicionarCliente,
    buscarClientePorId,
    listarTodosClientes,
    atualizarCliente,
    excluirCliente,
};
