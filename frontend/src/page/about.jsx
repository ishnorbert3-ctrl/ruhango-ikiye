
import {
  Leaf,
  Target,
  Eye,
  Heart,
  Recycle,
  Users,
  ShieldCheck,
  Sprout,
  ArrowRight,
  Globe,
  TreePine
} from "lucide-react";

import "./About.css";

function About() {
  const values = [
    {
      icon: <Heart />,
      title: "Community First",
      description:
        "We believe that every resident deserves a clean, safe and healthy environment."
    },
    {
      icon: <ShieldCheck />,
      title: "Responsibility",
      description:
        "We encourage responsible waste disposal and environmental protection."
    },
    {
      icon: <Recycle />,
      title: "Sustainability",
      description:
        "We promote recycling, waste reduction and sustainable community practices."
    },
    {
      icon: <Users />,
      title: "Collaboration",
      description:
        "We bring residents, collectors and local administration together."
    }
  ];

  const objectives = [
    "Improve waste collection and management across Ruhango District.",
    "Connect residents with waste collection service providers.",
    "Encourage reporting of illegal dumping and pollution.",
    "Promote recycling and environmental education.",
    "Support a cleaner and healthier community."
  ];

  return (
    <div className="about-page">

      {/* ABOUT HERO */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-label">
            <Leaf size={16} /> ABOUT RUHANGO IKEYE 
          </span>

          <h1>
            Building a Cleaner Future for <span>Ruhango</span>
          </h1>

          <p>
            Discover our mission, our vision and our commitment to creating
            a cleaner, greener and healthier Ruhango District.
          </p>

          <a href="#our-story" className="about-hero-btn">
            Discover Our Story <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="about-story" id="our-story">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=85"
            alt="Environmental protection and green nature"
          />
          <div className="story-image-caption">
            <TreePine size={25} />
            <span>Protecting our environment together</span>
          </div>
        </div>

        <div className="story-content">
          <span className="about-section-label">OUR STORY</span>

          <h2>
            Why <span>RUHANGO IKEYE</span>?
          </h2>

          <p>
            RUHANGO IKEYE is a community-focused digital platform designed
            to support better waste management and environmental protection
            throughout Ruhango District.
          </p>

          <p>
            We aim to make it easier for residents to report waste problems,
            find collection locations and connect with waste collectors.
            We also encourage cooperation with local administration to
            improve cleanliness in our communities.
          </p>

          <p>
            Our goal is to make environmental responsibility part of
            everyday life.
          </p>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="mission-section">
        <div className="about-section-heading">
          <span className="about-section-label">OUR PURPOSE</span>
          <h2>Mission & Vision</h2>
          <p>What guides our work and where we want to go.</p>
        </div>

        <div className="mission-grid">
          <article className="mission-card">
            <div className="mission-icon">
              <Target />
            </div>

            <h3>Our Mission</h3>

            <p>
              To improve waste management in Ruhango District by connecting
              residents, waste collectors and local administration through
              accessible digital services and environmental awareness.
            </p>
          </article>

          <article className="mission-card vision-card">
            <div className="mission-icon">
              <Eye />
            </div>

            <h3>Our Vision</h3>

            <p>
              To see Ruhango become a cleaner, greener and healthier district
              where communities work together to protect the environment
              for present and future generations.
            </p>
          </article>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section className="objectives-section">
        <div className="objectives-content">
          <span className="about-section-label">OUR OBJECTIVES</span>

          <h2>What We Want to Achieve</h2>

          <p>
            We are committed to supporting practical environmental
            improvements across Ruhango District.
          </p>

          <ul>
            {objectives.map((objective, index) => (
              <li key={index}>
                <span><ShieldCheck size={19} /></span>
                {objective}
              </li>
            ))}
          </ul>
        </div>

        <div className="objectives-image">
          <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=85"
            alt="Beautiful green environment"
          />
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="values-section">
        <div className="about-section-heading">
          <span className="about-section-label">WHAT WE BELIEVE</span>
          <h2>Our Core Values</h2>
          <p>The principles that guide RUHANGO IKIYE.</p>
        </div>

        <div className="values-grid">
          {values.map((value, index) => (
            <article className="value-card" key={index}>
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="community-section">
        <div className="community-content">
          <span className="about-section-label">
            TOGETHER WE CAN
          </span>

          <h2>
            A Cleaner Ruhango Begins With All of Us
          </h2>

          <p>
            Residents, waste collectors and local administration all have
            an important role in building a cleaner community.
          </p>

          <a href="/services" className="community-btn">
            Explore Our Services <ArrowRight size={18} />
          </a>
        </div>
      </section>

    </div>
  );
}

export default About;
