const API_URL = "/pessoas";

const tabelaContainer = document.getElementById("tabelaContainer");
const mensagem = document.getElementById("mensagem");
const inputBusca = document.getElementById("buscaCpf");
const btnBuscar = document.getElementById("btnBuscar");
const btnLimpar = document.getElementById("btnLimpar");

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `msg show ${tipo}`;
  setTimeout(() => mensagem.classList.remove("show"), 3500);
}

function renderizarTabela(pessoas) {
  if (!pessoas || pessoas.length === 0) {
    tabelaContainer.innerHTML = `<p class="empty">Nenhum registro encontrado.</p>`;
    return;
  }

  const linhas = pessoas
    .map(
      (p) => `
      <tr>
        <td>${p.id}</td>
        <td>${p.nome} ${p.sobrenome}</td>
        <td>${p.email}</td>
        <td>${p.idade}</td>
        <td>${p.telefone}</td>
        <td>${p.cidade}/${p.estado}</td>
        <td>${p.cpf || "-"}</td>
        <td>${p.rg || "-"}</td>
        <td class="row-actions">
          <a href="../put/index.html?cpf=${encodeURIComponent(p.cpf || "")}">
            <button type="button" class="btn-secondary">Editar</button>
          </a>
          <a href="../delete/index.html?cpf=${encodeURIComponent(p.cpf || "")}">
            <button type="button" class="btn-danger">Excluir</button>
          </a>
        </td>
      </tr>`
    )
    .join("");

  tabelaContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Idade</th>
          <th>Telefone</th>
          <th>Cidade/UF</th>
          <th>CPF</th>
          <th>RG</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>${linhas}</tbody>
    </table>
  `;
}

async function carregarTodos() {
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error("Falha ao buscar registros");
    const dados = await resp.json();
    renderizarTabela(dados);
  } catch (erro) {
    mostrarMensagem(erro.message, "error");
    tabelaContainer.innerHTML = `<p class="empty">Erro ao carregar dados.</p>`;
  }
}

async function buscarPorCpf(cpf) {
  try {
    const resp = await fetch(`${API_URL}?cpf=${encodeURIComponent(cpf)}`);
    if (!resp.ok) throw new Error("Falha na busca");
    const dados = await resp.json();
    renderizarTabela(dados);
    if (dados.length === 0) mostrarMensagem("Nenhuma pessoa encontrada com esse CPF.", "error");
  } catch (erro) {
    mostrarMensagem(erro.message, "error");
  }
}

btnBuscar.addEventListener("click", () => {
  const cpf = inputBusca.value.trim();
  if (!cpf) {
    carregarTodos();
    return;
  }
  buscarPorCpf(cpf);
});

inputBusca.addEventListener("keyup", (e) => {
  if (e.key === "Enter") btnBuscar.click();
});

btnLimpar.addEventListener("click", () => {
  inputBusca.value = "";
  carregarTodos();
});

carregarTodos();
