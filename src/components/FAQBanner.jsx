import { useState } from "react";
import { ChevronDown } from "./Icons";

const FAQ_ITEMS = [
  {
    question: "Où vont vos dons ?",
    answer:
      "Chaque don part directement à l'association qui représente l'événement du moment. Par exemple, lors d'un rassemblement pour les pompiers, votre don est reversé aux associations qui luttent directement ou indirectement contre les feux de forêt.",
  },
  {
    question: "Puis-je choisir l'association ou la cause qui reçoit mon don ?",
    answer:
      "Les dons sont effectués aux associations dont les événements sont en cours, afin de concentrer l'aide là où le besoin est le plus urgent au moment du rassemblement.",
  },
  {
    question: "Pourquoi y a-t-il des spots publicitaires ?",
    answer:
      "Les entreprises qui le souhaitent peuvent financer une subvention destinée aux associations soutenues, en échange d'une visibilité sur notre plateforme — un peu comme les espaces publicitaires du Super Bowl. Ces subventions viennent s'ajouter aux dons individuels, sans jamais remplacer la gratuité du geste pour nos visiteurs.",
  },
  {
    question: "Comment puis-je vérifier que l'argent arrive bien à destination ?",
    answer:
      "Chaque association bénéficiaire nous transmet une preuve de réception du virement, mentionnant le « nom, prénom » du donateur ainsi que les justificatifs nécessaires pour confirmer que le don provient bien de la personne qui l'a envoyé.",
  },
];

export default function FAQBanner() {
  const [openIndexes, setOpenIndexes] = useState(() => new Set());

  const toggle = (i) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="countdown-banner countdown-banner-intro faq-banner">
      <p className="countdown-title">Questions fréquentes</p>
      <div className="faq-list">
        {FAQ_ITEMS.map((item, i) => {
          const open = openIndexes.has(i);
          return (
            <div className={`faq-item ${open ? "open" : ""}`} key={item.question}>
              <button type="button" className="faq-question" onClick={() => toggle(i)}>
                <ChevronDown className="faq-chevron" />
                <span>{item.question}</span>
              </button>
              {open && <p className="faq-answer">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
