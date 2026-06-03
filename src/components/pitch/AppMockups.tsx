import type { ReactNode } from "react";

const ACCENT = "var(--oxblood)";
const INK = "var(--ink)";
const MUTED = "var(--graphite)";
const PAPER = "var(--paper)";
const HAIRLINE = "var(--hairline)";
const serif = "'Lora', Georgia, serif";

function Pill({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return <span className={accent ? "mono-chip mono-chip--accent" : "mono-chip"}>{children}</span>;
}

function ClipCard() {
  return (
    <div className="concept-card concept-card--forest">
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 72% 18%, rgba(245,240,232,0.12), transparent 30%), repeating-linear-gradient(0deg, rgba(245,240,232,0.025) 0px, rgba(245,240,232,0.025) 1px, transparent 1px, transparent 5px)",
          opacity: 0.65,
        }}
      />
      <div style={{ position: "relative" }}>
        <p className="meta-label" style={{ margin: 0, color: "rgb(var(--paper-rgb) / 0.56)" }}>
          field archive · 00:07
        </p>
        <p className="concept-card__hero" style={{ color: PAPER }}>
          The round has a place to land.
        </p>
      </div>
      <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Pill accent>Send to player</Pill>
        <Pill>Post in city room</Pill>
        <Pill>Save field report</Pill>
      </div>
    </div>
  );
}

function FieldReport() {
  return (
    <div
      className="concept-card"
      style={{ background: "linear-gradient(180deg, #fbf7ef 0%, #f1e8d8 100%)", padding: 22 }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "start" }}
      >
        <div>
          <p className="meta-label" style={{ margin: 0, color: MUTED }}>
            field archive
          </p>
          <h4 className="concept-card__title">After the round.</h4>
        </div>
        <Pill accent>Archive</Pill>
      </div>
      <div className="concept-stats mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          ["clips", "18"],
          ["photos", "34"],
          ["asks in", "11"],
        ].map(([label, value]) => (
          <div key={label} style={{ borderTop: `1px solid ${HAIRLINE}`, paddingTop: 12 }}>
            <p
              className="font-blackletter"
              style={{ margin: 0, fontSize: 34, color: ACCENT, lineHeight: 1 }}
            >
              {value}
            </p>
            <p className="meta-label" style={{ margin: "7px 0 0", color: MUTED }}>
              {label}
            </p>
          </div>
        ))}
      </div>
      <p className="concept-card__body">
        Save the proof, deliver the clips, watch what people ask for, and keep the city room human.
      </p>
    </div>
  );
}

function CityRoom() {
  return (
    <div className="concept-card grid gap-3.5">
      <p className="meta-label" style={{ margin: 0, color: MUTED }}>
        discord field room · orlando
      </p>
      {[
        ["City", "who is active / what they want"],
        ["Media", "clips / photos / notes"],
        ["Artifacts", "yearbook / marker"],
        ["Signal", "what repeats"],
      ].map(([label, value]) => (
        <div
          key={label}
          style={{
            display: "grid",
            gridTemplateColumns: "130px 1fr",
            gap: 12,
            borderTop: `1px solid ${HAIRLINE}`,
            paddingTop: 12,
          }}
        >
          <p className="meta-label" style={{ margin: 0, color: ACCENT, letterSpacing: "0.13em" }}>
            {label}
          </p>
          <p style={{ margin: 0, fontFamily: serif, fontSize: 14, lineHeight: 1.45, color: INK }}>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

function ConceptBoard() {
  return (
    <div className="concept-board">
      <div className="concept-board__header">
        <div>
          <p className="meta-label" style={{ margin: 0, color: MUTED }}>
            START IN DISCORD
          </p>
          <p style={{ margin: "7px 0 0", fontFamily: serif, fontSize: 14, color: INK }}>
            A field captain, a Discord room, and a clean archive first. Software only after the
            behavior earns it.
          </p>
        </div>
        <Pill accent>field captain</Pill>
      </div>

      <div className="concept-board__grid grid grid-cols-1 gap-px lg:grid-cols-[0.82fr_1.18fr]">
        <ClipCard />
        <FieldReport />
      </div>
      <div className="concept-board__grid grid grid-cols-1 gap-px lg:grid-cols-[1.1fr_0.9fr]">
        <CityRoom />
        <div className="concept-card" style={{ background: "#f7f0e3", padding: 22 }}>
          <p className="meta-label" style={{ margin: 0, color: MUTED }}>
            what compounds
          </p>
          <p className="concept-card__title" style={{ marginTop: 12 }}>
            Keep it human first.
          </p>
          <p className="concept-card__body">
            Discord is the clubhouse. The archive is the receipt. The product roadmap comes from
            what members keep doing without being pushed.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AppMockups() {
  return (
    <div className="concept-board-wrap">
      <ConceptBoard />
    </div>
  );
}
