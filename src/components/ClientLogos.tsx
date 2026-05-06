import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const clients = [
  { name: "GFG Solutions", logo: "/logos/gfg-solutions.svg" },
  { name: "Smart Financial Planning", logo: "/logos/smart-financial.png" },
  { name: "Real Thread", logo: "/logos/real-thread.svg" },
  { name: "Victoria Jewelers", logo: "/logos/victoria-jewelers.svg" },
  { name: "Diverse Wealth", logo: "/logos/diverse-wealth.svg" },
  { name: "Northwestern Mutual", logo: "/logos/northwestern-mutual.svg" },
  { name: "Custom Dinks", logo: "/logos/custom-dinks.svg" },
  { name: "Florida Private Providers", logo: "/logos/florida-private-providers.svg" },
  { name: "Fritzler Law", logo: "/logos/fritzler-law.svg" },
];

const LogoMarquee = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Check for reduced motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let animationId: number;
    let offset = 0;
    const speed = 0.5; // px per frame

    const animate = () => {
      offset += speed;
      // Reset when first set scrolls out
      const halfWidth = el.scrollWidth / 2;
      if (offset >= halfWidth) offset = 0;
      el.style.transform = `translateX(-${offset}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Duplicate logos for seamless loop
  const allLogos = [...clients, ...clients];

  return (
    <div className="overflow-hidden" role="list" aria-label="Client logos">
      <div ref={scrollRef} className="flex items-center gap-12 md:gap-16 lg:gap-20 will-change-transform">
        {allLogos.map((client, idx) => (
          <div
            key={idx}
            role="listitem"
            className="flex-shrink-0 flex items-center justify-center w-28 h-16 md:w-36 md:h-20"
          >
            <img
              src={client.logo}
              alt={`${client.name} logo`}
              loading="lazy"
              width={144}
              height={80}
              className="max-w-full max-h-full object-contain opacity-40 hover:opacity-80 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ClientLogos = () => {
  return (
    <section className="section border-t border-line" aria-labelledby="clients-heading">
      <ScrollReveal variant="fade-up">
        <div className="container-site text-center mb-12">
          <p id="clients-heading" className="text-mute text-sm uppercase tracking-widest">
            Trusted By
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.1}>
        <LogoMarquee />
      </ScrollReveal>
    </section>
  );
};

export default ClientLogos;
