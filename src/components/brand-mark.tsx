import { cn } from "@/lib/utils";

/** Fass-Signet: Deckelellipse, Korpus, zwei Rollrippen. */
export function BarrelMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-6", className)}
    >
      <ellipse
        cx="12"
        cy="4.6"
        rx="6.6"
        ry="2.4"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M5.4 4.6v14.8c0 1.33 2.95 2.4 6.6 2.4s6.6-1.07 6.6-2.4V4.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M5.4 9.6c0 1.33 2.95 2.4 6.6 2.4s6.6-1.07 6.6-2.4M5.4 14.6c0 1.33 2.95 2.4 6.6 2.4s6.6-1.07 6.6-2.4"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.55"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BarrelMark className="size-6 text-gold" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.0625rem] font-semibold uppercase tracking-[0.3em] text-foreground">
          Fasswerk
        </span>
        <span className="mt-1 text-[0.5625rem] uppercase tracking-[0.34em] text-muted-foreground">
          Manufaktur
        </span>
      </span>
    </span>
  );
}

/** Instagram-Glyph — lucide v1 führt keine Marken-Icons mehr. */
export function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-4", className)}
    >
      <rect
        x="2.75"
        y="2.75"
        width="18.5"
        height="18.5"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  );
}
