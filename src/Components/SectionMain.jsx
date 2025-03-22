import styled from "styled-components";
import themes from "../themes";

const StyledSection = styled.section`
    display: flex;
    align-items: center;

    @media (max-width: ${themes.breakpoints.desktop}) {
        flex-direction: column;
        gap: 1.5rem;

    }

    justify-content: space-between;
    gap: 1rem;
    margin: 4rem auto 0 auto;
    width: 80%;

`;

const StyledDivText = styled.div`
    width: 50%;
    text-align: end;

    @media (min-width: ${themes.breakpoints.tablet}) and (max-width: ${themes.breakpoints.desktop}) {
        width: 100%;
        text-align: center;
    }

    @media (max-width: ${themes.breakpoints.tablet}) {
        width: 100%;
        text-align: center;

        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            
        }

        p {
            font-size: 1.5rem;
            
        }
        
    }

`;

const StyledDivImg = styled.div`
    width: 50%;
    text-align: start;

    @media (max-width: ${themes.breakpoints.desktop}) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
            height: auto;

        }
        
    }

`;

function SectionMain() {
    return (
        <StyledSection>
            <StyledDivText>
                <h1>Colecione, Treine e Batalhe com seu Pokémon!</h1>
                <p>Descubra o mundo dos Pokémon, monte sua coleção, treine seus melhores parceiros e desafie outros jogadores para batalhas épicas!</p>
            </StyledDivText>

            <StyledDivImg>
                <img src="src/assets/banner1.gif" alt="Banner descrição" />
            </StyledDivImg>
        </StyledSection>
    )
}

export default SectionMain;