// ============================================================================
// Portfolio Data — Single source of truth for all content
// ============================================================================
// Replace placeholder values (e.g., [Jordan Christian G.]) with your actual information.
// This file is the only place you need to edit to customize content.
// ============================================================================

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  profileImage: string;
  shortBio: string;
  focus: string;
  experience: string;
  currentGoal: string;
}

export interface Skill {
  name: string;
  category: "language" | "fullstack" | "tools";
}

export interface Project {
  id: string;
  number: string;
  title: string;
  type: string;
  description: string;
  technologies: string[];
  status: "completed" | "in-development" | "planned";
  role: string;
  projectUrl?: string;
  repoUrl?: string;
  thumbnail?: string;
  previewType: "dashboard" | "landing" | "management" | "ai-prototype" | "custom";
  keyFeatures?: string[];
  architectureNotes?: string;
  progress?: number;
  currentPhase?: string;
  nextMilestone?: string;
}

export interface JourneyStep {
  number: string;
  title: string;
  description: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface UpcomingProject {
  id: string;
  title: string;
  type: string;
  status: string;
  progressLabel: string;
  progressPercent: number; // 0-100 for visual progress bar
  currentPhase: string;
  nextMilestone: string;
  technologies: string[];
}

export interface TimelinePhase {
  phase: string;
  title: string;
  status: "completed" | "in-progress" | "upcoming";
  description: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skill[];
  metrics: Metric[];
  projects: Project[];
  upcomingProjects: UpcomingProject[];
  timeline: TimelinePhase[];
  journey: JourneyStep[];
  navItems: { label: string; href: string }[];
}

const portfolio: PortfolioData = {
  personal: {
    name: "Jordan Christian G.",
    title: "Full-Stack Developer & Web Builder",
    location: "Tangerang, Indonesia",
    email: "jordan.cg09@gmail.com",
    linkedin: "[YOUR LINKEDIN URL]",
    github: "https://github.com/Kuromiyacg",
    profileImage: "/images/profile.webp",
    shortBio:
      "I build websites and digital products with a focus on functionality, clean interfaces, and practical user experiences.",
    focus: "Building functional web apps with clean UX",
    experience: "2+ years building projects with AI-assisted development",
    currentGoal: "Deepening full-stack skills and shipping more production apps",
  },

  navItems: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],

  skills: [
    // Languages
    { name: "JavaScript", category: "language" },
    { name: "Python", category: "language" },
    { name: "C++", category: "language" },
    { name: "PHP", category: "language" },
    { name: "HTML", category: "language" },
    { name: "CSS", category: "language" },
    // Full-Stack
    { name: "Frontend", category: "fullstack" },
    { name: "Backend", category: "fullstack" },
    { name: "Database", category: "fullstack" },
    { name: "API", category: "fullstack" },
    { name: "Authentication", category: "fullstack" },
    { name: "Deployment", category: "fullstack" },
    // Tools & Workflow
    { name: "Git", category: "tools" },
    { name: "GitHub", category: "tools" },
    { name: "AI-Assisted Development", category: "tools" },
    { name: "Claude", category: "tools" },
  ],

  metrics: [
    { label: "Projects", value: "5+" },
    { label: "Years AI Dev", value: "2+" },
    { label: "Websites Built", value: "5+" },
    { label: "Technologies", value: "2+" },
  ],

  projects: [
    {
      id: "project-01",
      number: "01",
      title: "LifeTrack AI",
      type: "Full-Stack Web Application",
      description:
        "A personal productivity platform combining habit tracking (with quest/XP-based gamification) and personal finance management (spending, earning, savings goals) in a single dashboard.",
      technologies: ["Next.js", "TypeScript", "React"],
      status: "in-development",
      role: "Full-Stack Developer",
      projectUrl: "https://lifetrack-ai-six.vercel.app",
      thumbnail: "[PROJECT THUMBNAIL]",
      previewType: "dashboard",
      keyFeatures: [
        "Quest & XP-based gamified habit tracking with streak rewards",
        "Unified personal finance hub for spending, earnings, and savings goals",
        "Responsive multi-pane dashboard architecture with modal workflows",
        "Dynamic trend visualizations and categorical financial telemetry",
      ],
      architectureNotes:
        "Modular Next.js & TypeScript client architecture with local deterministic state slices, gamification mechanics, and unified financial analytics.",
      progress: undefined,
      currentPhase: "[CURRENT PHASE]",
      nextMilestone: "[NEXT MILESTONE]",
    },
    {
      id: "project-02",
      number: "02",
      title: "[WEBSITE PROJECT]",
      type: "Website",
      description:
        "A modern, responsive website built with clean design principles and optimized performance.",
      technologies: ["HTML", "CSS", "JavaScript"],
      status: "completed",
      role: "Frontend Developer",
      projectUrl: "[PROJECT URL]",
      repoUrl: "[REPO URL]",
      thumbnail: "[PROJECT THUMBNAIL]",
      previewType: "landing",
      keyFeatures: [
        "Conversion-focused responsive landing page structure",
        "Interactive feature comparison tabs & pricing tier toggles",
        "Device preview simulator (Desktop / Tablet / Mobile)",
        "Zero layout shift typography with optimized assets",
      ],
      architectureNotes: "Pure semantic HTML5 layout with utility-first responsive styling and minimal script footprint.",
    },
    {
      id: "project-03",
      number: "03",
      title: "[MANAGEMENT SYSTEM]",
      type: "Web Application",
      description:
        "A web-based management system for organizing resources, tracking progress, and managing workflows.",
      technologies: ["JavaScript", "Python", "Database", "API"],
      status: "in-development",
      role: "Full-Stack Developer",
      projectUrl: "[PROJECT URL]",
      repoUrl: "[REPO URL]",
      thumbnail: "[PROJECT THUMBNAIL]",
      previewType: "management",
      keyFeatures: [
        "Interactive status filtering: All, Active, Pending, and Archived items",
        "Live keyword query search filtering through records",
        "Interactive record creation modal with instant state update",
        "Multi-select row interaction and bulk status actions",
      ],
      architectureNotes: "Client-side CRUD simulation with strict type validation, optimistic UI updates, and accessibility focus.",
      progress: undefined,
      currentPhase: "[CURRENT PHASE]",
      nextMilestone: "[NEXT MILESTONE]",
    },
    {
      id: "project-04",
      number: "04",
      title: "[AI PROJECT]",
      type: "AI / Web Application",
      description:
        "An AI-powered application integrating machine learning capabilities with a web-based interface.",
      technologies: ["Python", "JavaScript", "AI", "API"],
      status: "planned",
      role: "Full-Stack Developer",
      projectUrl: "[PROJECT URL]",
      repoUrl: "[REPO URL]",
      thumbnail: "[PROJECT THUMBNAIL]",
      previewType: "ai-prototype",
      keyFeatures: [
        "Simulated real-time streaming LLM response interface",
        "Interactive parameter controls (Temperature, Max Output, Frequency)",
        "Prompt preset selection library for rapid testing",
        "Session conversation log and token usage metrics",
      ],
      architectureNotes: "Stream-like typewriter effect with abort capabilities and clean markdown code snippet rendering.",
    },
  ],

  upcomingProjects: [
    {
      id: "upcoming-01",
      title: "[UPCOMING PROJECT 01]",
      type: "AI Productivity Platform",
      status: "In Development",
      progressLabel: "[PROGRESS %]",
      progressPercent: 68,
      currentPhase: "[CURRENT PHASE]",
      nextMilestone: "[NEXT MILESTONE]",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "AI Engine"],
    },
    {
      id: "upcoming-02",
      title: "[UPCOMING PROJECT 02]",
      type: "Distributed Telemetry Service",
      status: "Planned",
      progressLabel: "[PROGRESS %]",
      progressPercent: 25,
      currentPhase: "[CURRENT PHASE]",
      nextMilestone: "[NEXT MILESTONE]",
      technologies: ["Python", "FastAPI", "Database", "Docker"],
    },
  ],

  timeline: [
    {
      phase: "01",
      title: "Project Conceptualization",
      status: "completed",
      description: "Scope definition, architectural boundaries, and technology evaluation.",
    },
    {
      phase: "02",
      title: "Core Architecture & Design Tokens",
      status: "completed",
      description: "Typography hierarchy, dark technical color system, and layout scaffolding.",
    },
    {
      phase: "03",
      title: "Interactive 3D Workspace",
      status: "completed",
      description: "Three.js procedural workspace, camera parallax, and WebGL fallbacks.",
    },
    {
      phase: "04",
      title: "Functional Project Previews",
      status: "completed",
      description: "Two-layer showcase with interactive miniature applications and dummy data.",
    },
    {
      phase: "05",
      title: "Advanced Motion & Ergonomics",
      status: "in-progress",
      description: "Contextual custom cursor, upcoming roadmaps, and scroll timeline choreography.",
    },
    {
      phase: "06",
      title: "Production Optimization & Static Edge Delivery",
      status: "upcoming",
      description: "Static export verification, accessibility compliance, and CDN distribution.",
    },
  ],

  journey: [
    {
      number: "01",
      title: "Started Building",
      description: "Learning the fundamentals of web development.",
    },
    {
      number: "02",
      title: "Building Projects",
      description:
        "Started developing complete websites and applications.",
    },
    {
      number: "03",
      title: "Full-Stack",
      description:
        "Working across frontend, backend, databases and APIs.",
    },
    {
      number: "04",
      title: "AI-Assisted Development",
      description:
        "Integrating AI tools into the development workflow.",
    },
    {
      number: "05",
      title: "Current",
      description:
        "Building increasingly complex digital products.",
    },
  ],
};

export default portfolio;
