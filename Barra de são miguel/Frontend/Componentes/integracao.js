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
async function carregarpython(){
    try {
        // 1. Faz a chamada para a API Python (porta 6001 conforme seu código)
        const resposta = await fetch('http://localhost:6001/inicial');
        
        // 2. Transforma a resposta em texto
        const textoPython = await resposta.text();
        
        // 3. Insere no elemento com ID 'teste'
        const elemento = document.getElementById('teste');
        if (elemento) {
            elemento.innerText = textoPython.replaceAll('"', '');
        } else {
            console.warn("Aviso: O elemento com id 'teste' não foi encontrado na página.");
        }
    } catch (erro) {
        console.error('Erro ao conectar com a API Python:', erro);
    }
}



async function carregarGaleria() {
    const containerGaleria = document.getElementById('galeria-fotos');
    if (!containerGaleria) return; 

    try {
        // 1. Busca no Python APENAS a lista com os nomes e caminhos que estão no MySQL
        const resposta = await fetch('http://localhost:6001/imagens');
        const imagens = await resposta.json();

        containerGaleria.innerHTML = "";

        if (imagens.length === 0) {
            containerGaleria.innerHTML = "<p>Nenhuma imagem cadastrada ainda.</p>";
            return;
        }

        // 2. Passa por cada registro do banco
        imagens.forEach(img => {
            const tagImg = document.createElement('img');
    
    // Se 'img.caminho_arquivo' deu undefined, significa que os dados vieram por posição.
    // No nosso banco, a ordem das colunas é: 0: id, 1: nome_arquivo, 2: caminho_arquivo
    // Portanto, usamos img[2] para o caminho e img[1] para o nome.
        const caminho = "../"+img.caminho_arquivo || img[0]; 
        const nome = img.nome_arquivo || img[4];

    tagImg.src = caminho; 
    tagImg.alt = nome;
    tagImg.className = "foto-galeria"; 

    containerGaleria.appendChild(tagImg);
        });

    } catch (erro) {
        console.error("Erro ao carregar galeria:", erro);
        containerGaleria.innerHTML = "<p>Erro ao carregar a galeria de fotos.</p>";
    }
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
    await carregarpython();
    await carregarGaleria();
}
principal();