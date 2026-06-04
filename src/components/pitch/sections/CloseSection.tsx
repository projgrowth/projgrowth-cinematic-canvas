import { useState } from "react";

import BodyProse from "@/components/pitch/BodyProse";
import { ChapterMark } from "@/components/pitch/primitives/ChapterMark";
import { Reveal } from "@/components/pitch/primitives/Reveal";
import { GhostNumber } from "@/components/pitch/primitives/GhostNumber";

const paper = "var(--paper)";
const paperFaint = (o: number) => `rgb(var(--paper-rgb) / ${o})`;

function FieldCutFrame() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Reveal delay={120}>
      <div className="pitch-grid relative z-10 close-film-stage">
        <div className="pitch-grid__wide">
          <div className="close-video-frame close-video-frame--cinematic">
            <div className="close-video-frame__inner">
              <div className="field-monitor__topbar" aria-hidden>
                <span className="field-monitor__rec">
                  <span />
                  REC
                </span>
                <span>RGC FIELD TAPE · ORLANDO</span>
                <span>16:9 · AUDIO READY</span>
              </div>
              <div className="close-video-frame__media close-video-frame__media--landscape">
                {isPlaying ? (
                  <video
                    src="/artifacts/rgc-field-film.mp4?v=3"
                    poster="/artifacts/rgc-field-film-poster.jpg?v=3"
                    controls
                    playsInline
                    preload="metadata"
                    autoPlay
                  />
                ) : (
                  <button
                    type="button"
                    className="field-film-poster"
                    onClick={() => setIsPlaying(true)}
                    aria-label="Play the RGC field film"
                  >
                    <img
                      src="/artifacts/rgc-field-film-poster.jpg?v=3"
                      alt=""
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                    <span className="field-film-poster__scrim" aria-hidden />
                    <span className="field-film-poster__scanlines" aria-hidden />
                    <span className="field-film-poster__play" aria-hidden>
                      ▶
                    </span>
                    <span className="field-film-poster__label">Play field film</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto] md:items-center">
                <p
                  style={{
                    margin: 0,
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "0.92rem",
                    lineHeight: 1.55,
                    color: paperFaint(0.78),
                  }}
                >
                  This was already happening. RGC just gives it somewhere to go.
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "'Space Mono', 'Courier New', monospace",
                    fontSize: "0.56rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: paperFaint(0.5),
                  }}
                >
                  Orlando · field film · audio on
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function CloseSection() {
  return (
    <section
      data-section="close"
      className="film-grain close-section relative overflow-hidden"
      style={{
        background: "var(--forest)",
        color: paper,
      }}
    >
      <GhostNumber n="06" />
      <div className="pitch-grid relative z-10">
        <div className="pitch-grid__editorial">
          <ChapterMark n="06" label="THE CLOSE" onForest />

          <Reveal as="h2" className="h-section h-section-onforest" style={{ color: paper }}>
            <span
              className="block"
              style={{
                fontSize: "clamp(56px, 11vw, 120px)",
                lineHeight: 0.96,
                letterSpacing: "-0.005em",
                color: paper,
              }}
            >
              I'm already
            </span>
            <span
              className="block"
              style={{
                fontSize: "clamp(56px, 11vw, 120px)",
                lineHeight: 0.96,
                letterSpacing: "-0.005em",
                color: paper,
              }}
            >
              <span className="accent">going.</span>
            </span>
          </Reveal>

          <BodyProse onForest>
            <p style={{ color: paper }}>
              The road was already booked. Playing, filming, editing, building — that's the plan
              regardless of what's on my business card. This role didn't change the direction. It
              just made it make sense to do it together.
            </p>
            <p style={{ color: paper }}>
              I'm already living it. I just want to build the thing that makes it bigger.
            </p>
          </BodyProse>

          <Reveal delay={90}>
            <p className="close-field-note">
              Field cut from Orlando. The kind of thing I&apos;d want every RGC event creating
              behind it.
            </p>
          </Reveal>
        </div>
      </div>

      <FieldCutFrame />

      <footer className="pitch-container close-footer">
        <a href="mailto:dan@projgrowth.com" className="close-footer__email">
          dan@projgrowth.com
        </a>
        <p className="meta-label close-footer__meta">
          PROJGROWTH.COM · ORLANDO, FL · FIELD CUT FOR RGC
        </p>
        <p className="hand-accent" style={{ fontSize: 18, color: paper }}>
          hcp 9
        </p>
      </footer>
    </section>
  );
}
