'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Info, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface HeroProps {
    project?: {
        id: string;
        title: string;
        slug: string;
        summary: string;
        tech_tags: string[];
        github_url?: string;
        demo_url?: string;
        project_media?: Array<{
            url: string;
            kind: string;
        }>;
    };
}

export function Hero({ project }: HeroProps) {
    if (!project) {
        return (
            <div className="relative h-[70vh] min-h-[500px] w-full bg-gradient-to-b from-neutral-900 to-background">
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 text-5xl font-bold md:text-7xl"
                    >
                        THE UNREAL SHOWCASE
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl text-lg text-muted-foreground md:text-xl"
                    >
                        A portfolio of innovative projects and creative work
                    </motion.p>
                </div>
            </div>
        );
    }

    const heroImage = project.project_media?.find((m) => m.kind === 'thumb')?.url;

    return (
        <div className="relative h-[90vh] w-full overflow-hidden">
            {/* Background Image/Video */}
            {heroImage && (
                <div className="absolute inset-0">
                    <Image
                        src={heroImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl space-y-6"
                    >
                        <h1 className="text-5xl font-bold leading-tight md:text-7xl">
                            {project.title}
                        </h1>

                        <p className="text-lg text-foreground/90 md:text-xl">
                            {project.summary}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {project.tech_tags?.slice(0, 5).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-sm">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button size="lg" asChild className="gap-2">
                                <Link href={`/projects/${project.slug}`}>
                                    <Info className="h-5 w-5" />
                                    View Details
                                </Link>
                            </Button>

                            {project.demo_url && (
                                <Button size="lg" variant="secondary" asChild className="gap-2">
                                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-5 w-5" />
                                        Live Demo
                                    </a>
                                </Button>
                            )}

                            {project.github_url && (
                                <Button size="lg" variant="outline" asChild className="gap-2">
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                        <Github className="h-5 w-5" />
                                        Source Code
                                    </a>
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
