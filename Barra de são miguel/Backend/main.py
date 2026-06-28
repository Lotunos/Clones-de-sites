import os
from flask import Flask, request, jsonify
from flask_cors import CORS 
from Controller.noticiasController import noticiasBlueprint

app = Flask(__name__)
CORS(app)

diretorio = os.path.dirname(os.path.abspath(__file__));
app.config['UPLOAD'] = {
     "noticias": os.path.join(diretorio,"Banco","Noticias")
}

app.register_blueprint(noticiasBlueprint)
if __name__ == "__main__":
    app.run(host="localhost",port=6001, debug=True)