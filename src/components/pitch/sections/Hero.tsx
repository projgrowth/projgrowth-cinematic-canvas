import BodyProse from "@/components/pitch/BodyProse";
import { Reveal } from "@/components/pitch/primitives/Reveal";
import { GhostNumber } from "@/components/pitch/primitives/GhostNumber";
import { HeroArrival } from "@/components/pitch/primitives/HeroArrival";

const ROUTE = ["Orlando", "rounds", "field reports", "drops", "events", "wherever RGC goes"];

export function Hero() {
  return (
    <section data-section="hero" className="topo-bg relative overflow-hidden bg-bone section-y">
      <GhostNumber n="00" />
      <div className="pitch-grid relative z-10">
        <div className="pitch-grid__editorial flex flex-col">
          <p className="eyebrow md:hidden">00 / THE COVER LETTER</p>

          <HeroArrival delay={0}>
            <p className="meta-label" style={{ marginBottom: 20 }}>
              FOR: ERIK ANDERS LANG · RANDOM GOLF CLUB
            </p>
          </HeroArrival>

          <HeroArrival delay={300}>
            <Reveal as="h1" className="h-section" delay={0} style={{ color: "var(--ink)" }}>
              <span className="type-display-xl block">A Letter,</span>
              <span className="type-display-xl block">
                Not a{" "}
                <span className="font-blackletter accent" style={{ fontSize: "1.05em" }}>
                  Résumé.
                </span>
              </span>
            </Reveal>
          </HeroArrival>

          <HeroArrival delay={600}>
            <div className="md:pt-4">
              <BodyProse delay={0}>
                <p>
                  I&apos;m already planning to spend the next stretch traveling, playing, filming,
                  and building projects around the game regardless. I&apos;ll probably be chasing a
                  few RGC events as I go. This just gives that road a home base — somewhere to pour
                  the rounds, clips, drops, and experiments instead of keeping them off to the side.
                </p>
                <p>
                  I understand the ecosystem: scratch golfers, new players trying to find their
                  people, the post-round clips everyone wants, the merch that only works when it
                  feels earned, and the backend that keeps the whole thing moving after the weekend
                  ends.
                </p>
              </BodyProse>
            </div>
          </HeroArrival>

          <HeroArrival delay={760}>
            <div className="hero-route section-stack-sm">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {ROUTE.map((item, index) => (
                  <span key={item} className="inline-flex items-center gap-3">
                    <span
                      className="meta-label"
                      style={{
                        color: index === ROUTE.length - 1 ? "var(--oxblood)" : "var(--graphite)",
                        letterSpacing: "0.16em",
                      }}
                    >
                      {item}
                    </span>
                    {index < ROUTE.length - 1 && (
                      <span aria-hidden style={{ color: "rgb(var(--pencil-rgb) / 0.28)" }}>
                        →
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </HeroArrival>

          <HeroArrival delay={900}>
            <div className="mt-10 flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
              <p className="meta-label">DAN RODRIGUEZ · PROJGROWTH.COM</p>
              <p className="hand-accent" style={{ fontSize: 20 }}>
                hcp 9 · Orlando, FL
              </p>
            </div>
          </HeroArrival>
        </div>
      </div>
    </section>
  );
}
