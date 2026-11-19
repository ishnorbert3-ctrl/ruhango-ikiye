
import {
  Truck,
  AlertTriangle,
  Recycle,
  MapPin,
  Users,
  ArrowRight,
  CheckCircle,
  Leaf
} from "lucide-react";

import "./service.css";

const services = [
  {
    number: "01",
    icon: Truck,
    title: "Waste Collection",
    description:
      "Request waste collection from your home, business or community and help keep Ruhango clean.",
    features: [
      "Request waste pickup",
      "Choose collection location",
      "Track collection requests"
    ],
    link: "/request-collection"
  },
  {
    number: "02",
    icon: AlertTriangle,
    title: "Report Waste Problems",
    description:
      "Report illegal dumping, overflowing bins and other waste-related problems in your area.",
    features: [
      "Report waste problems",
      "Submit location details",
      "Follow report progress"
    ],
    link: "/report-waste"
  },
  {
    number: "03",
    icon: Recycle,
    title: "Recycling & Education",
    description:
      "Learn how to separate waste, recycle materials and reduce environmental pollution.",
    features: [
      "Recycling guidelines",
      "Waste separation tips",
      "Environmental education"
    ],
    link: "/recycling"
  },
  {
    number: "04",
    icon: MapPin,
    title: "Waste Collection Locations",
    description:
      "Find waste collection points and view their locations on an interactive map.",
    features: [
      "View collection points",
      "Find nearby locations",
      "Get location directions"
    ],
    link: "/locations"
  },
  {
    number: "05",
    icon: Users,
    title: "Community Campaigns",
    description:
      "Join community activities and campaigns that promote a cleaner and greener Ruhango.",
    features: [
      "Community clean-up events",
      "Environmental awareness",
      "Volunteer opportunities"
    ],
    link: "/campaigns"
  },
  {
    number: "06",
    icon: Leaf,
    title: "Environmental Protection",
    description:
      "Discover practical ways to reduce pollution and protect the environment in your community.",
    features: [
      "Keep public places clean",
      "Reduce plastic waste",
      "Protect natural resources"
    ],
    link: "/about"
  }
];

function Services() {
  return (
    <div className="services-page">

      <nav className="services-navbar">
        <a href="/" className="services-logo">
          <span className="services-logo-icon">
            <Leaf size={25} />
          </span>
          <span>RUHANGO <strong>IKEYE</strong></span>
        </a>

        <div className="services-nav-links">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/services" className="active">Services</a>
          <a href="/locations">Locations</a>
          <a href="/contact">Contact</a>
        </div>

        <a href="/login" className="services-login">
          Login
        </a>
      </nav>

      <header className="services-hero">
        <div className="services-hero-content">
          <span className="services-eyebrow">
            <Leaf size={16} /> WHAT WE OFFER
          </span>

          <h1>
            Our Services for a
            <span> Cleaner Ruhango</span>
          </h1>

          <p>
            Discover the services that help residents, waste collectors
            and local administration work together to create a clean,
            healthy and sustainable Ruhango District.
          </p>

          <a href="#all-services" className="services-hero-button">
            Explore Our Services <ArrowRight size={18} />
          </a>
        </div>
      </header>

      <section className="services-intro">
        <span className="services-section-label">OUR SOLUTIONS</span>
        <h2>How We Help Our Community</h2>
        <p>
          RUHANGO IKIYE provides practical solutions that make waste
          management easier, faster and more effective for everyone.
        </p>
      </section>

      <section className="services-grid-section" id="all-services">
        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className="service-card" key={service.number}>
                <div className="service-card-top">
                  <div className="service-icon">
                    <Icon size={27} />
                  </div>
                  <span className="service-number">
                    {service.number}
                  </span>
                </div>

                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a href={service.link} className="service-card-link">
                  Learn More <ArrowRight size={17} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="services-cta">
        <div>
          <span>LET'S WORK TOGETHER</span>
          <h2>Be Part of a Cleaner and Greener Ruhango</h2>
          <p>
            Your contribution matters. Join our community and help
            improve waste management in Ruhango District.
          </p>
        </div>

        <a href="/report-waste">
          Get Started <ArrowRight size={18} />
        </a>
      </section>

      <footer className="services-footer">
        <div className="services-footer-logo">
          <Leaf size={22} />
          RUHANGO IKEYE
        </div>
        <p>Working together for a cleaner and greener Ruhango.</p>
        <span>© 2026 RUHANGO IKEYE. All rights reserved.</span>
      </footer>

    </div>
  );
}

export default Services;
