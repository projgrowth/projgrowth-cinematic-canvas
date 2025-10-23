import { Link } from "react-router-dom";
import { WorkItem } from "@/types/database";

interface WorkCardProps {
  item: WorkItem;
}

const WorkCard = ({ item }: WorkCardProps) => {
  return (
    <Link
      to={`/work/${item.slug}`}
      className="group block h-full rounded-sm overflow-hidden bg-surface border border-line/60 transition-all duration-md ease-smooth hover:shadow-elegant hover:scale-[1.02] hover:border-accent/40"
    >
      {/* Media */}
      <div className="aspect-video overflow-hidden bg-base">
        {item.hero_media?.type === "video" ? (
          <video
            src={item.hero_media.url}
            className="w-full h-full object-cover transition-transform duration-md ease-smooth group-hover:scale-105"
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={item.hero_media?.url || "/placeholder.svg"}
            alt={item.hero_media?.alt || item.title}
            className="w-full h-full object-cover transition-transform duration-md ease-smooth group-hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-8 space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-mute">
            <span>{item.industry}</span>
            <span>•</span>
            <span>{item.type}</span>
          </div>
          <h3 className="font-display text-2xl text-text transition-colors duration-md group-hover:text-accent">
            {item.title}
          </h3>
          {item.summary && (
            <p className="text-mute line-clamp-2 leading-relaxed">{item.summary}</p>
          )}
        </div>

        {/* Metrics */}
        {item.metrics && item.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-line/40">
            {item.metrics.slice(0, 2).map((metric, idx) => (
              <div key={idx}>
                <div className="font-display text-xl text-accent mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-mute">{metric.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default WorkCard;
