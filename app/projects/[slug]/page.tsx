import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Github, ExternalLink, Calendar, ArrowLeft } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectRow } from '@/components/project-row';
import { formatDate } from '@/lib/utils';

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createServerClient();

    const { data: project } = await supabase
        .from('projects')
        .select('title, summary')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.title} | ROHAN BHEEMAVARAPU`,
        description: project.summary || 'Portfolio project showcase',
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const supabase = await createServerClient();

    const { data: project } = await supabase
        .from('projects')
        .select(`
      *,
      project_media(*)
    `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (!project) {
        notFound();
    }

    // Get related projects (same tech tags)
    const { data: relatedProjects } = await supabase
        .from('projects')
        .select(`
      *,
      project_media(*)
    `)
        .eq('published', true)
        .neq('id', project.id)
        .limit(6);

    const images = project.project_media?.filter((m: any) => m.kind === 'image' || m.kind === 'thumb') || [];
    const heroImage = images[0]?.url;

    return (
        <div className="min-h-screen bg-background">
            {/* Back Button */}
            <div className="container mx-auto px-4 pt-20">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>

            {/* Hero Image */}
            {heroImage && (
                <div className="relative h-[60vh] w-full">
                    <Image
                        src={heroImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto px-4 py-12 md:px-8">
                <div className="mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="mb-8 space-y-4">
                        <h1 className="text-4xl font-bold md:text-6xl">{project.title}</h1>

                        {project.summary && (
                            <p className="text-xl text-muted-foreground">{project.summary}</p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formatDate(project.created_at)}
                            </div>
                        </div>

                        {/* Tech Tags */}
                        {project.tech_tags && project.tech_tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {project.tech_tags.map((tag: string) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            {project.demo_url && (
                                <Button size="lg" asChild className="gap-2">
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
                                        View Source
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    {project.description && (
                        <div className="prose prose-invert max-w-none mb-12">
                            <div className="whitespace-pre-wrap text-lg leading-relaxed">
                                {project.description}
                            </div>
                        </div>
                    )}

                    {/* Image Gallery */}
                    {images.length > 1 && (
                        <div className="mb-12">
                            <h2 className="mb-4 text-2xl font-bold">Gallery</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                {images.slice(1).map((media: any, index: number) => (
                                    <div key={media.id} className="relative aspect-video overflow-hidden rounded-xl">
                                        <Image
                                            src={media.url}
                                            alt={`${project.title} screenshot ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Projects */}
            {relatedProjects && relatedProjects.length > 0 && (
                <div className="border-t border-border py-12">
                    <div className="container mx-auto">
                        <ProjectRow title="Related Projects" projects={relatedProjects} />
                    </div>
                </div>
            )}
        </div>
    );
}
