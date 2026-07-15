package lotunos.barra.Model;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="noticia")
public class ModelNoticia {
    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    @NotBlank
    @Size(min = 1, max = 100)
    private String nomeImagem;
    @Column
    @NotBlank
    private int local;
}
