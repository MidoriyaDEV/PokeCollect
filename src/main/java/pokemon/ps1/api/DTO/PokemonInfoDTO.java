package pokemon.ps1.api.DTO;
import pokemon.ps1.api.DTO.classes.SpriteFirst;


public record PokemonInfoDTO(
        int pokemonid,
        String name,
        SpriteFirst sprites,
        Double combatPower
) {}

