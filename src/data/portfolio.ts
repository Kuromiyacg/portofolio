export interface PersonalInfo {
  name: string;
  shortName: string;
  role: string;
  location: string;
  coordinates: string;
  availability: string;
  email: string;
  github: string;
  linkedin?: string;
  profileImage: string;
  shortBio: string;
  aboutLead: string;
  aboutBody: string;
  focus: string;
  experience: string;
  currentGoal: string;
}

export interface Skill {
  name: string;
  category: "language" | "fullstack" | "workflow";
  note: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  type: string;
  tagline: string;
  description: string;
  technologies: string[];
  status: "In Development" | "Live";
  role: string;
  year: string;
  projectUrl: string;
  videoUrl?: string;
  repoUrl?: string;
  keyFeatures: {
    title: string;
    detail: string;
  }[];
  whyBuilt: string;
  keyDecision: string;
  architectureNotes: string;
}

export interface JourneyStep {
  number: string;
  title: string;
  description: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  navItems: { label: string; href: string }[];
  featuredProject: Project;
  skills: Skill[];
  journey: JourneyStep[];
}

const portfolio: PortfolioData = {
  personal: {
    name: "Jordan Christian G.",
    shortName: "Jordan Christian",
    role: "Full-Stack Developer",
    location: "Tangerang, ID",
    coordinates: "06°10'S · TANGERANG, ID",
    availability: "Available for work",
    email: "jordan.cg09@gmail.com",
    github: "https://github.com/Kuromiyacg",
    linkedin: "https://www.linkedin.com/in/jordan-christian-gofendi-83554440b",
    profileImage: "/images/profile.webp",
    shortBio:
      "Full-stack developer working with Next.js and TypeScript. Focused on shipping fast, structured web products from interface to backend.",
    aboutLead: "I build web software end to end, from database schema to the last interaction detail.",
    aboutBody:
      "Over the past year I have focused on shipping practical web applications using React, Next.js, TypeScript, and backend APIs. I care about clear information hierarchy, responsive layouts that hold up on a phone, and interfaces that feel fast the moment you touch them.",
    focus: "Next.js, TypeScript, and practical product engineering",
    experience: "1+ year shipping web applications",
    currentGoal: "Bringing LifeTrack AI to full production and collaborating on ambitious web products",
  },

  navItems: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" },
  ],

  featuredProject: {
    id: "lifetrack-ai",
    number: "01",
    title: "LifeTrack AI",
    type: "Full-Stack Web Application",
    tagline: "Daily habits and personal finances in one focused workspace.",
    description:
      "LifeTrack AI pairs quest-based habit tracking with a personal finance ledger. Instead of jumping between a habit app and a spreadsheet, you track daily routines, earn XP for streaks, and log spending, income, and savings goals in one place.",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    status: "In Development",
    role: "Creator & Full-Stack Developer",
    year: "2026",
    projectUrl: "https://lifetrack-ai-six.vercel.app",
    keyFeatures: [
      {
        title: "Habit Quests & Streaks",
        detail: "Turn daily routines into quests with XP progression, completion streaks, and immediate visual feedback.",
      },
      {
        title: "Unified Finance Ledger",
        detail: "Track daily spending, income streams, and savings targets alongside your habit dashboard.",
      },
      {
        title: "Multi-Pane Workspace",
        detail: "Responsive dashboard layout designed to stay fast and scannable across desktop and mobile screens.",
      },
      {
        title: "Trend & Category Views",
        detail: "Clear visual breakdowns of monthly savings rates and spending categories without spreadsheet clutter.",
      },
    ],
    whyBuilt:
      "Most productivity apps treat habits and money as separate worlds, which leads to juggling two dashboards and a spreadsheet. I built LifeTrack AI so daily consistency and monthly cash flow reinforce each other in one calm workspace.",
    keyDecision:
      "Kept the client architecture modular with deterministic local state slices and modal workflows so interactions feel instant on both desktop and mobile before layering heavier backend sync.",
    architectureNotes:
      "Built on a modular Next.js and TypeScript client architecture with predictable state slices, responsive modal workflows, and unified financial summaries deployed on Vercel.",
  },

  skills: [
    { name: "TypeScript", category: "language", note: "Strict typing across UI components and application state" },
    { name: "JavaScript", category: "language", note: "ES6+, async flows, browser APIs, and DOM performance" },
    { name: "Python", category: "language", note: "Backend scripting, automation, and service logic" },
    { name: "PHP", category: "language", note: "Server-side web apps and backend templates" },
    { name: "C++", category: "language", note: "Algorithms, data structures, and systems fundamentals" },
    { name: "HTML & CSS", category: "language", note: "Semantic markup, fluid layouts, and responsive tokens" },

    { name: "Next.js & React", category: "fullstack", note: "App Router, Server Components, and interactive UI state" },
    { name: "Backend & APIs", category: "fullstack", note: "REST routes, validation, and third-party integrations" },
    { name: "Databases", category: "fullstack", note: "Relational schema design, queries, and data modeling" },
    { name: "Authentication", category: "fullstack", note: "Sessions, tokens, and route-level access control" },
    { name: "Deployment", category: "fullstack", note: "Vercel edge releases, static builds, and CI checks" },

    { name: "Git & GitHub", category: "workflow", note: "Clean branching, reviews, and versioned releases" },
    { name: "AI-Assisted Dev", category: "workflow", note: "Fast prototyping, architecture review, and refactoring" },
    { name: "Claude & Tooling", category: "workflow", note: "Structured planning, debugging, and code audits" },
  ],

  journey: [
    {
      number: "01",
      title: "Web Fundamentals",
      description: "Started with semantic HTML, CSS layout systems, and vanilla JavaScript.",
    },
    {
      number: "02",
      title: "Shipping Complete Sites",
      description: "Moved from isolated exercises to full responsive websites deployed online.",
    },
    {
      number: "03",
      title: "Full-Stack Architecture",
      description: "Expanded into backend logic, databases, authentication, and REST APIs.",
    },
    {
      number: "04",
      title: "AI-Assisted Workflow",
      description: "Adopted modern AI tooling to iterate faster while keeping code modular and readable.",
    },
    {
      number: "05",
      title: "Building LifeTrack AI",
      description: "Currently building and refining a unified productivity and finance product in Next.js.",
    },
  ],
};

export default portfolio;
