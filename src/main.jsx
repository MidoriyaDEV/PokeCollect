import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'
import { ThemeProvider } from 'styled-components'
import themes from './themes.js'
import GlobalStyle from './GlobalStyle.js'
import { PokemonProvider } from './Context/PokemonContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PokemonProvider>
      <ThemeProvider theme={themes}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </PokemonProvider>
  </StrictMode>,
)
