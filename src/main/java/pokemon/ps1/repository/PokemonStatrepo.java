package pokemon.ps1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pokemon.ps1.api.DTO.common.list.Pokemon_stat;

public interface PokemonStatrepo extends JpaRepository<Pokemon_stat, Long> {
    Pokemon_stat findByStatsid (Long id);
}
