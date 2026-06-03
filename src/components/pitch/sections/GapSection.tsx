import BodyProse from "@/components/pitch/BodyProse";
import { ChapterMark } from "@/components/pitch/primitives/ChapterMark";
import { Reveal } from "@/components/pitch/primitives/Reveal";
import { GhostNumber } from "@/components/pitch/primitives/GhostNumber";

import { Fragment } from "react";

const mono = "'Space Mono', 'Courier New', monospace";
const serif = "'Lora', Georgia, serif";

const LOOP = ["event", "clips", "player reposts", "new people ask", "next invite"];

function EnergyLoop() {
  return (
    <Reveal delay={90}>
      <div className="opportunity-loop">
        {/* Horizontal flow strip */}
        <div className="opportunity-loop__strip">
          <p
            style={{
              margin: 0,
              fontFamily: mono,
              fontSize: "0.54rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgb(var(--pencil-rgb) / 0.44)",
            }}
          >
            the momentum loop
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 12,
              alignItems: "center",
            }}
          >
            {LOOP.map((item, index) => (
              <Fragment key={item}>
                <span
                  style={{
                    background:
                      index === 0 || index === 3 ? "var(--oxblood)" : "rgb(var(--bone-rgb) / 0.7)",
                    color: index === 0 || index === 3 ? "var(--paper)" : "var(--pencil)",
                    border: index === 0 || index === 3 ? "none" : "1px solid var(--hairline)",
                    padding: "7px 11px",
                    fontFamily: mono,
                    fontSize: "0.52rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </span>
                {index < LOOP.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      color: "var(--oxblood)",
                      fontFamily: mono,
                      fontSize: "0.58rem",
                      opacity: 0.7,
                    }}
                  >
                    →
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Center panel — the room */}
        <div className="opportunity-loop__room">
          <p
            className="font-blackletter"
            style={{
              margin: 0,
              fontSize: "clamp(38px, 5.5vw, 64px)",
              lineHeight: 0.9,
              color: "var(--ink)",
            }}
          >
            After the round
          </p>
          <p
            style={{
              margin: "12px auto 0",
              maxWidth: 270,
              fontFamily: serif,
              fontSize: "0.9rem",
              lineHeight: 1.55,
              color: "rgb(var(--pencil-rgb) / 0.68)",
            }}
          >
            The texts, clips, and follow-up rounds that happen when the event has somewhere to go.
          </p>
        </div>

        {/* Caption */}
        <div className="opportunity-loop__caption">
          <p
            style={{
              margin: 0,
              fontFamily: serif,
              fontSize: "0.9rem",
              lineHeight: 1.55,
              color: "var(--pencil)",
            }}
          >
            The opportunity is not more noise. It is a cleaner home for the energy that already
            exists.
          </p>
          <p
            className="hand-accent"
            style={{ margin: 0, fontSize: 26, transform: "rotate(-2deg)", whiteSpace: "nowrap" }}
          >
            this is already happening
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function GapSection() {
  return (
    <section
      data-section="opportunity"
      className="paper-grain paper-rule relative overflow-hidden bg-bone py-24 md:py-32"
    >
      <GhostNumber n="01" />
      <div className="pitch-grid relative z-10">
        <div className="pitch-grid__main opportunity-grid">
          <div>
            <ChapterMark n="01" label="THE OPPORTUNITY" />
            <Reveal as="h2" className="h-section">
              The Energy Is <span className="accent">Already There.</span>
            </Reveal>

            <BodyProse>
              <p>
                RGC already did the hardest part: it made golf feel like something people want to
                belong to.
              </p>
              <p>
                The events, films, drops, city chapters, and inside jokes all point to the same
                thing: people want the group text, the pairing, the memory, and the reason to come
                back — not just the tee time.
              </p>
            </BodyProse>

            <Reveal delay={70}>
              <div className="opportunity-card">
                <p
                  className="font-blackletter"
                  style={{
                    margin: 0,
                    fontSize: "clamp(34px, 4.2vw, 52px)",
                    lineHeight: 0.96,
                    color: "var(--paper)",
                  }}
                >
                  Let the round keep moving.
                </p>
                <p
                  style={{
                    margin: "16px 0 0",
                    fontFamily: serif,
                    fontSize: "0.98rem",
                    lineHeight: 1.68,
                    color: "rgb(var(--paper-rgb) / 0.82)",
                  }}
                >
                  The job is not to manufacture demand. It is to organize the energy RGC already
                  creates: media, follow-up, drops, rounds, and the next reason to gather.
                </p>
                <p
                  style={{
                    margin: "18px 0 0",
                    fontFamily: mono,
                    fontSize: "0.58rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgb(var(--paper-rgb) / 0.56)",
                  }}
                >
                  where I can help immediately
                </p>
                <p
                  style={{
                    margin: "12px 0 0",
                    fontFamily: serif,
                    fontSize: "0.92rem",
                    lineHeight: 1.62,
                    color: "rgb(var(--paper-rgb) / 0.76)",
                    fontStyle: "italic",
                  }}
                >
                  I was already filming rounds. Players were asking for clips. That is the signal:
                  the media is part of the event value, not an afterthought.
                </p>
              </div>
            </Reveal>
          </div>

          <EnergyLoop />
        </div>
      </div>
    </section>
  );
}
