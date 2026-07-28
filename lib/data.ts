export interface Project {
  slug: string;
  emoji: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  dotColor: string;
  category: string;
  liveUrl: string;
}

export interface Tool {
  name: string;
  description: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  colorClass: string;
  dotClass: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const projects: Project[] = [
  {
    slug: "ai-linkedin-automator",
    emoji: "🪄",
    image: "",
    title: "AI LinkedIn Automator",
    description: "Turns raw ideas into a week of on-brand LinkedIn posts — scheduled and shipped on autopilot.",
    tags: ["Node.js", "OpenAI API", "n8n", "Next.js"],
    gradient: "from-violet to-hotpink",
    dotColor: "bg-violet",
    category: "AI Tools",
    liveUrl: "",
  },
  {
    slug: "idea-curator",
    emoji: "💡",
    image: "",
    title: "Idea Curator",
    description: "A second brain that clusters half-formed thoughts into ships-worthy product ideas.",
    tags: ["Next.js", "OpenAI embeddings", "Supabase", "pgvector"],
    gradient: "from-hotpink to-tangerine",
    dotColor: "bg-hotpink",
    category: "AI Tools",
    liveUrl: "",
  },
  {
    slug: "leads-finder",
    emoji: "🎯",
    image: "",
    title: "Leads Finder",
    description: "Describe your ideal customer in plain English — get a ranked, enriched list of real ones by morning.",
    tags: [".NET Core", "React", "Azure Functions", "OpenAI"],
    gradient: "from-tangerine to-hotpink",
    dotColor: "bg-tangerine",
    category: "AI Tools",
    liveUrl: "",
  },
  {
    slug: "agentic-workflow-summarizer",
    emoji: "🧵",
    image: "",
    title: "Agentic Workflow Summarizer",
    description: "An agent that watches your multi-step workflows and hands you a plain-English post-mortem.",
    tags: ["Python", "LangGraph", "Ollama", "Next.js"],
    gradient: "from-cyan to-indigo",
    dotColor: "bg-cyan",
    category: "Agents",
    liveUrl: "",
  },
];

export const tools: Tool[] = [
  { name: "NotebookLM", description: "Long-form research synthesis" },
  { name: "Claude Code", description: "Pair-programmer of choice" },
  { name: "n8n", description: "Glue for every workflow I ship" },
  { name: "ComfyUI", description: "Visual pipelines that don't lie" },
  { name: "Leonardo AI", description: "Fast concept art" },
  { name: "HeyGen", description: "Video without a studio" },
  { name: "ElevenLabs", description: "Voice that actually feels" },
  { name: "Ollama", description: "Local-first, private-by-default" },
];

export const timeline: TimelineEvent[] = [
  { year: "2022", title: "Started as a .NET engineer", description: "Joined the enterprise trenches — .NET Core, Azure, MERN/MEAN. Learned that shipping is a team sport and that most production bugs live in the seams between systems, not the systems themselves.", colorClass: "bg-violet", dotClass: "bg-violet" },
  { year: "2023", title: "Went full-stack + cloud", description: "Owned end-to-end features across React, Next.js, and Azure. Got the Cloud Computing Architecture cert. Started asking 'why are we building this?' more often than 'how do we build this?'.", colorClass: "bg-hotpink", dotClass: "bg-hotpink" },
  { year: "2024", title: "The AI switch flipped", description: "Fell hard for the modern AI stack — Claude Code, n8n, ComfyUI, Ollama, ElevenLabs. Realized my engineering superpower isn't code, it's shipping the thing end-to-end while everyone else prototypes.", colorClass: "bg-tangerine", dotClass: "bg-tangerine" },
  { year: "2025", title: "Built 4 AI tools solo", description: "LinkedIn Automator, Idea Curator, Leads Finder, Agentic Workflow Summarizer — all self-initiated, all documented as case studies. Earned the PM certification along the way.", colorClass: "bg-cyan", dotClass: "bg-cyan" },
  { year: "2026", title: "Making the pivot official", description: "Actively pursuing AI Product Management roles. I want to sit where engineering context, AI intuition, and product judgment overlap — because that's where the interesting decisions get made.", colorClass: "bg-lime", dotClass: "bg-lime" },
];

export const skillCategories: SkillCategory[] = [
  { title: "Engineering", skills: [".NET Core", "C#", "React", "Next.js", "TypeScript", "Node.js", "Azure", "MongoDB", "SQL"] },
  { title: "AI & Automation", skills: ["OpenAI API", "LangGraph", "n8n", "Ollama", "pgvector", "Prompt design", "Agent orchestration"] },
  { title: "Product & Craft", skills: ["Product discovery", "Roadmapping", "User interviews", "Metrics design", "PRD writing", "Sprint planning"] },
];

export const certifications = [
  "Product Management — Great Learning",
  "Cloud Computing Architecture — Great Learning",
  "AWS Certified",
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];
