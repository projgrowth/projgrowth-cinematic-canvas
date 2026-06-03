import { useEffect, useState, type ElementType, type ReactNode } from "react";

export function HeroArrival({
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
  children,
}: {
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <Tag
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 500ms ease-out, transform 500ms ease-out",
      }}
    >
      {children}
    </Tag>
  );
}
