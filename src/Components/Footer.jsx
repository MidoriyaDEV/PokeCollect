import styled from "styled-components";
import themes from "../themes";

const StyledFooter = styled.footer`
    width: 100%;
    height: auto;
    padding: 1rem;
    border-radius: 1rem 1rem 0 0;
    background-color: rgba(218, 165, 32, 0.8);

`;

const StyledDiv = styled.div`
    width: 100%;
    display: flex;

    @media (max-width: ${themes.breakpoints.tablet}) {
        flex-flow: column nowrap;
        gap: 2rem;

    }

    align-items: center;
    justify-content: space-around;
    gap: 1rem;

`;

const StyledUl = styled.ul`
    list-style-type: none;
    display: flex;

    @media (max-width: ${themes.breakpoints.tablet}) {
        flex-direction: column;
        gap: 1.5rem;

    }

    align-items: center;
    gap: 3rem;
    justify-content: center;

    li {
        transition: transform .3s ease;

        &:hover {
            transform: scale(1.1);
            cursor: pointer;
        }
    }
    
    `;

const StyledSpan = styled.span`
    font-size: 1.5rem;
    transition: transform .3s ease;
    
    &:hover {
        transform: scale(1.1);
        cursor: pointer;

    }

`;

function Footer() {
    return (
        <StyledFooter>
            <StyledDiv>
                <StyledSpan>&copy; Squirtle Squad</StyledSpan>
                <StyledUl>
                    <li>
                        <StyledSpan>
                            Caio Barbosa
                        </StyledSpan>
                    </li>
                    <li>
                        <StyledSpan>
                            Victor Nascimento
                        </StyledSpan>
                    </li>
                    <li>
                        <StyledSpan>
                            Iago Leafer
                        </StyledSpan>
                    </li>
                    <li>
                        <StyledSpan>
                            Alexa Nascimento
                        </StyledSpan>
                    </li>
                    <li>
                        <StyledSpan>
                            João Neto
                        </StyledSpan>
                    </li>
                </StyledUl>
            </StyledDiv>
        </StyledFooter>
    )
}

export default Footer;
