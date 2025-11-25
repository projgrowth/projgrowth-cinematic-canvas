import { User } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

const TeamSection = () => {
  const team: TeamMember[] = [
    {
      name: "Sarah Chen",
      role: "Creative Director",
      bio: "15+ years crafting brand experiences that resonate and endure."
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      bio: "Full-stack architect passionate about clean code and scalable systems."
    },
    {
      name: "Emily Watson",
      role: "UX Strategist",
      bio: "Human-centered design advocate with expertise in user research."
    },
    {
      name: "David Kim",
      role: "Growth Lead",
      bio: "Data-driven marketer focused on sustainable growth strategies."
    }
  ];

  return (
    <div className="py-16 border-t border-line">
      <h2 className="font-display text-3xl text-text mb-12">Meet the Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="group p-6 bg-surface rounded-lg border border-line transition-all duration-md ease-smooth hover:border-accent/50 hover:shadow-elegant hover:scale-[1.02] animate-scale-in"
            style={{ animationDelay: `${idx * 100}ms`, animationFillMode: "both" }}
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 transition-all duration-md group-hover:bg-accent/20">
              <User className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-display text-xl text-text mb-1">
              {member.name}
            </h3>
            <p className="text-sm text-accent mb-3">{member.role}</p>
            <p className="text-sm text-mute leading-relaxed">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;