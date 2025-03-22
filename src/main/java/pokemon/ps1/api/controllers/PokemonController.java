package pokemon.ps1.api.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pokemon.ps1.api.Consume;
import pokemon.ps1.api.DTO.*;
import pokemon.ps1.api.DTO.classes.SpriteFirst;
import pokemon.ps1.api.DTO.classes.SpritesDB;
import pokemon.ps1.api.DTO.common.Named_api_resource_embedded;
import pokemon.ps1.api.DTO.common.list.*;
import pokemon.ps1.api.PokemonService;
import pokemon.ps1.api.pokemonSelector;
import pokemon.ps1.repository.*;
import pokemon.ps1.security.TokenService;
import pokemon.ps1.security.UnauthorizedException;
import pokemon.ps1.users.User;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/pokeapi/")
public class PokemonController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private Consume consume;

    @Autowired
    private PokemonService pokemonService;

    @Autowired
    private pokemon.ps1.api.combatPowerCalculator combatPowerCalculator;

    @Autowired
    PowerAndName powerAndName;

    @Autowired
    private Pokerepo pokerepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PokemonStatrepo pokemonStatrepo;

    @Autowired
    private PokemonTypesrepo pokemonTypesrepo;

    @PostMapping("/generate-register-pokemons")
    public ResponseEntity generateAndRegisterPokemons(HttpServletRequest request) {

        String token = powerAndName.extractToken(request);

        String userLogin = tokenService.validateToken(token);
        if (userLogin == null) {
            throw new UnauthorizedException("Token inválido ou expirado.");
        }
        User currentUser = userRepo.findByLogin(userLogin);


        String[] randomPokemons = pokemonSelector.getRandomPokemonIds();
        List<PokemonDB> savedPokemons = new ArrayList<>();

        for (String pokemonId : randomPokemons) {

            PokemonDTO pokemonDTO = consume.getPokemon(pokemonId);


            PokemonDB pokemon = pokemonService.convertDtoToEntity(pokemonDTO, currentUser);
            pokerepo.save(pokemon);
            savedPokemons.add(pokemon);

            for (stats stat : pokemonDTO.stats()) {
                Pokemon_stat pokemonStat = new Pokemon_stat();
                Named_api_resource_embedded statName = new Named_api_resource_embedded();
                statName.setName(stat.stat().name());
                pokemonStat.setStat_name(statName);
                pokemonStat.setBaseStat(stat.base_stat());
                pokemonStat.setPokemon(pokemon);
                pokemonStatrepo.save(pokemonStat);
            }

            for (typePokemon type : pokemonDTO.types()) {
                Pokemon_Types pokemonType = new Pokemon_Types();
                pokemonType.setPokemon(pokemon);
                pokemonType.setSlot(type.slot());
                Named_api_resource_embedded typeName = new Named_api_resource_embedded();
                typeName.setName(type.type().name());
                pokemonType.setName(typeName);
                pokemonTypesrepo.save(pokemonType);
            }
        }

        for (PokemonDB pokemon : savedPokemons) {
            List<PokemonMoves> pokemonMoves = consume.getPokemon(String.valueOf(pokemon.getPokemonId())).moves();
            List<MovesDB> generatedMoves = pokemonService.generateAndSavePokemonMoves(pokemonMoves, pokemon.getPokemonId());

            pokemon.setMoves(generatedMoves);
        }

        return new ResponseEntity<>("Pokémons gerados e registrados com sucesso para o usuário: " + currentUser.getUsers_id(), HttpStatus.CREATED);
    }

    @GetMapping("/pokemons-registrados")
    public ResponseEntity getRegisteredPokemons(HttpServletRequest request) {

        String token = powerAndName.extractToken(request);

        String userLogin = tokenService.validateToken(token);
        if (userLogin == null) {
            throw new UnauthorizedException("Token inválido ou expirado.");
        }

        User currentUser = userRepo.findByLogin(userLogin);

        List<PokemonDB> registeredPokemons = pokerepo.findByuser(currentUser);

        List<PokemonInfoDTO> pokemonDTOList = new ArrayList<>();
        for (PokemonDB pokemon : registeredPokemons) {

            int id = pokemon.getPokemonId();
            String name = pokemon.getName();
            SpritesDB sprite = pokemon.getSprite();
            Double combatPower = pokemon.getCombatPower();

            PokemonInfoDTO pokemonDTO = new PokemonInfoDTO(
                    id,
                    name,
                    new SpriteFirst(sprite.getFrontDefault()),
                    combatPower
            );

            pokemonDTOList.add(pokemonDTO);
        }

        return new ResponseEntity<>(pokemonDTOList, HttpStatus.OK);
    }

    @DeleteMapping("/delete-pokemon/{pokemonId}")
    public ResponseEntity deletePokemon(@PathVariable int pokemonId, HttpServletRequest request) {
        String token = powerAndName.extractToken(request);

        String userLogin = tokenService.validateToken(token);
        if (userLogin == null) {
            throw new UnauthorizedException("Token inválido ou expirado.");
        }

        User currentUser = userRepo.findByLogin(userLogin);

        PokemonDB pokemon = pokerepo.findByPokemonIdAndUser(pokemonId, currentUser);

        pokerepo.delete(pokemon);
        return ResponseEntity.ok("Pokémon deletado com sucesso.");
    }

    @DeleteMapping("/delete-all-pokemons")
    public ResponseEntity<String> deleteAllPokemons(HttpServletRequest request) {
        String token = powerAndName.extractToken(request);

        System.out.println("Deletando todos os Pokémons do usuário");

        String userLogin = tokenService.validateToken(token);
        if (userLogin == null) {
            throw new UnauthorizedException("Token inválido ou expirado.");
        }

        User currentUser = userRepo.findByLogin(userLogin);

        List<PokemonDB> pokemons = pokerepo.findByuser(currentUser);

        if (pokemons.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum Pokémon encontrado para deletar.");
        }

        pokerepo.deleteAll(pokemons);

        return ResponseEntity.ok("Todos os Pokémons do usuário foram deletados com sucesso.");
    }
}