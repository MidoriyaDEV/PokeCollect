package pokemon.ps1.api.DTO;

import pokemon.ps1.api.DTO.common.namedAPIResource;

public record MovesDTO(
        int id,
        String name,
        int acurracy,
        int priority,
        int power,
        namedAPIResource type
) {

}
