import type { Locale } from "../i18n/utils";
export type Localized = Record<Locale, string>;
export type Project = {
  id: string;
  title: string;
  titlePt?: string;
  description: Localized;
  decision?: Localized;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  featuredOrder?: number;
  group: "featured" | "research" | "tools" | "contributions" | "private";
  contribution?: boolean;
  note?: Localized;
  image?: { file: string; alt: Localized };
  visual?: string;
  article?: Partial<Record<Locale, string>>;
};

export const projects: Project[] = [
  {
    id: "xcos-mcp",
    title: "xcos-mcp",
    description: {
      en: "An MCP server that lets AI agents create, modify, validate and simulate Scilab/Xcos models.",
      "pt-PT":
        "Um servidor MCP que permite a agentes de AI criar, modificar, validar e simular modelos Scilab/Xcos.",
    },
    tags: ["Python", "MCP", "Scilab/Xcos", "Simulation"],
    githubUrl: "https://github.com/gonced8/xcos-mcp",
    featured: true,
    group: "featured",
    featuredOrder: 4,
    decision: {
      en: "Connects an agent’s tool calls to model validation and simulation in an existing engineering environment.",
      "pt-PT":
        "Liga as ferramentas de um agente à validação e simulação num ambiente de engenharia existente.",
    },
    visual: "xcos-mcp",
    article: {
      en: "/writing/building-xcos-mcp/",
      "pt-PT": "/pt/writing/building-xcos-mcp/",
    },
  },
  {
    id: "positnn",
    title: "PositNN",
    description: {
      en: "A C++ framework for training and inference with neural networks using low-precision posit arithmetic.",
      "pt-PT":
        "Uma biblioteca C++ para treino e inferência de redes neuronais com aritmética posit de baixa precisão.",
    },
    tags: ["C++", "Posits", "Neural networks", "Systems"],
    githubUrl: "https://github.com/hpc-ulisboa/posit-neuralnet",
    featured: true,
    group: "featured",
    featuredOrder: 5,
    decision: {
      en: "Explores mixed low-precision arithmetic as part of my master’s thesis.",
      "pt-PT": "Explora aritmética de baixa precisão mista, no âmbito da minha tese de mestrado.",
    },
    note: {
      en: "Master’s thesis · HPC-ULisboa repository",
      "pt-PT": "Tese de mestrado · repositório HPC-ULisboa",
    },
    visual: "positnn",
  },
  {
    id: "noticias-do-dia",
    title: "Notícias do Dia",
    description: {
      en: "A daily European Portuguese news podcast built from curated RSS feeds, automated with GitHub Actions and published through RSS.",
      "pt-PT":
        "Um podcast diário de notícias em português europeu, com recolha por RSS, geração de áudio e publicação automatizada.",
    },
    tags: ["Python", "Automation", "RSS", "Audio"],
    liveUrl: "https://news-podcast.goncaloraposo.com",
    featured: true,
    group: "featured",
    featuredOrder: 0,
    decision: {
      en: "Separates news collection, audio generation and RSS publishing into repeatable workflow steps.",
      "pt-PT":
        "Separa a recolha de notícias, a geração de áudio e a publicação RSS em etapas repetíveis.",
    },
    image: {
      file: "news",
      alt: {
        en: "Notícias do Dia public interface",
        "pt-PT": "Interface pública de Notícias do Dia",
      },
    },
  },
  {
    id: "workout-player",
    title: "Workout Player",
    description: {
      en: "A web app for running AI-generated workouts, with timers, circuits, progress tracking, wake lock and sound cues.",
      "pt-PT":
        "Uma aplicação para executar treinos gerados por AI, com temporizadores, circuitos e acompanhamento do progresso.",
    },
    tags: ["TypeScript", "Web", "PWA"],
    githubUrl: "https://github.com/gonced8/workout-player",
    liveUrl: "https://workout.goncaloraposo.com",
    featured: true,
    group: "featured",
    featuredOrder: 1,
    decision: {
      en: "Turns a structured workout into timed steps, including rest, repetitions and sound cues.",
      "pt-PT":
        "Transforma um treino estruturado em etapas com tempo, descanso, repetições e sinais sonoros.",
    },
    image: {
      file: "workout",
      alt: {
        en: "Workout Player public interface",
        "pt-PT": "Interface pública de Workout Player",
      },
    },
  },
  {
    id: "split",
    title: "Split",
    description: {
      en: "A receipt-splitting app with capture, perspective correction, item extraction, editing and totals.",
      "pt-PT":
        "Uma aplicação para dividir contas: captura o recibo, extrai os artigos e distribui os custos por pessoa.",
    },
    tags: ["React", "TypeScript", "Gemini"],
    githubUrl: "https://github.com/gonced8/split",
    liveUrl: "https://split.goncaloraposo.com",
    featured: true,
    group: "featured",
    featuredOrder: 3,
    decision: {
      en: "Keeps receipt extraction editable before assigning items and calculating totals.",
      "pt-PT":
        "Permite corrigir a extração do recibo antes de atribuir artigos e calcular os totais.",
    },
    image: {
      file: "split",
      alt: {
        en: "Split public interface",
        "pt-PT": "Interface pública de Split",
      },
    },
  },
  {
    id: "orbit-radar",
    title: "Orbit Radar",
    description: {
      en: "A satellite tracker with 3D visualisation, live positions, ground tracks, search and camera follow.",
      "pt-PT":
        "Um explorador de satélites com visualização 3D, posições em tempo real e trajetórias orbitais.",
    },
    tags: ["React", "TypeScript", "Orbit"],
    githubUrl: "https://github.com/gonced8/orbitradar-frontend",
    liveUrl: "https://orbitradar.goncaloraposo.com",
    featured: true,
    group: "featured",
    featuredOrder: 2,
    decision: {
      en: "Combines orbital data and propagation with an interactive view of the Earth.",
      "pt-PT": "Combina dados orbitais e propagação com uma visualização interativa da Terra.",
    },
    visual: "orbit-radar",
  },
  {
    id: "rachael-scai",
    title: "rachael-scai",
    description: {
      en: "Conversational question answering work for the SCAI QReCC Shared Task.",
      "pt-PT":
        "Investigação em resposta a perguntas em contexto de conversação, no SCAI QReCC Shared Task.",
    },
    tags: ["NLP", "Information Retrieval"],
    githubUrl: "https://github.com/gonced8/rachael-scai",
    featured: false,
    group: "research",
  },
  {
    id: "document-summarization",
    title: "document-summarization",
    description: {
      en: "Experiments in document-level abstractive summarisation.",
      "pt-PT": "Experiências de sumarização abstrativa ao nível do documento.",
    },
    tags: ["NLP", "Python"],
    githubUrl: "https://github.com/gonced8/document-summarization",
    featured: false,
    group: "research",
  },
  {
    id: "dialogue-retrieval",
    title: "dialogue-retrieval",
    description: {
      en: "Tools and experiments for retrieval in dialogue systems.",
      "pt-PT": "Ferramentas e experiências de recuperação de informação em sistemas de diálogo.",
    },
    tags: ["NLP", "Retrieval"],
    githubUrl: "https://github.com/gonced8/dialogue-retrieval",
    featured: false,
    group: "research",
  },
  {
    id: "lightning-convai",
    title: "lightning-convai",
    description: {
      en: "Research tooling for conversational AI experiments.",
      "pt-PT": "Ferramentas de investigação para experiências de AI conversacional.",
    },
    tags: ["Python", "NLP"],
    githubUrl: "https://github.com/gonced8/lightning-convai",
    featured: false,
    group: "research",
  },
  {
    id: "transformer-crypto",
    title: "transformer-crypto",
    description: {
      en: "A Transformer decoder experiment for predicting Bitcoin prices.",
      "pt-PT": "Uma experiência com um descodificador Transformer para prever preços de Bitcoin.",
    },
    tags: ["Python", "ML"],
    githubUrl: "https://github.com/gonced8/transformer-crypto",
    featured: false,
    group: "research",
  },
  {
    id: "msc-dataset",
    title: "msc-dataset",
    description: {
      en: "Cleaning tools for ParlAI’s Multi-Session Chat dataset.",
      "pt-PT": "Ferramentas de limpeza do conjunto de dados Multi-Session Chat do ParlAI.",
    },
    tags: ["Data", "NLP"],
    githubUrl: "https://github.com/gonced8/msc-dataset",
    featured: false,
    group: "research",
  },
  {
    id: "nemo-backend",
    title: "nemo-backend",
    description: {
      en: "Backend for the Nemo application, developed for the Sword AI Challenge 2023.",
      "pt-PT": "Backend da aplicação Nemo, desenvolvida para o Sword AI Challenge de 2023.",
    },
    tags: ["Python", "Backend", "AI"],
    githubUrl: "https://github.com/gonced8/nemo-backend",
    featured: false,
    group: "research",
  },
  {
    id: "reverse-convolution",
    title: "reverse-convolution",
    description: {
      en: "A Julia/Pluto exploration of reverse convolution and image deblurring.",
      "pt-PT": "Uma exploração de convolução inversa e recuperação de imagens em Julia e Pluto.",
    },
    tags: ["Julia", "Pluto", "Imaging"],
    githubUrl: "https://github.com/gonced8/reverse-convolution",
    featured: false,
    group: "tools",
    article: {
      en: "/writing/recovering-a-blurred-image/",
    },
  },
  {
    id: "mcdc",
    title: "mcdc",
    description: {
      en: "A tool for automatic MC/DC analysis in C and Python.",
      "pt-PT": "Uma ferramenta para automatizar a análise de cobertura MC/DC em C e Python.",
    },
    tags: ["C", "Python", "Testing"],
    githubUrl: "https://github.com/gonced8/mcdc",
    featured: false,
    group: "tools",
  },
  {
    id: "receipt-sender",
    title: "receipt-sender",
    description: {
      en: "Retrieves information from Google Sheets and sends receipts to the corresponding recipients.",
      "pt-PT": "Recolhe informação do Google Sheets e envia recibos aos respetivos destinatários.",
    },
    tags: ["Tooling"],
    githubUrl: "https://github.com/gonced8/receipt-sender",
    featured: false,
    group: "tools",
  },
  {
    id: "beamer-template-inesc-id",
    title: "beamer-template-inesc-id",
    description: {
      en: "A Beamer presentation template for INESC-ID.",
      "pt-PT": "Um modelo de apresentações Beamer para o INESC-ID.",
    },
    tags: ["LaTeX"],
    githubUrl: "https://github.com/gonced8/beamer-template-inesc-id",
    featured: false,
    group: "tools",
  },
  {
    id: "garmin-mcp",
    title: "garmin_mcp",
    description: {
      en: "Fork of a Garmin MCP server.",
      "pt-PT": "Fork de um servidor MCP para acesso a dados Garmin.",
    },
    tags: ["Python", "MCP"],
    githubUrl: "https://github.com/gonced8/garmin_mcp",
    featured: false,
    group: "contributions",
    contribution: false,
    note: {
      en: "Fork · upstream project credited in repository",
      "pt-PT": "Fork · projeto original identificado no repositório",
    },
  },
  {
    id: "houdin",
    title: "houdin",
    description: {
      en: "Fork of Houdin, originally created by Afonso Raposo.",
      "pt-PT": "Fork do projeto Houdin, criado por Afonso Raposo.",
    },
    tags: ["Open source"],
    githubUrl: "https://github.com/gonced8/houdin",
    featured: false,
    group: "contributions",
    contribution: false,
    note: {
      en: "Fork · upstream project credited in repository",
      "pt-PT": "Fork · projeto original identificado no repositório",
    },
  },
  {
    id: "universal",
    title: "universal",
    description: {
      en: "Fork of Stillwater’s Universal numerical arithmetic library.",
      "pt-PT": "Fork da biblioteca Universal de aritmética numérica, da Stillwater.",
    },
    tags: ["C++", "Numerics"],
    githubUrl: "https://github.com/gonced8/universal",
    featured: false,
    group: "contributions",
    contribution: false,
    note: {
      en: "Fork · upstream project credited in repository",
      "pt-PT": "Fork · projeto original identificado no repositório",
    },
  },
  {
    id: "accessibility-card",
    title: "Autism ID card",
    description: {
      en: "A private web application that presents an autism identification card in a discreet, accessible format.",
      "pt-PT":
        "Uma aplicação web privada que apresenta um cartão de identificação de autismo de forma discreta e acessível.",
    },
    tags: ["Accessibility", "Web application", "Private work"],
    featured: false,
    group: "private",
    titlePt: "Cartão de identificação de autismo",
    note: {
      en: "Private application · illustrative demo below",
      "pt-PT": "Aplicação privada · demonstração ilustrativa abaixo",
    },
    visual: "accessibility",
  },
];
export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
