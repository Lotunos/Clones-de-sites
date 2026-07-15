package lotunos.barra.DTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NoticiaDTO {
    @NotNull
    @Size(max=100)
    private String nome_Arquivo;
    @NotNull
    private byte local;
}
