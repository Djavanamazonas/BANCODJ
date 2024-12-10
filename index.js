require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

app.post("/clientes", async (req, res) => {
    const { nome, email, telefone, endereco } = req.body;

    if (!nome || !email || !telefone || !endereco) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        const cliente = await db.adicionarCliente(nome, email, telefone, endereco);
        res.status(201).json({ message: "Cliente adicionado com sucesso!", cliente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao adicionar cliente." });
    }
});


app.get("/clientes/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await db.buscarClientePorId(id);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ message: "Cliente não encontrado." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar cliente." });
    }
});


app.get("/clientes", async (req, res) => {
    try {
        const clientes = await db.listarTodosClientes();
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao listar clientes." });
    }
});


app.put("/clientes/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, endereco } = req.body;

    try {
        const atualizado = await db.atualizarCliente(id, { nome, email, telefone, endereco });
        if (atualizado) {
            res.json({ message: "Cliente atualizado com sucesso!" });
        } else {
            res.status(404).json({ message: "Cliente não encontrado." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar cliente." });
    }
});


app.delete("/clientes/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const excluido = await db.excluirCliente(id);
        if (excluido) {
            res.json({ message: "Cliente excluído com sucesso!" });
        } else {
            res.status(404).json({ message: "Cliente não encontrado." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao excluir cliente." });
    }
});


app.get("/", (req, res) => {
    res.json({ message: "Bem-vindo à API de Clientes!" });
});


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
