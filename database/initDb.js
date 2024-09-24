const connect = require('./db');

const createCommentsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS comentarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        conteudo TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    const connection = await connect();
    await connection.query(createTableQuery);
    await connection.end();
    console.log('Tabela "comentarios" criada com sucesso.');
  } catch (error) {
    console.error('Erro ao criar a tabela "comentarios":', error);
  }
};

module.exports = createCommentsTable;