package pokemon.ps1.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import pokemon.ps1.api.DTO.PokemonDTO;

@Component
public class combatPowerCalculator {

    @Autowired
    private  Consume consume;

    public int calculateCombatPower(String pokemonName) {
        PokemonDTO pokemonData = consume.getPokemon(pokemonName);

        int baseAtk = pokemonData.stats().stream()
                .filter(stat -> "attack".equals(stat.stat().name()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Attack stat not found"))
                .base_stat();

        int baseDef = pokemonData.stats().stream()
                .filter(stat -> "defense".equals(stat.stat().name()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Defense stat not found"))
                .base_stat();

        int baseSta = pokemonData.stats().stream()
                .filter(stat -> "hp".equals(stat.stat().name()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("HP stat not found"))
                .base_stat();

        double cpMultiplier = 0.709;

        double combatPower = (baseAtk) * Math.sqrt(baseDef) * Math.sqrt(baseSta) * Math.pow(cpMultiplier, 2) / 10;

        return (int) combatPower;
    }
}