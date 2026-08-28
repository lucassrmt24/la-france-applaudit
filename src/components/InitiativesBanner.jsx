const COMPANIES = [
  {
    name: "Nordia Assurances",
    action: "A fait un don de 50 000 €",
  },
  {
    name: "Lumen Tech",
    action: "A travaillé sur un projet pour aider les plus démunis",
  },
  {
    name: "Atlas Immobilier",
    action: "A mis ses locaux à disposition pour accueillir les rassemblements hebdomadaires",
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
