import { useState } from "react";
import { ClapIcon } from "./Icons";

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function formatCvv(value) {
  return value.replace(/\D/g, "").slice(0, 3);
}

export default function DonationModal({ onClose, onConfirm }) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <div className="donation-backdrop" onClick={onClose}>
      <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="donation-close" onClick={onClose} aria-label="Fermer">
          ×
        </button>

        <div className="donation-header">
          <ClapIcon size={34} />
          <p className="countdown-title donation-title">Faire un don</p>
        </div>

        <form className="donation-form" onSubmit={handleSubmit}>
          <label className="donation-field">
            <span>Nom sur la carte</span>
            <input
              type="text"
              placeholder="Jean Dupont"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="cc-name"
              required
            />
          </label>

          <label className="donation-field">
            <span>Numéro de carte</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              autoComplete="cc-number"
              required
            />
          </label>

          <div className="donation-row">
            <label className="donation-field">
              <span>Expiration</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="MM/AA"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                autoComplete="cc-exp"
                required
              />
            </label>

            <label className="donation-field">
              <span>CVV</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(formatCvv(e.target.value))}
                autoComplete="cc-csc"
                required
              />
            </label>
          </div>

          <button type="submit" className="donation-submit">
            <ClapIcon size={20} />
            Confirmer le don
          </button>
        </form>
      </div>
    </div>
  );
}
