const API_URL = "/pessoas";

const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `msg show ${tipo}`;
  setTimeout(() => mensagem.classList.remove("show"), 3500);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const novaPessoa = {
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
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaPessoa),
    });

    if (!resp.ok) throw new Error("Erro ao cadastrar registro");

    mostrarMensagem("Registro cadastrado com sucesso! Redirecionando para a listagem...", "success");
    form.reset();
    setTimeout(() => {
      window.location.href = "../get/index.html";
    }, 1200);
  } catch (erro) {
    mostrarMensagem(erro.message, "error");
  }
});
