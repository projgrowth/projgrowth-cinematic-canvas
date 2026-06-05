import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

type Outcome = {
  text: string;
  accent: string;
  slug?: string;
};

const outcomes: Outcome[] = [
  {
    text: "Rebuilt a wealth advisory firm's identity end-to-end.",
    accent: "Rebuilt",
    slug: "smart-financial",
  },
  {
    text: "Shipped a legaltech SaaS marketing site in six weeks.",
    accent: "Shipped",
    slug: "legaltech-saas-platform",
  },
  {
    text: "Built a content engine producing 30+ assets a month from one shoot day.",
    accent: "Built",
    slug: "gfg-solutions",
  },
  {
    text: "Took a financial advisory practice from zero to a full digital presence.",
    accent: "Took",
    slug: "financial-advisory-automation",
  },
];

const ResultsStrip = () => {
  return (
    <section className="relative border-y border-line bg-bg">
      <div className="container-site section">
        <ScrollReveal variant="fade-up">
          <div className="grid-12 gap-y-10 mb-12 md:mb-16">
            <div className="col-span-12 lg:col-span-4">
              <p className="eyebrow mb-3">What Changed</p>
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
              <div className="flex items-center justify-between gap-6 py-7 md:py-9 group">
                <p className="font-display text-text text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight">
                  {first}
                  <span className="text-accent">{o.accent}</span>
                  {tail}
                </p>
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