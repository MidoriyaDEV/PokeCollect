package pokemon.ps1.api.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pokemon.ps1.api.DTO.MovesDTO;
import pokemon.ps1.api.DTO.PokemonDTO;
import pokemon.ps1.api.Consume;
import pokemon.ps1.api.combatPowerCalculator;
import pokemon.ps1.security.UnauthorizedException;

@RestController
@RequestMapping("/pokeapi/")
public class PowerAndName {

    @Autowired
    Consume consume;

    @Autowired
    combatPowerCalculator combatPowerCalculator;

    @GetMapping("/pokemon/{name}")
    public ResponseEntity<PokemonDTO> getPokemon(@PathVariable String name) {
        PokemonDTO pokemon = consume.getPokemon(name);
        return new ResponseEntity<>(pokemon, HttpStatus.OK);
    }

    @GetMapping("/combat-power/{pokemonName}")
    public ResponseEntity<Double> getCombatPower(@PathVariable String pokemonName) {
        double combatPower = combatPowerCalculator.calculateCombatPower(pokemonName);
        return new ResponseEntity<>(combatPower, HttpStatus.OK);
    }

    @GetMapping("/move/{name}")
    public ResponseEntity<MovesDTO> getMoves(@PathVariable String name) {
        MovesDTO moves = consume.getMoves(name);
        return new ResponseEntity<>(moves, HttpStatus.OK);
    }

     String extractToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            throw new UnauthorizedException("Token não encontrado ou formato inválido.");
        }
        return token.replace("Bearer ", "");

    }
}
