import { ChapterMark } from "@/components/pitch/primitives/ChapterMark";
import { Reveal } from "@/components/pitch/primitives/Reveal";
import { GhostNumber } from "@/components/pitch/primitives/GhostNumber";

type Card = {
  title: string;
  role: string;
  proof: string;
  body: string;
  rgc: string;
  featured?: boolean;
};

const mono = "'Space Mono', 'Courier New', monospace";

const CARDS: Card[] = [
  {
    title: "Built a golf room from scratch",
    role: "01 · golf rooms / community",
    proof: "16 founding players → waitlist in six weeks",
    body: "Built the format, identity, drops, invitation rhythm, inside jokes, and recap content that made people want in.",
    rgc: "For RGC: I can build the room before the event and make the invite feel earned.",
    featured: true,
  },
  {
    title: "Built the content backend",
    role: "02 · content systems",
    proof: "six-phase portal · approvals · publishing workflow",
    body: "Built the operating system for a production studio: prep, recording, post, approval, asset delivery, and publishing in one clean flow.",
    rgc: "For RGC: I can turn moments into clips, recaps, emails, drops, and follow-up.",
    featured: true,
  },
  {
    title: "Built a drop/referral loop",
    role: "03 · drops / distribution",
    proof: "3D customizer · daily showcase · referral engine",
    body: "Built a real-time product customizer, then turned customer designs into launch content, retention, and referral distribution.",
    rgc: "For RGC: I can make drops feel personal enough for the community to carry.",
  },
  {
    title: "Designed premium hospitality",
    role: "04 · premium hospitality",
    proof: "HNW guests · custom gear · concierge details",
    body: "Designed a high-touch trip where every guest felt known before arrival — hand-delivered invites, favorite food, personalized gear, and details built around them.",
    rgc: "For RGC: I can make premium trips feel hosted, personal, and worth paying up for.",
  },
  {
    title: "Hosted golf as a relationship engine",
    role: "05 · event revenue",
    proof: "25 clients · 18th-hole hospitality · referral momentum",
    body: "Produced a marquee golf hospitality day that made client relationships warmer, more social, and easier to extend.",
    rgc: "For RGC: I can make golf events create relationships, referrals, and repeat demand.",
  },
  {
    title: "Made boring work feel cultural",
    role: "06 · earned attention",
    proof: "24 reels/month · wearable merch · referrals doubled",
    body: "Built a content engine and voice for a financial advisor in a category with almost no cultural oxygen — and made people follow, share, wear, and refer.",
    rgc: "For RGC: if people quote it, wear it, or share it, the marketing is moving.",
  },
];

const FIT = [
  ["Community", "rooms that fill"],
  ["Content systems", "clips → follow-up"],
  ["Drops", "personalized loops"],
  ["Hospitality", "premium experience"],
  ["Lifecycle", "CRM + reporting"],
];

function FitRail() {
  return (
    <Reveal delay={80}>
      <div className="fit-rail mt-10 grid grid-cols-2 gap-px md:grid-cols-5">
        {FIT.map(([label, value], i) => (
          <div
            key={label}
            className={`fit-rail__cell ${i === FIT.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
          >
            <p
              style={{
                margin: 0,
                fontFamily: mono,
                fontSize: "0.54rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--oxblood)",
              }}
            >
              {label}
            </p>
            <p
              style={{
                margin: "8px 0 0",
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "0.86rem",
                lineHeight: 1.35,
                color: "rgb(var(--bone-rgb) / 0.88)",
              }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export function WorkSection() {
  return (
    <section
      data-section="work"
      className="paper-grain relative overflow-hidden section-y bg-paper"
    >
      <GhostNumber n="04" />
      <div className="pitch-grid relative z-10">
        <div className="pitch-grid__main">
          <ChapterMark n="04" label="RECEIPTS" />
          <Reveal as="h2" className="h-section">
            The <span className="accent">Receipts.</span>
          </Reveal>
          <p className="section-intro">
            Not a logo wall. Receipts for the pieces RGC is hiring around: community, content
            systems, drops, premium events, lifecycle, and earned attention.
          </p>

          <FitRail />

          <div className="framed-grid artifact-stack grid grid-cols-1 gap-px md:grid-cols-2">
            {CARDS.map((card, i) => (
              <Reveal
                key={card.title}
                delay={i * 55}
                style={i === 0 || i === CARDS.length - 1 ? { gridColumn: "1 / -1" } : undefined}
              >
                <article className={card.featured ? "work-card work-card--featured" : "work-card"}>
                  <div className="work-card__topline">
                    <p
                      style={{
                        margin: 0,
                        fontFamily: mono,
                        fontSize: "0.58rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--oxblood)",
                      }}
                    >
                      {card.role}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: mono,
                        fontSize: "0.5rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgb(var(--pencil-rgb) / 0.44)",
                        textAlign: "right",
                      }}
                    >
                      receipt 0{i + 1}
                    </p>
                  </div>
                  <h3 className="work-card__title">{card.title}</h3>
                  <p className="work-card__proof">{card.proof}</p>
                  <p className="type-body" style={{ margin: "2px 0 0" }}>
                    {card.body}
                  </p>
                  <p className="work-card__rgc">{card.rgc}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <p
              className="work-footer-meta meta-label mt-10 text-center"
              style={{ letterSpacing: "0.22em", opacity: 0.54 }}
            >
              proof ledger · community / content / drops / events / systems
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
