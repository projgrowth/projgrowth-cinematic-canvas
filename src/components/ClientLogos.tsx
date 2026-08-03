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

const ClientLogos = () => {
  return (
    <section className="section border-t border-line" aria-labelledby="clients-heading">
      <div className="container-site">
        <ScrollReveal variant="fade-up">
          <p
            id="clients-heading"
            className="eyebrow-mute mb-10 md:mb-12"
          >
            Trusted By
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center gap-y-12 gap-x-10">
            {clients.map((client) => (
              <li
                key={client.name}
                className="flex h-16 md:h-20 items-center justify-center"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  loading="lazy"
                  decoding="async"
                  width={180}
                  height={48}
                  className="h-full w-auto max-w-full object-contain opacity-80 transition-opacity duration-md hover:opacity-100"
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
