
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import "./register.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
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
            const response = await API.post("/users/register", formData);

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>RUHANGO IKIYE</h2>
                <h3>Create Your Account</h3>

                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password (minimum 6 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    minLength="6"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Create Account"}
                </button>

                {message && <p className="register-message">{message}</p>}

                <p className="register-login">
                    Already have an account?{" "}
                    <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
