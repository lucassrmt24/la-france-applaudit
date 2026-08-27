import AmountTicker from "./AmountTicker";
import { useCountdown } from "../hooks/useCountdown";

function pad(n) {
  return n.toString().padStart(2, "0");
}

export default function CountdownBanner({ intro = false }) {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <section className={`countdown-banner ${intro ? "countdown-banner-intro" : ""}`}>
      <p className="countdown-title">Prochain événement dans</p>
      <div className="countdown-grid">
        <div className="countdown-block">
          <div className="countdown-value">
            <AmountTicker text={pad(days)} />
          </div>
          <div className="countdown-label">Jours</div>
        </div>
        <span className="countdown-colon">:</span>
        <div className="countdown-block">
          <div className="countdown-value">
            <AmountTicker text={pad(hours)} />
          </div>
          <div className="countdown-label">Heures</div>
        </div>
        <span className="countdown-colon">:</span>
        <div className="countdown-block">
          <div className="countdown-value">
            <AmountTicker text={pad(minutes)} />
          </div>
          <div className="countdown-label">Minutes</div>
        </div>
        <span className="countdown-colon">:</span>
        <div className="countdown-block">
          <div className="countdown-value">
            <AmountTicker text={pad(seconds)} />
          </div>
          <div className="countdown-label">Secondes</div>
        </div>
      </div>
      {intro && <p className="countdown-hint">Cliquez n'importe où pour continuer</p>}
    </section>
  );
}
