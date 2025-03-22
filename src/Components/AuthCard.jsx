import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, register } from '../api/apiService';
import ClipLoader from "react-spinners/ClipLoader";
import "../css/login.css";

const StyledSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

function AuthCard() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ login: "", password: "", password2: "" });
    // eslint-disable-next-line no-unused-vars
    const [color, setColor] = useState("#FF0000"); // Cor do spinner

    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        setIsLogin(() => pathname === "/auth/login");

    }, [pathname]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        setIsLoading(true);

        if (isLogin) {
            try {
                const response = await login({ login: formData.login, password: formData.password });
                console.log("Login successful:", response);
                setIsLoading(false);
                navigate("/dashboard");

            } catch (err) {
                console.error("Login error response:", err.response);
                setError(err.response?.data?.message || "Login failed");
                setIsLoading(false);

            }

        } else {
            if (formData.password !== formData.password2) {
                setError("Passwords do not match");
                setIsLoading(false);

                return;
                
            }

            try {
                const response = await register({ login: formData.login, password: formData.password });
                console.log("Registration successful:", response);
                setIsLoading(false);
                setSuccess("User registered successfully");
                navigate("/auth/login");

            } catch (err) {
                console.error("Registration error response:", err.response);
                setError(err.response?.data?.message || "Registration failed");
                setIsLoading(false);

            }
        }
    };

    const handleSingUpEvent = (e) => {
        e.preventDefault();
        isLogin ? navigate("/auth/register") : navigate("/auth/login");

    };

    return (
        <StyledSection>
            {isLoading ? (
                <ClipLoader
                    color={color}
                    loading={isLoading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <div className="login-conteiner">
                    <form onSubmit={handleSubmit}>
                        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
                        <div 
                        className="error-text" 
                        style={{
                                display: (error || success) ? 'block' : 'none',
                                color: error ? 'red' : 'green'
                            }}
                        >
                            <span>{error || success}</span>
                        </div>
                        <div className="input-conteiner">
                            <input
                                name="login"
                                type="text"
                                placeholder="Username"
                                autoComplete="username"
                                onChange={handleChange}
                                required
                            />
                            <i className="bx bxs-user" />
                        </div>
                        <div className="input-conteiner">
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                onChange={handleChange}
                                required
                            />
                            <i className="bx bxs-lock-alt" />
                        </div>
                        {!isLogin && (
                            <div className="input-conteiner">
                                <input
                                    name="password2"
                                    type="password"
                                    placeholder="Confirm password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    required
                                />
                                <i className="bx bxs-lock-alt" />
                            </div>
                        )}
                        {isLogin && (
                            <div className="remember-forgot-conteiner">
                                <label>
                                    <input type="checkbox" id="remember" />
                                    Remember me
                                </label>
                                <a href="#">Forgot password</a>
                            </div>
                        )}
                        <button type="submit">
                            {isLogin ? "Login" : "Sign Up"}
                        </button>
                        <div className="signup-link">
                            {isLogin ? "Don't have an account?" : "Do you have an account?"} {" "}
                            <span className="signup-btn" onClick={handleSingUpEvent}>
                                {isLogin ? "Sign Up" : "Login"}
                            </span>
                        </div>
                    </form>
                </div>
            )}
        </StyledSection>
    );
}

export default AuthCard;
