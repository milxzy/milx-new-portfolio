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
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    subtitle: "Full-Stack Shopping Experience",
    description: "a scalable e-commerce solution with real-time inventory management",
    fullDescription: "built a complete e-commerce platform featuring user authentication, product catalog, shopping cart, payment processing with stripe, and admin dashboard. implemented real-time inventory tracking and order management system.",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
    achievements: 12,
    totalAchievements: 15,
    progress: 80,
    coverImage: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&h=1080&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    priority: { recruiter: 1, engineer: 3, stranger: 4 },
  },
  {
    id: "ai-chatbot",
    title: "AI Assistant",
    subtitle: "Conversational AI Interface",
    description: "an intelligent chatbot powered by advanced language models",
    fullDescription: "developed a sophisticated ai chatbot using openai's gpt-4 api with streaming responses, conversation memory, and custom prompting. features include voice input, markdown rendering, and code syntax highlighting.",
    techStack: ["React", "Node.js", "OpenAI API", "WebSockets", "Redis", "Docker"],
    achievements: 8,
    totalAchievements: 10,
    progress: 95,
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    priority: { recruiter: 2, engineer: 1, stranger: 2 },
  },
  {
    id: "creative-portfolio",
    title: "Interactive Portfolio",
    subtitle: "3D Web Experience",
    description: "an experimental portfolio with 3d graphics and animations",
    fullDescription: "created an immersive portfolio experience using three.js and react three fiber. features custom shaders, physics-based interactions, and procedural animations. optimized for performance across devices.",
    techStack: ["Three.js", "React Three Fiber", "GLSL", "Framer Motion", "Vite"],
    achievements: 6,
    totalAchievements: 8,
    progress: 75,
    coverImage: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&h=1080&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    priority: { recruiter: 5, engineer: 4, stranger: 1 },
  },
  {
    id: "devtools-extension",
    title: "DevTools Extension",
    subtitle: "Browser Developer Tools",
    description: "a chrome extension for enhanced debugging capabilities",
    fullDescription: "built a chrome devtools extension that provides advanced debugging features including network request interception, state management visualization, and performance profiling. used by 5000+ developers.",
    techStack: ["TypeScript", "Chrome APIs", "React", "Webpack", "IndexedDB"],
    achievements: 10,
    totalAchievements: 12,
    progress: 85,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=1080&fit=crop",
    githubUrl: "https://github.com",
    priority: { recruiter: 4, engineer: 2, stranger: 5 },
  },
  {
    id: "music-visualizer",
    title: "Audio Visualizer",
    subtitle: "Real-time Music Experience",
    description: "a reactive music visualizer with custom audio analysis",
    fullDescription: "developed a real-time audio visualizer using web audio api and canvas. features multiple visualization modes, frequency analysis, beat detection, and custom color themes. supports microphone input and audio files.",
    techStack: ["JavaScript", "Web Audio API", "Canvas API", "GSAP", "Howler.js"],
    achievements: 5,
    totalAchievements: 7,
    progress: 70,
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&h=1080&fit=crop",
    liveUrl: "https://example.com",
    priority: { recruiter: 6, engineer: 5, stranger: 3 },
  },
  {
    id: "api-gateway",
    title: "API Gateway",
    subtitle: "Microservices Architecture",
    description: "a robust api gateway for microservices orchestration",
    fullDescription: "architected and implemented a scalable api gateway handling 100k+ requests per second. features include rate limiting, authentication, request routing, caching, and comprehensive logging. deployed on kubernetes.",
    techStack: ["Go", "gRPC", "Redis", "Kubernetes", "Prometheus", "Grafana"],
    achievements: 14,
    totalAchievements: 14,
    progress: 100,
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop",
    githubUrl: "https://github.com",
    priority: { recruiter: 3, engineer: 1, stranger: 6 },
  },
]

// sorts projects by priority for the given profile
export function getProjectsForProfile(profile: UserProfile): Project[] {
  return [...projects].sort((a, b) => a.priority[profile] - b.priority[profile])
}
