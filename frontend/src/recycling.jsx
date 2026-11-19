
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Leaf,
    Recycle,
    BookOpen,
    Lightbulb,
    CheckCircle
} from "lucide-react";
import "./recycling.css";

function Recycling() {
    const navigate = useNavigate();

    const recyclingTips = [
        {
            title: "Separate Your Waste",
            description:
                "Separate plastic, paper, glass, metal and organic waste before disposal.",
            icon: Recycle
        },
        {
            title: "Reuse Materials",
            description:
                "Reuse bags, bottles and containers instead of throwing them away.",
            icon: Leaf
        },
        {
            title: "Compost Organic Waste",
            description:
                "Turn food leftovers and plant materials into useful natural fertilizer.",
            icon: Lightbulb
        },
        {
            title: "Keep Your Community Clean",
            description:
                "Avoid dumping waste in roads, rivers and public spaces.",
            icon: CheckCircle
        }
    ];

    return (
        <div className="recycling-page">

            <header className="recycling-header">
                <div className="recycling-logo">
                    <Leaf size={25} />
                    <span>RUHANGO <strong>IKIYE</strong></span>
                </div>

                <button onClick={() => navigate("/services")}>
                    <ArrowLeft size={18} />
                    Back to Services
                </button>
            </header>

            <section className="recycling-hero">
                <div className="recycling-hero-content">
                    <span className="recycling-tag">
                        <Recycle size={17} /> GREEN COMMUNITY
                    </span>

                    <h1>Recycling & Education</h1>

                    <p>
                        Learn how to reduce waste, reuse materials and
                        recycle for a cleaner and healthier Ruhango.
                    </p>

                    <button onClick={() =>
                        document.getElementById("recycling-tips")
                            .scrollIntoView({ behavior: "smooth" })
                    }>
                        Learn More
                    </button>
                </div>

                <div className="recycling-hero-icon">
                    <Recycle size={110} />
                </div>
            </section>

            <main className="recycling-content" id="recycling-tips">

                <div className="recycling-heading">
                    <BookOpen size={32} />
                    <h2>Simple Ways to Manage Waste</h2>
                    <p>
                        Small actions can make a big difference
                        in protecting our environment.
                    </p>
                </div>

                <div className="recycling-grid">
                    {recyclingTips.map((tip, index) => {
                        const Icon = tip.icon;

                        return (
                            <div className="recycling-card" key={index}>
                                <div className="recycling-card-icon">
                                    <Icon size={30} />
                                </div>

                                <h3>{tip.title}</h3>
                                <p>{tip.description}</p>
                            </div>
                        );
                    })}
                </div>

                <section className="recycling-message">
                    <Leaf size={35} />
                    <h2>Let's Make Ruhango Clean!</h2>
                    <p>
                        Protecting our environment starts with
                        responsible waste management.
                    </p>
                </section>

            </main>
        </div>
    );
}

export default Recycling;
