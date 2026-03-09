import pgLogo from "@/assets/logos/pg-logo.png";

/**
 * Consistent page header component with leaf mark accent.
 * Used on inner pages (About, Services, Work, Contact) for visual cohesion.
 */
interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const PageHeader = ({ children, className = "" }: PageHeaderProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Atmospheric glow behind header */}
      <div
        className="absolute -top-4xl -left-8 w-[clamp(300px, 50vw, 600px)] h-[clamp(200px, 30vw, 500px)] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, hsl(155 42% 49% / 0.04), transparent 60%)",
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Leaf mark accent */}
      <div className="mt-6 md:mt-8 flex items-center gap-3" aria-hidden="true">
        <div className="h-px w-8 bg-accent/40" />
        <img
          src={pgLogo}
          alt=""
          className="h-3.5 w-auto opacity-20"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
    </div>
  );
};

export default PageHeader;
