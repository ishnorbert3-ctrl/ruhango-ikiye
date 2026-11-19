
import React from "react";
import {
  Leaf,
  Recycle,
  TreePine,
  Users,
  CalendarDays,
  MapPin,
  ArrowRight,
  Heart,
  CheckCircle
} from "lucide-react";

import "./campaign.css";

const campaigns = [
  {
    id: 1,
    category: "Community Cleanup",
    title: "Keep Ruhango Clean",
    description:
      "Join residents in cleaning streets, public spaces and neighborhoods to create a healthier Ruhango.",
    date: "November 21, 2026",
    location: "Ruhango Town",
    participants: "120+",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=900",
    icon: Recycle
  },
  {
    id: 2,
    category: "Tree Planting",
    title: "Green Ruhango Initiative",
    description:
      "Help plant trees and protect our environment for a greener and healthier future.",
    date: "December 05, 2026",
    location: "Ruhango District",
    participants: "80+",
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900",
    icon: TreePine
  },
  {
    id: 3,
    category: "Recycling Awareness",
    title: "Recycle for a Better Future",
    description:
      "Learn how to separate waste, reuse materials and reduce environmental pollution.",
    date: "December 12, 2026",
    location: "Ruhango Community",
    participants: "60+",
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900",
    icon: Leaf
  }
];

function Campaign() {
  return (
    <div className="campaign-page">

      {/* Hero Section */}
      <section className="campaign-hero">
        <div className="campaign-hero-content">
          <span className="campaign-label">
            <Leaf size={17} /> Together for a Cleaner Ruhango
          </span>

          <h1>
            Be Part of the <span>Green Change</span>
          </h1>

          <p>
            Join environmental campaigns, protect our community
            and help build a cleaner, greener and healthier Ruhango District.
          </p>

          <a href="#campaign-list" className="campaign-main-btn">
            Explore Campaigns <ArrowRight size={19} />
          </a>
        </div>
      </section>

      {/* Introduction */}
      <section className="campaign-intro">
        <div>
          <span className="campaign-small-title">OUR INITIATIVES</span>
          <h2>Small Actions, Big Environmental Impact</h2>
          <p>
            Change starts with us. Participate in activities that promote
            proper waste management, recycling and environmental protection
            throughout Ruhango District.
          </p>
        </div>

        <div className="campaign-stats">
          <div className="campaign-stat">
            <Users size={28} />
            <h3>Community</h3>
            <p>Working together</p>
          </div>

          <div className="campaign-stat">
            <Recycle size={28} />
            <h3>Recycling</h3>
            <p>Reducing waste</p>
          </div>

          <div className="campaign-stat">
            <TreePine size={28} />
            <h3>Greener Future</h3>
            <p>Protecting nature</p>
          </div>
        </div>
      </section>

      {/* Campaign Cards */}
      <section className="campaign-list" id="campaign-list">
        <div className="campaign-heading">
          <div>
            <span className="campaign-small-title">GET INVOLVED</span>
            <h2>Discover Our Campaigns</h2>
            <p>Choose an activity and become part of the change.</p>
          </div>
        </div>

        <div className="campaign-grid">
          {campaigns.map((campaign) => {
            const Icon = campaign.icon;

            return (
              <article className="campaign-card" key={campaign.id}>
                <div className="campaign-image">
                  <img src={campaign.image} alt={campaign.title} />

                  <span className={`campaign-status ${campaign.status.toLowerCase()}`}>
                    {campaign.status}
                  </span>
                </div>

                <div className="campaign-card-body">
                  <span className="campaign-category">
                    <Icon size={16} />
                    {campaign.category}
                  </span>

                  <h3>{campaign.title}</h3>
                  <p>{campaign.description}</p>

                  <div className="campaign-info">
                    <span>
                      <CalendarDays size={16} />
                      {campaign.date}
                    </span>

                    <span>
                      <MapPin size={16} />
                      {campaign.location}
                    </span>

                    <span>
                      <Users size={16} />
                      {campaign.participants} participants
                    </span>
                  </div>

                  <button
                    className="campaign-join-btn"
                    onClick={() =>
                      alert("Campaign registration will be available soon!")
                    }
                  >
                    Join Campaign <ArrowRight size={17} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="campaign-cta">
        <div className="campaign-cta-icon">
          <Heart size={35} />
        </div>

        <h2>Be a Champion of a Clean Ruhango</h2>

        <p>
          Your participation matters. Together, we can reduce pollution,
          improve waste management and protect our environment.
        </p>

        <div className="campaign-cta-note">
          <CheckCircle size={18} />
          Every action makes a difference.
        </div>
      </section>

      {/* Footer */}
      <footer className="campaign-footer">
        <h3><Leaf size={22} /> RUHANGO IKEYE</h3>
        <p>Building a cleaner and greener Ruhango District.</p>
        <span>© 2026 RUHANGO IKEYE. All rights reserved.</span>
      </footer>

    </div>
  );
}

export default Campaign;
