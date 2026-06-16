async function carregarComponente(id, arquivo) {
    const resposta = await fetch(arquivo);
    const html = await resposta.text();

    document.getElementById(id).innerHTML = html;
}

carregarComponente("header", "componentes/header.html");
carregarComponente("footer", "componentes/footer.html");