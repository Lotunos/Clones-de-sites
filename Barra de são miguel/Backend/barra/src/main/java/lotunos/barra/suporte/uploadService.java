package lotunos.barra.suporte;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class uploadService {
    private pastaRaiz pastaRaiz;
    private uploadService(pastaRaiz pastaRaiz){
        this.pastaRaiz = pastaRaiz;
    }
    public Path salvarImagem(MultipartFile arquivo, String pasta, char local) throws IOException {
        int valor = Character.getNumericValue(local);
        if( valor<1 || valor>8){
            throw  new IllegalArgumentException("Tentativa de inserir dados inválidos");
        }
        Path raiz = Paths.get("").toAbsolutePath();
        Path uploads = raiz.resolve(pastaRaiz.getRaiz());
        Path diretorio = uploads.resolve(pasta);
        if(valor>=1 && valor<=8){
            diretorio = diretorio.resolve(String.valueOf(local));
        }
        Files.createDirectories(diretorio);
        Path destino = diretorio.resolve(arquivo.getOriginalFilename());
        arquivo.transferTo(destino);
        return destino;
    }
}
