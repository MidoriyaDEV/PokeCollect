package pokemon.ps1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pokemon.ps1.api.DTO.PokemonDB;
import pokemon.ps1.api.DTO.common.list.Pokemon_Types;

import java.util.List;

public interface PokemonTypesrepo  extends JpaRepository<Pokemon_Types,Long> {
    List<Pokemon_Types> findBypokemon(PokemonDB pokemon);
}
