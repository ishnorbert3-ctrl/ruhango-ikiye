
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Leaf, Camera, Send } from "lucide-react";
import "./reportWaste.css";

function ReportWaste() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        problem_type: "",
        location: "",
        description: ""
    });

    const [photo, setPhoto] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Waste Report:", formData);
        console.log("Photo:", photo);

        alert("Waste report form is ready!");
    };

    return (
        <div className="report-page">

            <header className="report-header">
                <div className="report-logo">
                    <Leaf size={25} />
                    <span>RUHANGO <strong>IKIYE</strong></span>
                </div>

                <button onClick={() => navigate("/services")}>
                    <ArrowLeft size={18} />
                    Back to Services
                </button>
            </header>

            <main className="report-content">

                <div className="report-title">
                    <Camera size={40} />
                    <h1>Report Waste Problems</h1>
                    <p>
                        Help us identify waste problems in your community.
                        Report dirty places and environmental pollution.
                    </p>
                </div>

                <form className="report-form" onSubmit={handleSubmit}>

                    <label>Problem Type</label>
                    <select
                        name="problem_type"
                        value={formData.problem_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select problem type</option>
                        <option value="Illegal dumping">Illegal Dumping</option>
                        <option value="Blocked drainage">Blocked Drainage</option>
                        <option value="Uncollected waste">Uncollected Waste</option>
                        <option value="Water pollution">Water Pollution</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>Problem Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter the location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />

                    <label>Problem Description</label>
                    <textarea
                        name="description"
                        placeholder="Describe the waste problem..."
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        required
                    />

                    <label>Upload Photo</label>
                    <div className="photo-upload">
                        <Camera size={25} />
                        <p>Select a photo showing the problem</p>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </div>

                    {photo && (
                        <p className="selected-photo">
                            Selected: {photo.name}
                        </p>
                    )}

                    <button type="submit">
                        <Send size={18} />
                        Submit Waste Report
                    </button>

                </form>
            </main>
        </div>
    );
}

export default ReportWaste;
