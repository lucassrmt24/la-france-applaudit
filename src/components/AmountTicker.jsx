import "./AmountTicker.css";

const DIGITS = "0123456789".split("");

function RollingDigit({ digit }) {
  return (
    <span className="roll-digit">
      <span className="roll-track" style={{ transform: `translateY(-${digit * 10}%)` }}>
        {DIGITS.map((d) => (
          <span key={d} className="roll-cell">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function AmountTicker({ text }) {
  return (
    <span className="amount-ticker">
      {text.split("").map((ch, i) => {
        if (/\d/.test(ch)) return <RollingDigit key={i} digit={Number(ch)} />;
        if (ch === " ") return <span key={i} className="roll-space" />;
        return (
          <span key={i} className="roll-static">
            {ch}
          </span>
        );
      })}
    </span>
  );
}
