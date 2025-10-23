import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

const ProcessTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Discovery",
      duration: "1-2 weeks",
      description: "We deep-dive into your business goals, target audience, and competitive landscape to create a solid foundation."
    },
    {
      title: "Strategy",
      duration: "1-2 weeks",
      description: "We develop a comprehensive roadmap aligned with your objectives, outlining key milestones and deliverables."
    },
    {
      title: "Design",
      duration: "2-4 weeks",
      description: "Our team creates stunning visuals and user experiences that bring your brand vision to life."
    },
    {
      title: "Development",
      duration: "4-8 weeks",
      description: "We build robust, scalable solutions using cutting-edge technologies and best practices."
    },
    {
      title: "Launch",
      duration: "1-2 weeks",
      description: "We deploy your project with thorough testing, training, and ongoing support to ensure success."
    }
  ];

  return (
    <div className="py-16 border-t border-line">
      <div className="mb-12">
        <h2 className="font-display text-4xl text-text mb-4">Our Process</h2>
        <p className="text-lg text-mute max-w-2xl">
          A proven methodology that delivers exceptional results, every time.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-line hidden lg:block" />
        <div 
          className="absolute top-8 left-0 h-0.5 bg-accent hidden lg:block transition-all duration-md ease-smooth"
          style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        />

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer group"
              onMouseEnter={() => setActiveStep(idx)}
            >
              {/* Circle indicator */}
              <div className="flex items-center justify-center mb-4">
                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 border-line bg-background transition-all duration-sm ease-smooth group-hover:border-accent group-hover:bg-accent/10">
                  {activeStep >= idx ? (
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                  ) : (
                    <Circle className="w-8 h-8 text-mute" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="text-center lg:text-left">
                <div className="font-display text-2xl text-text mb-2 transition-colors duration-sm group-hover:text-accent">
                  {step.title}
                </div>
                <div className="text-sm text-accent font-medium mb-3">
                  {step.duration}
                </div>
                <p className="text-sm text-mute leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
