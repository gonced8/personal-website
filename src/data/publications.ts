export type Publication = {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  paperUrl?: string;
  doi?: string;
  codeUrl?: string;
  featured: boolean;
  summary?: { en: string; "pt-PT": string };
};

export const publications: Publication[] = [
  {
    title: "PositNN: Training Deep Neural Networks with Mixed Low-Precision Posit",
    authors: ["Gonçalo Raposo", "Pedro Tomás", "Nuno Roma"],
    venue: "ICASSP",
    year: 2021,
    paperUrl:
      "/papers/Raposo2021-PositNN_Training_Deep_Neural_Networks_with_Mixed_Low_Precision_Posit.pdf",
    doi: "https://doi.org/10.1109/ICASSP39728.2021.9413919",
    codeUrl: "https://github.com/hpc-ulisboa/posit-neuralnet",
    summary: {
      en: "My master’s thesis work on training deep neural networks with mixed low-precision posit arithmetic.",
      "pt-PT":
        "O trabalho da minha tese de mestrado sobre treino de redes neuronais com aritmética posit de baixa precisão mista.",
    },
    featured: true,
  },
  {
    title: "Information Retrieval Using Fuzzy Fingerprints",
    authors: ["Gonçalo Raposo", "Leonor Coheur", "Bruno Martins"],
    summary: {
      en: "Exploring fuzzy fingerprints for information retrieval.",
      "pt-PT": "Exploração de fingerprints difusos para recuperação de informação.",
    },
    venue: "IPMU",
    year: 2024,
    featured: true,
  },
  {
    title:
      "Prompting, Retrieval, Training: An exploration of different approaches for task-oriented dialogue generation",
    authors: ["Gonçalo Raposo", "Leonor Coheur", "Bruno Martins"],
    summary: {
      en: "Comparing prompting, retrieval and training for task-oriented dialogue generation.",
      "pt-PT":
        "Comparação de prompting, recuperação e treino para geração de diálogo orientado a tarefas.",
    },
    venue: "SIGDIAL",
    year: 2023,
    paperUrl: "https://aclanthology.org/2023.sigdial-1.37/",
    featured: true,
  },
  {
    title: "Question Rewriting? Assessing Its Importance for Conversational Question Answering",
    authors: ["Gonçalo Raposo", "Rui Ribeiro", "Bruno Martins", "Leonor Coheur"],
    summary: {
      en: "Studying question rewriting in conversational QA, linked to the first-place SCAI QReCC 2021 system.",
      "pt-PT":
        "Estudo da reformulação de perguntas em QA conversacional, ligado ao sistema vencedor do SCAI QReCC 2021.",
    },
    venue: "ECIR",
    year: 2022,
    paperUrl:
      "/papers/Raposo2022-Question_Rewriting_Assessing_its_importance_for_conversational_question_answering.pdf",
    doi: "https://doi.org/10.1007/978-3-030-99739-7_23",
    codeUrl: "https://github.com/gonced8/rachael-scai",
    featured: true,
  },
  {
    title: "Document-Level Abstractive Summarization",
    authors: ["Gonçalo Raposo", "Afonso Raposo", "André S. Carmo"],
    summary: {
      en: "An exploration of abstractive summarisation at document level.",
      "pt-PT": "Uma exploração da sumarização abstrativa ao nível do documento.",
    },
    venue: "Instituto Superior Técnico",
    year: 2022,
    paperUrl: "/papers/Raposo2022a-Document-Level_Abstractive_Summarization.pdf",
    featured: true,
  },
];
