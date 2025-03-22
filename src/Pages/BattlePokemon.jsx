import { useEffect } from 'react';
import { usePokemonContext } from '../Context/PokemonContext';
import styled, { css } from 'styled-components';
import StyledInputRangeComponent from '../Components/InputRange';
import utils from '../Utils';
import themes from '../themes';
import { useNavigate } from 'react-router-dom';

const sharedStyles = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    span {
        border: 3px solid #2e3f19;
        border-radius: .5rem;
        padding: 1rem;
        border-radius: 1rem;
        width: 40%;
        background: #ffffe1;

    }

`;

const StyledMain = styled.main`
    height: 100%;
    width: 100%;
    padding: 2rem;

`;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-self: start;
    align-items: center;
    margin: 0 auto;
    width: 40%;
    text-align: center;
    background: #3c3c3c30;

    border: 3px solid ${themes.colors.borderColor};

    @media (max-width: ${themes.breakpoints.desktop}) {
        width: 100%;

    }

    h2 {
        width: 100%;
        border-bottom: 3px solid ${themes.colors.borderColor};
        border-radius: 1rem;
        padding: 1rem;
        font-size: 2rem;

    }

`;

const StyledPokemonWrapper = styled.div`
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;

`;

const StyledUserPokemonWrapper = styled.div`
    ${sharedStyles}

`;

const StyledOponentePokemonWrapper = styled.div`
    ${sharedStyles}
    
`;

const StyledButtonAttackWrapper = styled.div`
    width: 100%;
    text-align: center;
    border-top: 3px solid ${themes.colors.borderColor};
    border-radius: 1rem;
    padding: .5rem;

`;

const StyledButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;

`;

const StyledAttackButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

`;

const StyledServicesButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

`;

const StyledButton = styled.button`
    background: none;
    border: 1px solid black;
    padding: .3rem 1rem;
    border-radius: .5rem;

    &:hover {
        cursor: pointer;

    }

`;

const StyledGrassWrapper = styled.div`
    width: 120px;
    height: auto;
    background: url('/src/assets/grass.png') no-repeat;
    background-position: bottom;
    background-size: contain;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Batalha = () => {
    const navigate = useNavigate();

    const {
        pokemonUsuario,
        pokemonOponente,
        turnoUsuario,
        resultadoBatalha,
        atacar,
        trocarPokemon,
        getUserPokemon,
        getRandomOpponentPokemons,
        resetarBatalha,
        pokemonErr,
        setpokemonErr,
        finalizado
    } = usePokemonContext();

    useEffect(() => {
        if (!pokemonUsuario) getUserPokemon();
        if (!pokemonOponente) getRandomOpponentPokemons();

    }, []);

    useEffect(() => {
        if (!turnoUsuario && pokemonOponente) {
            setTimeout(() => atacar(pokemonOponente.ataques[0]), 1000);

        }

    }, []);
    
    useEffect(() => {
       if(finalizado){ 
        setTimeout(() => {
            navigate("/Dashboard");
            window.location.reload();

        }, 2000);

        }

    }, [finalizado, navigate]);

    useEffect(() => {
        if (pokemonErr) {
            alert("Gere seus pokémons primeiro antes de batalhar")
            setpokemonErr(false);

            setTimeout(() => {
               navigate("/Dashboard");

            }, 100);

        }
    }, [pokemonErr]);

    return (
        <StyledMain>
            <StyledWrapper>
                <h2>Batalha de Pokémons</h2>

                <StyledPokemonWrapper>
                    <StyledOponentePokemonWrapper>
                        <span>
                            {utils.capitalize(pokemonOponente?.nome)}
                            <br />
                            HP: {pokemonOponente?.hp} <StyledInputRangeComponent min='0' max='100' value={pokemonOponente?.hp} />
                        </span>
                        <StyledGrassWrapper>
                            <img src={pokemonOponente?.sprites?.front_default} alt={`${utils.capitalize(pokemonOponente?.nome)} - Front`} />
                        </StyledGrassWrapper>
                    </StyledOponentePokemonWrapper>

                    <StyledUserPokemonWrapper>
                        <StyledGrassWrapper>
                            <img src={pokemonUsuario?.sprites?.back_default} alt={`${utils.capitalize(pokemonUsuario?.nome)} - Back`} />
                        </StyledGrassWrapper>
                        <span>
                            {utils.capitalize(pokemonUsuario?.nome)}
                            <br />
                            HP: {pokemonUsuario?.hp} <StyledInputRangeComponent min='0' max='100' value={pokemonUsuario?.hp} />
                        </span>
                    </StyledUserPokemonWrapper>
                </StyledPokemonWrapper>

                <StyledButtonAttackWrapper>
                    {turnoUsuario ? (
                        <StyledButtonWrapper>
                            <h3>Escolha um ataque:</h3>

                            <StyledAttackButtonWrapper>
                                {pokemonUsuario?.ataques.map((ataque, index) => (
                                    <StyledButton key={index} onClick={() => atacar({
                                        ...ataque,
                                        nome: ataque.nome,
                                    })}>
                                        {utils.capitalize(utils.stringRemap(ataque.nome))}
                                    </StyledButton>
                                ))}
                            </StyledAttackButtonWrapper>

                            <StyledServicesButtonsWrapper>
                                <StyledButton onClick={() => trocarPokemon('usuario')}>Trocar Pokémon Usuário</StyledButton>
                                <StyledButton onClick={resetarBatalha}>Resetar batalha</StyledButton>
                            </StyledServicesButtonsWrapper>
                        </StyledButtonWrapper>
                    ) : (
                        <h3>Oponente está atacando...</h3>
                    )}
                </StyledButtonAttackWrapper>

                {resultadoBatalha && <h2>{resultadoBatalha}</h2>}
            </StyledWrapper>
        </StyledMain>
    );
};

export default Batalha;