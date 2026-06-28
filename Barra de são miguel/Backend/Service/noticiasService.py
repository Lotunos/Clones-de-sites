import os
import uuid
from flask import current_app
from werkzeug.utils import secure_filename
from DAO.noticiasDAO import NoticiaDAO
from DTO.noticiasDTO import NoticiaInsertDTO

class NoticiaService: 

    def __init__(self):
        self.dao = NoticiaDAO()

    def create (self, noticia: NoticiaInsertDTO):

        if not noticia.nome: 
            raise ValueError("Nome obrigatório")
        
        if not noticia.local:
            raise ValueError("Local obrigatório")
        
        noticia.nome = noticia.nome.strip()
        novonome = secure_filename(noticia.nome)
        extensao = os.path.splitext(novonome)[1]
        nomearquivo = f"{uuid.uuid4()}{extensao}"
        pasta = current_app.config["UPLOAD"]["noticias"]
        caminho  = os.path.join(pasta,nomearquivo)
        noticia.imagem.save(caminho)
        criar = self.dao.create(noticia)
        return criar