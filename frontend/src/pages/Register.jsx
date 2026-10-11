import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!username.trim() || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await registerUser(username, password);

            setSuccess("Registration successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Network Device Inventory</h1>
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            placeholder="Choose a username"
                            minLength={3}
                            maxLength={30}
                            autoComplete="username"
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
                            placeholder="Create a password"
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            placeholder="Enter password again"
                            autoComplete="new-password"
                        />
                    </div>

                    {error && (
                        <p className="login-error">{error}</p>
                    )}

                    {success && (
                        <p className="register-success">{success}</p>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Register
                    </button>
                </form>

                <p className="register-link">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;