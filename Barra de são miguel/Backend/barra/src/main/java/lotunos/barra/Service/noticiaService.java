package lotunos.barra.Service;

import lotunos.barra.DAO.noticiaDAO;
import lotunos.barra.DTO.noticiaDTO;
import lotunos.barra.Model.noticiaModel;
import org.springframework.stereotype.Service;

@Service
public class noticiaService {

    private noticiaDAO noticiaDAO;
    public noticiaService(noticiaDAO noticiaDAO){
        this.noticiaDAO = noticiaDAO;
    }
    public void criarNoticia(noticiaDTO dto){
        noticiaModel noticia = new noticiaModel();
        noticia.setNome_Arquivo(dto.getNome_Arquivo());
        noticia.setLocal(dto.getLocal());
        noticiaDAO.save(noticia);
    }

}
