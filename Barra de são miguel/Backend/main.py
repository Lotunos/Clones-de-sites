import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import mysql.connector # Importa o conector do MySQL
from flask import send_from_directory


app = Flask(__name__)
CORS(app)

# Configura a pasta onde as imagens físicas vão ficar salvas
PASTA_UPLOADS = 'uploads'
if not os.path.exists(PASTA_UPLOADS):
    os.makedirs(PASTA_UPLOADS)

app.config['UPLOAD_FOLDER'] = PASTA_UPLOADS

# Função auxiliar para conectar ao MySQL do WampServer
def conectar_banco():
    return mysql.connector.connect(
        host="localhost",
        user="root",          # Usuário padrão do WampServer
        password="",          # Senha padrão do WampServer (vazia)
        database="barra de sao miguel" # O nome exato do seu banco
    )
inicil = "Teste python"
@app.route('/inicial', methods=['GET'])
def incial():
    return jsonify(inicil)

@app.route('/uploads/<filename>')
def servindo_arquivo(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Rota que o seu JavaScript vai chamar
@app.route('/upload', methods=['POST'])
def upload_imagem():
    # 1. Validações básicas do arquivo enviado
    if 'foto' not in request.files:
        return jsonify({"erro": "Nenhum arquivo enviado"}), 400
    
    arquivo = request.files['foto']
    
    if arquivo.filename == '':
        return jsonify({"erro": "Nome do arquivo vazio"}), 400

    if arquivo:
        # 2. Salva o arquivo físico na pasta local 'uploads'
        nome_seguro = secure_filename(arquivo.filename)
        caminho_final = os.path.join(app.config['UPLOAD_FOLDER'], nome_seguro)
        arquivo.save(caminho_final)
        
        # 3. Conecta ao WampServer e insere os dados na tabela
        try:
            conexao = conectar_banco()
            cursor = conexao.cursor()
            
            # O comando SQL usando a tabela e colunas que definimos
            comando_sql = "INSERT INTO noticias (nome, caminho) VALUES (%s, %s)"
            valores = (nome_seguro, caminho_final)
            
            cursor.execute(comando_sql, valores)
            conexao.commit() # Salva as alterações no banco
            
            cursor.close()
            conexao.close()
            
            return jsonify({"mensagem": "Imagem salva com sucesso no MySQL!", "caminho": caminho_final}), 201
            
        except mysql.connector.Error as erro:
            return jsonify({"erro": f"Erro no banco de dados: {erro}"}), 500

@app.route('/imagens', methods=['GET'])
def listar_imagens():
    try:
        conexao = conectar_banco()
        cursor = conexao.cursor(dictionary=True) # dictionary=True faz o resultado vir como um dicionário do Python
        
        # Busca todas as imagens ordando da mais recente para a mais antiga
        cursor.execute("SELECT * FROM noticias ORDER BY id DESC")
        resultados = cursor.fetchall()
        
        cursor.close()
        conexao.close()
        
        # Retorna a lista de imagens para o Front-end
        return jsonify(resultados), 200
        
    except mysql.connector.Error as erro:
        return jsonify({"erro": f"Erro ao buscar imagens: {erro}"}), 500

app.run(port=6001, debug=True)