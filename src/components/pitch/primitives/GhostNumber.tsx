export function GhostNumber({ n }: { n: string }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        top: "-0.18em",
        right: 0,
        fontFamily: "'Space Mono', 'Courier New', monospace",
        fontSize: "clamp(110px, 22vw, 220px)",
        fontWeight: 900,
        lineHeight: 1,
        color: "rgb(var(--pencil-rgb) / 0.07)",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        letterSpacing: "-0.04em",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      {n}
    </span>
  );
}
