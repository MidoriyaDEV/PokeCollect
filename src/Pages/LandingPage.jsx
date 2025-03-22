import styled from "styled-components";
import Navbar from "../Components/Navbar";
import SectionMain from "../Components/SectionMain";
import Footer from "../Components/Footer";
import themes from "../themes";

const StyledHeader = styled.header`
    width: 100%;

`;

const StyledMain = styled.main`
    width: 100%;
    height: 100%;
    @media (max-width: ${themes.breakpoints.desktop}) {
        height: auto; // Alterado para auto para ajustar ao conteúdo

    }
    padding: 1rem;

`;

function LandingPage() {
    return (
        <>
            <StyledHeader>
                <Navbar />
            </StyledHeader>

            <StyledMain>
                <SectionMain />
            </StyledMain>

            <Footer />
        </>
    )
}

export default LandingPage;
