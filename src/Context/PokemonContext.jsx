import { createContext, useContext, useState } from 'react';
import { api } from '../api/apiService';

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
    const [turnoUsuario, setTurnoUsuario] = useState(true);
    const [resultadoBatalha, setResultadoBatalha] = useState('');
    const [pokemonsSalvos, setPokemonsSalvos] = useState({
        usuario: {
            pokemon1: JSON.parse(localStorage.getItem('pokemonUsuario1')) || null,
            pokemon2: JSON.parse(localStorage.getItem('pokemonUsuario2')) || null
        },
        oponente: {
            pokemon1: JSON.parse(localStorage.getItem('pokemonOponente1')) || null,
            pokemon2: JSON.parse(localStorage.getItem('pokemonOponente2')) || null
        }
    });
    const [pokemonUsuario, setPokemonUsuario] = useState(pokemonsSalvos.usuario.pokemon1);
    const [pokemonOponente, setPokemonOponente] = useState(pokemonsSalvos.oponente.pokemon1);
    const [pokemonErr, setpokemonErr] = useState(false);
    const [finalizado, setFinalizado] =  useState(false);

    const formatPokemon = (pokemon, isUser) => {
        const stats = pokemon.body.stats.map(stat => ({
            nome: stat.stat.name,
            valor: stat.base_stat
        }));
        
        const hpStat = stats.find(stat => stat.nome === "hp")?.valor || 100;
        
        return {
            nome: pokemon.body.name,
            hp: hpStat,
            stats,
            tipos: pokemon.body.types.map(tipo => tipo.type.name),
            ataques: pokemon.body.moves.map(move => ({
                nome: move.name,
                tipo: move.type.name, // Corrigido para acessar o tipo correto
                dano: move.power || 0,
                acuracia: move.accuracy || 100,
            })),
            sprites: {
                back_default: isUser ? pokemon.body.sprites.back_default : null,
                front_default: !isUser ? pokemon.body.sprites.front_default : null,
            }
        };
    };

    const getRandomOpponentPokemons = async () => {
        try {
            const response = await api.get('/pokeapi/desafio-pokemon');
            console.log('Resposta da API para o oponente:', response.data);
        
            if (response.data) {
                const pokemonFormatado1 = formatPokemon(response.data.pokemon1, false);
                const pokemonFormatado2 = formatPokemon(response.data.pokemon2, false);
                
                setPokemonOponente(pokemonFormatado1);
                localStorage.setItem('pokemonOponente1', JSON.stringify(pokemonFormatado1));
                localStorage.setItem('pokemonOponente2', JSON.stringify(pokemonFormatado2));
                setPokemonsSalvos(prev => ({
                    ...prev,
                    oponente: { pokemon1: pokemonFormatado1, pokemon2: pokemonFormatado2 }
                }));

            } else {
                console.error('Nenhum Pokémon encontrado para o oponente.');

            }
        } catch (error) {
            console.error('Erro ao buscar Pokémons do oponente:', error);

        }
    };

    const getUserPokemon = async () => {
        try {
            const response = await api.get('/pokeapi/usuario-pokemon');
            console.log('Resposta da API para o usuário:', response.data);
            
            if (response.data) {
                const pokemonFormatado1 = formatPokemon(response.data.pokemon1, true);
                const pokemonFormatado2 = formatPokemon(response.data.pokemon2, true);
                
                setPokemonUsuario(pokemonFormatado1);
                localStorage.setItem('pokemonUsuario1', JSON.stringify(pokemonFormatado1));
                localStorage.setItem('pokemonUsuario2', JSON.stringify(pokemonFormatado2));
                setPokemonsSalvos(prev => ({
                    ...prev,
                    usuario: { pokemon1: pokemonFormatado1, pokemon2: pokemonFormatado2 }
                }));

            } else {
                console.error('Nenhum Pokémon encontrado para o usuário.');

            }
        } catch (error) {
            console.error('Erro ao buscar Pokémons do usuário:', error);
            setpokemonErr(true);

        }
    };

    const trocarPokemon = (tipo) => {
        if (tipo === 'usuario') {
            const nextPokemon = pokemonUsuario?.nome === pokemonsSalvos.usuario.pokemon1.nome
                ? pokemonsSalvos.usuario.pokemon2
                : pokemonsSalvos.usuario.pokemon1;
    
            if (nextPokemon && nextPokemon.hp > 0) {
                setPokemonUsuario(nextPokemon);

            } else {
                console.log(`${nextPokemon.nome} está com HP 0, não pode ser trocado.`);

            }
        } else if (tipo === 'oponente') {
            const nextPokemon = pokemonOponente?.nome === pokemonsSalvos.oponente.pokemon1.nome
                ? pokemonsSalvos.oponente.pokemon2
                : pokemonsSalvos.oponente.pokemon1;
    
            if (nextPokemon && nextPokemon.hp > 0) {
                setPokemonOponente(nextPokemon);

            } else {
                console.log(`${nextPokemon.nome} está com HP 0, não pode ser trocado.`);

            }
        }
    };

    const finalizarBatalha = () => {
        // Limpar os Pokémons do localStorage
        localStorage.removeItem('pokemonUsuario1');
        localStorage.removeItem('pokemonUsuario2');
        localStorage.removeItem('pokemonOponente1');
        localStorage.removeItem('pokemonOponente2');
        setFinalizado(prev => !prev);

    };
    
    const atacar = (ataque) => {
        let dano;
        if (turnoUsuario) {
            if (Math.random() <= (ataque.acuracia / 100)) {
                dano = calcularDano(ataque, pokemonOponente);
                const novoPokemonOponente = { ...pokemonOponente, hp: Math.max(pokemonOponente.hp - dano, 0) };
                setPokemonOponente(novoPokemonOponente);
                atualizarHPNoLocalStorage(novoPokemonOponente, 'oponente');

            } else {
                console.log("O ataque errou!");

            }
        } else {
            const ataqueOponente = pokemonOponente.ataques[Math.floor(Math.random() * pokemonOponente.ataques.length)];

            let updatedPokemonUsuario = pokemonUsuario;
            if (Math.random() <= (ataqueOponente.acuracia / 100)) {
                dano = calcularDano(ataqueOponente, pokemonUsuario);
                updatedPokemonUsuario = { ...pokemonUsuario, hp: Math.max(pokemonUsuario.hp - dano, 0) };
                setPokemonUsuario(updatedPokemonUsuario);
                atualizarHPNoLocalStorage(updatedPokemonUsuario, 'usuario');

            } else {
                console.log("O ataque do oponente errou!");

            }
            
            setPokemonsSalvos(prev => ({
                ...prev,
                usuario: {
                    pokemon1: pokemonUsuario.nome === prev.usuario.pokemon1.nome ? updatedPokemonUsuario : prev.usuario.pokemon1,
                    pokemon2: pokemonUsuario.nome === prev.usuario.pokemon2.nome ? updatedPokemonUsuario : prev.usuario.pokemon2
                }
            }));

        }
    
        setPokemonsSalvos(prev => ({
            ...prev,
            oponente: {
                pokemon1: pokemonOponente.nome === prev.oponente.pokemon1.nome ? { ...pokemonOponente } : prev.oponente.pokemon1,
                pokemon2: pokemonOponente.nome === prev.oponente.pokemon2.nome ? { ...pokemonOponente } : prev.oponente.pokemon2
            }
        }));
    
        if (pokemonOponente.hp <= 0) {
            const outroOponente = pokemonOponente.nome === pokemonsSalvos.oponente.pokemon1.nome
                ? pokemonsSalvos.oponente.pokemon2
                : pokemonsSalvos.oponente.pokemon1;
    
            if (outroOponente.hp > 0) {
                setPokemonOponente(outroOponente);

            } else {
                setResultadoBatalha(`${pokemonUsuario.nome} venceu!`);
                finalizarBatalha();

                return;

            }
        }
        
        if (pokemonOponente.hp <= 0) {
            const outroOponente =
                pokemonOponente.nome === pokemonsSalvos.oponente.pokemon1.nome
                    ? pokemonsSalvos.oponente.pokemon2
                    : pokemonsSalvos.oponente.pokemon1;
    
            if (outroOponente.hp > 0) {
                setPokemonOponente(outroOponente);

            }
        }
    
        const todosUsuarioDerrotados =
            pokemonsSalvos.usuario.pokemon1.hp <= 0 &&
            pokemonsSalvos.usuario.pokemon2.hp <= 0;
    
        if (todosUsuarioDerrotados) {
            setResultadoBatalha(`${pokemonOponente.nome} venceu!`);
            finalizarBatalha();

            return;

        }
    
        if (pokemonUsuario.hp <= 0) {
            const outroUsuario = pokemonUsuario.nome === pokemonsSalvos.usuario.pokemon1.nome
                ? pokemonsSalvos.usuario.pokemon2
                : pokemonsSalvos.usuario.pokemon1;
        
            if (outroUsuario.hp > 0) {
                setPokemonUsuario(outroUsuario);

            } else {
                setResultadoBatalha(`${pokemonOponente.nome} venceu!`);
                finalizarBatalha();

                return;
            }
        }
    
        setTurnoUsuario(!turnoUsuario);

    };
    
    const atualizarHPNoLocalStorage = (pokemon, tipo) => {
        if (tipo === 'usuario') {
            const pokemonSalvo1 = JSON.parse(localStorage.getItem('pokemonUsuario1'));
            const pokemonSalvo2 = JSON.parse(localStorage.getItem('pokemonUsuario2'));
    
            if (pokemonSalvo1?.nome === pokemon.nome) {
                localStorage.setItem('pokemonUsuario1', JSON.stringify(pokemon));

            } else if (pokemonSalvo2?.nome === pokemon.nome) {
                localStorage.setItem('pokemonUsuario2', JSON.stringify(pokemon));

            }
        } else if (tipo === 'oponente') {
            const pokemonSalvo1 = JSON.parse(localStorage.getItem('pokemonOponente1'));
            const pokemonSalvo2 = JSON.parse(localStorage.getItem('pokemonOponente2'));
    
            if (pokemonSalvo1?.nome === pokemon.nome) {
                localStorage.setItem('pokemonOponente1', JSON.stringify(pokemon));

            } else if (pokemonSalvo2?.nome === pokemon.nome) {
                localStorage.setItem('pokemonOponente2', JSON.stringify(pokemon));

            }
        }
    };

    const calcularDano = (ataque, defensor) => {
        let multiplicador = 1;
        let mensagem = '';
    
        defensor.tipos.forEach(tipoDefensor => {
            if (typeChart[ataque.tipo]?.strong.includes(tipoDefensor)) {
                multiplicador *= 2;
                mensagem = `${ataque.nome} é super efetivo contra ${defensor.nome}!`;

            } else if (typeChart[ataque.tipo]?.immune.includes(tipoDefensor)) {
                multiplicador = 0;
                mensagem = `${ataque.nome} não tem efeito em ${defensor.nome}!`;

            } else if (typeChart[ataque.tipo]?.weak.includes(tipoDefensor)) {
                multiplicador *= 0.5;
                if (!mensagem) {
                    mensagem = `${ataque.nome} não é muito efetivo contra ${defensor.nome}.`;

                }
            }
        });
    
        if (mensagem) {
            console.log(mensagem);

        }
    
        if (multiplicador !== 0) {
            if (multiplicador < 1) {
                multiplicador = 0.25;

            }
        }
    
        return Math.floor(ataque.dano * multiplicador);

    };

    const resetarBatalha = () => {
        localStorage.removeItem('pokemonUsuario1');
        localStorage.removeItem('pokemonUsuario2');
        localStorage.removeItem('pokemonOponente1');
        localStorage.removeItem('pokemonOponente2');

        return window.location.reload();

    };

    const typeChart = {
        normal: { strong: [], weak: ["rock", "steel"], immune: ["ghost"] },
        fire: { strong: ["grass", "ice", "bug", "steel"], weak: ["fire", "water", "rock", "dragon"], immune: [] },
        water: { strong: ["fire", "ground", "rock"], weak: ["water", "grass", "dragon"], immune: [] },
        electric: { strong: ["water", "flying"], weak: ["electric", "grass", "dragon"], immune: ["ground"] },
        grass: { strong: ["water", "ground", "rock"], weak: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"], immune: [] },
        ice: { strong: ["grass", "ground", "flying", "dragon"], weak: ["fire", "water", "ice", "steel"], immune: [] },
        fighting: { strong: ["normal", "ice", "rock", "dark", "steel"], weak: ["poison", "flying", "psychic", "bug", "fairy"], immune: ["ghost"] },
        poison: { strong: ["grass", "fairy"], weak: ["poison", "ground", "rock", "ghost"], immune: ["steel"] },
        ground: { strong: ["fire", "electric", "poison", "rock", "steel"], weak: ["grass", "bug"], immune: ["flying"] },
        flying: { strong: ["grass", "fighting", "bug"], weak: ["electric", "rock", "steel"], immune: [] },
        psychic: { strong: ["fighting", "poison"], weak: ["psychic", "steel"], immune: ["dark"] },
        bug: { strong: ["grass", "psychic", "dark"], weak: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"], immune: [] },
        rock: { strong: ["fire", "ice", "flying", "bug"], weak: ["fighting", "ground", "steel"], immune: [] },
        ghost: { strong: ["psychic", "ghost"], weak: ["dark"], immune: ["normal", "fighting"] },
        dragon: { strong: ["dragon"], weak: ["steel"], immune: ["fairy"] },
        dark: { strong: ["psychic", "ghost"], weak: ["fighting", "dark", "fairy"], immune: [] },
        steel: { strong: ["ice", "rock", "fairy"], weak: ["fire", "water", "electric", "steel"], immune: ["poison"] },
        fairy: { strong: ["fighting", "dragon", "dark"], weak: ["fire", "poison", "steel"], immune: [] },
    };

    return (
        <PokemonContext.Provider value={{
            turnoUsuario, setTurnoUsuario,
            pokemonUsuario, setPokemonUsuario,
            pokemonOponente, setPokemonOponente,
            pokemonsSalvos, setPokemonsSalvos,
            resultadoBatalha, setResultadoBatalha,
            getRandomOpponentPokemons,
            getUserPokemon,
            trocarPokemon,
            finalizarBatalha,
            finalizado,
            pokemonErr,
            setpokemonErr,
            atacar,
            resetarBatalha
        }}>
            {children}
        </PokemonContext.Provider>
    );
}

export function usePokemonContext() {
    return useContext(PokemonContext);
    
}