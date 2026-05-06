import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProcessTimeline = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

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

  const toggleStep = (idx: number) => {
    setExpandedStep(expandedStep === idx ? null : idx);
  };

  return (
    <div className="section border-t border-line">
      <div className="mb-12">
        <h2 className="font-display text-3xl lg:text-4xl text-text mb-4">Our Process</h2>
        <p className="text-xl text-mute max-w-2xl">
          A proven methodology that delivers exceptional results.
        </p>
      </div>

      <div className="space-y-0">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="border-t border-line last:border-b cursor-pointer group"
            onClick={() => toggleStep(idx)}
          >
            <div className="py-6 flex items-center gap-6 md:gap-12">
              {/* Number */}
              <span className="font-display text-4xl md:text-5xl text-accent/30 w-16 md:w-20 shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              
              {/* Title */}
              <span className="font-display text-xl md:text-2xl text-text flex-1 transition-colors duration-sm group-hover:text-accent">
                {step.title}
              </span>
              
              {/* Duration */}
              <span className="text-sm md:text-base text-mute shrink-0">
                {step.duration}
              </span>
              
              {/* Expand indicator */}
              <span className="text-mute transition-transform duration-sm w-6 text-center">
                {expandedStep === idx ? '−' : '+'}
              </span>
            </div>
            
            {/* Description - Progressive disclosure */}
            <AnimatePresence>
              {expandedStep === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pl-[88px] md:pl-[128px] pr-12 text-mute leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessTimeline;
