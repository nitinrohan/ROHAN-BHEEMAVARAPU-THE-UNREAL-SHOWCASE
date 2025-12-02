'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/project-card';

export default function MyListPage() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        // Load favorites from localStorage
        const stored = localStorage.getItem('favorites');
        if (stored) {
            try {
                const ids = JSON.parse(stored);
                setFavorites(ids);
                // TODO: Fetch projects by IDs from Supabase
            } catch (e) {
                console.error('Failed to load favorites');
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto px-4 py-8">
                <Button variant="ghost" asChild className="mb-6">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>

                <div className="mb-8 flex items-center gap-3">
                    <Heart className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold">My List</h1>
                </div>

                {projects.length === 0 ? (
                    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                        <Heart className="mb-4 h-16 w-16 text-muted-foreground" />
                        <h2 className="mb-2 text-2xl font-semibold">Your list is empty</h2>
                        <p className="mb-6 text-muted-foreground">
                            Add projects to your list by clicking the heart icon
                        </p>
                        <Button asChild>
                            <Link href="/">Browse Projects</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
