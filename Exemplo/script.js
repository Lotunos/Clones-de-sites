document.getElementById('btnEnviar').addEventListener('click', async () => {
    const inputImagem = document.getElementById('inputImagem');
    const mensagem = document.getElementById('mensagem');
    
    // Verifica se o usuário de fato selecionou um arquivo
    if (inputImagem.files.length === 0) {
        mensagem.style.color = 'red';
        mensagem.innerText = 'Por favor, selecione uma imagem primeiro.';
        return;
    }

    const arquivo = inputImagem.files[0];
    
    // O segredo aqui é usar o FormData para simular um envio de formulário multipart/form-data
    const formData = new FormData();
    formData.append('imagem', arquivo); // O nome 'imagem' deve ser o mesmo que o Flask espera

    mensagem.style.color = 'blue';
    mensagem.innerText = 'Enviando...';

    try {
        // Altere a URL caso sua API Flask esteja rodando em outro IP/Porta
        const resposta = await fetch('http://localhost:6001/upload', {
            method: 'POST',
            body: formData
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            mensagem.style.color = 'green';
            mensagem.innerText = resultado.sucesso;
        } else {
            mensagem.style.color = 'red';
            mensagem.innerText = `Erro: ${resultado.erro}`;
        }

    } catch (erro) {
        mensagem.style.color = 'red';
        mensagem.innerText = 'Não foi possível conectar ao servidor Python.';
        console.error(erro);
    }
});