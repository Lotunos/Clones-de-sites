package lotunos.barra.Model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="noticia")
public class noticiaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_Noticia;
    @Column(name="nome_Arquivo")
    @NotNull
    @Size(max=100)
    private String nome_Arquivo;
    @Column(name="local")
    @NotNull
    private byte local;
}
