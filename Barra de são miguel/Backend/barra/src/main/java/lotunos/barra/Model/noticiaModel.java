package lotunos.barra.Model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="noticia")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
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
