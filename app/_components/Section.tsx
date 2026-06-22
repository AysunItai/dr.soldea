import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({
  eyebrow,
  title,
  description,
  align = "center",
  children,
  className = "",
  id,
}: SectionProps) {
  const alignClass =
    align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <section id={id} className={`py-16 sm:py-20 md:py-28 ${className}`}>
      <div className="container-page min-w-0">
        {(eyebrow || title || description) && (
          <div className={`max-w-2xl ${alignClass} mb-10 sm:mb-12 md:mb-16`}>
            {eyebrow && (
              <div
                className={`flex items-center gap-3 mb-4 sm:mb-5 ${
                  align === "center" ? "justify-center" : ""
                }`}
              >
                <span aria-hidden className="gold-tick" />
                <span className="text-[11px] font-medium tracking-[0.28em] sm:tracking-[0.34em] uppercase text-accent-deep">
                  {eyebrow}
                </span>
              </div>
            )}
            {title && (
              <h2 className="font-display text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] text-ink leading-[1.06] sm:leading-[1.04] tracking-[-0.015em] text-balance">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-ink-soft text-pretty max-w-prose mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
