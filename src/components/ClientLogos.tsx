import ScrollReveal from "./ScrollReveal";

const clients = [
  { name: "GFG Solutions", logo: "/logos/gfg-solutions.png" },
  { name: "Smart Financial Planning", logo: "/logos/smart-financial.jpg" },
  { name: "Real Thread", logo: "/logos/real-thread.png" },
  { name: "Victoria Jewelers", logo: "/logos/victoria-jewelers.png" },
  { name: "Diverse Wealth", logo: "/logos/diverse-wealth.png" },
  { name: "Northwestern Mutual", logo: "/logos/northwestern-mutual.png" },
  { name: "Custom Dinks", logo: "/logos/custom-dinks.png" },
  { name: "Florida Private Providers", logo: "/logos/florida-private-providers.png" },
  { name: "Fritzler Law", logo: "/logos/fritzler-law.png" },
];

const ClientLogos = () => {
  return (
    <section className="container-site py-16 md:py-24 border-t border-line">
      <ScrollReveal variant="fade-up">
        <div className="text-center mb-12">
          <p className="text-mute text-sm uppercase tracking-widest mb-2">
            Trusted By
          </p>
          <h2 className="font-display text-2xl lg:text-3xl text-text">
            Industry Leaders
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.1}>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-center w-24 h-16 md:w-32 md:h-20"
              aria-label={client.name}
            >
              <img 
                src={client.logo} 
                alt={`${client.name} logo`}
                className="max-w-full max-h-full object-contain opacity-50 group-hover:opacity-80 transition-opacity duration-sm brightness-0 invert"
              />
            </div>
          ))}
        </div>
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
