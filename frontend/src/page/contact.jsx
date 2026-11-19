
import React, { useState } from "react";
import API from "../api/axios";
import "./contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      const response = await API.post("/contact", {
        full_name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setFeedback(response.data.message);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      setFeedback(
        error.response?.data?.message ||
        "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">

      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We are ready to work together for a cleaner Ruhango.</p>
      </section>

      <section className="contact-container">

        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>
            Have a question or want to report a waste management
            problem? Contact the RUHANGO IKIYE team.
          </p>

          <div className="info-item">
            <h3>Phone</h3>
            <p>0794022783</p>
          </div>

          <div className="info-item">
            <h3>Email</h3>
            <p>
              <a href="mailto:ishnorbert@gmail.com">
                ishnorbert@gmail.com
              </a>
            </p>
          </div>

          <div className="info-item">
            <h3>Location</h3>
            <p>Ruhango District, Rwanda</p>
          </div>

          <div className="info-item">
            <h3>Our Mission</h3>
            <p>Working together for a clean and green Ruhango.</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            {feedback && <p>{feedback}</p>}
          </form>
        </div>

      </section>

      <footer className="contact-footer">
        <p>© 2026 RUHANGO IKEYE. Together for a cleaner Ruhango.</p>
      </footer>

    </div>
  );
}

export default Contact;
