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
  bio: "B.Tech Data Science student at NIT Jalandhar with a CGPA of 9.13. I build intelligent systems at the intersection of AI, data, and software engineering — from Graph RAG pipelines to production ML APIs. Active competitive programmer with a grade-S foundation in algorithms and data structures.",
  available: true,
};

export const education = [
  {
    id: "nitj",
    institution: "National Institute of Technology, Jalandhar",
    degree: "B.Tech — Data Science",
    period: "2024 – 2028",
    score: "9.13",
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
  { name: "C++",    initial: "C++", accent: "#06b6d4" },
  { name: "C",      initial: "C",   accent: "#10b981" },
  { name: "SQL",    initial: "SQL", accent: "#f59e0b" },
] as const;

export const skillGroups = [
  {
    id: "datascience",
    label: "Data Science & ML",
    items: ["Pandas", "NumPy", "Scikit-learn", "Seaborn", "NLP", "RAG Pipelines", "Knowledge Graphs"],
    accent: "#06b6d4",
  },
  {
    id: "backend",
    label: "Backend & Tools",
    items: ["FastAPI", "Docker", "Git", "VS Code", "LaTeX", "Postman", "Neo4j"],
    accent: "#10b981",
  },
  {
    id: "coursework",
    label: "Coursework",
    items: [
      "Database Management Systems",
      "Object Oriented Programming",
      "Computer Organization",
      "System Design",
      "Computer Networks",
    ],
    accent: "#f59e0b",
  },
] as const;

export const dsaHighlight = {
  title: "Data Structures & Algorithms",
  grade: "S",
  gradeDescription: "Exceptional — top coursework grade",
  description:
    "Active competitive programmer with deep expertise in algorithmic problem-solving, time/space complexity analysis, and real-world implementation of advanced data structures.",
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
    id: "02",
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
    id: "03",
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
    id: "04",
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
    id: "05",
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
    id: "06",
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
