// Machined Editorial: shared content keeps every page precise, evidence-led, and visually consistent.

export const profile = {
  name: "Ashirwad Jha",
  location: "Delhi NCR, India",
  email: "ashujha0914@gmail.com",
  role: "AI/ML Developer · Python Developer · Generative AI · Agentic AI",
  summary:
    "AI/ML-focused software developer with hands-on experience building Python-based Generative AI applications and intelligent assistants. Currently pursuing B.Tech in Computer Science Engineering with AI/ML specialization. Built Jaya AI, a modular voice-based AI assistant integrating speech recognition, LLM APIs, memory, state management, command execution, and system automation. Interested in developing Agentic AI systems capable of reasoning, tool use, task execution, and autonomous workflows. Seeking an Agentic AI Internship to contribute to real-world AI products and strengthen practical experience with AI agents and LLM-based systems.",
  github: "https://github.com/ashu0914",
  githubProject: "https://github.com/ashu0914/jaya-ai",
  linkedin: "https://www.linkedin.com/in/ashirwad-jha-65152b403",
};

export const projects = [
  {
    index: "01",
    name: "Jaya AI",
    kicker: "AI-powered voice assistant",
    tagline: "From conversation to execution — one modular pipeline.",
    description:
      "A modular voice interaction pipeline that turns speech into reasoning, response, and action — structured for the next generation of agentic tools.",
    stack: ["Python", "Generative AI", "LLM APIs", "Speech Recognition", "Automation"],
    highlights: [
      "Designed and developed a modular AI-powered voice assistant using Python.",
      "Built a voice interaction pipeline covering speech input → AI processing → response → action execution.",
      "Integrated LLM APIs to enable natural-language understanding and AI-generated responses.",
      "Implemented separate modules for AI reasoning, memory, conversation state, voice interaction, and command execution.",
      "Developed system automation for launching applications, opening websites, searching the web, and executing user-requested actions.",
      "Structured the application for future AI-agent capabilities and tool integrations.",
      "Worked with APIs, environment variables, Git version control, and GitHub repository management.",
      "Expanding the project toward agentic architecture with tools, permissions, configurable behavior, and autonomous task execution.",
    ],
    pipeline: [
      { index: "01", title: "Listen", copy: "Speech input enters a clear interaction pipeline." },
      { index: "02", title: "Reason", copy: "LLM APIs translate intent into an actionable response." },
      { index: "03", title: "Remember", copy: "Conversation state and memory keep context alive." },
      { index: "04", title: "Act", copy: "Commands open apps, search the web, and complete tasks." },
    ],
    github: "https://github.com/ashu0914/jaya-ai",
    featured: true,
  },
  {
    index: "02",
    name: "Nutriplex",
    kicker: "AI-powered nutrition application",
    tagline: "Intelligent nutrition — personalized, AI-driven, actionable.",
    description:
      "An AI-powered application focused on intelligent nutrition assistance — designing AI-driven user interaction and personalized recommendation workflows.",
    stack: ["Python", "AI", "Application Development"],
    highlights: [
      "Developing an AI-powered application focused on intelligent nutrition assistance.",
      "Designing AI-driven user interaction and personalized recommendation workflows.",
      "Working on application logic, AI integration, and structured response generation.",
    ],
    pipeline: [
      { index: "01", title: "Analyze", copy: "AI processes dietary inputs and nutritional data." },
      { index: "02", title: "Personalize", copy: "Tailored recommendations based on user profiles." },
      { index: "03", title: "Deliver", copy: "Structured, actionable nutrition guidance." },
    ],
    github: "https://github.com/ashu0914/nutriplex",
    featured: false,
  },
];

// Legacy single-project export for backwards compat
export const project = {
  name: projects[0].name,
  kicker: projects[0].kicker,
  description: projects[0].description,
  stack: projects[0].stack,
  highlights: projects[0].highlights,
};

export const skillGroups = [
  {
    index: "01",
    title: "Input",
    note: "Make systems listen",
    items: ["Python", "Speech recognition", "Conversational AI", "Prompt engineering"],
  },
  {
    index: "02",
    title: "Reasoning",
    note: "Turn language into intent",
    items: ["Generative AI", "LLMs", "AI assistants", "AI agents", "Google Gemini API", "Groq API"],
  },
  {
    index: "03",
    title: "Memory",
    note: "Keep context in motion",
    items: ["Context management", "Memory systems", "Conversation state", "State management"],
  },
  {
    index: "04",
    title: "Action",
    note: "Move from answer to outcome",
    items: ["Tool calling", "Task automation", "Multi-step workflows", "Command execution"],
  },
  {
    index: "05",
    title: "Build",
    note: "Ship the system around it",
    items: ["REST APIs", "API integration", "Modular architecture", "OOP", "Debugging", "Git & GitHub"],
  },
];

export const tools = ["Python", "C", "C++", "Git", "GitHub", "VS Code", "Windows"];

export const education = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science Engineering – AI/ML",
    institution: "Knowledge Park, Greater Noida, Uttar Pradesh",
    period: "2026 – Present",
    current: true,
  },
  {
    degree: "Diploma in Computer Science Engineering",
    field: "Computer Science",
    institution: "Sheela Devi Institute of Management and Technology, Faridabad, Haryana",
    period: "Completed – 2026",
    current: false,
  },
];

export const areasOfInterest = [
  "Agentic AI",
  "AI Agents",
  "Generative AI",
  "LLM Applications",
  "AI Automation",
  "Machine Learning",
  "Conversational AI",
  "Python Development",
  "Intelligent SaaS Products",
];

export const coreStrengths = [
  "Hands-on AI application development",
  "Python-focused development",
  "Problem solving & debugging",
  "Modular software design",
  "Fast learning",
  "Practical implementation of emerging AI technologies",
];

export const certifications = [
  {
    index: "01",
    issuer: "Google · Coursera",
    title: "Play It Safe: Manage Security Risks",
    date: "July 11, 2026",
    detail: "Google Career Certificate",
    verify: "https://www.coursera.org/account/accomplishments/verify/59SJ28EJM22F",
    image: "/images/cert-security-risks.png",
    imageAlt: "Google Coursera certificate for Play It Safe: Manage Security Risks, completed by Ashirwad Jha.",
  },
  {
    index: "02",
    issuer: "Google · Coursera",
    title: "AI Fundamentals",
    date: "June 11, 2026",
    detail: "Google Career Certificate",
    verify: "https://www.coursera.org/account/accomplishments/verify/RATDE7T1OCZA",
    image: "/images/cert-ai-fundamentals.png",
    imageAlt: "Google Coursera certificate for AI Fundamentals, completed by Ashirwad Jha.",
  },
  {
    index: "03",
    issuer: "Microsoft · Coursera",
    title: "Getting Started with Generative AI in Azure",
    date: "June 12, 2026",
    detail: "Microsoft Course Certificate",
    verify: "https://www.coursera.org/account/accomplishments/verify/8JL80VRNPAZ5",
    image: "/images/cert-genai-azure.png",
    imageAlt: "Microsoft Coursera certificate for Getting Started with Generative AI in Azure, completed by Ashirwad Jha.",
  },
  {
    index: "04",
    issuer: "Coursera · Starweaver",
    title: "GenAI for Social Media Marketing Specialists",
    date: "June 12, 2026",
    detail: "Verified Course Certificate",
    verify: "https://www.coursera.org/account/accomplishments/verify/VVD7POTHRO6B",
    image: "/images/cert-genai-social-media.png",
    imageAlt: "Coursera certificate for GenAI for Social Media Marketing Specialists, completed by Ashirwad Jha.",
  },
];

export const navItems = [
  { href: "/", label: "Home", index: "00" },
  { href: "/about", label: "About", index: "01" },
  { href: "/projects", label: "Projects", index: "02" },
  { href: "/skills", label: "Skills", index: "03" },
  { href: "/certifications", label: "Certificates", index: "04" },
  { href: "/contact", label: "Contact", index: "05" },
];
