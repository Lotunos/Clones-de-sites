async function carregarHtml(id, arquivo) {
    const reposta = await fetch(arquivo);
    const html = await reposta.text();
    document.getElementById(id).innerHTML = html;
}
async function carregarCss(arquivo){
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = arquivo;
    document.head.appendChild(link);
}
carregarHtml("header", "Componentes/header/header.html");
carregarHtml("footer", "Componentes/footer/footer.html");
carregarCss("Componentes/header/header.css");
carregarCss("Componentes/footer/footer.css");