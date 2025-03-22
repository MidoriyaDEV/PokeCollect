package pokemon.ps1.api.DTO.common.list;

import pokemon.ps1.api.DTO.common.namedAPIResource;

public record stats(
        namedAPIResource stat,
        int base_stat
) {}