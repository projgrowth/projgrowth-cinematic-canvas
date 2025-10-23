const SocialProof = () => {
  const clients = [
    "TechFlow",
    "Urban Nest",
    "FitCore",
    "CloudSync",
    "DataViz Pro",
    "EcoMarket"
  ];

  return (
    <div className="py-12 border-t border-line">
      <p className="text-center text-sm text-mute mb-8">
        Trusted by innovative companies
      </p>
      <div className="relative overflow-hidden">
        <div className="flex gap-12 animate-marquee">
          {[...clients, ...clients].map((client, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 text-xl font-display text-mute/50 hover:text-accent transition-colors duration-sm ease-smooth"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
