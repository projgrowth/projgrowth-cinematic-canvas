import { ChapterMark } from "@/components/pitch/primitives/ChapterMark";
import { Reveal } from "@/components/pitch/primitives/Reveal";
import { GhostNumber } from "@/components/pitch/primitives/GhostNumber";

const mono = "'Space Mono', 'Courier New', monospace";
const serif = "'Lora', Georgia, serif";

const TEE_SHEET = [
  {
    n: "01",
    label: "Get around the culture carriers",
    meta: "good sticks · connectors · good hangs",
    body: "Start with the guys who already shape the room: scratch players, club regulars, connectors, and the people everyone actually wants paired with.",
  },
  {
    n: "02",
    label: "Put stakes on Friday skins",
    meta: "$100 pot · drinks · four tickets",
    body: "Put $100 into the skins game, bring drinks, and make four RGC tickets worth playing for: top two players plus two closest-to-pin winners.",
    active: true,
  },
  {
    n: "03",
    label: "Comp the first four tickets",
    meta: "top 2 · CTP 2 · open door",
    body: "Let good players set the tone, not the barrier. The CTP spots pull in personality guys and newer players without making the event feel closed off.",
  },
  {
    n: "04",
    label: "Make the day feel earned",
    meta: "marker · camera · scorecard",
    body: "Use the rest on the object, capture, scorecard, and details that make the day feel discovered instead of promoted.",
  },
  {
    n: "05",
    label: "Let proof fill the next card",
    meta: "clips · quotes · return signal",
    body: "Player clips, selects, scorecards, and the field note become the reason the next group asks in before the recap even finishes posting.",
  },
];

function BudgetSlip() {
  const rows = [
    ["skins / drinks", "$150"],
    ["tickets / prizes", "$250"],
    ["creator capture", "$200"],
    ["marker / artifact", "$300"],
    ["paid spark", "$100"],
  ];
  return (
    <Reveal delay={90}>
      <div className="budget-slip">
        <div className="dashed-card">
          <p
            style={{
              margin: 0,
              fontFamily: mono,
              fontSize: "0.56rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--oxblood)",
            }}
          >
            the brief · sell out the room
          </p>
          <p
            className="font-blackletter"
            style={{
              margin: "10px 0 4px",
              fontSize: "clamp(52px, 9vw, 96px)",
              lineHeight: 0.88,
              color: "var(--ink)",
            }}
          >
            $1,000
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: serif,
              fontSize: "0.98rem",
              lineHeight: 1.55,
              color: "var(--pencil)",
            }}
          >
            Not ad spend. Seed money to get inside the room, create proof, and make the first field
            feel inevitable.
          </p>
          <div
            className="budget-slip__rows"
            style={{
              marginTop: 18,
              display: "grid",
              gap: 0,
              borderTop: "1px solid var(--hairline)",
            }}
          >
            {rows.map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 18,
                  borderBottom: "1px solid var(--hairline)",
                  padding: "10px 0",
                }}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: "0.56rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgb(var(--pencil-rgb) / 0.58)",
                  }}
                >
                  {label}
                </span>
                <span style={{ fontFamily: mono, fontSize: "0.62rem", color: "var(--pencil)" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function BallMarkerArtifact() {
  const details = ["every player gets one", "city-specific", "collect the cities"];

  return (
    <Reveal delay={115}>
      <div className="artifact-marker mt-6">
        <img
          src="/artifacts/rgc-city-marker.png"
          alt="RGC Orlando city marker and Mad Scramble Tour collectible marker mockup"
          loading="lazy"
          decoding="async"
          className="artifact-marker__image"
        />
        <div className="artifact-marker__copy">
          <p className="meta-label" style={{ margin: 0, color: "rgba(245,240,232,0.56)" }}>
            the artifact
          </p>
          <h3
            className="font-blackletter"
            style={{ margin: "8px 0 0", fontSize: "2rem", color: "var(--paper)" }}
          >
            City marker.
          </h3>
          <p
            style={{
              margin: "10px 0 0",
              fontFamily: serif,
              fontSize: "0.9rem",
              lineHeight: 1.55,
              color: "rgba(245,240,232,0.76)",
            }}
          >
            The drop shouldn&apos;t say RGC. It should say I was there.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {details.map((detail) => (
            <span
              key={detail}
              style={{
                border: "1px solid rgba(216,195,153,0.28)",
                padding: "7px 9px",
                fontFamily: mono,
                fontSize: "0.48rem",
                letterSpacing: "0.11em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.72)",
                background: "rgba(245,240,232,0.06)",
              }}
            >
              {detail}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function TeeSheetModule() {
  return (
    <Reveal delay={170}>
      <div className="tee-sheet-card mt-12">
        <div
          className="grid grid-cols-1 gap-0 lg:grid-cols-[0.82fr_1.18fr]"
          style={{ borderBottom: "1px solid var(--hairline)" }}
        >
          <div style={{ padding: "24px 24px 22px", borderRight: "1px solid var(--hairline)" }}>
            <p
              style={{
                margin: 0,
                fontFamily: mono,
                fontSize: "0.56rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--oxblood)",
              }}
            >
              the tee sheet
            </p>
            <h3 className="system-sheet-title">Build the field before the flyer.</h3>
            <p
              style={{
                margin: "16px 0 0",
                fontFamily: serif,
                fontSize: "1rem",
                lineHeight: 1.68,
                color: "var(--pencil)",
              }}
            >
              In golf, the pairing is half the pitch. Get the first card right and the invite stops
              feeling like promotion — it starts feeling like something people want to be part of.
            </p>
          </div>
          <div className="grid grid-cols-1" style={{ background: "var(--hairline)", gap: 1 }}>
            {TEE_SHEET.map((row) => (
              <div
                key={row.n}
                className={
                  row.active
                    ? "strategy-row strategy-row--active grid grid-cols-1 gap-2 lg:grid-cols-[56px_220px_minmax(0,1fr)] lg:gap-5"
                    : "strategy-row grid grid-cols-1 gap-2 lg:grid-cols-[56px_220px_minmax(0,1fr)] lg:gap-5"
                }
                style={{ background: "var(--paper)", padding: "17px 18px", alignItems: "start" }}
              >
                <p className="strategy-row__number">{row.n}</p>
                <div>
                  <p className="strategy-row__label">{row.label}</p>
                  <p className="strategy-row__meta">{row.meta}</p>
                </div>
                <p className="strategy-row__body">{row.body}</p>
              </div>
            ))}
          </div>
        </div>
        <p
          style={{
            margin: 0,
            padding: "16px 24px",
            fontFamily: serif,
            fontSize: "0.96rem",
            lineHeight: 1.55,
            color: "var(--pencil)",
            fontStyle: "italic",
          }}
        >
          I&apos;d build the room first. By the time the flyer goes out, the room already has a
          pulse.
        </p>
      </div>
    </Reveal>
  );
}

export function ThousandTestSection() {
  return (
    <section
      data-section="thousand-test"
      className="paper-grain relative overflow-hidden section-y bg-paper"
    >
      <GhostNumber n="02" />
      <div className="pitch-grid relative z-10">
        <div className="pitch-grid__main">
          <div className="section-heading-block">
            <ChapterMark n="02" label="THE TEST" />
            <Reveal as="h2" className="h-section">
              Dropped In. <span className="accent">$1,000.</span> Sell It Out.
            </Reveal>
            <Reveal delay={60}>
              <p className="section-intro">
                The assignment is not really “how would I spend $1,000?” It&apos;s “can I get inside
                a city&apos;s golf room fast enough to make the event feel inevitable?” I
                wouldn&apos;t start with a flyer. I&apos;d start with the first foursomes.
              </p>
            </Reveal>
          </div>

          <TeeSheetModule />

          <div className="artifact-stack thousand-support-grid">
            <div className="thousand-support-rail">
              <BudgetSlip />
            </div>
            <div className="thousand-support-rail">
              <BallMarkerArtifact />
            </div>
            <Reveal delay={170}>
              <p className="thousand-proof-note hand-accent">
                The round is the proof. The money is just the spark.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
