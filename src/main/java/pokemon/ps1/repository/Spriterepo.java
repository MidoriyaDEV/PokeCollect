package pokemon.ps1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pokemon.ps1.api.DTO.classes.SpritesDB;

@Repository
public interface Spriterepo extends JpaRepository<SpritesDB, Long> {
     SpritesDB findByFrontDefault(String frontDefault);
}
