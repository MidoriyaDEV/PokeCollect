package pokemon.ps1.api.DTO;


import pokemon.ps1.api.DTO.classes.sprites;
import pokemon.ps1.api.DTO.common.list.*;

import java.util.List;

public record PokemonDTO(
        int pokemonId,
        String name,
        sprites sprites,
        List<stats> stats,
        List<PokemonMoves> moves,
        List<typePokemon> types
        ) {}