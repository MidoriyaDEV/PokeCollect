package pokemon.ps1.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pokemon.ps1.api.DTO.MovesDB;
import pokemon.ps1.api.DTO.MovesDTO;
import pokemon.ps1.api.DTO.PokemonDB;
import pokemon.ps1.api.DTO.PokemonDTO;
import pokemon.ps1.api.DTO.classes.SpritesDB;
import pokemon.ps1.api.DTO.common.Named_api_resource_embedded;
import pokemon.ps1.api.DTO.common.list.PokemonMoves;
import pokemon.ps1.api.DTO.common.namedAPIResource;
import pokemon.ps1.users.User;
import pokemon.ps1.repository.Pokerepo;
import pokemon.ps1.repository.Spriterepo;
import pokemon.ps1.repository.Movesrepo; 
import java.util.*;

@Service
public class PokemonService {
    @Autowired
    private Spriterepo spriteRepo;

    @Autowired
    private Pokerepo pokerepo;

    @Autowired
    private Movesrepo movesRepository;

    @Autowired
    private combatPowerCalculator combatPowerCalculator;

    @Autowired
    private Consume consume;

    public PokemonDB convertDtoToEntity(PokemonDTO pokemonDTO, User currentUser) {
        PokemonDB pokemon = new PokemonDB();
        pokemon.setPokemonId(pokemonDTO.pokemonId());
        pokemon.setName(pokemonDTO.name());
        pokemon.setUser(currentUser);

        if (pokemonDTO.sprites() != null) {
            SpritesDB sprite = spriteRepo.findByFrontDefault(pokemonDTO.sprites().front_default());

            if (sprite == null) {
                sprite = new SpritesDB();
                sprite.setFrontDefault(pokemonDTO.sprites().front_default());
                sprite.setBackDefault(pokemonDTO.sprites().back_default());
                spriteRepo.save(sprite);
            }

            pokemon.setSprite(sprite);
        }

        double combatPower = combatPowerCalculator.calculateCombatPower(pokemonDTO.name());
        pokemon.setCombatPower(combatPower);

        return pokemon;
    }

    public List<MovesDB> generateAndSavePokemonMoves(List<PokemonMoves> pokemonMovesList, int pokemonId) {
        List<MovesDB> selectedMoves = new ArrayList<>();
        Random random = new Random();

        if (pokemonMovesList == null || pokemonMovesList.isEmpty()) {
            return selectedMoves;
        }

        List<MovesDTO> moveDTOs = new ArrayList<>();


        for (PokemonMoves move : pokemonMovesList) {
            MovesDTO moveDTO = pokemonmoves(move.move().name());
            moveDTOs.add(moveDTO);
        }


        Collections.shuffle(moveDTOs, random);

        Set<String> usedMoveNames = new HashSet<>();
        
        PokemonDB pokemonEntity = pokerepo.findByPokemonId(pokemonId);
        if (pokemonEntity == null) {
            throw new IllegalArgumentException("Pokémon não encontrado para o ID: " + pokemonId);
        }

        for (MovesDTO moveDTO : moveDTOs.stream().limit(4).toList()) {
            if (usedMoveNames.contains(moveDTO.name())) {
                continue;
            }
            usedMoveNames.add(moveDTO.name());

            MovesDB moveEntity = new MovesDB();
            moveEntity.setMove(moveDTO.name());
            moveEntity.setPower(moveDTO.power());
            moveEntity.setAccuracy(moveDTO.acurracy());
            moveEntity.setPriority(moveDTO.priority());
            moveEntity.setType(new Named_api_resource_embedded(moveDTO.type().name()));
            moveEntity.setPokemon(pokemonEntity);

            movesRepository.save(moveEntity);
            selectedMoves.add(moveEntity);
        }

        return selectedMoves;
    }

    public namedAPIResource convertToDTO(Named_api_resource_embedded entity) {
        if (entity == null) return null;
        return new namedAPIResource(entity.getName());
    }

    public MovesDTO convertToMovesDTO(MovesDB move) {

        return new MovesDTO(
                move.getMovesid(),
                move.getMove(),
                move.getAccuracy(),
                move.getPriority(),
                move.getPower(),
                convertToDTO(move.getType())
        );
    }

    public MovesDTO pokemonmoves(String moveName) {
        return consume.getMoves(moveName);
    }

    }