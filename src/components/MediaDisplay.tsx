import { HeroMedia } from "@/types/database";

interface MediaDisplayProps {
  media: HeroMedia | null;
  title: string;
  className?: string;
  autoplay?: boolean;
}

const MediaDisplay = ({ media, title, className = "", autoplay = false }: MediaDisplayProps) => {
  if (!media) {
    return (
      <div className={`bg-base-dark flex items-center justify-center ${className}`}>
        <span className="text-mute">No media available</span>
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <video
        src={media.url}
        className={`w-full h-full object-cover ${className}`}
        controls={!autoplay}
        autoPlay={autoplay}
        muted={autoplay}
        loop={autoplay}
        playsInline
        aria-label={media.alt || title}
      />
    );
  }

  return (
    <img
      src={media.url}
      alt={media.alt || title}
      className={`w-full h-full object-cover ${className}`}
    />
  );
};

export default MediaDisplay;
