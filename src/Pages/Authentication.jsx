import { Navigate, Outlet } from "react-router-dom";
import NavbarAutenticado from "../Components/NavbarDashboard";

function Authentication() {
    const token = localStorage.getItem('token');

    if (token) {
        return (
            <>
                <NavbarAutenticado />
                <Outlet />
            </>
    );

    } else {
        alert("Você precisa estar autenticado para acessar essa página.");
        return <Navigate to="/" replace />;

    }

}

export default Authentication;
