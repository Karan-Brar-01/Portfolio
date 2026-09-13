/* ─────────────────────────────────────────────────────────────
   SINGLE SOURCE OF TRUTH — all resume data lives here
   Phase 4 integration: all components import from this file
───────────────────────────────────────────────────────────── */

export const personal = {
  name: "Karanpreet Singh",
  firstName: "Karanpreet",
  lastName: "Singh",
  email: "karanpreets.ds.24@nitj.ac.in",
  phone: "+91-7589165844",
  github: "https://github.com/Karan-Brar-01",
  linkedin: "https://www.linkedin.com/in/karan-brar-377b91366/",
  location: "Punjab, India",
  tagline: "Data Scientist · ML Engineer · Builder",
  bio: "B.Tech Data Science student at NIT Jalandhar with a CGPA of 9.12 (Recent SGPAs: 9.56, 9.64). I build intelligent systems at the intersection of AI, data, and software engineering — from Graph RAG pipelines to production ML APIs. Active competitive programmer with a grade-S foundation in algorithms and data structures.",
  available: true,
};

export const education = [
  {
    id: "nitj",
    institution: "National Institute of Technology, Jalandhar",
    degree: "B.Tech — Data Science",
    period: "2024 – 2028",
    score: "9.12",
    scoreLabel: "CGPA",
    scoreUnit: "/ 10",
    current: true,
  },
  {
    id: "xii",
    institution: "Class XII (CBSE)",
    degree: "Senior Secondary Education",
    period: "2024",
    score: "96.8",
    scoreLabel: "Percentage",
    scoreUnit: "%",
    current: false,
  },
  {
    id: "x",
    institution: "Class X (CBSE)",
    degree: "Secondary Education",
    period: "2022",
    score: "96.4",
    scoreLabel: "Percentage",
    scoreUnit: "%",
    current: false,
  },
] as const;

export const experience = [
  {
    id: "handshake",
    company: "Handshake AI – Project Dynamo",
    role: "AI Model Evaluator",
    period: "Jul 2026 – Present",
    location: "Remote",
    current: true,
    bullets: [
      "Evaluate frontier coding models including GPT-5.6 and Claude Opus 4.8 on repository-level debugging, feature implementation, code reasoning, and multi-step software-engineering tasks.",
      "Design challenging benchmarks over multi-file codebases; build reproducible Docker environments, validation suites, and deployment workflows.",
      "Analyze model failure modes and strengthen edge cases, task specifications, and test coverage to improve benchmark reliability.",
    ],
    accent: "#ef4444",
  },
  {
    id: "airdawg",
    company: "AirDawg Labs",
    role: "AI Systems Evaluator",
    period: "Feb 2026 – Present",
    location: "Remote",
    current: true,
    bullets: [
      "Delivered 210+ accepted software-engineering evaluation tasks by converting complex pull requests from real-world open-source repositories into deterministic multi-file coding challenges.",
      "Engineered containerized sandboxes, automated validation pipelines, and Python test suites covering implementation correctness, regressions, edge cases, and expected behavior.",
    ],
    accent: "#3b82f6",
  },
  {
    id: "prodigy",
    company: "Prodigy InfoTech",
    role: "Data Science Intern",
    period: "Jan 2026 – Present",
    location: "Remote",
    current: true,
    bullets: [
      "Selected for a data science internship focusing on predictive modeling and data analysis pipelines.",
      "Applying Python and Machine Learning concepts to solve real-world data problems.",
    ],
    accent: "#7c3aed",
  },
] as const;

export const langCards = [
  { name: "Python", initial: "Py",  accent: "#7c3aed" },
  { name: "C++ / C", initial: "C++", accent: "#06b6d4" },
  { name: "TypeScript", initial: "TS", accent: "#3b82f6" },
  { name: "SQL",    initial: "SQL", accent: "#f59e0b" },
] as const;

export const skillGroups = [
  {
    id: "datascience",
    label: "Data Science & AI",
    items: ["NumPy", "Pandas", "Scikit-learn", "SciPy", "Librosa", "NLP", "LLM Evaluation", "Prompt Engineering"],
    accent: "#06b6d4",
  },
  {
    id: "backend",
    label: "Backend & Engineering",
    items: ["FastAPI", "REST APIs", "Docker", "Git/GitHub", "Supabase", "Vercel", "Streamlit", "Pytest", "Postman"],
    accent: "#10b981",
  },
  {
    id: "databases",
    label: "Databases & Tools",
    items: ["PostgreSQL", "PostGIS", "Neo4j", "ChromaDB"],
    accent: "#ef4444",
  },
  {
    id: "coursework",
    label: "Core Competencies",
    items: [
      "Data Structures & Algorithms",
      "Design & Analysis of Algorithms",
      "Object Oriented Programming",
      "Computer Organization",
      "System Design",
      "Computer Networks",
    ],
    accent: "#f59e0b",
  },
] as const;

export const dsaHighlight = {
  title: "Core CS Subjects",
  grade: "S",
  gradeDescription: "Exceptional — earned 'S' grades across core CS subjects",
  description:
    "Active competitive programmer (Ranked 1st in Speed Quant Challenge, Utkansh '25). Advanced to Round 3 of Flipkart GRID 8.0 and solved 500+ LeetCode problems with deep expertise in algorithmic problem-solving and time/space complexity analysis.",
  topics: [
    "Arrays & Strings",
    "Trees & Graphs",
    "Dynamic Programming",
    "Sorting & Searching",
    "Recursion & Backtracking",
    "Greedy Algorithms",
  ],
};

export const interests = [
  "Competitive Programming",
  "Detective Films",
  "Music",
  "ML Research",
];

export const projects = [
  {
    id: "01",
    title: "GROUNDTRUTH\nExplainable System",
    category: "Data Mining · Analytics",
    tags: ["Python", "PostgreSQL", "Next.js", "Supabase"],
    description: [
      "Engineered an explainable infrastructure analytics platform with an 8-stage evidence-mining pipeline.",
      "Designed a transparent 5-view Reality Gap Score and PostGIS architecture for auditable provenance."
    ],
    accent: "#ef4444",
    accentAlpha: "rgba(239,68,68,",
  },
  {
    id: "02",
    title: "ClinicalPulse\nMultimodal Triage",
    category: "HealthTech · AI",
    tags: ["FastAPI", "SciPy", "Librosa", "LLMs"],
    description: [
      "Built a FastAPI backend combining adaptive LLM intake, optical rPPG vitals, and cough-acoustic analysis.",
      "Implemented a 3-method rPPG pipeline using Welch PSD + time-domain fusion for 45-180 BPM estimation."
    ],
    accent: "#10b981",
    accentAlpha: "rgba(16,185,129,",
  },
  {
    id: "03",
    title: "Graph RAG\nKnowledge System",
    category: "AI · Knowledge Graphs",
    tags: ["Neo4j", "LangChain", "LLMs", "Python"],
    description: [
      "Built a Graph RAG pipeline leveraging knowledge graphs to enhance complex reasoning and semantic search over unstructured data.",
      "Orchestrated entity extraction and relationship mapping using LangChain; stored structured networks in Neo4j.",
      "Improved multi-hop query accuracy by combining vector similarity search with deep graph traversal.",
    ],
    accent: "#7c3aed",
    accentAlpha: "rgba(124,58,237,",
  },
  {
    id: "04",
    title: "Scalable ML\nInference Service",
    category: "Backend · MLOps",
    tags: ["FastAPI", "Docker", "Cloud", "Python"],
    description: [
      "Engineered a production-ready ML API using FastAPI and Docker with strict schema validation and modular preprocessing.",
      "Deployed containerised microservices to cloud infrastructure ensuring scalability and reproducible environments.",
      "Architected versioned endpoints to support seamless model upgrades without client disruption.",
    ],
    accent: "#06b6d4",
    accentAlpha: "rgba(6,182,212,",
  },
  {
    id: "05",
    title: "DocuMind\nRAG System",
    category: "AI · NLP",
    tags: ["LangChain", "Gemini API", "ChromaDB", "Streamlit"],
    description: [
      "Built an end-to-end RAG system using LangChain + Google Gemini API for semantic querying of PDF documents.",
      "Optimised retrieval by engineering a vector search pipeline with HuggingFace Embeddings and ChromaDB.",
      "Deployed a public-facing frontend on Streamlit Community Cloud.",
    ],
    accent: "#10b981",
    accentAlpha: "rgba(16,185,129,",
  },
  {
    id: "06",
    title: "LingoSQL",
    category: "NLP · Databases",
    tags: ["Python", "NLP", "SQL", "NLU"],
    description: [
      "Developed an application that accurately translates natural language queries into executable SQL commands.",
      "Leveraged NLP techniques to parse user intent and map conversational phrasing to database schema logic.",
    ],
    accent: "#f59e0b",
    accentAlpha: "rgba(245,158,11,",
  },
  {
    id: "07",
    title: "Data Analysis &\nPrediction System",
    category: "Data Science · ML",
    tags: ["Scikit-learn", "Pandas", "Seaborn", "KNN"],
    description: [
      "Developed an end-to-end pipeline achieving 92% prediction accuracy on a 10 000+ row dataset.",
      "Implemented KNN and Decision Tree models to identify complex data patterns.",
      "Used Pandas and Seaborn for extensive preprocessing and visualisation.",
    ],
    accent: "#f43f5e",
    accentAlpha: "rgba(244,63,94,",
  },
  {
    id: "08",
    title: "DSA Visualizer",
    category: "Tools · Education",
    tags: ["Algorithms", "Data Structures", "Visualisation", "Interactive"],
    description: [
      "Built an interactive tool to visualise Data Structures and Algorithms in real-time.",
      "Covers sorting, graph traversals, tree operations, and more with step-by-step animation.",
      "Designed to help learners develop deep intuition for algorithmic complexity.",
    ],
    accent: "#3b82f6",
    accentAlpha: "rgba(59,130,246,",
  },
];
