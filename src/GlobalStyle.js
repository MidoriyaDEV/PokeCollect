import { createGlobalStyle } from 'styled-components'
import themes from './themes';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        
    }
    
    html,
    #root,
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    
    body {
        background-color: ${themes.colors.background};
        overflow-x: hidden;
        
    }

    header,
    main {
        font-family: "Poppins", sans-serif;
        font-style: normal;

    }

    h1 {
        font-size: 3rem;

    }

    p {
        font-size: 1.5rem;

    }

    footer {
        font-family: "Jaro", sans-serif;
        font-style: normal;

    }

    /* Scrollbar */
    ::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px ${themes.colors.background};
        background-color:rgb(204, 204, 204);
        
    }

    ::-webkit-scrollbar
    {
        width: 12px;
        background-color:rgb(245, 245, 245);

    }

    ::-webkit-scrollbar-thumb
    {
        background-color: #D62929;
        background-image: -webkit-linear-gradient(90deg,
                                                transparent,
                                                ${themes.colors.fire} 50%,
                                                transparent,
                                                transparent)

    }

`;

export default GlobalStyle;
