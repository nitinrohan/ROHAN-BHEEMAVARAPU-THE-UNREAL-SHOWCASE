'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

type Project = {
    id: string;
    title: string;
    description: string;
    tech_tags: string[];
    thumbnail_url?: string;
    slug: string;
};

type Top10ProjectsProps = {
    projects: Project[];
};

export function Top10Projects({ projects }: Top10ProjectsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Take only top 10 projects
    const top10 = projects.slice(0, 10);

    return (
        <section id="projects-section" className="relative py-20">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold md:text-5xl">
                        <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                            Top 10 Projects
                        </span>
                    </h2>
                    <p className="mt-2 text-lg text-muted-foreground">
                        I Have Been Working On
                    </p>
                </motion.div>

                {/* Horizontal Scroll Container */}
                <div className="relative -mx-4 md:mx-0">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto px-4 pb-8 scrollbar-hide md:gap-8 md:px-0"
                        style={{
                            scrollSnapType: 'x mandatory',
                            scrollBehavior: 'smooth',
                        }}
                    >
                        {top10.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                rank={index + 1}
                            />
                        ))}
                    </div>
                </div>

                {/* Scroll Hint */}
                <div className="mt-4 text-center text-sm text-muted-foreground md:hidden">
                    ← Swipe to explore →
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, rank }: { project: Project; rank: number }) {
    return (
        <motion.a
            href={`/projects/${project.slug}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: rank * 0.05 }}
            className="group relative flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
        >
            {/* Card Container */}
            <motion.div
                whileHover={{
                    scale: 1.08,
                    rotateY: 2,
                    rotateX: -2,
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className="relative h-[400px] w-[280px] overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-md transition-all md:h-[450px] md:w-[320px]"
                style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                }}
            >
                {/* Ranking Number - Behind Card */}
                <div className="absolute -right-4 -top-4 z-0 select-none text-[140px] font-black leading-none text-red-500/10 transition-all group-hover:text-red-500/20 md:text-[180px]">
                    {rank}
                </div>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-red-600/30" />
                </div>

                {/* Glass Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80 backdrop-blur-[2px] transition-all group-hover:backdrop-blur-md" />

                {/* Thumbnail */}
                {project.thumbnail_url && (
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={project.thumbnail_url}
                            alt={project.title}
                            className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-110 group-hover:opacity-80"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-end p-6">
                    {/* Rank Badge */}
                    <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-red-500/50 bg-red-500/10 px-3 py-1 backdrop-blur-sm">
                        <span className="text-sm font-bold text-red-500">#{rank}</span>
                    </div>

                    {/* Project Title */}
                    <h3 className="mb-2 text-2xl font-bold leading-tight transition-colors group-hover:text-red-500 md:text-3xl">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground md:text-base">
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                        {project.tech_tags?.slice(0, 3).map((tech, idx) => (
                            <Badge
                                key={idx}
                                variant="secondary"
                                className="border-red-500/30 bg-red-500/10 text-xs text-red-500"
                            >
                                {tech}
                            </Badge>
                        ))}
                        {project.tech_tags?.length > 3 && (
                            <Badge
                                variant="secondary"
                                className="border-border/50 bg-background/50 text-xs"
                            >
                                +{project.tech_tags.length - 3}
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Border Glow on Hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
        </motion.a>
    );
}
