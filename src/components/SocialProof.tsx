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
      <p className="text-center text-xs text-mute/60 mb-8 uppercase tracking-widest">
        Trusted by innovative companies
      </p>
      <div className="relative overflow-hidden">
        <div className="flex gap-16 animate-marquee">
          {[...clients, ...clients].map((client, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 text-lg font-display text-mute/30 hover:text-mute/50 transition-colors duration-sm"
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
