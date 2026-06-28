import DAO.conectarDAO;
from DTO.noticiasDTO import NoticiaInsertDTO;

class NoticiaDAO: 
    def create(self, noticia: NoticiaInsertDTO):
        sql = """ insert into noticias (nome,caminho,local)
        values (%s,%s,%s)"""
        conectar = DAO.conectarDAO.conectar_banco()
        cursor = conectar.cursor()
        cursor.execute(
            sql,(
                noticia.nome,
                noticia.caminho,
                noticia.local
            )
        )
        cursor.commit()
        return cursor.lastrowid
