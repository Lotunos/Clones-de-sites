import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Permite que o frontend em outro servidor acesse esta API
CORS(app)

# Defina aqui a pasta onde as imagens serão salvas
PASTA_DESTINO = "imagens_recebidas"

@app.route('/upload', methods=['POST'])
def upload_imagem():
    # Verifica se o arquivo foi enviado na requisição
    if 'imagem' not in request.files:
        return jsonify({"erro": "Nenhuma imagem enviada"}), 400
    
    arquivo = request.files['imagem']
    
    if arquivo.filename == '':
        return jsonify({"erro": "Nome do arquivo vazio"}), 400

    # Define o caminho completo e salva o arquivo
    caminho_final = os.path.join(PASTA_DESTINO, arquivo.filename)
    arquivo.save(caminho_final)
    
    return jsonify({"sucesso": f"Imagem salva com sucesso em {caminho_final}!"}), 200

if __name__ == '__main__':
    # Cria a pasta caso você mude de ideia, mas o foco é rodar o servidor na porta 5000
    if not os.path.exists(PASTA_DESTINO):
        os.makedirs(PASTA_DESTINO)
        
    app.run(host='localhost',port=6001, debug=True)