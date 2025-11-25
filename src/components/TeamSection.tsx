import { Linkedin, Twitter } from "lucide-react";
import teamSarah from "@/assets/team-sarah.jpg";
import teamMarcus from "@/assets/team-marcus.jpg";
import teamEmily from "@/assets/team-emily.jpg";
import teamDavid from "@/assets/team-david.jpg";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}

const TeamSection = () => {
  const team: TeamMember[] = [
    {
      name: "Sarah Chen",
      role: "Creative Director",
      bio: "15+ years crafting brand experiences that resonate and endure.",
      image: teamSarah,
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      bio: "Full-stack architect passionate about clean code and scalable systems.",
      image: teamMarcus,
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Emily Watson",
      role: "UX Strategist",
      bio: "Human-centered design advocate with expertise in user research.",
      image: teamEmily,
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "David Kim",
      role: "Growth Lead",
      bio: "Data-driven marketer focused on sustainable growth strategies.",
      image: teamDavid,
      linkedin: "#",
      twitter: "#"
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
            <div className="relative w-24 h-24 mb-4 mx-auto">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full rounded-full object-cover border-2 border-line transition-all duration-md group-hover:border-accent"
              />
            </div>
            <h3 className="font-display text-xl text-text mb-1 text-center">
              {member.name}
            </h3>
            <p className="text-sm text-accent mb-3 text-center">{member.role}</p>
            <p className="text-sm text-mute leading-relaxed mb-4">{member.bio}</p>
            <div className="flex items-center justify-center gap-3">
              {member.linkedin && (
                <a 
                  href={member.linkedin}
                  className="p-2 border border-line rounded-md transition-all duration-sm hover:border-accent hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {member.twitter && (
                <a 
                  href={member.twitter}
                  className="p-2 border border-line rounded-md transition-all duration-sm hover:border-accent hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;