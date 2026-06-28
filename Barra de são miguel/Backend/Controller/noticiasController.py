from flask import Blueprint, request, jsonify
from DTO.noticiasDTO import NoticiaInsertDTO
from Service.noticiasService import NoticiaService

noticiasBlueprint = Blueprint("noticias",__name__)

service = NoticiaService()

@noticiasBlueprint.route("/noticia", methods=["POST"])
def create():
    dto = NoticiaInsertDTO(
        nome=request.form["nome"],
        local=request.form["local"]
    )

    try:

        id = service.create(dto)

        return jsonify({
            "id": id,
            "mensagem": "Notícia criada com sucesso."
        }), 201

    except ValueError as erro:

        return jsonify({
            "erro": str(erro)
        }), 400

