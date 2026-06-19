function rota() {
    const caminho = document.getElementById('rota');
    const caminhoAtual = window.location.pathname; 
    const partes = caminhoAtual.split('/').filter(parte => parte.length > 0);
    let htmlGerado = `<span><a href="/"></a></span>`;
    let caminhoAcumulado = '';
    partes.forEach((parte, index) => {
    caminhoAcumulado += `/${parte}`;
    
    // Decodifica a URL e troca traços/underlines por espaços
    let nomeFormatado = decodeURIComponent(parte).replace(/[-_]/g, ' ');

    // Compara em minúsculo para evitar erros se a URL variar
    if (nomeFormatado.toLowerCase() !== 'barra de são miguel') {
        
        // Capitaliza a primeira letra e adiciona a barra no final
        nomeFormatado = "/"+nomeFormatado.charAt(0).toUpperCase() + nomeFormatado.slice(1) + "/";
        
        // Alimenta a string do HTML
        htmlGerado += `<span><a href="${caminhoAcumulado}">${nomeFormatado}</a></span>`;
    }
});

    caminho.innerHTML = htmlGerado;
}

window.onload = rota();