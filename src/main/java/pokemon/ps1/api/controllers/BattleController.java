package pokemon.ps1.api.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pokemon.ps1.api.Consume;
import pokemon.ps1.api.DTO.MovesDTO;
import pokemon.ps1.api.DTO.PokemonDB;
import pokemon.ps1.api.DTO.PokemonResponseDTO;
import pokemon.ps1.api.DTO.classes.sprites;
import pokemon.ps1.api.DTO.common.list.stats;
import pokemon.ps1.api.DTO.common.list.typePokemon;
import pokemon.ps1.api.PokemonService;
import pokemon.ps1.repository.PokemonStatrepo;
import pokemon.ps1.repository.PokemonTypesrepo;
import pokemon.ps1.repository.Pokerepo;
import pokemon.ps1.repository.UserRepo;
import pokemon.ps1.security.TokenService;
import pokemon.ps1.users.User;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pokeapi/")
public class BattleController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private Consume consume;

    @Autowired
    private PokemonService pokemonService;

    @Autowired
    private Pokerepo pokerepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PokemonStatrepo pokemonStatrepo;

    @Autowired
    private PokemonTypesrepo pokemonTypesrepo;

    @Autowired
    private PowerAndName powerAndName;

    @GetMapping("/usuario-pokemon")
    public ResponseEntity getUserPokemons(HttpServletRequest request) {
        String token = powerAndName.extractToken(request);
        String userLogin = tokenService.validateToken(token);
        User currentUser = userRepo.findByLogin(userLogin);

        List<PokemonDB> userPokemons = currentUser.getPokemons();
        if (userPokemons.size() < 2) {
           return new ResponseEntity<>("O usuário autenticado não tem Pokémon suficientes.", HttpStatus.BAD_REQUEST);
        }

        Collections.shuffle(userPokemons);
        List<PokemonDB> selectedUserPokemons = userPokemons.subList(0, 2);

        PokemonResponseDTO pokemon1 = convertPokemonToResponseDTO(selectedUserPokemons.get(0), true);
        PokemonResponseDTO pokemon2 = convertPokemonToResponseDTO(selectedUserPokemons.get(1), true);

        Map<String, ResponseEntity<PokemonResponseDTO>> response = new HashMap<>();
        response.put("pokemon1", new ResponseEntity<>(pokemon1, HttpStatus.OK));
        response.put("pokemon2", new ResponseEntity<>(pokemon2, HttpStatus.OK));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/desafio-pokemon")
    public ResponseEntity getRandomOpponentPokemons(HttpServletRequest request) {
        String token = powerAndName.extractToken(request);
        String userLogin = tokenService.validateToken(token);
        User currentUser = userRepo.findByLogin(userLogin);

        List<User> allUsers = userRepo.findAll();
        allUsers.remove(currentUser);
        if (allUsers.isEmpty()) {
            throw new RuntimeException("Nenhum outro usuário encontrado.");
        }

        Random random = new Random();
        User randomOpponent = allUsers.get(random.nextInt(allUsers.size()));
        List<PokemonDB> opponentPokemons = randomOpponent.getPokemons();
        if (opponentPokemons.size() < 2) {
            throw new RuntimeException("O adversário selecionado não tem Pokémon suficientes.");
        }

        Collections.shuffle(opponentPokemons);
        List<PokemonDB> selectedOpponentPokemons = opponentPokemons.subList(0, 2);

        PokemonResponseDTO pokemon1 = convertPokemonToResponseDTO(selectedOpponentPokemons.get(0), false);
        PokemonResponseDTO pokemon2 = convertPokemonToResponseDTO(selectedOpponentPokemons.get(1), false);

        Map<String, ResponseEntity<PokemonResponseDTO>> response = new HashMap<>();
        response.put("pokemon1", new ResponseEntity<>(pokemon1, HttpStatus.OK));
        response.put("pokemon2", new ResponseEntity<>(pokemon2, HttpStatus.OK));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private PokemonResponseDTO convertPokemonToResponseDTO(PokemonDB pokemon, boolean isUserPokemon) {
        List<MovesDTO> pokemonMovesDTO = pokemon.getMoves().stream()
                .map(pokemonService::convertToMovesDTO)
                .limit(4)
                .collect(Collectors.toList());

        List<stats> pokemonStatsDTO = pokemon.getStats().stream()
                .map(stat -> new stats(pokemonService.convertToDTO(stat.getStat_name()), stat.getBaseStat()))
                .collect(Collectors.toList());

        return new PokemonResponseDTO(
                pokemon.getPokemonId(),
                pokemon.getName(),
                new sprites(
                         pokemon.getSprite().getFrontDefault(),
                         pokemon.getSprite().getBackDefault()
                ),
                pokemonStatsDTO,
                pokemon.getTypes().stream()
                        .map(type -> new typePokemon(pokemonService.convertToDTO(type.getName()), type.getSlot()))
                        .toList(),
                pokemonMovesDTO
        );
    }
}
