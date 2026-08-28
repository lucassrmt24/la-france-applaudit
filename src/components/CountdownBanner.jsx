import AmountTicker from "./AmountTicker";
import { useCountdown } from "../hooks/useCountdown";

function pad(n) {
  return n.toString().padStart(2, "0");
}

export default function CountdownBanner({ intro = false, location = null, hint = intro, applaudMessage = false }) {
  const { days, hours, minutes, seconds } = useCountdown();
  const title = location ? `Prochain événement à ${location} dans` : "Prochain événement dans";
  const isTime = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  return (
    <section className={`countdown-banner ${intro ? "countdown-banner-intro" : ""}`}>
      <p className="countdown-title">{title}</p>
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
      {applaudMessage && (
        <p className={`countdown-message ${isTime ? "now" : ""}`}>
          {isTime ? "C'est maintenant qu'il faut applaudir !" : "C'est bientôt le moment d'applaudir..."}
        </p>
      )}
      {hint && <p className="countdown-hint">Cliquez n'importe où pour continuer</p>}
    </section>
  );
}
