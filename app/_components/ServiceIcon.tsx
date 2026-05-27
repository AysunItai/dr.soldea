import type { SVGProps } from "react";

/**
 * Vocabulary of icon slugs referenced from `lib/services.ts`.
 * Adding a new icon? Extend this union *and* the switch in `ServiceIcon` below.
 */
export type ServiceIconName =
  | "video"
  | "sonogram"
  | "fetus"
  | "calendar-heart"
  | "iud"
  | "date"
  | "feminine";

type Props = SVGProps<SVGSVGElement> & { name: ServiceIconName };

/**
 * Renders the icon for a service. Uses `currentColor` so the consumer
 * can tint it with text-* utilities, and stroke-based geometry so it
 * stays crisp at any size.
 */
export function ServiceIcon({ name, className, ...rest }: Props) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
    ...rest,
  };

  switch (name) {
    case "video":
      return (
        <svg {...common}>
          <rect x="2.5" y="6.5" width="13" height="11" rx="2.2" />
          <path d="M15.5 10.2 21 7.3v9.4l-5.5-2.9z" />
          <circle cx="6.8" cy="11.8" r="1.1" />
        </svg>
      );
    case "sonogram":
      return (
        <svg {...common}>
          <path d="M12 3.4v6.2" />
          <circle cx="12" cy="10.6" r="1.3" />
          <path d="M4.6 17.2c1.6-3.4 4.4-5.2 7.4-5.2s5.8 1.8 7.4 5.2" />
          <path d="M7.7 19.4c1-2 2.6-3 4.3-3s3.3 1 4.3 3" />
          <path d="M10.4 21c.5-.7 1-1 1.6-1s1.1.3 1.6 1" />
        </svg>
      );
    case "fetus":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.4 16.4c-.4-3 .9-5.6 3.1-6.8 1.5-.8 3.4-.6 4.8.4" />
          <circle cx="14.2" cy="9.4" r="1.1" />
          <path d="M9.6 17.6c.8 1 1.9 1.6 3.2 1.6" />
        </svg>
      );
    case "calendar-heart":
      return (
        <svg {...common}>
          <rect x="3.2" y="5.4" width="17.6" height="15.4" rx="2.2" />
          <path d="M8.2 3.4v4M15.8 3.4v4" />
          <path d="M3.2 10h17.6" />
          <path d="M12 17.4c-1.7-1.2-2.7-2.5-2.7-3.7a1.3 1.3 0 0 1 2.7-.4 1.3 1.3 0 0 1 2.7.4c0 1.2-1 2.5-2.7 3.7z" />
        </svg>
      );
    case "iud":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 8.4h8" />
          <path d="M12 8.4v9.2" />
          <path d="M10.4 17.6h3.2" />
        </svg>
      );
    case "date":
      return (
        <svg {...common}>
          <rect x="3.2" y="5.4" width="17.6" height="15.4" rx="2.2" />
          <path d="M8.2 3.4v4M15.8 3.4v4" />
          <path d="M3.2 10h17.6" />
          <path d="M11 13.4h1.4v4" />
          <path d="M10.6 17.4h3.2" />
        </svg>
      );
    case "feminine":
      return (
        <svg {...common}>
          <circle cx="12" cy="9.4" r="4.6" />
          <path d="M12 14v6.6" />
          <path d="M9.4 18.2h5.2" />
        </svg>
      );
  }
}
