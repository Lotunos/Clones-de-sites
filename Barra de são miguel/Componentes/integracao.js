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
async function carregarJs(arquivo){
    const script = document.createElement("script");
    script.src = arquivo;
    document.head.appendChild(script);
}
async function principal(){
    await carregarHtml("header", "Componentes/header/header.html");
    await carregarHtml("footer", "Componentes/footer/footer.html");
    await carregarCss("Componentes/header/header.css");
    await carregarCss("Componentes/footer/footer.css");
    await carregarJs("Componentes/header/rota.js");
    if(window.FB){
        FB.XFBML.parse(document.getElementById("footer"));
    }
}
principal();