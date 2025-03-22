package pokemon.ps1.api.DTO.classes;

import java.util.List;
import pokemon.ps1.api.DTO.common.namedAPIResource;

public record typeRelations(
        List<namedAPIResource> no_damage_to,
        List<namedAPIResource> half_damage_to,
        List<namedAPIResource> double_damage_to,
        List<namedAPIResource> no_damage_from,
        List<namedAPIResource> half_damage_from,
        List<namedAPIResource> double_damage_from
) {}
