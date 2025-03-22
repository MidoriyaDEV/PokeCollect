package pokemon.ps1.api.DTO;
import pokemon.ps1.api.DTO.common.list.stats;
import pokemon.ps1.api.DTO.classes.sprites;
import pokemon.ps1.api.DTO.common.list.typePokemon;
import java.util.List;

public record PokemonResponseDTO(
        int pokemonId,
        String name,
        sprites sprites,
        List<stats> stats,
        List<typePokemon> types,
        List<MovesDTO> moves
) {}
