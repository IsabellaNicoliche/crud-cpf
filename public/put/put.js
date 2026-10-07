const API_URL = "/pessoas";

const inputBusca = document.getElementById("buscaCpf");
const btnBuscar = document.getElementById("btnBuscar");
const form = document.getElementById("formEdicao");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `msg show ${tipo}`;
  setTimeout(() => mensagem.classList.remove("show"), 3500);
}

function preencherFormulario(p) {
  document.getElementById("id").value = p.id;
  document.getElementById("nome").value = p.nome;
  document.getElementById("sobrenome").value = p.sobrenome;
  document.getElementById("email").value = p.email;
  document.getElementById("idade").value = p.idade;
  document.getElementById("telefone").value = p.telefone;
  document.getElementById("cpf").value = p.cpf || "";
  document.getElementById("rg").value = p.rg || "";
  document.getElementById("rua").value = p.rua;
  document.getElementById("bairro").value = p.bairro;
  document.getElementById("cidade").value = p.cidade;
  document.getElementById("estado").value = p.estado;
  form.style.display = "grid";
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
      form.style.display = "none";
      return;
    }

    preencherFormulario(dados[0]);
  } catch (erro) {
    mostrarMensagem(erro.message, "error");
  }
}

btnBuscar.addEventListener("click", () => buscarPorCpf(inputBusca.value.trim()));

// Comunicação entre páginas: se veio da listagem (GET) com ?cpf=..., já busca e preenche
const parametros = new URLSearchParams(window.location.search);
const cpfDaUrl = parametros.get("cpf");
if (cpfDaUrl) {
  inputBusca.value = cpfDaUrl;
  buscarPorCpf(cpfDaUrl);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;

  const pessoaAtualizada = {
    nome: document.getElementById("nome").value.trim(),
    sobrenome: document.getElementById("sobrenome").value.trim(),
    email: document.getElementById("email").value.trim(),
    idade: Number(document.getElementById("idade").value),
    telefone: document.getElementById("telefone").value.trim(),
    cpf: document.getElementById("cpf").value.trim(),
    rg: document.getElementById("rg").value.trim(),
    rua: document.getElementById("rua").value.trim(),
    bairro: document.getElementById("bairro").value.trim(),
    cidade: document.getElementById("cidade").value.trim(),
    estado: document.getElementById("estado").value.trim().toUpperCase(),
  };

  try {
    const resp = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pessoaAtualizada),
    });

    if (!resp.ok) throw new Error("Erro ao atualizar registro");

    mostrarMensagem("Registro atualizado com sucesso! Redirecionando para a listagem...", "success");
    setTimeout(() => {
      window.location.href = "../get/index.html";
    }, 1200);
  } catch (erro) {
    mostrarMensagem(erro.message, "error");
  }
});
