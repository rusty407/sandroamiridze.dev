import { useEffect, useRef, useState, type CSSProperties, type JSX } from "react";

type IconProps = { className?: string; style?: CSSProperties };

type Stage = {
  id: string;
  title: string;
  short: string;
  description: string;
  color: string;
  icon: (props: IconProps) => JSX.Element;
};

const AUTOPLAY_MS = 3200;

function ConnectIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="6" cy="12" r="2.5" />
      <path d="M8.5 12H14" />
      <path d="M14 7v10" strokeLinecap="round" />
      <path d="M17 9v6" strokeLinecap="round" />
      <path d="M20 10.5v3" strokeLinecap="round" />
    </svg>
  );
}

function IsolateIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="4" width="16" height="16" rx="2" strokeDasharray="2.5 2.5" />
      <rect x="8.5" y="8.5" width="7" height="7" rx="1" />
    </svg>
  );
}

function CaptureIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 13h3.5L9 7l3 11 2.5-9L16 13h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuarantineIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l7 3v5c0 4.4-2.9 7.7-7 9-4.1-1.3-7-4.6-7-9V6z" strokeLinejoin="round" />
      <path d="M9.5 12l2 2 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const stages: Stage[] = [
  {
    id: "connect",
    title: "Connect",
    short: "Attacker connects",
    description:
      "An attacker opens a TCP connection to the exposed SSH listener. Aegis fingerprints the source IP and checks it against the per-IP rate limiter before a session is allocated.",
    color: "var(--color-violet)",
    icon: ConnectIcon,
  },
  {
    id: "isolate",
    title: "Isolate",
    short: "Session isolated",
    description:
      "A fresh OverlayFS upper layer and mount namespace are provisioned for this session alone — a believable filesystem with zero shared state with the host or any other session.",
    color: "var(--color-pink)",
    icon: IsolateIcon,
  },
  {
    id: "capture",
    title: "Capture",
    short: "Syscalls captured",
    description:
      "eBPF probes on execve, connect, and memfd_create stream every syscall to an SSE telemetry pipeline, powering the live dashboard and full session replay in real time.",
    color: "var(--color-amber)",
    icon: CaptureIcon,
  },
  {
    id: "quarantine",
    title: "Quarantine",
    short: "Torn down & quarantined",
    description:
      "On disconnect or timeout, the overlay diff is snapshotted for forensic replay, then the ephemeral layer is discarded — nothing persists back into the base image.",
    color: "var(--color-cyan)",
    icon: QuarantineIcon,
  },
];

function Connector({ state, color }: { state: "pending" | "flowing" | "complete"; color: string }) {
  const strokeColor = state === "pending" ? "var(--color-border-strong)" : color;
  const dashProps = state === "flowing" ? { strokeDasharray: "8 6" } : {};
  const dashClass = state === "flowing" ? "animate-[dash_0.8s_linear_infinite]" : undefined;
  const opacity = state === "complete" ? 0.5 : 1;

  return (
    <div aria-hidden="true" className="flex items-center justify-center py-1 md:h-full md:w-10 md:py-0" style={{ opacity }}>
      {/* Vertical connector — stacked (mobile) layout */}
      <svg className="h-8 w-6 md:hidden" viewBox="0 0 12 100" preserveAspectRatio="none">
        <line x1="6" y1="4" x2="6" y2="88" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" {...dashProps} className={dashClass} />
        <path d="M1 82 L6 94 L11 82" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Horizontal connector — row (desktop) layout */}
      <svg className="hidden h-6 w-full md:block" viewBox="0 0 100 12" preserveAspectRatio="none">
        <line x1="4" y1="6" x2="96" y2="6" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" {...dashProps} className={dashClass} />
        <path d="M90 1 L98 6 L90 11" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function SessionLifecycleDiagram() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!autoplay || prefersReduced) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % stages.length);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplay]);

  function selectStage(i: number) {
    setActiveIndex(i);
    setAutoplay(false);
  }

  const active = stages[activeIndex];

  return (
    <div className="card p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
          Walk through it
        </h3>
        <button
          type="button"
          onClick={() => setAutoplay((a) => !a)}
          className="rounded-full border border-[var(--color-border-strong)] px-3 py-1 text-[11px] font-semibold text-[var(--color-text-dim)] transition-colors hover:border-[var(--color-violet)] hover:text-[var(--color-violet)]"
          aria-pressed={autoplay}
        >
          {autoplay ? "⏸ auto" : "▶ paused"}
        </button>
      </div>

      <ol className="mt-6 flex flex-col md:flex-row md:items-start" aria-label="Aegis session lifecycle stages">
        {stages.map((stage, i) => {
          const status = i < activeIndex ? "complete" : i === activeIndex ? "active" : "upcoming";
          const Icon = stage.icon;
          return (
            <li key={stage.id} className="flex flex-col md:flex-1 md:items-stretch">
              <div className="flex items-center md:flex-col">
                <button
                  type="button"
                  onClick={() => selectStage(i)}
                  aria-current={status === "active" ? "step" : undefined}
                  className="flex w-full items-center gap-3 rounded-xl border-2 px-3 py-3 text-left transition-all md:flex-col md:text-center"
                  style={
                    status === "active"
                      ? {
                          borderColor: stage.color,
                          background: `color-mix(in srgb, ${stage.color} 16%, var(--color-surface))`,
                          boxShadow: `0 8px 20px -8px color-mix(in srgb, ${stage.color} 50%, transparent)`,
                        }
                      : status === "complete"
                        ? { borderColor: "transparent", background: "transparent", opacity: 0.6 }
                        : { borderColor: "var(--color-border)", background: "transparent" }
                  }
                >
                  <Icon
                    className={`h-6 w-6 shrink-0 ${status === "active" ? "animate-[pulse-dot_2s_ease-in-out_infinite]" : ""}`}
                    style={{ color: status === "upcoming" ? "var(--color-text-muted)" : stage.color }}
                  />
                  <span className="md:mt-2">
                    <span className="block text-[11px] uppercase tracking-wide text-[var(--color-text-muted)]">
                      0{i + 1}
                    </span>
                    <span
                      className={`block text-sm font-bold ${
                        status === "upcoming" ? "text-[var(--color-text-dim)]" : "text-[var(--color-text)]"
                      }`}
                    >
                      {stage.title}
                    </span>
                  </span>
                </button>
              </div>
              {i < stages.length - 1 && (
                <Connector
                  color={stage.color}
                  state={i < activeIndex ? "complete" : i === activeIndex ? "flowing" : "pending"}
                />
              )}
            </li>
          );
        })}
      </ol>

      <p aria-live="polite" className="mt-6 min-h-[3.5rem] text-sm text-[var(--color-text-dim)]">
        <span className="font-bold" style={{ color: active.color }}>
          {active.short}.
        </span>{" "}
        {active.description}
      </p>
    </div>
  );
}
