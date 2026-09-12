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

const ClientLogos = () => (
  <section className="home-client-rail" aria-labelledby="clients-heading">
    <div className="container-site">
      <ScrollReveal variant="fade-up">
        <div className="home-client-rail-inner">
          <p id="clients-heading" className="home-meta">Selected clients</p>
          <ul>
            {clients.map((client) => (
              <li key={client.name}>
                <img src={client.logo} alt={`${client.name} logo`} loading="lazy" decoding="async" width="180" height="48" />
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ClientLogos;
