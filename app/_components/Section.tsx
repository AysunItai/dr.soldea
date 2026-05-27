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
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-page">
        {(eyebrow || title || description) && (
          <div className={`max-w-2xl ${alignClass} mb-12 md:mb-16`}>
            {eyebrow && (
              <div className="text-[11px] tracking-[0.3em] uppercase text-primary mb-4">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.05] text-balance">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-lg text-ink-soft text-pretty">
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
