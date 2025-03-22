package pokemon.ps1.api;


import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pokemon.ps1.api.DTO.*;
import pokemon.ps1.api.DTO.common.list.PokemonMoves;

import java.util.List;


@Service
public class Consume {

    private final String API_URL;
    private final RestTemplate restTemplate;
    @Autowired
    public Consume(RestTemplate restTemplate, @Value("${pokeapi.base-uri}") String baseUri) {
        this.restTemplate = restTemplate;
        this.API_URL = baseUri;
    }

    public PokemonDTO getPokemon(@NotNull String name) {
        String url = API_URL + "/pokemon/" + name.toLowerCase();
        return restTemplate.getForObject(url, PokemonDTO.class);
    }

    public MovesDTO getMoves(@NotNull String name) {
        String url = API_URL + "/move/" + name.toLowerCase();
        return restTemplate.getForObject(url, MovesDTO.class);
    }
    public List<PokemonMoves> getPokemonMoves(String pokemonId) {
        String url = API_URL + "/pokemon/" + pokemonId + "/moves";

        PokemonDTO pokemonMoves = restTemplate.getForObject(url, PokemonDTO.class);
        return pokemonMoves.moves();
    }

}
