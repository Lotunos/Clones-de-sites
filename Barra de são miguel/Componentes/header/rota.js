function rota() {
    const caminho = document.getElementById('rota');
    const caminhoAtual = window.location.pathname; 
    const partes = caminhoAtual.split('/').filter(parte => parte.length > 0);
    let htmlGerado = `<span><a href="/"></a></span>`;
    let caminhoAcumulado = '';
    partes.forEach((parte, index) => {
        caminhoAcumulado += `/${parte}`;
        let nomeFormatado = decodeURIComponent(parte).replace(/[-_]/g, ' ');
        nomeFormatado = nomeFormatado.charAt(0).toUpperCase() + nomeFormatado.slice(1) + "/";
        htmlGerado += `<span><a href="${caminhoAcumulado}">${nomeFormatado}</a></span>`;
    });

    caminho.innerHTML = htmlGerado;
}

window.onload = rota();