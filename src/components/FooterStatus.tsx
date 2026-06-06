/**
 * Compact booking-status indicator used in the Footer brand block.
 * Mirrors the inline status row used on the Home hero.
 */
const FooterStatus = () => {
  return (
    <div className="inline-flex items-center gap-2 text-xs text-mute">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="tracking-wide">
        Booking Q3 2026 — limited engagements
      </span>
    </div>
  );
};

export default FooterStatus;