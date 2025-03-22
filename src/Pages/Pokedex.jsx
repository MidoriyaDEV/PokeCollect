import { useState, useEffect } from "react";
import "../css/style.css";

function Pokedex() {
  const [pokemonName, setPokemonName] = useState("Loading...");
  const [pokemonNumber, setPokemonNumber] = useState("");
  const [pokemonImage, setPokemonImage] = useState("");
  const [searchPokemon, setSearchPokemon] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const fetchPokemon = async (pokemon) => {
    try {
      const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;

      }

      return null;

    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      return null;

    }

  };

  const renderPokemon = async (pokemon) => {
    setPokemonName("Loading...");
    setPokemonNumber("");
    setPokemonImage("");

    const data = await fetchPokemon(pokemon);

    if (data) {
      setPokemonName(data.name);
      setPokemonNumber(data.id);
      setPokemonImage(
        data.sprites?.versions["generation-v"]["black-white"]?.animated?.front_default || ""
      );
      setSearchPokemon(data.id);

    } else {
      setPokemonName("Pokemon não encontrado!");
      setPokemonNumber("");
      setPokemonImage("");

    }

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      renderPokemon(inputValue.toLowerCase());

    }

  };

  const handlePrevClick = () => {
    if (searchPokemon > 1) {
      setSearchPokemon((prev) => prev - 1);

    }

  };

  const handleNextClick = () => {
    setSearchPokemon((prev) => prev + 1);

  };

  useEffect(() => {
    renderPokemon(searchPokemon);

  }, [searchPokemon]);

  return (
    <main className="main">
      <section className="pokedex-section">
        <img
          src={pokemonImage || "/src/assets/pokedex.png"}
          alt="pokemon"
          className="pokemon__image"
          style={{ display: pokemonImage ? "block" : "none" }}
        />

        <h1 className="pokemon__data">
          <span className="pokemon__number">{pokemonNumber}</span> -{" "}
          <span className="pokemon__name">{pokemonName}</span>
        </h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="search"
            className="input__search"
            placeholder="Name or Number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
        </form>

        <div className="buttons">
          <button className="button btn-prev" onClick={handlePrevClick}>
            Prev &lt;
          </button>
          <button className="button btn-next" onClick={handleNextClick}>
            Next &gt;
          </button>
        </div>

        <img src="/src/assets/pokedex.png" alt="pokedex" className="pokedex" />
      </section>
    </main>
  );
}

export default Pokedex;
