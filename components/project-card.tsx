'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
    project: {
        id: string;
        title: string;
        slug: string;
        summary?: string;
        tech_tags?: string[];
        github_url?: string;
        demo_url?: string;
        project_media?: Array<{
            url: string;
            kind: string;
        }>;
    };
    index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const thumbnail = project.project_media?.find((m) => m.kind === 'thumb')?.url;

    const handleFavoriteToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        // TODO: Save to localStorage
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="group relative"
        >
            <Link href={`/projects/${project.slug}`}>
                <Card
                    className={cn(
                        'overflow-hidden border border-border/50 bg-card/50 backdrop-blur transition-all duration-300',
                        'hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10'
                    )}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                        {thumbnail ? (
                            <Image
                                src={thumbnail}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
                                <span className="text-4xl font-bold text-neutral-700">
                                    {project.title.charAt(0)}
                                </span>
                            </div>
                        )}

                        {/* Favorite Button */}
                        <Button
                            size="icon"
                            variant="ghost"
                            className={cn(
                                'absolute right-2 top-2 z-10 bg-black/50 backdrop-blur transition-all',
                                'hover:bg-black/70'
                            )}
                            onClick={handleFavoriteToggle}
                        >
                            <Heart
                                className={cn('h-5 w-5', isFavorite && 'fill-primary text-primary')}
                            />
                        </Button>
                    </div>

                    {/* Hover Preview */}
                    <motion.div
                        initial={false}
                        animate={{
                            height: isHovered ? 'auto' : '0px',
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-3 p-4">
                            <h3 className="line-clamp-1 text-lg font-semibold">{project.title}</h3>

                            {project.summary && (
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                    {project.summary}
                                </p>
                            )}

                            {project.tech_tags && project.tech_tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {project.tech_tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            <div className="flex gap-2">
                                {project.github_url && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-1"
                                        asChild
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                            <Github className="h-3 w-3" />
                                            Code
                                        </a>
                                    </Button>
                                )}
                                {project.demo_url && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-1"
                                        asChild
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-3 w-3" />
                                            Demo
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Always visible title for when not hovered */}
                    {!isHovered && (
                        <div className="p-4">
                            <h3 className="line-clamp-1 font-semibold">{project.title}</h3>
                        </div>
                    )}
                </Card>
            </Link>
        </motion.div>
    );
}
