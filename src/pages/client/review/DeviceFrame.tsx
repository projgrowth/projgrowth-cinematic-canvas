import { useEffect, useRef, useState } from "react";
import type { Device, ReviewComment } from "./types";

const BASE: Record<Device, { w: number; h: number }> = {
  desktop: { w: 1440, h: 900 },
  mobile: { w: 390, h: 844 },
};

interface Props {
  src: string;
  device: Device;
  commentMode: boolean;
  pins: ReviewComment[];
  draft: { x: number; y: number } | null;
  onPlace: (x: number, y: number) => void;
  onReady?: () => void;
}

/**
 * Realistic device presentation of the client site. The site is rendered at its
 * true viewport width and scaled to fit, so proportions match the real thing.
 * Pins live outside the scaled layer so they stay legible at any scale.
 */
const DeviceFrame = ({ src, device, commentMode, pins, draft, onPlace, onReady }: Props) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const base = BASE[device];

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => {
      const available = el.clientWidth;
      setScale(Math.min(1, available / base.w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [base.w]);

  const width = base.w * scale;
  const height = base.h * scale;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!commentMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onPlace(Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y)));
  };

  return (
    <div ref={hostRef} className="w-full">
      <div
        className={`relative mx-auto overflow-hidden border border-line bg-base ${
          device === "mobile" ? "rounded-[2.5rem] p-[6px]" : "rounded-lg"
        }`}
        style={{ width: width || undefined, height: height || undefined }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <div
            style={{
              width: base.w,
              height: base.h,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <iframe
              src={src}
              title="Website review preview"
              onLoad={onReady}
              className="w-full h-full border-0 bg-white"
              style={{ pointerEvents: commentMode ? "none" : "auto" }}
            />
          </div>
        </div>

        {/* Annotation layer */}
        <div
          onClick={handleClick}
          className={`absolute inset-0 rounded-[inherit] ${
            commentMode ? "cursor-crosshair bg-base/10" : "pointer-events-none"
          }`}
        >
          {pins.map((pin, i) => (
            <span
              key={pin.id}
              title={pin.body}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-medium flex items-center justify-center shadow-[0_0_0_3px_hsl(var(--base)/0.7)]"
              style={{ left: `${pin.x_pct}%`, top: `${pin.y_pct}%` }}
            >
              {i + 1}
            </span>
          ))}
          {draft && (
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-2 border-accent bg-base/80 flex items-center justify-center"
              style={{ left: `${draft.x}%`, top: `${draft.y}%` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceFrame;
