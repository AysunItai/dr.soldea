/**
 * Opéra / Belle-Époque decorative motif system.
 *
 * A small, deliberately restrained set of server-rendered SVG/markup
 * ornaments that give the site a refined "premium clinic near the Opéra"
 * character — engraved line-work, arched framing and fine gold dividers —
 * without heavy assets, client JS, or layout shift. Everything is
 * `aria-hidden` decoration and tints itself with the gold accent.
 */

/**
 * Fine gold divider with a central engraved lozenge — used between major
 * sections as a refined architectural rule.
 */
export function OperaDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-4 ${className}`}
    >
      <span className="h-px w-12 sm:w-24 gold-rule" />
      <svg
        viewBox="0 0 56 16"
        className="h-3.5 w-auto text-accent shrink-0"
        fill="none"
      >
        <path
          d="M28 1.5 35 8 28 14.5 21 8Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="28" cy="8" r="1.5" fill="currentColor" />
        <path
          d="M2 8h15M39 8h15"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.45"
        />
      </svg>
      <span className="h-px w-12 sm:w-24 gold-rule" />
    </div>
  );
}

/**
 * Four fine gold corner brackets — drop into a `position: relative` card to
 * give it an engraved, framed "premium" feel. Tiny and purely decorative.
 */
export function OrnateCorners() {
  const c = "pointer-events-none absolute h-2.5 w-2.5 border-accent/45";
  return (
    <>
      <span aria-hidden className={`${c} left-3.5 top-3.5 border-l border-t`} />
      <span aria-hidden className={`${c} right-3.5 top-3.5 border-r border-t`} />
      <span aria-hidden className={`${c} left-3.5 bottom-3.5 border-l border-b`} />
      <span aria-hidden className={`${c} right-3.5 bottom-3.5 border-r border-b`} />
    </>
  );
}

/**
 * A faint, engraved gold arch — frames the hero medallion like an alcove /
 * portal in a Belle-Époque interior. Open at the bottom, double-lined, with
 * a small keystone ornament. Positioned by the caller (absolute, behind the
 * medallion). `vector-effect` keeps the strokes hairline at any size.
 */
export function OperaArch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 262"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      aria-hidden
      className={`text-accent ${className}`}
    >
      <path
        d="M20 260 L20 140 A100 100 0 0 1 220 140 L220 260"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M33 260 L33 146 A87 87 0 0 1 207 146 L207 260"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.26"
        vectorEffect="non-scaling-stroke"
      />
      {/* Keystone lozenge at the crown. */}
      <path d="M120 26 l6 9 -6 9 -6 -9Z" fill="currentColor" opacity="0.55" />
      {/* Engraved feet at the springline base. */}
      <path
        d="M6 260 H42 M198 260 H234"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
