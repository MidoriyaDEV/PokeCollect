package pokemon.ps1.api.DTO.classes;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import pokemon.ps1.api.DTO.PokemonDB;

import java.util.List;

@Getter
@Setter
@Entity(name = "sprites")
@Table(name = "sprites")
public class SpritesDB {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long spriteId;


    private String frontDefault;

    private String backDefault;

    @OneToMany(mappedBy = "sprite", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PokemonDB> pokemons;
}

