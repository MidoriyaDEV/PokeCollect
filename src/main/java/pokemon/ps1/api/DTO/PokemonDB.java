package pokemon.ps1.api.DTO;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import pokemon.ps1.api.DTO.classes.SpritesDB;
import pokemon.ps1.api.DTO.common.list.Pokemon_Types;
import pokemon.ps1.users.User;
import pokemon.ps1.api.DTO.common.list.Pokemon_stat;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity(name = "pokemon")
@EqualsAndHashCode(of = "pokemonId")
@Table(name = "pokemon")
public class PokemonDB {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pokemonId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String name;

    @OneToMany(mappedBy = "pokemon", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Pokemon_stat> stats;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sprite_id")
    private SpritesDB sprite;

    private Double combatPower;

    @OneToMany(mappedBy = "pokemon", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    List<Pokemon_Types> types;

    @OneToMany(mappedBy = "pokemon", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MovesDB> moves = new ArrayList<>();
}
