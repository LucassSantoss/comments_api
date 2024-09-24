const express = require("express");
const bodyParser = require("body-parser");
const connect = require('./database/db');
const createCommentsTable = require('./database/initDb');

const app = express();
const port = 8000;

app.use(bodyParser.json());

createCommentsTable();

// Gerar novo comentário
app.post("/comment", async (req, res) => {
  const { nome, conteudo } = req.body;

  if (!nome || !conteudo) {
    return res.status(400).json({
      mensagem: "Nome e conteúdo são obrigatórios",
    });
  }

  try {
    const connection = await connect();
    const query = `
      INSERT INTO comentarios (nome, conteudo) VALUES (?, ?);
    `;

    await connection.query(query, [nome, conteudo]);
    await connection.end();

    res.status(200).json({
      mensagem: "Comentário criado com sucesso",
    });

  } catch (error) {
    console.error('Erro ao criar comentário', error);
    res.status(500).json({
      mensagem: "Erro interno ao criar comentário",
    });
  }
});

// Recupera todos os comentários
app.get("/comment", async (req, res) => {
  try {
    const connection = await connect();
    const query = `
      SELECT * FROM comentarios;
    `;

    const [rows] = await connection.query(query);
    await connection.end();

    res.status(200).json(rows);

  } catch (error) {
    console.error('Erro ao buscar comentários', error);
    res.status(500).json({
      mensagem: "Erro interno ao buscar comentários",
    });
  }
});


app.listen(port, () => {
  console.log("Server running on: http://localhost:" + port);
});