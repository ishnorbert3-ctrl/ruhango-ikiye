
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, ArrowLeft, Leaf } from "lucide-react";
import API from "../api/axios.js";
import "./requestCollection.css";

function RequestCollection() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        waste_type: "",
        quantity: "",
        pickup_location: "",
        preferred_date: "",
        description: ""
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

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            await API.post("/collections", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage("Your collection request was submitted successfully!");

            setFormData({
                waste_type: "",
                quantity: "",
                pickup_location: "",
                preferred_date: "",
                description: ""
            });

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to submit request. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="request-page">

            <div className="request-header">
                <div className="request-logo">
                    <Leaf size={25} />
                    <span>RUHANGO <strong>IKIYE</strong></span>
                </div>

                <button onClick={() => navigate("/services")}>
                    <ArrowLeft size={18} /> Back to Services
                </button>
            </div>

            <div className="request-content">
                <div className="request-title">
                    <Truck size={38} />
                    <h1>Waste Collection Request</h1>
                    <p>
                        Request waste pickup from your home or community.
                        Together, let's keep Ruhango clean.
                    </p>
                </div>

                <form className="request-form" onSubmit={handleSubmit}>

                    <label>Waste Type</label>
                    <select
                        name="waste_type"
                        value={formData.waste_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select waste type</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Organic">Organic Waste</option>
                        <option value="Paper">Paper</option>
                        <option value="Metal">Metal</option>
                        <option value="Glass">Glass</option>
                        <option value="Mixed">Mixed Waste</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>Quantity</label>
                    <select
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select quantity</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>

                    <label>Pickup Location</label>
                    <input
                        type="text"
                        name="pickup_location"
                        placeholder="Enter your location"
                        value={formData.pickup_location}
                        onChange={handleChange}
                        required
                    />

                    <label>Preferred Collection Date</label>
                    <input
                        type="date"
                        name="preferred_date"
                        value={formData.preferred_date}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                    />

                    <label>Additional Description</label>
                    <textarea
                        name="description"
                        placeholder="Describe your waste or provide additional details..."
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />

                    {message && (
                        <p className="request-message">{message}</p>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Collection Request"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default RequestCollection;
