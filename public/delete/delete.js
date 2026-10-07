const API_URL = "/pessoas";

const inputBusca = document.getElementById("buscaCpf");
const btnBuscar = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `msg show ${tipo}`;
  setTimeout(() => mensagem.classList.remove("show"), 3500);
}

function renderizarResultado(p) {
  resultado.innerHTML = `
    <table>
      <thead>
        <tr><th>ID</th><th>Nome</th><th>CPF</th><th>Email</th><th></th></tr>
      </thead>
      <tbody>
        <tr>
          <td>${p.id}</td>
          <td>${p.nome} ${p.sobrenome}</td>
          <td>${p.cpf || "-"}</td>
          <td>${p.email}</td>
          <td class="row-actions">
            <button class="btn-danger" id="btnExcluir">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  `;

  document.getElementById("btnExcluir").addEventListener("click", () => excluir(p.id));
}

async function buscarPorCpf(cpf) {
  if (!cpf) {
    mostrarMensagem("Informe um CPF para buscar.", "error");
    return;
  }

  try {
    const resp = await fetch(`${API_URL}?cpf=${encodeURIComponent(cpf)}`);
    if (!resp.ok) throw new Error("Erro na busca");
    const dados = await resp.json();

    if (dados.length === 0) {
      mostrarMensagem("Nenhuma pessoa encontrada com esse CPF.", "error");
      resultado.innerHTML = "";
      return;
    }

    renderizarResultado(dados[0]);
  } catch (erro) {
    mostrarMensagem(erro.message, "error");
  }
}

btnBuscar.addEventListener("click", () => buscarPorCpf(inputBusca.value.trim()));

// Comunicação entre páginas: se veio da listagem (GET) com ?cpf=..., já busca
const parametros = new URLSearchParams(window.location.search);
const cpfDaUrl = parametros.get("cpf");
if (cpfDaUrl) {
  inputBusca.value = cpfDaUrl;
  buscarPorCpf(cpfDaUrl);
}

async function excluir(id) {
  if (!confirm("Tem certeza que deseja excluir este registro?")) return;

  try {
    const resp = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!resp.ok) throw new Error("Erro ao excluir registro");

    mostrarMensagem("Registro excluído com sucesso! Redirecionando para a listagem...", "success");
    resultado.innerHTML = "";
    inputBusca.value = "";
    setTimeout(() => {
      window.location.href = "../get/index.html";
    }, 1200);
  } catch (erro) {
    mostrarMensagem(erro.message, "error");
  }
}
