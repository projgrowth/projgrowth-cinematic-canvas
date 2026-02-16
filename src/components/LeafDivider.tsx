import pgLogo from "@/assets/logos/pg-logo.png";

/**
 * A subtle section divider featuring the PG leaf logo
 * as a centered accent mark between major sections.
 */
const LeafDivider = () => {
  return (
    <div className="flex items-center justify-center gap-6 py-2" aria-hidden="true">
      <div className="h-px w-16 bg-line" />
      <img
        src={pgLogo}
        alt=""
        className="h-4 w-auto opacity-15"
        style={{ filter: "brightness(0) invert(1)" }}
      />
      <div className="h-px w-16 bg-line" />
    </div>
  );
};

export default LeafDivider;
