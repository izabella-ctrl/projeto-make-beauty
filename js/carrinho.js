document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // MENSAGEM AO ADICIONAR NO CARRINHO
  // =========================
  const mensagemAdd = document.getElementById("mensagem-add");

  function mostrarMensagemCarrinho(texto) {
    if (!mensagemAdd) return;

    mensagemAdd.textContent = texto;
    mensagemAdd.style.display = "block";

    setTimeout(() => {
      mensagemAdd.style.display = "none";
    }, 2000);
  }

  // =========================
  // FORMULÁRIO - MAKE IDEAL
  // =========================
  const formMake = document.getElementById("formMake");
  const resultadoMake = document.getElementById("resultado-make");

  if (formMake) {
    formMake.addEventListener("submit", (event) => {
      event.preventDefault();

      const pele = document.getElementById("pele").value;
      const ocasiao = document.getElementById("ocasiao").value;

      if (pele === "" || ocasiao === "") {
        resultadoMake.textContent = "Preencha todos os campos!";
        resultadoMake.style.color = "red";
        return;
      }

      let recomendacao = "";

      if (pele === "oleosa" && ocasiao === "dia") {
        recomendacao = "Use base matte, pó solto e produtos leves.";
      } else if (pele === "seca" && ocasiao === "noite") {
        recomendacao = "Prefira base hidratante, iluminador e produtos cremosos.";
      } else if (ocasiao === "festa") {
        recomendacao = "Aposte em olhos marcantes e fixador de maquiagem.";
      } else {
        recomendacao = "Opte por uma make leve e natural.";
      }

      resultadoMake.textContent = recomendacao;
      resultadoMake.style.color = "green";
    });
  }

  // =========================
  // CARRINHO DE COMPRAS
  // =========================
  const botoes = document.querySelectorAll(".add-to-cart");
  const btnCarrinho = document.getElementById("btn-carrinho");
  const carrinhoLateral = document.getElementById("carrinho-lateral");
  const listaCarrinho = document.getElementById("lista-carrinho");
  const totalCarrinho = document.getElementById("total-carrinho");
  const limparBtn = document.getElementById("limpar-carrinho");

  function atualizarCarrinho() {
    if (!listaCarrinho) return;

    listaCarrinho.innerHTML = "";
    let total = 0;

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.forEach((produto, index) => {
      const li = document.createElement("li");

      const precoNumero = parseFloat(
        produto.preco.replace("R$", "").replace(",", ".")
      );

      total += precoNumero;

      li.innerHTML = `
        ${produto.nome} - ${produto.preco}
        <span class="remover" data-index="${index}">❌</span>
      `;

      listaCarrinho.appendChild(li);
    });

    if (totalCarrinho) {
      totalCarrinho.textContent =
        `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
    }

    document.querySelectorAll(".remover").forEach(botao => {
      botao.addEventListener("click", () => {
        removerItem(botao.dataset.index);
      });
    });
  }

  function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
  }

  botoes.forEach(botao => {
    botao.addEventListener("click", () => {
      const produto = botao.closest(".produto-info");
      const nome = produto.querySelector("h3").innerText;
      const preco = produto.querySelector("p").innerText;

      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      carrinho.push({ nome, preco });
      localStorage.setItem("carrinho", JSON.stringify(carrinho));

      atualizarCarrinho();
      mostrarMensagemCarrinho(`"${nome}" adicionado ao carrinho 🛒`);
    });
  });

  if (btnCarrinho && carrinhoLateral) {
    btnCarrinho.addEventListener("click", () => {
      carrinhoLateral.classList.toggle("aberto");
      atualizarCarrinho();
    });
  }

  if (limparBtn) {
    limparBtn.addEventListener("click", () => {
      localStorage.removeItem("carrinho");
      atualizarCarrinho();
    });
  }

});
