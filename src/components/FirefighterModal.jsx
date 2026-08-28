import firefighterPhoto from "../assets/firefighter.png";

export default function FirefighterModal({ onClose }) {
  return (
    <div className="donation-backdrop" onClick={onClose}>
      <div className="firefighter-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="donation-close" onClick={onClose} aria-label="Fermer">
          ×
        </button>

        <img
          className="firefighter-photo"
          src={firefighterPhoto}
          alt="Un pompier lutte contre un feu de forêt"
        />

        <p className="countdown-title firefighter-title">
          Nous soutenons les pompiers qui se battent contre le feu
        </p>

        <p className="firefighter-cta">
          Rejoignez-nous pour les <span className="cta-highlight">applaudir</span> à la fin du compte à
          rebours !
        </p>
      </div>
    </div>
  );
}
