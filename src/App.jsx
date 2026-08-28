import { useState } from "react";
import "./App.css";
import FranceMap from "./components/FranceMap";
import { ClapIcon, SparkBurst, HelpIcon, HeartIcon, ChevronDown } from "./components/Icons";
import AmountTicker from "./components/AmountTicker";
import CountdownBanner from "./components/CountdownBanner";
import SponsorsBanner from "./components/SponsorsBanner";
import TeamBanner from "./components/TeamBanner";
import DonationModal from "./components/DonationModal";
import { useLiveDonations } from "./hooks/useLiveDonations";
import { useHoverDelay } from "./hooks/useHoverDelay";
import { useClapBurst } from "./hooks/useClapBurst";

function formatEuros(amount) {
  return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
}

const SPARKLES = [
  { top: "18%", left: "6%", color: "blue", delay: "0s" },
  { top: "34%", left: "14%", color: "blue", delay: "1.1s" },
  { top: "58%", left: "8%", color: "blue", delay: "0.4s" },
  { top: "70%", left: "18%", color: "blue", delay: "1.8s" },
  { top: "24%", left: "92%", color: "red", delay: "0.6s" },
  { top: "46%", left: "96%", color: "red", delay: "1.4s" },
  { top: "62%", left: "88%", color: "red", delay: "0.2s" },
  { top: "78%", left: "94%", color: "red", delay: "1s" },
];

export default function App() {
  const { amount, pulse } = useLiveDonations();
  const [introVisible, setIntroVisible] = useState(true);
  const [introClosing, setIntroClosing] = useState(false);

  const closeIntro = () => {
    if (introClosing) return;
    setIntroClosing(true);
    setTimeout(() => setIntroVisible(false), 420);
  };

  const [bordeauxHover, handleEventCityHover] = useHoverDelay();
  const [sponsorsHover, handleSponsorsHover] = useHoverDelay();
  const [contactHover, handleContactHover] = useHoverDelay();
  const [clapCanvasRef, triggerClapBurst] = useClapBurst();
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const handleDonateClick = () => {
    triggerClapBurst();
    setTimeout(() => setDonationModalOpen(true), 700);
  };

  return (
    <div className="page">
      <canvas ref={clapCanvasRef} className="clap-burst-canvas" />

      {donationModalOpen && (
        <DonationModal
          onClose={() => setDonationModalOpen(false)}
          onConfirm={() => setDonationModalOpen(false)}
        />
      )}

      {introVisible && (
        <div className={`intro-overlay ${introClosing ? "closing" : ""}`} onClick={closeIntro}>
          <CountdownBanner intro />
        </div>
      )}

      {bordeauxHover && (
        <div className="hover-overlay gold">
          <div
            className="hover-zone"
            onMouseEnter={() => handleEventCityHover(true)}
            onMouseLeave={() => handleEventCityHover(false)}
          >
            <CountdownBanner intro location="Bordeaux" hint={false} applaudMessage />
          </div>
        </div>
      )}

      {sponsorsHover && (
        <div className="hover-overlay">
          <div
            className="hover-zone"
            onMouseEnter={() => handleSponsorsHover(true)}
            onMouseLeave={() => handleSponsorsHover(false)}
          >
            <SponsorsBanner />
          </div>
        </div>
      )}

      {contactHover && (
        <div className="hover-overlay">
          <div
            className="hover-zone"
            onMouseEnter={() => handleContactHover(true)}
            onMouseLeave={() => handleContactHover(false)}
          >
            <TeamBanner />
          </div>
        </div>
      )}

      <div className="sparkles">
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className={`sparkle ${s.color === "red" ? "red" : ""}`}
            style={{ top: s.top, left: s.left, animationDelay: s.delay }}
          />
        ))}
      </div>

      <header className="header">
        <div className="logo">
          <ClapIcon size={44} className="logo-icon" />
          <div className="logo-text">
            <span className="fr">LA FRANCE</span>
            <span className="applaudit">APPLAUDIT</span>
          </div>
        </div>
        <nav className="nav">
          <div className="nav-links">
            <a href="#concept">Le concept</a>
            <a href="#initiatives">Initiatives</a>
            <a
              href="#sponsors"
              onMouseEnter={() => handleSponsorsHover(true)}
              onMouseLeave={() => handleSponsorsHover(false)}
            >
              Sponsors
            </a>
            <a href="#comment">Comment ça marche</a>
            <a href="#faq">FAQ</a>
          </div>
          <button
            className="btn-contact"
            onMouseEnter={() => handleContactHover(true)}
            onMouseLeave={() => handleContactHover(false)}
          >
            Nous contacter
          </button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-title-row">
          <SparkBurst flip />
          <h1 className="hero-title">
            <span className="la-france">LA FRANCE</span> <span className="applaudit">APPLAUDIT</span>
          </h1>
          <SparkBurst />
        </div>
        <p className="hero-subtitle">
          Chaque semaine, des milliers de Français se rassemblent
          <br />
          pour soutenir <span className="highlight">ceux qui font la différence.</span>
        </p>
      </section>

      <div className="content">
        <div className="side-stat left">
          <div className="stat-icon">
            <HelpIcon />
          </div>
          <div className={`stat-number ${pulse ? "pulse" : ""}`}>
            <AmountTicker text={formatEuros(amount)} />
          </div>
          <div className="stat-label">
            récolté pour les différentes
            <br />
            associations
          </div>
        </div>

        <FranceMap eventCity="Bordeaux" onEventCityHover={handleEventCityHover} />

        <div className="side-stat right">
          <div className="stat-icon">
            <HeartIcon />
          </div>
          <div className="stat-number">1 240</div>
          <div className="stat-label">
            initiatives soutenues
            <br />
            grâce à vous
          </div>
        </div>
      </div>

      <section className="cta-section">
        <button className="btn-join" onClick={handleDonateClick}>
          <ClapIcon size={26} />
          Faire un don
        </button>
        <p className="cta-caption">
          C'est rapide et ça fait la <span className="cta-highlight">différence</span>.
        </p>
        <p className="tagline">No Code is the New Future</p>
        <ChevronDown className="scroll-indicator" />
      </section>

      <div className="credits">Sarmento Lucas, Schneider Clarisse, Lenormand Maxence, Meddahi Samy</div>
    </div>
  );
}
