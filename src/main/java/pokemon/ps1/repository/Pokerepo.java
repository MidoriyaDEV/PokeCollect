package pokemon.ps1.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.w3c.dom.stylesheets.LinkStyle;
import pokemon.ps1.api.DTO.PokemonDB;
import pokemon.ps1.users.User;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface Pokerepo extends JpaRepository<PokemonDB, Integer> {

    PokemonDB findByPokemonId(int pokemonId);

    List<PokemonDB> findByuser(User users_id);

    PokemonDB findByPokemonIdAndUser(int pokemonid, User user);
}
