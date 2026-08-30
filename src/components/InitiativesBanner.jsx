const COMPANIES = [
  {
    name: "Nordia Assurances",
    action: "A fait un don de 1 000 €",
  },
  {
    name: "Verdia Group",
    action: "A fait un don de 3 000 €",
  },
  {
    name: "Atlas Immobilier",
    action: "A fait un don de 5 000 €",
  },
];

export default function InitiativesBanner() {
  return (
    <section className="countdown-banner countdown-banner-intro initiatives-banner">
      <p className="countdown-title">Les différentes entreprises qui ont fait des dons</p>
      <div className="initiatives-grid">
        {COMPANIES.map((company) => (
          <div className="initiative-card" key={company.name}>
            <div className="initiative-name">{company.name}</div>
            <div className="initiative-action">{company.action}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
