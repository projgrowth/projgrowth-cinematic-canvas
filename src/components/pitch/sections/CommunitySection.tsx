import BodyProse from "@/components/pitch/BodyProse";
import { ChapterMark } from "@/components/pitch/primitives/ChapterMark";
import { Reveal } from "@/components/pitch/primitives/Reveal";
import { GhostNumber } from "@/components/pitch/primitives/GhostNumber";
import AppMockups from "@/components/pitch/AppMockups";

const BULLETS = [
  {
    label: "Archive",
    body: "A home for the media, notes, scorecards, and moments that prove the event mattered.",
  },
  {
    label: "Operate",
    body: "A field captain keeps Discord practical: rooms, follow-up, drops, and member signals.",
  },
  {
    label: "Productize",
    body: "Only build app-like infrastructure after real behavior shows what members keep using.",
  },
];

function YearbookArtifact() {
  return (
    <Reveal delay={90}>
      <div className="media-frame yearbook-frame">
        <img
          src="/artifacts/yearbook-primary.png"
          alt="Premium Random Golf Club yearbook spread mockup for a destination golf trip"
          loading="lazy"
          decoding="async"
          className="media-frame__asset"
        />
        <div
          className="grid grid-cols-1 gap-5 md:grid-cols-[0.76fr_1.24fr] md:items-end"
          style={{ padding: "18px 4px 4px", color: "var(--paper)" }}
        >
          <p
            className="font-blackletter"
            style={{
              margin: 0,
              fontSize: "clamp(30px, 4.4vw, 48px)",
              lineHeight: 0.95,
              color: "var(--paper)",
            }}
          >
            The memory can keep working.
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "0.98rem",
              lineHeight: 1.65,
              color: "rgb(var(--paper-rgb) / 0.78)",
            }}
          >
            This is where the round lives after it ends. The event happens once; the memory,
            receipts, and artifacts can keep working for months.
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function CommunitySection() {
  return (
    <section
      data-section="community"
      className="paper-grain relative overflow-hidden section-y bg-paper"
    >
      <GhostNumber n="05" />
      <div className="pitch-grid relative z-10">
        <div className="pitch-grid__main">
          <ChapterMark n="05" label="THE MISSING LAYER" />
          <Reveal as="h2" className="h-section">
            One Missing <span className="accent">Layer.</span>
          </Reveal>

          <BodyProse>
            <p>
              The events already create the energy. This is not an app pitch. It starts practical:
              Discord as the room, a dedicated field captain keeping it alive, and only the pieces
              members actually use becoming infrastructure later.
            </p>
          </BodyProse>
        </div>

        <div className="pitch-grid__wide">
          <YearbookArtifact />
        </div>

        <div className="pitch-grid__main section-stack-lg grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.05fr)_320px] lg:gap-14">
          <Reveal>
            <div className="border-t border-[var(--hairline-strong)] pt-[22px]">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
                {BULLETS.map((item, index) => (
                  <div key={item.label}>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "'Space Mono', 'Courier New', monospace",
                        fontSize: "0.62rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--oxblood)",
                      }}
                    >
                      0{index + 1}
                    </p>
                    <h4 className="community-bullet-title">{item.label}.</h4>
                    <p className="body-sm" style={{ margin: 0 }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="community-note">
              <p
                className="meta-label"
                style={{ letterSpacing: "0.2em", opacity: 0.62, marginBottom: 12 }}
              >
                WHY THIS MATTERS
              </p>
              <p
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "0.98rem",
                  lineHeight: 1.72,
                  color: "var(--pencil)",
                  margin: 0,
                }}
              >
                The point is restraint. Start with an operating rhythm, not software: organize the
                room, deliver the memory, track what members actually ask for next.
              </p>
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 18,
                  borderTop: "1px solid var(--hairline-soft)",
                  display: "grid",
                  gap: 10,
                }}
              >
                {[
                  "Discord handles the first version.",
                  "The field captain keeps follow-up human.",
                  "The product roadmap comes from behavior, not guesses.",
                ].map((line) => (
                  <div key={line} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--oxblood)", lineHeight: 1 }}>•</span>
                    <p className="body-sm" style={{ margin: 0 }}>
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* AppMockups uses the wide lane but still obeys the master page grid */}
        <div className="pitch-grid__wide section-stack-lg">
          <p
            className="meta-label community-system-label"
            style={{ letterSpacing: "0.2em", opacity: 0.5, marginBottom: 10 }}
          >
            START IN DISCORD. BUILD WHAT PROVES ITSELF.
          </p>
          <AppMockups />
        </div>
      </div>
    </section>
  );
}
