/**
 * PLACEHOLDER CONTENT - REPLACE WITH REAL DATA
 * 
 * To update this section with real team data:
 * 1. Replace the team member names, roles, and bios below
 * 2. Replace the placeholder images in src/assets/ with real team photos
 * 3. Update LinkedIn and Twitter URLs with actual profile links (currently "#")
 * 
 * Image specifications:
 * - Square format (1:1 ratio recommended)
 * - Minimum 200x200px
 * - Supported formats: jpg, png, webp
 */

import { Instagram } from "lucide-react";
import teamSarah from "@/assets/team-sarah.jpg";
import teamMarcus from "@/assets/team-marcus.jpg";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  instagram?: string;
}

const TeamSection = () => {
  // TODO: Replace with real team member data
  const team: TeamMember[] = [
    {
      name: "Team Member 1", // PLACEHOLDER: Replace with real name
      role: "Role Title", // PLACEHOLDER: Replace with real role
      bio: "Brief bio description here.", // PLACEHOLDER: Replace with real bio
      image: teamSarah, // PLACEHOLDER: Replace with real photo
      instagram: "https://www.instagram.com/projgrowth" // Links to main account for now
    },
    {
      name: "Team Member 2", // PLACEHOLDER
      role: "Role Title", // PLACEHOLDER
      bio: "Brief bio description here.", // PLACEHOLDER
      image: teamMarcus, // PLACEHOLDER
      instagram: "https://www.instagram.com/projgrowth" // Links to main account for now
    }
  ];

  return (
    <div className="py-16 border-t border-line">
      <h2 className="font-display text-3xl lg:text-4xl text-text mb-16">Meet the Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="group p-8 bg-surface rounded-lg border border-line transition-all duration-md ease-smooth hover:border-accent/50 hover:shadow-elegant hover:scale-[1.02] animate-scale-in"
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
              {member.instagram && (
                <a 
                  href={member.instagram}
                  className="p-2 border border-line rounded-md transition-all duration-sm hover:border-accent hover:text-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-4 h-4" />
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
