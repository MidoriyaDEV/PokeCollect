package pokemon.ps1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pokemon.ps1.api.DTO.MovesDB;
import pokemon.ps1.api.DTO.PokemonDB;

import java.util.Optional;

public interface Movesrepo extends JpaRepository<MovesDB, Integer> {
    MovesDB findByMovesid(Integer movesid);

    MovesDB findByMoveAndPokemon(String move, PokemonDB pokemon);
}


