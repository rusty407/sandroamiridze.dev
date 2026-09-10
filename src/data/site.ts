// Central place for identity / contact info used across the site.
// Edit here to update name, links, and copy everywhere at once.

export const site = {
  name: "Sandro Amiridze",
  handle: "rusty407",
  role: "Security Engineer / Systems Programmer",
  tagline: "Building tools that catch attackers.",
  location: "New York, NY",
  github: "https://github.com/rusty407",
  githubHandle: "rusty407",
  linkedin: "https://www.linkedin.com/in/sandro-amiridze-433a45372",
  linkedinHandle: "sandro-amiridze-433a45372",
  // Placeholder — still needs a real mailbox behind it (e.g. Cloudflare Email
  // Routing forwarding to your real inbox) before this address actually works.
  email: "contact@sandroamiridze.dev",
  siteUrl: "https://sandroamiridze.dev",
  description:
    "Security engineer and systems programmer specializing in honeypots, eBPF telemetry, and offensive/defensive tooling in Rust and C.",
} as const;

export type Project = {
  name: string;
  description: string;
  tags: string[];
  href: string;
  status?: string;
};

export const otherProjects: Project[] = [
  {
    name: "TerminateX",
    description:
      "A minimal, tiling window manager written in C — direct Xlib/X11 event handling, manual memory management, no framework scaffolding.",
    tags: ["C", "X11 / Xlib", "Systems Programming"],
    href: "https://github.com/rusty407/TerminateX",
  },
  {
    name: "portscanner-in-rust",
    description:
      "A fast, async TCP port scanner built in Rust — the recon fundamentals behind any offensive-security workflow, from scratch.",
    tags: ["Rust", "Offensive Security", "Recon"],
    href: "https://github.com/rusty407/portscanner-in-rust",
  },
  {
    name: "Pepper",
    description:
      "A minimal, no-frills TCP port scanner written in Python — the same recon fundamentals, built quick for scripting into other workflows.",
    tags: ["Python", "Offensive Security", "Recon"],
    href: "https://github.com/rusty407/Pepper",
  },
];

export const aegis = {
  name: "Aegis",
  tagline: "A Rust-based SSH honeypot built for threat capture, not just deception.",
  href: "https://github.com/rusty407/aegis-honeypot",
};
