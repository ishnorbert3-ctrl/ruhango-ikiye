
import { useState } from "react";
import {
  Leaf,
  Recycle,
  Truck,
  MapPin,
  ArrowRight,
  Menu,
  X,
  ShieldCheck,
  Users,
  TreePine,
  Globe,
  Clock,
  Trash2,
  CheckCircle
} from "lucide-react";

import "./App.css";

function App() {
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);

  const translations = {
    EN: {
      home: "Home",
      about: "About Us",
      services: "Services",
      locations: "Locations",
      campaigns: "Campaigns",
      contact: "Contact",
      login: "Login",
      badge: "A CLEANER RUHANGO STARTS WITH YOU",
      heroTitle: "Together for a Cleaner and Greener Ruhango",
      heroText:
        "Join our community in creating a clean, healthy and sustainable environment through responsible waste management.",
      explore: "Explore Our Services",
      learn: "Learn More",
      servicesTitle: "What We Do",
      servicesText: "Simple solutions for a cleaner community.",
      collection: "Waste Collection",
      collectionText:
        "Connect with waste collectors and request waste collection services.",
      report: "Report Waste",
      reportText:
        "Report illegal dumping and waste problems in your community.",
      recycling: "Recycling Education",
      recyclingText:
        "Learn how to reduce, reuse and recycle waste for a better future.",
      locationsTitle: "Find Waste Locations",
      locationsText:
        "Discover waste collection points and get directions using our interactive map.",
      howTitle: "How RUHANGO IKIYE Works",
      step1: "Report",
      step1Text: "Report waste problems in your area.",
      step2: "Connect",
      step2Text: "Connect with responsible waste collectors.",
      step3: "Clean",
      step3Text: "Work together for a cleaner Ruhango.",
      impactTitle: "Together We Can Make a Difference",
      impactText:
        "Every resident has a role in protecting our environment. Small actions create a big impact.",
      join: "Join Our Community",
      campaignTitle: "Be Part of the Change",
      campaignText:
        "Help us build a cleaner and healthier Ruhango for today's generation and the future.",
      getStarted: "Get Started",
      footerText: "Working together for a clean and sustainable Ruhango District.",
      quickLinks: "Quick Links",
      follow: "Follow Our Mission",
      rights: "All rights reserved."
    },
    RW: {
      home: "Ahabanza",
      about: "Abo Turibo",
      services: "Serivisi",
      locations: "Ahantu",
      campaigns: "Ubukangurambaga",
      contact: "Twandikire",
      login: "Injira",
      badge: "ISUKU YA RUHANGO ITANGIRIRA KURI WOWE",
      heroTitle: "Dufatanye Kubaka Ruhango Isukuye kandi Icyatsi",
      heroText:
        "Fatanya natwe kubaka umuryango ufite isuku, ubuzima bwiza n'ibidukikije birambye binyuze mu gucunga neza imyanda.",
      explore: "Reba Serivisi Zacu",
      learn: "Menya Byinshi",
      servicesTitle: "Ibyo Dukora",
      servicesText: "Ibisubizo byoroshye bigamije isuku y'umuryango.",
      collection: "Gukusanya Imyanda",
      collectionText:
        "Huza n'abakusanya imyanda usabe serivisi yo kuyikusanya.",
      report: "Tanga Amakuru ku Myanda",
      reportText:
        "Menyesha ubuyobozi ahari imyanda yajugunywe nabi n'ibibazo by'isuku.",
      recycling: "Kwigisha Gutunganya Imyanda",
      recyclingText:
        "Menya uko wagabanya imyanda, wayikoresha bundi bushya cyangwa ukayitunganya.",
      locationsTitle: "Ahakusanyirizwa Imyanda",
      locationsText:
        "Menya ahakusanyirizwa imyanda kandi ubone icyerekezo ukoresheje ikarita.",
      howTitle: "Uko RUHANGO IKIYE Ikora",
      step1: "Tanga Amakuru",
      step1Text: "Tanga amakuru ku bibazo by'imyanda mu gace utuyemo.",
      step2: "Huza",
      step2Text: "Huza n'abashinzwe gukusanya imyanda.",
      step3: "Kora Isuku",
      step3Text: "Dufatanye kugira ngo Ruhango ibe isukuye.",
      impactTitle: "Dufatanye Guteza Imbere Isuku",
      impactText:
        "Buri muturage afite uruhare mu kurengera ibidukikije. Ibikorwa bito bizana impinduka nini.",
      join: "Injira mu Muryango Wacu",
      campaignTitle: "Ba Umwe mu Bazana Impinduka",
      campaignText:
        "Dufashe kubaka Ruhango isukuye kandi ifite ubuzima bwiza ku batuye uyu munsi n'abazaza.",
      getStarted: "Tangira",
      footerText: "Dufatanyije kubaka Akarere ka Ruhango gafite isuku n'iterambere rirambye.",
      quickLinks: "Imiyoboro",
      follow: "Dukurikire",
      rights: "Uburenganzira bwose burarinzwe."
    }
  };

  const t = translations[language];

  const services = [
    {
      icon: <Truck />,
      title: t.collection,
      description: t.collectionText,
      link: "/services"
    },
    {
      icon: <Trash2 />,
      title: t.report,
      description: t.reportText,
      link: "/report-waste"
    },
    {
      icon: <Recycle />,
      title: t.recycling,
      description: t.recyclingText,
      link: "/campaigns"
    },
    {
      icon: <MapPin />,
      title: t.locationsTitle,
      description: t.locationsText,
      link: "/locations"
    }
  ];

  const steps = [
    { icon: <ShieldCheck />, title: t.step1, text: t.step1Text },
    { icon: <Users />, title: t.step2, text: t.step2Text },
    { icon: <TreePine />, title: t.step3, text: t.step3Text }
  ];

  return (
    <div className="website">
      <header className="navbar">
        <a href="/" className="logo">
          <span className="logo-icon"><Leaf /></span>
          <span>RUHANGO <strong>IKEYE</strong></span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav-links active" : "nav-links"}>
          <a href="/">{t.home}</a>
          <a href="/about">{t.about}</a>
          <a href="/services">{t.services}</a>
          <a href="/locations">{t.locations}</a>
          <a href="/campaigns">{t.campaigns}</a>
          <a href="/contact">{t.contact}</a>
        </nav>

        <div className="nav-actions">
          <button
            className="language-btn"
            onClick={() => setLanguage(language === "EN" ? "RW" : "EN")}
          >
            <Globe size={17} /> {language}
          </button>
          <a href="/login" className="login-btn">{t.login}</a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="hero-badge">
              <Leaf size={16} /> {t.badge}
            </span>

            <h1>{t.heroTitle}</h1>
            <p>{t.heroText}</p>

            <div className="hero-buttons">
              <a href="/services" className="primary-btn">
                {t.explore} <ArrowRight size={18} />
              </a>
              <a href="/about" className="secondary-btn">{t.learn}</a>
            </div>

            <div className="hero-note">
              <CheckCircle size={18} />
              <span>Clean Environment • Healthy Community</span>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=85"
              alt="Environmental waste management"
            />
            <div className="floating-card">
              <span className="floating-icon"><Recycle /></span>
              <div>
                <strong>Go Green</strong>
                <small>Protect our environment</small>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-heading">
            <span className="section-label">OUR SERVICES</span>
            <h2>{t.servicesTitle}</h2>
            <p>{t.servicesText}</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <article className="service-card" key={index}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href={service.link}>
                  {t.learn} <ArrowRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="how-section">
          <div className="section-heading">
            <span className="section-label">OUR PROCESS</span>
            <h2>{t.howTitle}</h2>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <div className="step-card" key={index}>
                <span className="step-number">0{index + 1}</span>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="impact-section">
          <div className="impact-image">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=85"
              alt="Green forest and nature"
            />
          </div>
          <div className="impact-content">
            <span className="section-label">OUR ENVIRONMENT</span>
            <h2>{t.impactTitle}</h2>
            <p>{t.impactText}</p>
            <a href="/about" className="primary-btn">
              {t.join} <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section className="campaign-section">
          <div className="campaign-content">
            <span className="campaign-icon"><Leaf /></span>
            <h2>{t.campaignTitle}</h2>
            <p>{t.campaignText}</p>
            <a href="/campaigns" className="campaign-btn">
              {t.getStarted} <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="logo footer-logo">
              <span className="logo-icon"><Leaf /></span>
              <span>RUHANGO <strong>IKIYE</strong></span>
            </a>
            <p>{t.footerText}</p>
          </div>

          <div>
            <h3>{t.quickLinks}</h3>
            <a href="/">{t.home}</a>
            <a href="/about">{t.about}</a>
            <a href="/services">{t.services}</a>
            <a href="/locations">{t.locations}</a>
          </div>

          <div>
            <h3>{t.follow}</h3>
            <a href="/campaigns">{t.campaigns}</a>
            <a href="/report-waste">Report Waste</a>
            <a href="/contact">{t.contact}</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 RUHANGO IKEYE. {t.rights}</p>
          <span>Made for a Cleaner Ruhango <Leaf size={15} /></span>
        </div>
      </footer>
    </div>
  );
}

export default App;
