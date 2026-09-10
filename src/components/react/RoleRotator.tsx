import { useEffect, useState, type CSSProperties } from "react";

const PHRASES = ["Honeypot Builder", "Threat Hunter", "Rust & C Developer", "eBPF Tinkerer"];

/**
 * A small rotating badge that cycles through supplementary identity phrases.
 * The primary role ("Security Engineer / Systems Programmer") is already
 * static, always-visible text next to this component — this is a decorative
 * flourish layered on top, so it's aria-hidden and safe to skip animating
 * entirely for reduced-motion users (it just holds on the first phrase).
 */
export default function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="relative inline-block h-7 min-w-[13ch] align-middle"
      aria-hidden="true"
    >
      {PHRASES.map((phrase, i) => {
        const chipColor = ["var(--color-violet)", "var(--color-pink)", "var(--color-amber)", "var(--color-cyan)"][
          i % 4
        ];
        return (
          <span
            key={phrase}
            className={`chip absolute inset-y-0 left-0 whitespace-nowrap transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ "--chip-color": chipColor } as CSSProperties}
          >
            {phrase}
          </span>
        );
      })}
    </span>
  );
}
