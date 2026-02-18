"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
    Search,
    Settings,
    ChevronLeft,
    Play,
    MoreHorizontal,
    Trophy,
    ArrowLeft,
    Github,
    ExternalLink,
    X,
    Lock,
} from "lucide-react";
import type { UserProfile, Project } from "@/lib/projects";
import { getProjectsForProfile } from "@/lib/projects";

interface Props {
    profile: UserProfile;
    onBack: () => void;
    onSelectProject: (project: Project) => void;
    onSwitchProfile: (profile: UserProfile) => void;
}

const profileMeta: Record<UserProfile, { name: string; color: string; initial: string }> = {
    recruiter: { name: "Recruiter", color: "from-blue-500 to-blue-700", initial: "R" },
    engineer: { name: "Engineer", color: "from-emerald-500 to-emerald-700", initial: "E" },
    stranger: { name: "Internet Stranger", color: "from-amber-500 to-amber-700", initial: "I" },
};

const themes = [
    { label: "PS5 Blue", hsl: "213 94% 58%", hex: "#3b82f6" },
    { label: "Red", hsl: "0 84% 60%", hex: "#ef4444" },
    { label: "Gold", hsl: "38 92% 50%", hex: "#f59e0b" },
    { label: "Purple", hsl: "271 81% 56%", hex: "#a855f7" },
];

// returns {top, right} for a fixed popover anchored below-right of a button
function getPopoverPos(btn: HTMLElement | null): { top: number; right: number } {
    if (!btn) return { top: 60, right: 16 };
    const r = btn.getBoundingClientRect();
    return {
        top: r.bottom + 8,
        right: window.innerWidth - r.right,
    };
}

export function GameLibrary({ profile, onBack, onSelectProject, onSwitchProfile }: Props) {
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [idx, setIdx] = useState(0);
    const [tab, setTab] = useState<"games" | "media">("games");
    const [loaded, setLoaded] = useState(false);
    const [showAllTech, setShowAllTech] = useState(false);
    const [showMediaModal, setShowMediaModal] = useState(false);

    // search
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);

    // links popover
    const [showLinks, setShowLinks] = useState(false);
    const [linksPos, setLinksPos] = useState({ top: 0, left: 0 });
    const linksBtnRef = useRef<HTMLButtonElement>(null);
    const linksPopoverRef = useRef<HTMLDivElement>(null);

    // profile switcher
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [profilePos, setProfilePos] = useState({ top: 0, right: 0 });
    const profileBtnRef = useRef<HTMLButtonElement>(null);
    const profilePopoverRef = useRef<HTMLDivElement>(null);

    // settings / theme
    const [showSettings, setShowSettings] = useState(false);
    const [settingsPos, setSettingsPos] = useState({ top: 0, right: 0 });
    const settingsBtnRef = useRef<HTMLButtonElement>(null);
    const settingsPopoverRef = useRef<HTMLDivElement>(null);

    const [accentHsl, setAccentHsl] = useState("213 94% 58%");

    const scrollBox = useRef<HTMLDivElement>(null);

    // load & apply saved theme on mount
    useEffect(() => {
        const saved = localStorage.getItem("accent-hsl");
        if (saved) {
            setAccentHsl(saved);
            document.documentElement.style.setProperty("--primary", saved);
        }
    }, []);

    // load projects for this profile
    useEffect(() => {
        const p = getProjectsForProfile(profile);
        setAllProjects(p);
        setProjects(p);
        setIdx(0);
        setLoaded(true);
    }, [profile]);

    // filter projects by search query
    useEffect(() => {
        if (!searchQuery.trim()) {
            setProjects(allProjects);
            setIdx(0);
            return;
        }
        const q = searchQuery.toLowerCase();
        const filtered = allProjects.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                p.tag.toLowerCase().includes(q) ||
                p.techStack.some((t) => t.toLowerCase().includes(q))
        );
        setProjects(filtered);
        setIdx(0);
    }, [searchQuery, allProjects]);

    // keyboard nav
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (showSearch) {
                if (e.key === "Escape") { setShowSearch(false); setSearchQuery(""); }
                return;
            }
            if (e.key === "ArrowLeft") setIdx((prev) => Math.max(0, prev - 1));
            else if (e.key === "ArrowRight") setIdx((prev) => Math.min(projects.length - 1, prev + 1));
            else if (e.key === "Enter" || e.key === " ") { if (projects[idx]) onSelectProject(projects[idx]); }
            else if (e.key === "Escape" || e.key === "Backspace") onBack();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [idx, projects, onSelectProject, onBack, showSearch]);

    // reset on project change
    useEffect(() => {
        setShowAllTech(false);
        setShowLinks(false);
    }, [idx]);

    // scroll selected tile into view
    useEffect(() => {
        if (scrollBox.current) {
            const el = scrollBox.current.children[idx + 1] as HTMLElement;
            if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
    }, [idx]);

    // focus search input
    useEffect(() => {
        if (showSearch) searchInputRef.current?.focus();
    }, [showSearch]);

    // close popovers on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const t = e.target as Node;
            if (showSettings && settingsPopoverRef.current && !settingsPopoverRef.current.contains(t) && !settingsBtnRef.current?.contains(t)) setShowSettings(false);
            if (showProfileMenu && profilePopoverRef.current && !profilePopoverRef.current.contains(t) && !profileBtnRef.current?.contains(t)) setShowProfileMenu(false);
            if (showLinks && linksPopoverRef.current && !linksPopoverRef.current.contains(t) && !linksBtnRef.current?.contains(t)) setShowLinks(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [showSettings, showProfileMenu, showLinks]);

    const applyTheme = (hsl: string) => {
        setAccentHsl(hsl);
        document.documentElement.style.setProperty("--primary", hsl);
        localStorage.setItem("accent-hsl", hsl);
        setShowSettings(false);
    };

    const toggleSettings = useCallback(() => {
        setSettingsPos(getPopoverPos(settingsBtnRef.current));
        setShowSettings((v) => !v);
        setShowProfileMenu(false);
        setShowLinks(false);
    }, []);

    const toggleProfile = useCallback(() => {
        setProfilePos(getPopoverPos(profileBtnRef.current));
        setShowProfileMenu((v) => !v);
        setShowSettings(false);
        setShowLinks(false);
    }, []);

    const toggleLinks = useCallback(() => {
        if (linksBtnRef.current) {
            const r = linksBtnRef.current.getBoundingClientRect();
            setLinksPos({ top: r.bottom + 8, left: r.left });
        }
        setShowLinks((v) => !v);
        setShowSettings(false);
        setShowProfileMenu(false);
    }, []);

    const current = projects[idx];
    const time = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

    if (!loaded) {
        return (
            <div className="min-h-screen bg-[#0a0f14] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* bg image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: current ? `url(${current.backgroundImage})` : undefined }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            </div>

            {/* top nav */}
            <header className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 md:py-6">
                <div className="flex items-center gap-4 md:gap-8">
                    <button type="button" onClick={onBack} className="p-2 flex-shrink-0 rounded-full hover:bg-white/10 transition-colors" aria-label="Go back">
                        <ChevronLeft className="w-6 h-6 text-white/80" />
                    </button>
                    <nav className="flex items-center gap-4 md:gap-6">
                        <button type="button" onClick={() => setTab("games")} className={`text-base md:text-xl font-medium transition-colors ${tab === "games" ? "text-white" : "text-white/50 hover:text-white/70"}`}>
                            Projects
                        </button>
                        <button type="button" onClick={() => setShowMediaModal(true)} className={`text-base md:text-xl font-medium transition-colors ${tab === "media" ? "text-white" : "text-white/50 hover:text-white/70"}`}>
                            Media
                        </button>
                    </nav>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    {/* search toggle */}
                    <button type="button" onClick={() => { setShowSearch((v) => !v); if (showSearch) setSearchQuery(""); }} className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-white/60 hover:text-white transition-colors" aria-label="Search">
                        <Search className="w-5 h-5" />
                    </button>

                    {/* settings trigger */}
                    <button ref={settingsBtnRef} type="button" onClick={toggleSettings} className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-white/60 hover:text-white transition-colors" aria-label="Settings">
                        <Settings className="w-5 h-5" />
                    </button>

                    {/* profile trigger */}
                    <button
                        ref={profileBtnRef}
                        type="button"
                        onClick={toggleProfile}
                        aria-label="Switch profile"
                        className={`w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br ${profileMeta[profile].color} flex items-center justify-center ring-2 ring-transparent hover:ring-white/40 transition-all`}
                    >
                        <span className="text-white text-xs font-medium">{profileMeta[profile].initial}</span>
                    </button>

                    <span className="text-white/80 text-sm md:text-lg">{time}</span>
                </div>
            </header>

            {/* search bar */}
            {showSearch && (
                <div className="relative z-10 px-4 md:px-8 pb-2">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <Search className="w-4 h-4 text-white/50 flex-shrink-0" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title, tag, or technology..."
                            className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none"
                        />
                        {searchQuery && (
                            <button type="button" onClick={() => setSearchQuery("")} className="text-white/40 hover:text-white/70">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* project tiles row */}
            <div className="relative z-10 mt-4 px-4 md:px-8">
                {projects.length === 0 ? (
                    <p className="text-white/40 text-sm pt-4 pb-10">No projects match your search.</p>
                ) : (
                    <div ref={scrollBox} className="flex items-start gap-4 overflow-x-auto pt-4 pb-10 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        <button type="button" onClick={onBack} className="flex-shrink-0 w-20 h-20 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Go back to user selection">
                            <ArrowLeft className="w-6 h-6 text-white/60" />
                        </button>
                        {projects.map((proj, i) => (
                            <button
                                type="button"
                                key={proj.id}
                                onClick={() => { setIdx(i); onSelectProject(proj); }}
                                onMouseEnter={() => setIdx(i)}
                                className={`flex-shrink-0 relative group transition-all duration-300 ${i === idx ? "scale-110 z-10" : "scale-100 opacity-80"}`}
                            >
                                <div className={`w-28 h-28 rounded-xl overflow-hidden transition-all duration-300 ${i === idx ? "ring-4 ring-white shadow-lg shadow-white/20" : "ring-2 ring-white/20"}`}>
                                    <img src={proj.coverImage || "/placeholder.svg"} alt={proj.title} className="w-full h-full object-cover" />
                                </div>
                                {i === idx && (
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                        <span className="text-white text-sm font-medium">{proj.title}</span>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* selected project details */}
            {current && (
                <div className="relative z-10 mt-16 px-4 md:px-8 flex gap-8">
                    <div className="flex-1 max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">{current.title}</h1>
                        <p className="text-lg md:text-xl text-white/80 mb-6">{current.subtitle}</p>
                        <p className="text-white/60 text-base md:text-lg mb-8 max-w-xl leading-relaxed">{current.description}</p>

                        <div className="flex items-center gap-4">
                            <button type="button" onClick={() => onSelectProject(current)} className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300">
                                <Play className="w-5 h-5 text-white fill-white" />
                                <span className="text-white font-medium text-base md:text-lg">View</span>
                            </button>

                            {/* ... links trigger */}
                            <button
                                ref={linksBtnRef}
                                type="button"
                                onClick={toggleLinks}
                                className="p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                                aria-label="More options"
                            >
                                <MoreHorizontal className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* right panel - desktop only */}
                    <div className="hidden lg:flex flex-col gap-4 w-80">
                        <button type="button" onClick={() => onSelectProject(current)} className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden text-left hover:ring-2 hover:ring-white/30 transition-all duration-200 w-full">
                            <img src={current.coverImage || "/placeholder.svg"} alt={current.title} className="w-full h-48 object-cover" />
                            <div className="p-4 flex items-center justify-between">
                                <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">{current.tag}</span>
                                <p className="text-white/60 text-sm hover:text-white/80 transition-colors">View Details</p>
                            </div>
                        </button>
                        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4">
                            <Trophy className="w-10 h-10 text-amber-400" />
                            <div className="flex-1">
                                <div className="text-white/60 text-sm mb-1">Progress</div>
                                <div className="text-white font-medium">{current.progress}%</div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {(showAllTech ? current.techStack : current.techStack.slice(0, 4)).map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm">{tech}</span>
                            ))}
                            {!showAllTech && current.techStack.length > 4 && (
                                <button type="button" onClick={() => setShowAllTech(true)} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/60 text-sm hover:bg-white/20 hover:text-white/80 transition-colors">
                                    +{current.techStack.length - 4} more
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* bottom hints */}
            <div className="absolute bottom-8 left-4 md:left-8 flex items-center gap-2 text-white/40 text-sm">
                <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-xs">O</div>
                <span>Back</span>
            </div>
            <div className="absolute bottom-8 right-4 md:right-8 flex items-center gap-2 text-white/40 text-sm">
                <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-xs">X</div>
                <span>Select</span>
            </div>

            {/* ── FIXED POPOVERS (render above overflow:hidden) ── */}

            {/* settings popover */}
            {showSettings && (
                <div
                    ref={settingsPopoverRef}
                    className="fixed z-[100] bg-[#1a2535] border border-white/10 rounded-2xl p-4 w-52 shadow-xl"
                    style={{ top: settingsPos.top, right: settingsPos.right }}
                >
                    <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">Accent Color</p>
                    <div className="grid grid-cols-2 gap-2">
                        {themes.map((t) => (
                            <button
                                key={t.hex}
                                type="button"
                                onClick={() => applyTheme(t.hsl)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors text-sm ${accentHsl === t.hsl ? "bg-white/20 text-white" : "hover:bg-white/10 text-white/70"}`}
                            >
                                <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: t.hex }} />
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* profile switcher popover */}
            {showProfileMenu && (
                <div
                    ref={profilePopoverRef}
                    className="fixed z-[100] bg-[#1a2535] border border-white/10 rounded-2xl p-2 w-52 shadow-xl"
                    style={{ top: profilePos.top, right: profilePos.right }}
                >
                    {(Object.keys(profileMeta) as UserProfile[]).map((p) => (
                        <button
                            key={p}
                            type="button"
                            onClick={() => { onSwitchProfile(p); setShowProfileMenu(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm ${p === profile ? "bg-white/20 text-white" : "hover:bg-white/10 text-white/70"}`}
                        >
                            <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${profileMeta[p].color} flex items-center justify-center text-[10px] text-white font-medium flex-shrink-0`}>
                                {profileMeta[p].initial}
                            </span>
                            {profileMeta[p].name}
                        </button>
                    ))}
                </div>
            )}

            {/* links popover */}
            {showLinks && current && (
                <div
                    ref={linksPopoverRef}
                    className="fixed z-[100] bg-[#1a2535] border border-white/10 rounded-2xl p-3 w-52 shadow-xl"
                    style={{ top: linksPos.top, left: Math.min(linksPos.left, window.innerWidth - 224) }}
                >
                    <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2 px-1">Links</p>
                    {current.githubUrl ? (
                        <a href={current.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white text-sm transition-colors">
                            <Github className="w-4 h-4 flex-shrink-0" />
                            View Source
                        </a>
                    ) : current.sourcePrivate ? (
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 text-sm cursor-not-allowed">
                            <Lock className="w-4 h-4 flex-shrink-0" />
                            Source Private
                        </div>
                    ) : null}
                    {current.liveUrl && (
                        <a href={current.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white text-sm transition-colors">
                            <ExternalLink className="w-4 h-4 flex-shrink-0" />
                            View Live
                        </a>
                    )}
                    {!current.githubUrl && !current.sourcePrivate && !current.liveUrl && (
                        <p className="text-white/30 text-sm px-3 py-2">No links available.</p>
                    )}
                </div>
            )}

            {/* media modal */}
            {showMediaModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowMediaModal(false)} onKeyDown={(e) => e.key === "Enter" && setShowMediaModal(false)} role="button" tabIndex={0} aria-label="Close modal" />
                    <div className="relative z-10 bg-gradient-to-br from-[#1a2030] to-[#0a0f14] rounded-3xl p-8 md:p-12 max-w-sm w-full text-center border border-white/10">
                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary">
                                <rect x="2" y="7" width="20" height="13" rx="2"/>
                                <polyline points="17 2 12 7 7 2"/>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">Coming Soon</h2>
                        <p className="text-white/60 leading-relaxed">YouTube and Blog are on the way. Check back soon.</p>
                        <button type="button" onClick={() => setShowMediaModal(false)} className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-colors">
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
