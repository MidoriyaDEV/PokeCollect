package pokemon.ps1.api.DTO.common.list;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import pokemon.ps1.api.DTO.PokemonDB;
import pokemon.ps1.api.DTO.common.Named_api_resource_embedded;


import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@Entity
@Table(name = "pokemon_types")
public class Pokemon_Types implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "pokemon_id", nullable = false)
    private PokemonDB pokemon;

    private int slot;

 @Embedded
 Named_api_resource_embedded name;
}
