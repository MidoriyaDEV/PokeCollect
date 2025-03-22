package pokemon.ps1.api.DTO.common.list;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import pokemon.ps1.api.DTO.common.Named_api_resource_embedded;
import pokemon.ps1.api.DTO.PokemonDB;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@Entity
@Table(name = "pokemon_stat")
public class Pokemon_stat implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long statsid;

    @Embedded
    private Named_api_resource_embedded stat_name;

    @ManyToOne
    @JoinColumn(name = "pokemon_id",  nullable = false)
    private PokemonDB pokemon;

    private int baseStat;
}
