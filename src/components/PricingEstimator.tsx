import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PricingEstimator = () => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [displayTotal, setDisplayTotal] = useState(0);

  const services = [
    { id: "brand", name: "Brand Strategy", basePrice: 8000 },
    { id: "design", name: "Digital Design", basePrice: 12000 },
    { id: "development", name: "Development", basePrice: 20000 },
    { id: "growth", name: "Growth", basePrice: 6000 }
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const estimatedTotal = services
    .filter(s => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + s.basePrice, 0);

  // Animate the total
  useEffect(() => {
    const duration = 300;
    const startTime = Date.now();
    const startValue = displayTotal;
    const endValue = estimatedTotal;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * easeOut);
      
      setDisplayTotal(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [estimatedTotal]);

  const handleGetQuote = () => {
    navigate('/contact', { state: { selectedServices } });
  };

  return (
    <div className="py-16 md:py-24 border-t border-line">
      <div className="mb-12">
        <h2 className="font-display text-3xl lg:text-4xl text-text mb-4">Investment Calculator</h2>
        <p className="text-xl text-mute max-w-2xl">
          Select services to estimate your project investment.
        </p>
      </div>

      {/* Service Pills */}
      <div className="flex flex-wrap gap-3 mb-12">
        {services.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          return (
            <button
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`
                px-5 py-3 rounded-full border transition-all duration-sm
                font-medium text-sm md:text-base
                ${isSelected 
                  ? 'bg-accent text-background border-accent' 
                  : 'bg-transparent text-text border-line hover:border-accent/50 hover:text-accent'
                }
              `}
            >
              {service.name} <span className="text-inherit opacity-60 ml-1">${(service.basePrice / 1000)}k+</span>
            </button>
          );
        })}
      </div>

      {/* Total & CTA Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-line">
        <div>
          <span className="text-sm text-mute block mb-1">Estimated starting at</span>
          <span className="font-display text-4xl md:text-5xl text-accent">
            ${displayTotal.toLocaleString()}
          </span>
        </div>
        
        {selectedServices.length > 0 && (
          <Button
            onClick={handleGetQuote}
            variant="outline"
            size="lg"
            className="group"
          >
            Get Quote
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
      </div>
      
      <p className="text-xs text-mute mt-4">
        Final pricing based on project scope and timeline.
      </p>
    </div>
  );
};

export default PricingEstimator;
