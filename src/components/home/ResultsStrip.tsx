import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionChapter from "@/components/home/SectionChapter";

type Outcome = {
  text: string;
  accent: string;
  slug?: string;
  tag?: string;
};

const outcomes: Outcome[] = [
  {
    text: "Rebuilt a wealth advisory firm's brand and website end-to-end.",
    accent: "Rebuilt",
    slug: "smart-financial",
    tag: "Smart Financial · Wealth",
  },
  {
    text: "Shipped an AI-assisted plan-review tool for a compliance firm.",
    accent: "Shipped",
    slug: "florida-private",
    tag: "Florida Private Providers · Compliance",
  },
  {
    text: "Built a cinematic content engine that turns one shoot day into a month of output.",
    accent: "Built",
    slug: "gfg-solutions",
    tag: "GFG Solutions · Tax Strategy",
  },
  {
    text: "Launched a modern, trust-forward website for a Florida law practice.",
    accent: "Launched",
    slug: "fritzler-law",
    tag: "Fritzler Law · Legal",
  },
];

const ResultsStrip = () => {
  return (
    <section className="relative border-y border-line bg-surface/40">
      <div className="container-site section">
        <ScrollReveal variant="fade-up">
          <div className="grid-12 gap-y-10 mb-12 md:mb-16">
            <div className="col-span-12 lg:col-span-4">
              <SectionChapter number={2} label="Outcomes" />
              <h2 className="font-display text-text">
                Outcomes,<br />not deliverables.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6 flex items-end">
              <p className="lede">
                A short list of what we actually shipped — and what it unlocked for the people who hired us.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="divide-y divide-line">
          {outcomes.map((o, idx) => {
            const [first, ...rest] = o.text.split(o.accent);
            const tail = rest.join(o.accent);
            const Inner = (
              <div className="relative flex items-center justify-between gap-6 py-7 md:py-9 px-4 md:px-6 -mx-4 md:-mx-6 group transition-colors duration-sm hover:bg-surface/60">
                <span className="absolute left-0 top-2 bottom-2 w-0 bg-accent transition-all duration-sm group-hover:w-1 rounded-r" />
                <div className="min-w-0">
                  <p className="font-display text-text text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight">
                    {first}
                    <span className="text-accent">{o.accent}</span>
                    {tail}
                  </p>
                  {o.tag && (
                    <p className="mt-2 text-mute text-xs uppercase tracking-widest">{o.tag}</p>
                  )}
                </div>
                {o.slug && (
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-mute flex-shrink-0 transition-all duration-sm group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
              </div>
            );
            return (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.06}>
                {o.slug ? (
                  <Link to={`/work/${o.slug}`} className="block">
                    {Inner}
                  </Link>
                ) : (
                  Inner
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResultsStrip;