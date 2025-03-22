package pokemon.ps1.api.DTO.common.list;

import pokemon.ps1.api.DTO.common.namedAPIResource;

public record typePokemon(
        namedAPIResource type,
        int slot
) {}