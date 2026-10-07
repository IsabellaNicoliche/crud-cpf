// Importar a biblioteca json-server
const jsonServer = require("json-server");

// Criar uma instancia do servidor JsonServer
// Essa instancia é usada para criar e configurar o servidor
const server = jsonServer.create();

// Criar um roteador com o arquivo db.json
// O roteador define as rotas do servidor. Ele utiliza um arquivo JSON para gerar as rotas (ex: /pessoas).
const router = jsonServer.router("db.json");

// Funções que são executadas em cada requisição feita ao servidor
// Importa os padrões do JsonServer
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Define a porta em que o servidor irá rodar (Render define a porta via variável de ambiente)
const porta = process.env.PORT || 3000;

// Usa o roteador criado -> rotas REST em /pessoas (GET, POST, PUT, DELETE)
server.use(router);

// Importa o módulo express
const express = require("express");

// Criando variável instancia do express
const app = express();

// Configura o servidor para servir os arquivos estáticos (HTML/CSS/JS) da pasta public
app.use(express.static("public"));

// Define a rota principal -> abre a página de listagem (GET)
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/get/index.html");
});

// Junta o Express (páginas) com o JSON Server (API/banco de dados) no mesmo processo,
// que é o que o Render executa com "node server.js"
app.use(server);

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
  console.log(`API (JSON Server) disponível em /pessoas`);
});
