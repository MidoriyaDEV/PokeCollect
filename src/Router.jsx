import {
  createBrowserRouter
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import AuthLayout from "./Pages/AuthLayout";
import AuthCard from "./Components/AuthCard";
import Authentication from "./Pages/Authentication";
import Dashboard from "./Pages/Dashboard";
import Pokedex from "./Pages/Pokedex.jsx";
import PokemonList from "./Pages/PokemonList";
import BattlePokemon from "./Pages/BattlePokemon.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <AuthCard />
      },
      {
        path: "register",
        element: <AuthCard />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <Authentication />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "pokedex",
        element: <Pokedex />,
      },
      {
        path: "pokemon-list",
        element: <PokemonList />,
      },
      {
        path: "battlepokemon",
        element: <BattlePokemon />,
      }
    ]
  }
]);

export default router;
