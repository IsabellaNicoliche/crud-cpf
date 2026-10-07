# CRUD - JSON Server + Express (deploy no Render)

Projeto de CRUD (Create, Read, Update, Delete) de cadastro de pessoas, com busca por CPF, usando **Node.js + Express** como servidor e **JSON Server** como banco de dados local (`db.json`) — seguindo o modelo apresentado em aula (Render + GitHub).

## Estrutura do projeto

```
crud-json-server/
├── server.js          # servidor Express + JSON Server (junta os dois no mesmo processo)
├── db.json            # "banco de dados" (JSON Server)
├── Dockerfile          # usado pelo Render para buildar e rodar o projeto
├── package.json
└── public/
    ├── css/style.css
    ├── get/            # página de listagem + busca por CPF
    │   ├── index.html
    │   └── get.js
    ├── post/           # página de cadastro (criar)
    │   ├── index.html
    │   └── post.js
    ├── put/            # página de edição (buscar por CPF e atualizar)
    │   ├── index.html
    │   └── put.js
    └── delete/         # página de exclusão (buscar por CPF e excluir)
        ├── index.html
        └── delete.js
```

A API do JSON Server fica disponível em `/pessoas` (ex: `/pessoas?cpf=123.456.789-00`).

### Páginas se comunicando entre si

Na listagem (GET), cada registro tem os botões **Editar** e **Excluir**, que levam direto para `put/index.html?cpf=...` ou `delete/index.html?cpf=...` já com o CPF preenchido e a busca feita automaticamente. Depois de cadastrar, editar ou excluir, a página redireciona automaticamente de volta para a listagem.

## Rodando localmente

```bash
npm install
node server.js
```

Acesse `http://localhost:3000` (abre a página de listagem).

## Subir para o GitHub

```bash
git init
git add .
git commit -m "CRUD com Express e JSON Server"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
git push -u origin main
```

## Deploy no Render

O projeto já tem um `Dockerfile`, então o Render detecta automaticamente e builda usando Docker (igual ao demonstrado na apresentação).

1. Acesse https://dashboard.render.com e faça login (pode usar sua conta do GitHub).
2. Clique em **Add new** → **Web Service**.
3. Na aba **Git Provider**, selecione o repositório que você acabou de subir no GitHub.
4. O Render deve detectar o `Dockerfile` sozinho (aparece "Docker" como runtime). Dê um nome ao serviço e clique em **Create Web Service** — não precisa preencher Build/Start Command, quem manda é o `Dockerfile` (que já roda `npm start` → `node server.js`, conforme pedido no enunciado).
   - Se preferir não usar Docker, dá pra apagar o `Dockerfile` e configurar manualmente: Runtime **Node**, Build Command `npm install`, Start Command `node server.js`.
5. Aguarde o deploy. Nos logs deve aparecer `Your service is live`.
6. O Render mostra a URL pública (ex: `https://crud-cpf.onrender.com`). Esse é o link a ser entregue na atividade.

**Importante:** o plano gratuito do Render "dorme" o serviço após um tempo de inatividade. A primeira requisição depois disso pode demorar ~30-50s para acordar — isso é normal, não é bug.

## Campos cadastrados

nome, sobrenome, email, idade, telefone, rua, bairro, cidade, estado, rg, cpf.

(O enunciado lista os campos até `rg`, mas sem `cpf` — como a atividade se chama "Busca por CPF", adicionei esse campo também, senão não tem o que buscar.)
