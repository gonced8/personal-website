export type Project = {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  group: "featured" | "research" | "tools" | "contributions" | "private";
  contribution?: boolean;
  note?: string;
};

export const projects: Project[] = [
  {
    title: "xcos-mcp",
    description:
      "An MCP server that lets AI agents create, modify, validate and simulate Scilab/Xcos models.",
    tags: ["Python", "MCP", "Scilab/Xcos", "Simulation"],
    githubUrl: "https://github.com/gonced8/xcos-mcp",
    featured: true,
    group: "featured",
  },
  {
    title: "Workout Player",
    description:
      "A web app for running AI-generated workouts, with timers, circuits, progress tracking, wake lock and sound cues.",
    tags: ["TypeScript", "Web", "PWA"],
    githubUrl: "https://github.com/gonced8/workout-player",
    liveUrl: "https://workout.goncaloraposo.com",
    featured: true,
    group: "featured",
  },
  {
    title: "Split",
    description:
      "A receipt-splitting app with capture, perspective correction, item extraction, editing and totals.",
    tags: ["React", "TypeScript", "Gemini"],
    githubUrl: "https://github.com/gonced8/split",
    featured: true,
    group: "featured",
  },
  {
    title: "Orbit Radar",
    description:
      "A satellite tracker with 3D visualisation, live positions, ground tracks, search and camera follow.",
    tags: ["React", "TypeScript", "Orbit"],
    githubUrl: "https://github.com/gonced8/orbitradar-frontend",
    featured: true,
    group: "featured",
  },
  {
    title: "rachael-scai",
    description: "Conversational question answering work for the SCAI QReCC Shared Task.",
    tags: ["NLP", "Information Retrieval"],
    githubUrl: "https://github.com/gonced8/rachael-scai",
    group: "research",
  },
  {
    title: "document-summarization",
    description: "Experiments in document-level abstractive summarisation.",
    tags: ["NLP", "Python"],
    githubUrl: "https://github.com/gonced8/document-summarization",
    group: "research",
  },
  {
    title: "dialogue-retrieval",
    description: "Tools and experiments for retrieval in dialogue systems.",
    tags: ["NLP", "Retrieval"],
    githubUrl: "https://github.com/gonced8/dialogue-retrieval",
    group: "research",
  },
  {
    title: "lightning-convai",
    description: "Research tooling for conversational AI experiments.",
    tags: ["Python", "NLP"],
    githubUrl: "https://github.com/gonced8/lightning-convai",
    group: "research",
  },
  {
    title: "transformer-crypto",
    description: "Experiments around Transformer models and cryptography.",
    tags: ["Python", "ML"],
    githubUrl: "https://github.com/gonced8/transformer-crypto",
    group: "research",
  },
  {
    title: "msc-dataset",
    description: "Dataset tooling for research work.",
    tags: ["Data", "NLP"],
    githubUrl: "https://github.com/gonced8/msc-dataset",
    group: "research",
  },
  {
    title: "reverse-convolution",
    description: "A Julia/Pluto exploration of reverse convolution and image deblurring.",
    tags: ["Julia", "Pluto", "Imaging"],
    githubUrl: "https://github.com/gonced8/reverse-convolution",
    group: "tools",
  },
  {
    title: "mcdc",
    description: "A small engineering and developer tool.",
    tags: ["Tooling"],
    githubUrl: "https://github.com/gonced8/mcdc",
    group: "tools",
  },
  {
    title: "receipt-sender",
    description: "A utility for handling receipts.",
    tags: ["Tooling"],
    githubUrl: "https://github.com/gonced8/receipt-sender",
    group: "tools",
  },
  {
    title: "beamer-template-inesc-id",
    description: "A Beamer presentation template for INESC-ID.",
    tags: ["LaTeX"],
    githubUrl: "https://github.com/gonced8/beamer-template-inesc-id",
    group: "tools",
  },
  {
    title: "garmin_mcp",
    description: "Open-source contribution to a Garmin MCP project.",
    tags: ["Python", "MCP"],
    githubUrl: "https://github.com/gonced8/garmin_mcp",
    group: "contributions",
    contribution: true,
  },
  {
    title: "houdin",
    description: "Open-source contribution to the original project by Afonso Raposo.",
    tags: ["Open source"],
    githubUrl: "https://github.com/gonced8/houdin",
    group: "contributions",
    contribution: true,
  },
  {
    title: "universal",
    description: "Open-source contribution to Stillwater Universal.",
    tags: ["C++", "Numerics"],
    githubUrl: "https://github.com/gonced8/universal",
    group: "contributions",
    contribution: true,
  },
  {
    title: "Accessibility ID card",
    description:
      "A private web application that presents an autism identification card in a discreet, accessible format.",
    tags: ["Accessibility", "Web application", "Private work"],
    liveUrl: "https://autism.goncaloraposo.com",
    group: "private",
    note: "Private work",
  },
];
