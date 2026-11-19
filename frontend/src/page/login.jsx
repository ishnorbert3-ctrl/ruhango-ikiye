
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import "./login.css";
function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await API.post("/users/login", formData);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            setMessage("Login successful! Welcome " + response.data.user.full_name);

if (response.data.user.role === "admin") {
    navigate("/dashboard");
} else if (response.data.user.role === "collector") {
    navigate("/dashboard");
} else {
    navigate("/dashboard");
}
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Login failed. Try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>RUHANGO IKIYE</h2>
                <h3>Login to Your Account</h3>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p className="register-link">
    Don't have an account?{" "}
    <a href="/register">Create Account</a>
</p>

                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default Login;
