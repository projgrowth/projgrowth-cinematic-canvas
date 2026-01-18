import ScrollReveal from "./ScrollReveal";

// Placeholder client logos with placeholder text
// Replace with actual client logo images when available
const clients = [
  { name: "TechCorp", placeholder: "TC" },
  { name: "Innovate Labs", placeholder: "IL" },
  { name: "Digital First", placeholder: "DF" },
  { name: "Growth Co", placeholder: "GC" },
  { name: "Future Systems", placeholder: "FS" },
  { name: "Creative Hub", placeholder: "CH" },
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
              className="group flex items-center justify-center w-24 h-16 md:w-32 md:h-20 text-mute hover:text-accent transition-colors duration-sm"
              aria-label={client.name}
            >
              {/* Placeholder logo - replace with actual images */}
              <span className="font-display text-2xl md:text-3xl font-medium opacity-60 group-hover:opacity-100 transition-opacity duration-sm">
                {client.placeholder}
              </span>
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
