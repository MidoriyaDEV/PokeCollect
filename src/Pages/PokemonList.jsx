import { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from '../api/apiService';
import themes from "../themes";
import utils from "../Utils";

const StyledMain = styled.main`
  padding: 1rem;
  background-color: ${themes.colors.background};
  color: ${themes.colors.textPrimary};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  
`;

const StyledError = styled.p`
  ${props => props.$type === 'error' ? `color: ${themes.colors.errorColor};` : `color: hsl(120,100%,50%);`}
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  font-weight: bold;

`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  gap: 1rem;

  @media (max-width: ${themes.breakpoints.desktop}) {
    justify-content: center;

  }
  
  li {
    padding: 1rem;
    border: 1px solid ${themes.colors.secondary};
    border-radius: 1rem;
    text-align: center;
    width: 250px;
    background: ${themes.colors.cardBackground};
    color: ${themes.colors.textSecondary};

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    button {
      margin-top: 0.5rem;
      padding: 0.5rem;
      background: none;
      color: ${themes.colors.textSecondary};
      border: 1px solid ${themes.colors.danger};
      border-radius: 1rem;
      ${props => props.disabled ? 'cursor: not-allowed;' : 'cursor: pointer;'}
      font-size: 1rem;
      transition: transform 0.3s ease;

      &:hover {
        background: ${themes.colors.btnHover};
        transform: scale(1.1);

      }
    }
    
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${themes.colors.primary};
  color: ${themes.colors.textPrimary};
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: transform .3s ease-in-out;

  &:hover {
    background-color: ${themes.colors.primaryHover};
    transform: scale(1.1);

  }

`;

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPokemons();

  }, []);

  useEffect(() => {
    if (pokemons.length !== 0) {
      return;

    }

    return () => {setError(''); setSuccess('')};

  }, [pokemons]);

  const fetchPokemons = () => {
    setLoading(true);
    setError('');
    api.get('/pokeapi/pokemons-registrados', {
      headers: {
        Authorization: `Bearer ${token}`
      }

    }).then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          setPokemons(data);

        }

        setLoading(false);

      })
      .catch(err => {
        console.error("Erro ao carregar pokémons:", err);
        setLoading(false);
        setError('Erro ao carregar pokémons!');

      });
  };

  const generateAndRegisterPokemons = () => {
    setLoading(true);
    setError('');
    api.post('/pokeapi/generate-register-pokemons', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }

    }).then(response => {
        setSuccess('Pokémons gerados e registrados com sucesso!');
        fetchPokemons(); 
        setLoading(false);

      })
      .catch(err => {
        console.error("Erro ao gerar e registrar pokémons:", err);
        setLoading(false);
        setError('Erro ao gerar e registrar pokémons!');

      });
  };

  const deletePokemon = (pokemonId) => {
    if (!pokemonId) {
      console.error("ID do Pokémon inválido:", pokemonId);
      setError('ID do Pokémon inválido!');
      setLoading(false);
      return;

    }

    setLoading(true);
    setError('');
  
    api.delete(`/pokeapi/delete-pokemon/${String(pokemonId)}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
        setSuccess('Pokémon deletado com sucesso!');
        fetchPokemons();
        setLoading(false);

      })
      .catch(err => {
        console.error("Erro ao deletar o pokémon:", err);
        setLoading(false);
        setError('Erro ao deletar o pokémon!');

      });
  };

  const deleteAllPokemons = () => {
    setLoading(true);
    setError('');
    api.delete('/pokeapi/delete-all-pokemons', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
        setSuccess('Todos os Pokémons foram deletados com sucesso!');
        fetchPokemons(); 
        setLoading(false);

      })
      .catch(err => {
        console.error("Erro ao deletar todos os pokémons:", err);
        setLoading(false);
        setError('Erro ao deletar todos os pokémons!');
        
      });
  };

  return (
    <StyledMain>
      <div style={{display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center'}}>
        <Button onClick={generateAndRegisterPokemons} disabled={loading}>
          {loading ? "Gerando..." : "Gerar e Registrar Pokémons"}
        </Button>
        
        <Button onClick={deleteAllPokemons} disabled={loading}>
          {loading ? "Deletando..." : "Excluir todos os Pokémons"}
        </Button>
      </div>

      <div>
        {(error || success) && <StyledError $type={error ? error : success}>{error || success}</StyledError>}
      </div>

      <StyledList>
        {pokemons.map((pokemon, index) => (
          <li key={`${pokemon.name}-${index}`}>
            <p>{utils.capitalize(pokemon.name)}</p>
            <img 
              src={pokemon.sprites && pokemon.sprites.front_default} 
              alt={`${pokemon.name} sprite`} 
            />
            <p>Combat Power: {typeof pokemon.combatPower === 'number' ? pokemon.combatPower.toFixed(2) : 'N/A'}</p>
            <button onClick={() => deletePokemon(pokemon.pokemonId)} disabled={loading}>
              Deletar
            </button>
          </li>
        ))}
      </StyledList>
    </StyledMain>
  );
};

export default PokemonList;
