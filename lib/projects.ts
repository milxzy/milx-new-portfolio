// types for the project data

export type UserProfile = "recruiter" | "engineer" | "stranger"

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  fullDescription: string
  tag: string
  techStack: string[]
  achievements: number
  totalAchievements: number
  progress: number
  coverImage: string
  backgroundImage: string
  liveUrl?: string
  githubUrl?: string
  sourcePrivate?: boolean
  demoVideo?: string
  screenshots?: string[]
  priority: {
    recruiter: number
    engineer: number
    stranger: number
  }
}

// all the projects, each with a priority per profile type
export const projects: Project[] = [
  {
    id: "dotfile-picker",
    title: "Dotfile Picker",
    subtitle: "Terminal UI Tool",
    tag: "CLI Tool",
    description: "A terminal UI for browsing curated dotfile setups, previewing configs, and safely applying them to your machine.",
    fullDescription: "Built with Go using Bubble Tea and Lipgloss, Dotfile Picker lets you browse curated dotfile creators, preview their setups, and apply configs without overwriting your own. Ships with manifest fetching, dependency hints, plugin manager helpers, and automatic backups. Inspired by CSGO config picker maps: pick a creator, load their setup, and experiment freely. Distributed as a single native binary via `make build`.",
    techStack: ["Go", "Bubble Tea", "Lipgloss", "Shell", "Git"],
    achievements: 8,
    totalAchievements: 10,
    progress: 80,
    coverImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1920&h=1080&fit=crop",
    githubUrl: "https://github.com/milxzy/dotfile-picker",
    priority: { recruiter: 5, engineer: 1, stranger: 4 },
  },
  {
    id: "portfolio-arcade",
    title: "Portfolio Arcade",
    subtitle: "Portfolio Site Generator",
    tag: "CLI Tool",
    description: "A CLI tool that generates gaming-console-themed portfolio sites. Pick a theme, paste your repos, and get a fully scaffolded Next.js site.",
    fullDescription: "Portfolio Arcade is a Rust CLI with a Ratatui terminal interface that scaffolds PS3 XMB, PS5, or Wii-channel-themed Next.js portfolio sites. Pick your vibe, paste GitHub repo URLs, and it automatically fetches metadata, languages, and README content from the GitHub API. The generated site is a standard Next.js project you own outright. Released binaries on GitHub with a one-line curl install script and auto-update support.",
    techStack: ["Rust", "Ratatui", "TypeScript", "Next.js", "GitHub API", "Shell"],
    achievements: 12,
    totalAchievements: 15,
    progress: 85,
    coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&h=1080&fit=crop",
    githubUrl: "https://github.com/milxzy/portfolio-arcade",
    priority: { recruiter: 6, engineer: 2, stranger: 5 },
  },
  {
    id: "melody-match",
    title: "MelodyMatch",
    subtitle: "Music-Based Dating App",
    tag: "Full Stack App",
    description: "Matches people based on music taste using a Jaccard coefficient algorithm across genres and artists.",
    fullDescription: "MelodyMatch connects people through shared music taste, scoring compatibility at 60% genre overlap and 40% artist overlap, ranked best to worst. Features real-time chat via Socket.io, a swipe interface, and a full user auth flow. Originally built around the Spotify API, then pivoted to Apple Music and YouTube Music via a Python FastAPI microservice after Spotify restricted access to apps under 250k MAU. Frontend hosted on Vercel, backend on Railway for zero cold starts.",
    techStack: ["React", "Vite", "Node.js", "Express", "MongoDB", "Socket.io", "Python", "FastAPI", "Chakra UI"],
    achievements: 11,
    totalAchievements: 14,
    progress: 80,
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&h=1080&fit=crop",
    liveUrl: "https://melody-match-flax.vercel.app",
    githubUrl: "https://github.com/milxzy/MelodyMatch",
    priority: { recruiter: 1, engineer: 3, stranger: 2 },
  },
  {
    id: "milx-portfolio",
    title: "MilxOS Portfolio",
    subtitle: "This Portfolio",
    tag: "Portfolio",
    description: "A PS5-inspired developer portfolio built with Next.js. The site you're looking at right now.",
    fullDescription: "This portfolio recreates the PS5 game library UI as an interactive developer showcase. Three user profiles (Recruiter, Engineer, Stranger) each get a priority-sorted view of projects. Built with Next.js App Router, React 19, Tailwind CSS, and shadcn/ui. The user selection screen, scrollable game library, and full project modal are all custom PS5-themed components. Keyboard navigation mirrors the console experience.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    achievements: 14,
    totalAchievements: 15,
    progress: 95,
    coverImage: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=1920&h=1080&fit=crop",
    githubUrl: "https://github.com/milxzy/milx-new-portfolio",
    priority: { recruiter: 7, engineer: 5, stranger: 6 },
  },
  {
    id: "themed-image-gen",
    title: "Themed Image Generation",
    subtitle: "AI Image Generation Platform",
    tag: "AI Platform",
    description: "An AI image generation platform built for a company. Users generate images from prompts within themed visual styles.",
    fullDescription: "A company project designed and built end-to-end. Users input a prompt and select a visual theme, and the app calls the Gemini SDK to generate themed images on the fly. Built with Next.js and the Google Gemini SDK. Source code is private per company policy, but the live demo is publicly accessible.",
    techStack: ["Next.js", "Gemini SDK"],
    achievements: 10,
    totalAchievements: 12,
    progress: 100,
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920&h=1080&fit=crop",
    liveUrl: "https://themed-image-generation.vercel.app",
    sourcePrivate: true,
    priority: { recruiter: 2, engineer: 4, stranger: 3 },
  },
  {
    id: "kinsta-downloader",
    title: "Kinsta Downloader",
    subtitle: "WordPress Dev Environment Tool",
    tag: "CLI Tool",
    description: "A Go TUI that pulls a WordPress site from Kinsta, spins up Docker containers, and restores a backup, all in one guided wizard.",
    fullDescription: "Built during my time at Element Eleven, LLC (shared with permission). This Go tool automates the most tedious part of WordPress development: getting a production site running locally. A Bubble Tea wizard walks you through selecting a Kinsta site and environment, picking PHP and WordPress versions, and entering database credentials. It pulls Docker images, creates containers, installs WP-CLI, downloads the Kinsta backup, restores the SQL dump, and rewrites URLs for localhost. What used to take an hour now takes a few minutes.",
    techStack: ["Go", "Bubble Tea", "Docker", "WordPress", "WP-CLI", "Kinsta API"],
    achievements: 9,
    totalAchievements: 12,
    progress: 75,
    coverImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1920&h=1080&fit=crop",
    githubUrl: "https://github.com/milxzy/kinsta-downloader",
    priority: { recruiter: 8, engineer: 6, stranger: 8 },
  },
  {
    id: "417-mowing",
    title: "417 Mowing",
    subtitle: "Lawn Care Business Website",
    tag: "Client Site",
    description: "A marketing and booking website for a local lawn care business in the 417 area.",
    fullDescription: "Designed and built the full website for 417 Mowing, a local lawn care business. The site covers their online presence, service listings, and customer contact flow. Built with vanilla HTML, CSS, and SCSS for fast load times and simple hosting. Live at 417mowing.com.",
    techStack: ["HTML", "CSS", "SCSS", "JavaScript"],
    achievements: 10,
    totalAchievements: 10,
    progress: 100,
    coverImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop",
    liveUrl: "https://417mowing.com",
    githubUrl: "https://github.com/milxzy/417Mowing",
    priority: { recruiter: 3, engineer: 9, stranger: 7 },
  },
  {
    id: "bottlecap-site",
    title: "Bottlecap",
    subtitle: "Event Booking Site",
    tag: "Client Site",
    description: "A booking and event page for Bottlecap.",
    fullDescription: "Built a clean booking and event site for Bottlecap, focused on a straightforward user flow for finding events and making bookings. Pure HTML kept it lightweight and fast. Live on Netlify.",
    techStack: ["HTML", "CSS"],
    achievements: 6,
    totalAchievements: 8,
    progress: 75,
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&h=1080&fit=crop",
    liveUrl: "https://bottlecap.netlify.app",
    githubUrl: "https://github.com/milxzy/bottlecap-site",
    priority: { recruiter: 4, engineer: 7, stranger: 1 },
  },
  {
    id: "fit-one-site",
    title: "Fit One",
    subtitle: "Fitness Studio Website",
    tag: "Client Site",
    description: "A multi-page website for a fitness studio, covering classes, events, gallery, and merch.",
    fullDescription: "Designed and built a full multi-page website for a fitness studio. Pages include the homepage, events listing, photo gallery, merch shop, and a class submission form. Built with HTML, CSS, SCSS, and vanilla JavaScript. Live on Netlify.",
    techStack: ["HTML", "CSS", "SCSS", "JavaScript"],
    achievements: 8,
    totalAchievements: 10,
    progress: 80,
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop",
    liveUrl: "https://fitone.netlify.app",
    githubUrl: "https://github.com/milxzy/fit-one-site",
    priority: { recruiter: 4, engineer: 8, stranger: 9 },
  },
]

// sorts projects by priority for the given profile
export function getProjectsForProfile(profile: UserProfile): Project[] {
  return [...projects].sort((a, b) => a.priority[profile] - b.priority[profile])
}
