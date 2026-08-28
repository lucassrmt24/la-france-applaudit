import { ClapIcon } from "./Icons";

export default function ConceptBanner() {
  return (
    <section className="countdown-banner countdown-banner-intro concept-banner">
      <div className="concept-header">
        <ClapIcon size={38} />
        <p className="countdown-title concept-title">On applaudit, on agit !</p>
      </div>

      <p className="concept-text">
        <strong>La France Applaudit</strong>, c'est un mouvement populaire et{" "}
        <span className="cta-highlight">100% gratuit</span> qui réunit chaque semaine des{" "}
        <strong>milliers de Français</strong>, aux quatre coins du pays, pour applaudir{" "}
        <strong>au même moment</strong> ceux qui se battent pour nous : soignants, pompiers,
        associations, protecteurs de nos forêts…
      </p>

      <p className="concept-text">
        On s'inspire de ces instants où la France a su se lever d'une seule voix : les{" "}
        <strong>balcons pendant le Covid</strong>, la rue pour soutenir les{" "}
        <strong>pompiers face aux incendies</strong>. Ces élans étaient spontanés et
        éphémères — nous, on en fait un <span className="cta-highlight">rendez-vous régulier</span>{" "}
        !
      </p>

      <p className="concept-text">
        <strong>Applaudir, c'est déjà agir</strong> — et ça ne coûte rien ! Et si le cœur vous en
        dit, chaque don, même symbolique, part directement aider ceux qui en ont besoin.
      </p>

      <p className="concept-cta">
        Rejoignez le mouvement : <span className="cta-highlight">votre pays a besoin de vos deux mains</span> 👏
      </p>
    </section>
  );
}
