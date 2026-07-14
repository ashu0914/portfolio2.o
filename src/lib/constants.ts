// ===== PERSONAL INFO =====
export const PERSONAL = {
  name: "Ashirwad Jha",
  firstName: "Ashirwad",
  title: "Aspiring AI/ML Engineer",
  roles: [
    "Python Developer",
    "Generative AI Explorer",
    "Voice AI Assistant Builder",
    "3D Visualization Creator",
  ],
  email: "ashujha0914@gmail.com",
  location: "New Delhi, India",
  bio: "I build practical projects at the intersection of Python, AI, and Generative AI. My focus is creating useful systems, intelligent applications, and interactive digital experiences.",
  aboutLong: `I completed Diploma in Computer Science Engineering with hands-on exposure to programming, web fundamentals and practical project building. My interests span across Artificial Intelligence, Machine Learning, Python Development, Generative AI, Voice AI Assistants, Interactive Web Experiences, and 3D Visualization.

Alongside AI and software development, I work with 3ds Max, Corona Renderer, and create photorealistic interior visualizations that blend technical precision with creative design.`,
};

// ===== SOCIAL LINKS =====
export const SOCIALS = {
  github: "https://github.com/ashu0914",
  linkedin: "https://www.linkedin.com/in/ashirwad-jha-65152b403/",
  leetcode: "https://leetcode.com/u/ashujha0914/",
  email: "mailto:ashujha0914@gmail.com",
};

// ===== NAVIGATION =====
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

// ===== PROJECTS =====
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  status: "Completed" | "In Development" | "Coming Soon";
  github?: string;
  live?: string;
  image?: string;
  gradient: string;
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    id: "jaya-ai",
    title: "Jaya AI Voice Assistant",
    category: "Artificial Intelligence • Python • Desktop Application",
    description:
      "A futuristic AI-powered desktop voice assistant built completely in Python with modular command architecture.",
    longDescription:
      "Jaya AI is a powerful, modular, Python-based desktop voice assistant. It listens to voice commands, understands natural language, automates desktop tasks, opens applications, searches the web, and is designed with a clean architecture for future AI integrations including LLMs, Memory Systems, and NLP Pipelines.",
    features: [
      "Voice Recognition",
      "Natural Language Processing",
      "Desktop Automation",
      "Application Launcher",
      "Web Search Integration",
      "Modular Python Architecture",
      "Future Memory System",
      "AI Conversation Ready",
      "Modern CustomTkinter UI",
    ],
    technologies: [
      "Python",
      "SpeechRecognition",
      "pyttsx3",
      "CustomTkinter",
      "Wikipedia API",
      "Future LLM Integration",
    ],
    status: "In Development",
    github: "https://github.com/ashu0914/jaya-ai",
    gradient: "from-accent/20 via-accent-purple/10 to-transparent",
    accent: "#60a5fa",
  },
  {
    id: "nutriplex",
    title: "NutriPlex",
    category: "Web Development • AI • Health & Nutrition",
    description:
      "AI-Powered Smart Nutrition Platform with meal planning, nutrition tracking, and intelligent food suggestions.",
    longDescription:
      "NutriPlex is a modern, responsive web application that helps users track nutrition, get AI-powered meal suggestions, and maintain healthy eating habits. Built with a focus on beautiful UI/UX, glassmorphism design, and practical functionality for health-conscious users.",
    features: [
      "Smart Meal Planning",
      "Nutrition Tracking Dashboard",
      "AI-Powered Food Suggestions",
      "Fully Responsive Design",
      "Modern Glassmorphism UI",
      "Progress Visualization",
      "Food Database Search",
      "User Profile Management",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Modern UI/UX"],
    status: "Completed",
    github: "https://github.com/ashu0914/nutriplex",
    gradient: "from-accent-cyan/20 via-accent/10 to-transparent",
    accent: "#22d3ee",
  },
  {
    id: "portfolio",
    title: "3D AI/ML Portfolio",
    category: "Frontend • UI/UX • 3D Web Development",
    description:
      "A cinematic AI/ML portfolio experience built with modern web technologies featuring immersive 3D environments.",
    longDescription:
      "A premium cinematic portfolio designed to showcase an AI/ML journey through immersive 3D experiences, modern motion design, and interactive storytelling. Features high-end animations, glassmorphism UI, smooth scrolling, Three.js powered 3D elements, and responsive layouts.",
    features: [
      "Fully Responsive",
      "3D Animated Experience",
      "Cinematic UI Design",
      "Scroll-Driven Animations",
      "Interactive Three.js Scenes",
      "Glassmorphism Components",
      "Performance Optimized",
      "SEO Optimized",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "React Three Fiber",
      "GSAP",
    ],
    status: "Completed",
    gradient: "from-accent-purple/20 via-accent-cyan/10 to-transparent",
    accent: "#a78bfa",
  },
];

// ===== SKILLS =====
export interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming",
    icon: "code",
    color: "#60a5fa",
    skills: ["Python", "C", "C++", "HTML", "CSS"],
  },
  {
    title: "AI & Machine Learning",
    icon: "brain",
    color: "#a78bfa",
    skills: [
      "Machine Learning",
      "Generative AI",
      "AI Assistants",
      "Prompt Engineering",
    ],
  },
  {
    title: "Development",
    icon: "layout",
    color: "#22d3ee",
    skills: ["React", "Next.js", "TypeScript", "GitHub", "VS Code"],
  },
  {
    title: "Creative & 3D",
    icon: "palette",
    color: "#f472b6",
    skills: ["3ds Max", "Corona Renderer", "AutoCAD", "3D Visualization"],
  },
];

// ===== CERTIFICATIONS =====
export interface Certification {
  title: string;
  platform: string;
  link: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "AI & Machine Learning Foundations",
    platform: "Coursera",
    link: "https://coursera.org/share/b0a8f328edb3f81562cba218646d24a3",
  },
  {
    title: "Python for Data Science",
    platform: "Coursera",
    link: "https://coursera.org/share/2206427f9b27612698287662f6464c18",
  },
  {
    title: "Generative AI Fundamentals",
    platform: "Coursera",
    link: "https://coursera.org/share/06a0448554ba667a85e696522ca31a8a",
  },
  {
    title: "Advanced Programming Concepts",
    platform: "Coursera",
    link: "https://coursera.org/share/a17f4c592962703dc722a1b26dc8cd40",
  },
];

// ===== INTERESTS =====
export const INTERESTS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Python Development",
  "Generative AI",
  "Voice AI Assistants",
  "Interactive Web Experiences",
  "3D Visualization",
  "Interior Design & Rendering",
];

// ===== TIMELINE =====
export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    year: "2024",
    title: "Diploma in Computer Science Engineering",
    description:
      "Completed diploma with hands-on exposure to programming, web fundamentals, and practical project building.",
  },
  {
    year: "2024",
    title: "AI/ML Journey Begins",
    description:
      "Started exploring Artificial Intelligence, Machine Learning concepts, and Python-based AI projects.",
  },
  {
    year: "2024",
    title: "Voice AI & Generative AI",
    description:
      "Built Jaya AI voice assistant and began exploring Generative AI applications and prompt engineering.",
  },
  {
    year: "2025",
    title: "3D Visualization & Web Development",
    description:
      "Expanded into 3D interior visualization with 3ds Max and built interactive web experiences with modern frameworks.",
  },
];
