// Aguarda o botão ser clicado para rodar a função
document.getElementById('btn-enviar').addEventListener('click', async () => {
    const inputElement = document.getElementById('campo-foto');
    const statusElement = document.getElementById('status');
    const botao = document.getElementById('btn-enviar');

    // 1. Verifica se o usuário realmente escolheu um arquivo
    if (inputElement.files.length === 0) {
        statusElement.innerText = "Por favor, selecione uma imagem!";
        statusElement.style.color = "red";
        return;
    }

    // 2. Captura o arquivo de imagem
    const arquivo = inputElement.files[0];

    // 3. Cria o objeto FormData (Formulário Virtual) para carregar o arquivo binário
    const dadosFormulario = new FormData();
    // O nome 'foto' precisa ser idêntico ao request.files['foto'] do Python!
    dadosFormulario.append('foto', arquivo);

    // Mudança visual de "carregando"
    botao.innerText = "Enviando...";
    botao.disabled = true;
    statusElement.innerText = "";

    try {
        // 4. Faz a chamada POST para a sua API Flask
        const resposta = await fetch('http://localhost:6001/noticia', {
            method: 'POST',
            body: dadosFormulario // O navegador configura o Header correto de arquivo automaticamente
        });

        // Transforma a resposta do Python em JSON
        const dadosResposta = await resposta.json();

        // 5. Verifica se o Python salvou com sucesso (Status 201)
        if (resposta.ok) {
            statusElement.innerText = "✅ " + dadosResposta.mensagem;
            statusElement.style.color = "green";
            inputElement.value = ""; // Limpa o campo de seleção de foto
        } else {
            // Mostra o erro que o Python retornou (ex: erro no banco)
            statusElement.innerText = "❌ Erro: " + dadosResposta.erro;
            statusElement.style.color = "red";
        }

    } catch (erro) {
        // Se a API Python estiver desligada, o código cai aqui
        console.error("Erro na conexão com a API:", erro);
        statusElement.innerText = "❌ Não foi possível conectar ao servidor Python.";
        statusElement.style.color = "red";
    } finally {
        // Devolve o botão ao estado normal
        botao.innerText = "Enviar para o Banco";
        botao.disabled = false;
    }
});