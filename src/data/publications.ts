export type Publication = {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  paperUrl?: string;
  doi?: string;
  codeUrl?: string;
  featured: boolean;
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
    featured: true,
  },
  {
    title: "Information Retrieval Using Fuzzy Fingerprints",
    authors: ["Gonçalo Raposo", "Leonor Coheur", "Bruno Martins"],
    venue: "IPMU",
    year: 2024,
    featured: true,
  },
  {
    title:
      "Prompting, Retrieval, Training: An exploration of different approaches for task-oriented dialogue generation",
    authors: ["Gonçalo Raposo", "Leonor Coheur", "Bruno Martins"],
    venue: "SIGDIAL",
    year: 2023,
    paperUrl: "https://aclanthology.org/2023.sigdial-1.37/",
    featured: true,
  },
  {
    title: "Question Rewriting? Assessing Its Importance for Conversational Question Answering",
    authors: ["Gonçalo Raposo", "Rui Ribeiro", "Bruno Martins", "Leonor Coheur"],
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
    venue: "Instituto Superior Técnico",
    year: 2022,
    paperUrl: "/papers/Raposo2022a-Document-Level_Abstractive_Summarization.pdf",
    featured: true,
  },
];
