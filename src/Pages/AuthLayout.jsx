import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

const StyledHeader = styled.header`
    width: 100%;

`;

const StyledMain = styled.main`
    padding: 1rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

`;

function AuthLayout() {
    return (
        <>
            <StyledHeader>
                <Navbar />
            </StyledHeader>

            <StyledMain>
                <Outlet />
            </StyledMain>

            <Footer />
        </>
    )
}

export default AuthLayout;
