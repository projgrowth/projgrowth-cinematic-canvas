interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const PageHeader = ({ children, className = "" }: PageHeaderProps) => (
  <div className={`relative ${className}`}>
    <div
      className="absolute -inset-x-8 top-0 h-64 pointer-events-none -z-0"
      aria-hidden="true"
      style={{ background: "radial-gradient(ellipse at 20% 50%, hsl(155 48% 54% / 0.06), transparent 65%)" }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);

export default PageHeader;
