import styled from "styled-components";
import themes from "../themes";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/apiService";

const StyledHeader = styled.header`
    width: 100%;
    background-color: ${themes.colors.red};
    position: relative;
    
`;

const StyledNav = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
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

const StyledUl = styled.ul`
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 30%;

    li {
        color: ${themes.colors.textPrimary};
        transition: transform .3s ease;
        font-size: 1.1rem;

        &:hover {
            transform: scale(1.1);
            font-weight: bold;
            cursor: pointer;
        }
    }

    @media (max-width: ${themes.breakpoints.desktop}) {
        display: none;
    }
`;

const StyledUlProfile = styled(StyledUl)`
    width: auto;
    gap: 1rem;
`;

const StyledMenuIcon = styled.img`
    display: none;
    @media (max-width: ${themes.breakpoints.desktop}) {
        display: block;
        transition: transform .3s ease;
        transform: ${props => props.$isOpen ? "rotate(180deg)" : "rotate(0deg)"};
    }
`;

const StyledUlMobile = styled.ul`
    display: none;
    background-color: ${themes.colors.red};
    padding: 1rem;
    list-style-type: none;
    z-index: 9999;

    @media (max-width: ${themes.breakpoints.desktop}) {
        top: 100%;
        right: 0;
        display: ${props => props.$isOpen ? "flex" : "none"};
        border-radius: 0 0 1rem 1rem;
        align-items: start;
        gap: 1rem;
        justify-content: center;
        flex-flow: column nowrap;
        position: absolute;
        color: ${themes.colors.textPrimary};

        li {
            border-bottom: 1px solid ${themes.colors.secondary};
            width: 100%;
            padding-bottom: .5rem;

            &:nth-last-child(1) {
                border-bottom: none;
                padding-bottom: 0;
            }
        }
    }
`;

const StyledButton = styled.button`
    background: none;
    border: none;
    color: ${themes.colors.textPrimary};
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform .3s ease;

    &:hover {
        transform: scale(1.1);
        font-weight: bold;
    }
`;

function NavbarAutenticado() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const menuIconRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e) => {
            if (menuIconRef.current && menuIconRef.current.contains(e.target)) return;
            setIsOpen(false);
            
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);

    }, [isOpen]);

    const goToPokedex = () => {
        navigate('pokedex');
        
    };

    const goToPokemonList = () => {
        navigate('pokemon-list');
        
    };

    const goToBattlePokemon = () =>{
        navigate('BattlePokemon');
        
    };

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setIsOpen(prev => !prev);
        
    };

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("token");
            navigate("/");

        } catch (error) {
            console.error(error);

        }

    };

    return (
        <StyledHeader>
            <StyledNav $isOpen={isOpen}>
                <StyledImg 
                    src="/src/assets/logo.png"
                    alt="Logo Pokemon"
                    onClick={() => navigate("/dashboard")}
                />

                <StyledUl>
                    <li>
                        <StyledButton onClick={goToPokemonList}>
                            Meus pokemons
                        </StyledButton>
                    </li>
                    <li>
                        <StyledButton onClick={goToBattlePokemon}>
                            Iniciar batalha
                        </StyledButton>
                    </li>
                    <li>
                        <StyledButton onClick={goToPokedex}>
                            Pokedex
                        </StyledButton>
                    </li>
                </StyledUl>

                <StyledUlProfile>
                    <li onClick={handleLogout}><i className='bx bx-log-out' ></i></li>
                </StyledUlProfile>

                <StyledMenuIcon
                    ref={menuIconRef}
                    src={isOpen ? "/src/assets/close.svg" : "/src/assets/menu.svg"}
                    alt="Menu hamburguer"
                    onClick={handleMenuClick}
                    $isOpen={isOpen}
                />

                <StyledUlMobile 
                    ref={mobileMenuRef}
                    onClick={() => setIsOpen(false)}
                    $isOpen={isOpen}
                >
                    <li onClick={goToPokemonList}>Meus pokemons</li>
                    <li onClick={goToBattlePokemon}>Iniciar batalha</li>
                    <li onClick={goToPokedex}>Pokedex</li>
                    <li onClick={handleLogout}>Sair</li>
                </StyledUlMobile>
            </StyledNav>
        </StyledHeader>
    );
}

export default NavbarAutenticado;
