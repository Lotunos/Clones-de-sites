package lotunos.barra.DAO;

import lotunos.barra.Model.noticiaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  noticiaDAO extends JpaRepository<noticiaModel, Integer>{

}
