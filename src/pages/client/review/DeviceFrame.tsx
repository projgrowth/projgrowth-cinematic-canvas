import { useEffect, useRef, useState } from "react";
import type { Device, ReviewComment } from "./types";

const BASE: Record<Device, { w: number; h: number }> = {
  desktop: { w: 1440, h: 900 },
  mobile: { w: 390, h: 844 },
};

/** Height of the unscaled chrome row above the site, per device. */
const CHROME: Record<Device, number> = { desktop: 34, mobile: 26 };

interface Props {
  src: string;
  device: Device;
  commentMode: boolean;
  pins: ReviewComment[];
  draft: { x: number; y: number } | null;
  onPlace: (x: number, y: number) => void;
  onReady?: () => void;
}

/** Neutral browser bar: three dots and an empty field. No text, not clickable. */
const DesktopChrome = () => (
  <div
    className="flex items-center gap-3 h-[34px] px-4 border-b border-line bg-base"
    aria-hidden="true"
  >
    <span className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-2 h-2 rounded-full bg-line" />
      ))}
    </span>
    <span className="flex-1 h-[16px] rounded-full bg-line/40" />
  </div>
);

/** Neutral phone status strip: no words, just signal, wifi and battery marks. */
const MobileChrome = () => (
  <div
    className="flex items-center justify-between h-[26px] px-5 bg-base"
    aria-hidden="true"
  >
    <span className="w-8 h-[3px] rounded-full bg-line/60" />
    <span className="flex items-end gap-[2px]">
      {[4, 6, 8, 10].map((h) => (
        <span key={h} className="w-[3px] rounded-sm bg-line/70" style={{ height: h }} />
      ))}
      <span className="ml-2 w-5 h-[9px] rounded-[2px] border border-line/70" />
    </span>
  </div>
);

/**
 * Realistic device presentation of the client site. The site is rendered at its
 * true viewport width and scaled to fit, so proportions match the real thing.
 * Pins live outside the scaled layer so they stay legible at any scale.
 * The frame is deliberately self-contained: the embedded site cannot open new
 * windows or navigate the portal, and the platform badge corner is masked.
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
          device === "mobile" ? "rounded-[2rem]" : "rounded-lg"
        }`}
        style={{ width: width || undefined }}
      >
        <div className="overflow-hidden rounded-[inherit]">
          {device === "desktop" ? <DesktopChrome /> : <MobileChrome />}

          {/* Site viewport */}
          <div
            className="relative overflow-hidden"
            style={{ width: width || undefined, height: height || undefined }}
          >
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
                sandbox="allow-scripts allow-same-origin allow-forms"
                referrerPolicy="no-referrer"
                className="w-full h-full border-0 bg-white"
                style={{ pointerEvents: commentMode ? "none" : "auto" }}
              />
            </div>

            {/* Annotation layer */}
            <div
              onClick={handleClick}
              className={`absolute inset-0 ${
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
      </div>
    </div>
  );
};

export default DeviceFrame;
