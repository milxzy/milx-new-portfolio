// types for the project data

export type UserProfile = "recruiter" | "engineer" | "stranger"

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  fullDescription: string
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
    description: "a terminal ui for browsing curated dotfile setups, previewing configs, and safely applying them to your machine",
    fullDescription: "built with go using bubble tea and lipgloss, dotfile picker lets you browse curated dotfile creators, preview their setups, and apply configs without wrecking your own. ships with manifest fetching, dependency hints, plugin manager helpers, and automatic backups. inspired by csgo config picker maps — pick a creator, load their setup, experiment freely. ships as a single native binary via `make build`.",
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
    description: "a cli tool that generates gaming-console-themed portfolio sites — pick a theme, paste your repos, get a next.js site",
    fullDescription: "portfolio arcade is a rust cli with a ratatui terminal interface that scaffolds ps3 xmb, ps5, or wii-channel-themed next.js portfolio sites. you pick your vibe, paste github repo urls, and it fetches metadata, languages, and readme content from the github api automatically. the generated site is a standard next.js project you own outright. released binaries on github, with a one-line curl install script and auto-update support.",
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
    description: "matches people based on music taste using a jaccard-coefficient algorithm across genres and artists",
    fullDescription: "melodymatch connects people through shared music taste — 60% genre overlap, 40% artist overlap, ranked from best match to worst. real-time chat via socket.io, swipe interface, and a full user auth flow. originally built around spotify's api, then pivoted to apple music and youtube music (via a python fastapi microservice) after spotify changed their policy to require 250k mau. frontend on vercel, backend on railway for zero cold starts.",
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
    description: "a ps5-ui-inspired developer portfolio built with next.js — the site you're looking at right now",
    fullDescription: "this portfolio recreates the ps5's game library ui as an interactive developer showcase. three user profiles (recruiter, engineer, stranger) each get a priority-sorted view of projects. built with next.js app router, react 19, tailwind css, and shadcn/ui. the user selection screen, scrollable game library, and full project modal are all custom ps5-themed components. keyboard navigation mirrors the console experience.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    achievements: 14,
    totalAchievements: 15,
    progress: 95,
    coverImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1920&h=1080&fit=crop",
    githubUrl: "https://github.com/milxzy/milx-new-portfolio",
    priority: { recruiter: 7, engineer: 4, stranger: 6 },
  },
  {
    id: "themed-image-gen",
    title: "Themed Image Generation",
    subtitle: "AI Image Generation Platform",
    description: "an ai image generation platform built for a company — lets users generate images from prompts within themed visual styles",
    fullDescription: "a company project i designed and built end-to-end. users input a prompt and select a visual theme; the app calls the gemini sdk to generate themed images on the fly. built with next.js and the google gemini sdk. source code is private per company policy — the live demo is publicly accessible.",
    techStack: ["Next.js", "Gemini SDK"],
    achievements: 10,
    totalAchievements: 12,
    progress: 100,
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920&h=1080&fit=crop",
    liveUrl: "https://themed-image-generation.vercel.app",
    sourcePrivate: true,
    priority: { recruiter: 2, engineer: 8, stranger: 3 },
  },
  {
    id: "kinsta-downloader",
    title: "Kinsta Downloader",
    subtitle: "WordPress Dev Environment Tool",
    description: "a go tui that pulls a wordpress site from kinsta, spins up docker containers, and restores a backup — all in one wizard",
    fullDescription: "built during my time at element eleven, llc (shared with permission). this go tool automates the most tedious part of wordpress development: getting a production site running locally. a bubble tea wizard walks you through selecting a kinsta site and environment, picking php and wordpress versions, and entering db credentials. it pulls docker images, creates containers, installs wp-cli, downloads the kinsta backup, restores the sql dump, and rewrites urls for localhost. what used to take an hour now takes a few minutes.",
    techStack: ["Go", "Bubble Tea", "Docker", "WordPress", "WP-CLI", "Kinsta API"],
    achievements: 9,
    totalAchievements: 12,
    progress: 75,
    coverImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1920&h=1080&fit=crop",
    githubUrl: "https://github.com/milxzy/kinsta-downloader",
    priority: { recruiter: 8, engineer: 5, stranger: 8 },
  },
  {
    id: "417-mowing",
    title: "417 Mowing",
    subtitle: "Lawn Care Business Website",
    description: "a marketing and booking website for a local lawn care business in the 417 area",
    fullDescription: "designed and built the full website for 417 mowing, a local lawn care business. the site handles their online presence, service listings, and customer contact flow. built with vanilla html, css, and scss for fast load times and simple hosting. live at 417mowing.com.",
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
    description: "a booking and event page for bottlecap",
    fullDescription: "built a clean booking and event site for bottlecap. focused on a straightforward user flow for finding events and making bookings. pure html kept it lightweight and fast. live on netlify.",
    techStack: ["HTML", "CSS"],
    achievements: 6,
    totalAchievements: 8,
    progress: 75,
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&h=1080&fit=crop",
    liveUrl: "https://bottlecap.netlify.app",
    githubUrl: "https://github.com/milxzy/bottlecap-site",
    priority: { recruiter: 4, engineer: 6, stranger: 1 },
  },
  {
    id: "fit-one-site",
    title: "Fit One",
    subtitle: "Fitness Studio Website",
    description: "a multi-page website for a fitness studio — covers classes, events, gallery, and merch",
    fullDescription: "designed and built a full multi-page website for a fitness studio. pages include the homepage, events listing, photo gallery, merch shop, and a class submission form. built with html, css, scss, and vanilla js. live on netlify.",
    techStack: ["HTML", "CSS", "SCSS", "JavaScript"],
    achievements: 8,
    totalAchievements: 10,
    progress: 80,
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop",
    liveUrl: "https://fitone.netlify.app",
    githubUrl: "https://github.com/milxzy/fit-one-site",
    priority: { recruiter: 4, engineer: 7, stranger: 9 },
  },
]

// sorts projects by priority for the given profile
export function getProjectsForProfile(profile: UserProfile): Project[] {
  return [...projects].sort((a, b) => a.priority[profile] - b.priority[profile])
}
