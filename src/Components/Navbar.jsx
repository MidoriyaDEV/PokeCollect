import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import themes from "../themes";
import { useState } from "react";

const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    transition: all .3s ease;

    position: relative;

    background-color: ${themes.colors.red};

    ${props => props.$isOpen ? "border-radius: 0 0 0 1rem;" : "box-shadow: rgba(38, 57, 77) 0px 20px 30px -10px;border-radius: 0 0 1rem 1rem;"}

`;

const StyledImg = styled.img`
    width: 250px;
    height: 78.13px;
    transition: transform .3s ease;

    &:hover {
        transform: scale(1.1);
        cursor: pointer;

    }

`;

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

const StyledImgHamburguer = styled.img`
  display: none;
  @media (max-width: ${themes.breakpoints.tablet}) {
    display: block;

  }

  transition: transform .3s ease;
  transform: ${props => props.$isOpen ? "rotate(180deg)" : "rotate(0deg)"};

`;

const StyledWrapper = styled.div`
    @media (min-width: ${themes.breakpoints.tablet}) {
        display: flex;
    }
    display: ${props => props.$isOpen ? "flex" : "none"};

    justify-content: space-between;
    gap: 1rem;

    @media (max-width: ${themes.breakpoints.tablet}) {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: ${themes.colors.red};
      border-radius: 0 0 1rem 1rem;
      padding: 1rem;

    }

`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${themes.colors.textPrimary};

    border: 2px solid white;
    border-radius: 1rem;
    padding: .5rem 1rem;

    transition: transform .3s ease;

    &:hover {
        transform: scale(1.1);

    }

`;

const Navbar = () => {
    const [ isOpen, setIsOpen ] = useState(false);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleMenuClick = () => {
      setIsOpen(prev => !prev);

    }

    return (
      <StyledNav $isOpen={isOpen}>
        <StyledImg 
          src="/src/assets/logo.png"
          alt="Logo Pokemon"
          onClick={() => navigate("/")}
        />

        <StyledDiv>
          <StyledImgHamburguer 
            src={isOpen ? "/src/assets/close.svg" : "/src/assets/menu.svg"}
            alt="Menu hamburguer"
            onClick={handleMenuClick}
            $isOpen={isOpen}
          />

          { pathname.split("/")[1] === "auth" ? 
            <StyledWrapper $isOpen={isOpen}>
              <StyledLink to={"/"}>Voltar para home</StyledLink>
            </StyledWrapper>
            :
            <StyledWrapper $isOpen={isOpen}>
                <StyledLink to="/auth/login">Login</StyledLink>
                <StyledLink to="/auth/register" $secondary>Sign-Up</StyledLink>
            </StyledWrapper>
          }
        </StyledDiv>
      </StyledNav>
    );
};

export default Navbar;
