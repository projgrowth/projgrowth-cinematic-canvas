import { CaseStudy } from "@/data/caseStudies";
import { FileText, Globe, Sparkles, Film, Cpu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface CaseStudySheetProps {
  caseStudy: CaseStudy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Content Systems": FileText,
  "Web & Product": Globe,
  "Brand & Messaging": Sparkles,
  "Cinematic Production": Film,
  "AI & Tools": Cpu,
};

const CaseStudySheet = ({ caseStudy, open, onOpenChange }: CaseStudySheetProps) => {
  if (!caseStudy) return null;

  const Icon = categoryIcons[caseStudy.category] || FileText;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-2xl overflow-y-auto bg-base border-line p-0"
      >
        {/* Minimal header with icon */}
        <div className="relative h-48 w-full overflow-hidden bg-surface border-b border-line">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-24 h-24 text-accent/20" />
          </div>
        </div>

        <div className="p-8">
          <SheetHeader className="text-left mb-8">
            <span className="text-xs text-accent uppercase tracking-wider mb-3 block">
              {caseStudy.categories.join(" • ")}
            </span>
            <SheetTitle className="font-display text-4xl text-text mb-3">
              {caseStudy.title}
            </SheetTitle>
            <p className="text-lg text-mute">
              {caseStudy.subtitle}
            </p>
          </SheetHeader>

          <div className="space-y-8">
            <section>
              <h4 className="text-sm uppercase tracking-wider text-accent mb-3">
                What They Do
              </h4>
              <p className="text-text leading-relaxed">
                {caseStudy.whatTheyDo}
              </p>
            </section>

            <section>
              <h4 className="text-sm uppercase tracking-wider text-accent mb-3">
                Their Issues
              </h4>
              <ul className="space-y-2">
                {caseStudy.theirIssues.map((issue, idx) => (
                  <li key={idx} className="text-mute flex items-start gap-3">
                    <span className="text-accent mt-1.5">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-sm uppercase tracking-wider text-accent mb-3">
                How We Helped
              </h4>
              <ul className="space-y-2">
                {caseStudy.howWeHelped.map((help, idx) => (
                  <li key={idx} className="text-mute flex items-start gap-3">
                    <span className="text-accent mt-1.5">•</span>
                    <span>{help}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-6 bg-surface rounded-lg border border-line">
              <h4 className="text-sm uppercase tracking-wider text-accent mb-3">
                Why It Matters
              </h4>
              <p className="text-text text-lg leading-relaxed">
                {caseStudy.whyItMatters}
              </p>
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CaseStudySheet;
