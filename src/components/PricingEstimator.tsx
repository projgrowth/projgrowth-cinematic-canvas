import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PricingEstimator = () => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

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

  const handleGetQuote = () => {
    navigate('/contact', { state: { selectedServices } });
  };

  return (
    <div className="py-16 border-t border-line">
      <div className="mb-12">
        <h2 className="font-display text-4xl text-text mb-4">Estimate Your Investment</h2>
        <p className="text-lg text-mute max-w-2xl">
          Select the services you need to get a rough estimate. Final pricing depends on project scope and complexity.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Service Selection */}
        <div className="stack gap-4">
          {services.map((service) => (
            <label
              key={service.id}
              className="flex items-center gap-4 p-6 border border-line rounded-lg cursor-pointer transition-all duration-sm ease-smooth hover:border-accent hover:bg-surface/30 group"
            >
              <Checkbox
                checked={selectedServices.includes(service.id)}
                onCheckedChange={() => toggleService(service.id)}
                className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <div className="flex-1">
                <div className="font-display text-xl text-text group-hover:text-accent transition-colors duration-sm">
                  {service.name}
                </div>
              </div>
              <div className="text-lg font-medium text-mute">
                ${service.basePrice.toLocaleString()}+
              </div>
            </label>
          ))}
        </div>

        {/* Estimate Display */}
        <div className="flex flex-col justify-center">
          <div className="p-8 border border-line rounded-lg bg-surface/30">
            <div className="mb-6">
              <div className="text-sm text-mute mb-2">Estimated Investment</div>
              <div className="font-display text-5xl text-accent">
                {estimatedTotal > 0 ? `$${estimatedTotal.toLocaleString()}` : '$0'}
              </div>
              <div className="text-sm text-mute mt-2">Starting price range</div>
            </div>

            {selectedServices.length > 0 && (
              <div className="stack gap-4">
                <div className="text-sm text-mute">
                  <strong>Selected Services:</strong>
                  <ul className="mt-2 stack gap-1">
                    {services
                      .filter(s => selectedServices.includes(s.id))
                      .map(s => (
                        <li key={s.id} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {s.name}
                        </li>
                      ))}
                  </ul>
                </div>

                <Button
                  onClick={handleGetQuote}
                  className="w-full group"
                  size="lg"
                >
                  Get Accurate Quote
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <p className="text-xs text-mute text-center">
                  Actual pricing may vary based on project requirements and timeline
                </p>
              </div>
            )}

            {selectedServices.length === 0 && (
              <p className="text-sm text-mute text-center">
                Select services above to see estimated pricing
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingEstimator;
