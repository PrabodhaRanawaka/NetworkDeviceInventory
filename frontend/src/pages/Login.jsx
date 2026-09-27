import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event) {
    event.preventDefault();

    if (!username || !password) {
        setError("Please enter username and password");
        return;
    }

    try {
        setError("");

        const data = await loginUser(username, password);

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);

        navigate("/");

    } catch (error) {
        setError(error.message);
    }
}

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Network Device Inventory</h1>
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter password"
                        />
                    </div>

                    {error && (
                        <p className="login-error">{error}</p>
                    )}

                    <button type="submit" className="login-button">
  Login
</button>
                </form>
            </div>
        </div>
    );
}

export default Login;