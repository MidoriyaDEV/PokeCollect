package pokemon.ps1.api.DTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pokemon.ps1.api.DTO.common.Named_api_resource_embedded;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Moves")
public class MovesDB {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "move_id")
    private int movesid;

    private String move;
    private int accuracy;
    private int priority;
    private int power;

    @Embedded
    @AttributeOverride(name = "name", column = @Column(name = "type"))
    private Named_api_resource_embedded type;

    @ManyToOne
    @JoinColumn(name = "pokemon_id")
    private PokemonDB pokemon;

    public MovesDB(int id, String name, int power) {
        this.movesid = id;
        this.move = name;
        this.power = power;
    }

}
