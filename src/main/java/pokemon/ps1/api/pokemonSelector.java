package pokemon.ps1.api;

import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public class pokemonSelector {
    private static final int MAX_POKEMON_ID = 905;

    public static String[] getRandomPokemonIds() {
        Random random = new Random();
        Set<Integer> selectedIds = new HashSet<>();
        while (selectedIds.size() < 3) {
            int randomId = random.nextInt(MAX_POKEMON_ID) + 1;
            selectedIds.add(randomId);
        }
        return selectedIds.stream().map(String::valueOf).toArray(String[]::new);
    }
}