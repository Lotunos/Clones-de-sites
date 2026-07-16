package lotunos.barra.Service;

import jakarta.transaction.Transactional;
import lotunos.barra.DAO.noticiaDAO;
import lotunos.barra.DTO.noticiaDTO;
import lotunos.barra.Model.noticiaModel;
import lotunos.barra.suporte.uploadService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class noticiaService {

    private noticiaDAO noticiaDAO;
    private uploadService upload;
    public noticiaService(noticiaDAO noticiaDAO, uploadService upload){
        this.noticiaDAO = noticiaDAO;
        this.upload = upload;
    }
    @Transactional
    public void criarNoticia(noticiaDTO dto, MultipartFile arquivo) throws IOException {
        Path caminho = null;
        noticiaModel noticia = new noticiaModel();
        try {
            caminho = upload.salvarImagem(arquivo,"noticia",dto.getLocal());
            noticia.setNome_Arquivo(dto.getNome_Arquivo());
            noticia.setLocal(dto.getLocal());
            noticia.setCaminhoArquivo(dto.getCaminhoArquivo());
            noticiaDAO.save(noticia);
        } catch(Exception e){
                if (caminho != null) {
                    Files.deleteIfExists(caminho);
                }

        }
    }

}
