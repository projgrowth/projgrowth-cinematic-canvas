import { ChapterMark } from "@/components/pitch/primitives/ChapterMark";
import { Reveal } from "@/components/pitch/primitives/Reveal";

const mono = "'Space Mono', 'Courier New', monospace";
const serif = "'Lora', Georgia, serif";

type Lane = { title: string; body: string };
type Phase = {
  n: string;
  range: string;
  title: string;
  goal: string;
  owns: string[];
  output: string;
};

const LANES: Lane[] = [
  {
    title: "Lifecycle / CRM",
    body: "Post-event flows, drop flows, member follow-up, email, and the next right move.",
  },
  {
    title: "Paid media",
    body: "Use paid as signal amplification around warm demand, not generic cold traffic.",
  },
  {
    title: "Content calendar",
    body: "Turn RGC output into rhythm: story → invite → event → recap → return.",
  },
  {
    title: "Drops",
    body: "Make merch feel like proof you were there, not inventory that needs pushing.",
  },
  {
    title: "Events",
    body: "Build the before and after, not just the day-of moment.",
  },
  {
    title: "Reporting",
    body: "One board for paid, email, site/SEO, events, drops, and what actually compounded.",
  },
];

const PHASES: Phase[] = [
  {
    n: "01",
    range: "DAYS 1–15",
    title: "Read the room.",
    goal: "Understand where energy is hiding and where it fades.",
    owns: [
      "member interviews",
      "event/drop audit",
      "Shopify/Klaviyo/paid review",
      "top audience segments",
    ],
    output: "The RGC Momentum Map",
  },
  {
    n: "02",
    range: "DAYS 16–35",
    title: "Build the growth spine.",
    goal: "Connect content, CRM, email, paid, drops, site/SEO, and events into one behaving system.",
    owns: [
      "post-event flows",
      "drop launch flows",
      "warm retargeting",
      "8-week content/revenue calendar",
    ],
    output: "One operating board",
  },
  {
    n: "03",
    range: "DAYS 36–55",
    title: "Run the wager.",
    goal: "Prove the loop in one city: first foursomes, tee sheet, player clips, city marker, field report, follow-up signal.",
    owns: ["first foursomes", "tee sheet", "city marker", "field report"],
    output: "One city case study",
  },
  {
    n: "04",
    range: "DAYS 56–75",
    title: "Turn it into a playbook.",
    goal: "Make the test repeatable without sanding off the soul that made it work.",
    owns: [
      "templates",
      "partner/sponsor angle",
      "next-city criteria",
      "reporting rhythm",
    ],
    output: "The RGC City Playbook",
  },
  {
    n: "05",
    range: "DAYS 76–90",
    title: "Decide what becomes platform.",
    goal: "Only build product from real behavior: rounds created, drops wanted, cities lighting up, members returning.",
    owns: [
      "top-100 member beta",
      "round planner brief",
      "city room concept",
      "next 90-day roadmap",
    ],
    output: "A real infrastructure decision",
  },
];

/* Light-on-forest color helpers */
const bone = "rgb(var(--bone-rgb) / 1)";
const boneFaint = (o: number) => `rgb(var(--bone-rgb) / ${o})`;

function LaneBoard() {
  return (
    <Reveal delay={80}>
      <div className="ninety-lane-strip mt-8">
        <p className="meta-label ninety-lane-strip__label">
          I’d own all six lanes
        </p>
        <div className="ninety-lane-strip__grid">
          {LANES.map((lane) => (
            <div key={lane.title} className="ninety-lane-chip">
              <span>{lane.title}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function PhaseMap() {
  return (
    <Reveal delay={120}>
      <div className="ninety-roadmap mt-8">
        <div className="ninety-roadmap__header">
          <p className="meta-label">field plan</p>
          <p>
            Read the room, connect the machine, prove the loop, then write the
            playbook from what actually happened.
          </p>
        </div>

        <div className="ninety-roadmap__rows">
          {PHASES.map((phase, index) => {
            const isTest = index === 2;
            return (
              <article
                key={phase.n}
                className={
                  isTest ? "ninety-row ninety-row--active" : "ninety-row"
                }
              >
                <div className="ninety-row__number">
                  <span>{phase.n}</span>
                  <p>{phase.range}</p>
                </div>

                <div className="ninety-row__main">
                  <div className="ninety-row__titleline">
                    <h3>{phase.title}</h3>
                    {isTest && <span>Launch the $1K test</span>}
                  </div>
                  <p>{phase.goal}</p>
                  {isTest && (
                    <div className="ninety-row__chips">
                      {phase.owns.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="ninety-row__output">
                  <p className="meta-label">output</p>
                  <strong>{phase.output}</strong>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

export function NinetyDaysSection() {
  return (
    <section
      data-section="ninety-days"
      className="paper-grain relative section-y"
      style={{ background: "var(--forest)" }}
    >
      <div className="pitch-grid relative z-10">
        <div className="pitch-grid__wide">
          <ChapterMark n="03" label="90 DAYS" onForest />
          <Reveal as="h2" className="h-section h-section-onforest">
            The First 90 <span className="accent">Days.</span>
          </Reveal>
          <Reveal delay={60}>
            <p className="section-intro section-intro--forest">
              The job is the connective tissue: lifecycle, paid, content, drops,
              events, reporting — connected around one city test that proves the
              loop can repeat.
            </p>
          </Reveal>
          <LaneBoard />
          <div className="section-stack-md">
            <PhaseMap />
          </div>
          <Reveal delay={220}>
            <div
              className="section-stack-md"
              style={{
                border: `1px solid ${boneFaint(0.12)}`,
                background: boneFaint(0.045),
                padding: "24px 26px",
              }}
            >
              <p
                className="meta-label"
                style={{
                  margin: 0,
                  color: boneFaint(0.48),
                  letterSpacing: "0.18em",
                }}
              >
                day 90 receipt
              </p>
              <p
                className="font-blackletter"
                style={{
                  margin: "10px 0 0",
                  color: bone,
                  fontSize: "clamp(34px, 5vw, 54px)",
                  lineHeight: 0.95,
                }}
              >
                One city test. One playbook. One real decision.
              </p>
              <p
                style={{
                  margin: "14px 0 0",
                  fontFamily: serif,
                  fontSize: "0.98rem",
                  lineHeight: 1.65,
                  color: boneFaint(0.76),
                  maxWidth: "68ch",
                }}
              >
                By day 90, RGC would know which clips got shared, which players
                came back, which drops felt earned, and what is worth turning
                into infrastructure.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
