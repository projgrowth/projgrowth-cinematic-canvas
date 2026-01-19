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
    <section className="container-site py-16 md:py-24 border-t border-line" aria-labelledby="clients-heading">
      <ScrollReveal variant="fade-up">
        <div className="text-center mb-12">
          <p className="text-mute text-sm uppercase tracking-widest mb-2">
            Trusted By
          </p>
          <h2 id="clients-heading" className="font-display text-2xl lg:text-3xl text-text">
            Industry Leaders
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.1}>
        <ul className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16" role="list" aria-label="Client logos">
          {clients.map((client, idx) => (
            <li
              key={idx}
              className="group flex items-center justify-center w-24 h-16 md:w-32 md:h-20"
            >
              <img 
                src={client.logo} 
                alt={`${client.name} logo`}
                loading="lazy"
                width={128}
                height={80}
                className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-sm"
              />
            </li>
          ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.2}>
        <p className="text-center text-mute text-sm mt-12">
          Join 50+ companies that trust us with their digital presence
        </p>
      </ScrollReveal>
    </section>
  );
};

export default ClientLogos;