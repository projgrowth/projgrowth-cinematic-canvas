import ScrollReveal from "./ScrollReveal";

const clients = [
  { name: "GFG Solutions", logo: "/logos/gfg-solutions.svg" },
  { name: "Real Thread", logo: "/logos/real-thread.svg" },
  { name: "Victoria Jewelers", logo: "/logos/victoria-jewelers.svg" },
  { name: "Diverse Wealth", logo: "/logos/diverse-wealth.svg" },
  { name: "Northwestern Mutual", logo: "/logos/northwestern-mutual.svg" },
  { name: "Custom Dinks", logo: "/logos/custom-dinks.svg" },
  { name: "Fritzler Law", logo: "/logos/fritzler-law.svg" },
];

const ClientLogos = () => {
  return (
    <section className="section border-t border-line" aria-labelledby="clients-heading">
      <div className="container-site">
        <ScrollReveal variant="fade-up">
          <p
            id="clients-heading"
            className="text-mute text-xs uppercase tracking-[0.18em] mb-10 md:mb-12"
          >
            Trusted By
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 items-center gap-y-10 gap-x-8">
            {clients.map((client) => (
              <li key={client.name} className="flex items-center justify-center lg:justify-start">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  loading="lazy"
                  decoding="async"
                  width={140}
                  height={40}
                  className="h-8 md:h-9 w-auto max-w-[140px] object-contain opacity-45 grayscale transition-all duration-md hover:opacity-90 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ClientLogos;
