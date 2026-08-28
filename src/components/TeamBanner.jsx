import samy from "../assets/team/samy.png";
import maxence from "../assets/team/maxence.png";
import clarisse from "../assets/team/clarisse.png";
import lucas from "../assets/team/lucas.png";

const TEAM = [
  { photo: samy, name: "Samy Meddahi", role: "Co-Founder", handle: "@" },
  { photo: maxence, name: "Maxence Lenormand", role: "Co-Founder", handle: "@" },
  { photo: clarisse, name: "Clarisse Schneider", role: "Co-Founder", handle: "@" },
  { photo: lucas, name: "Lucas Sarmento", role: "Co-Founder", handle: "@" },
];

export default function TeamBanner() {
  return (
    <section className="countdown-banner countdown-banner-intro team-banner">
      <p className="countdown-title">Contactez l'équipe fondatrice</p>
      <div className="team-grid">
        {TEAM.map((member) => (
          <div className="team-member" key={member.name}>
            <img className="team-photo" src={member.photo} alt={member.name} />
            <div className="team-name">{member.name}</div>
            <div className="team-role">{member.role}</div>
            <div className="team-handle">{member.handle}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
