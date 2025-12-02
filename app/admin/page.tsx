import Link from 'next/link';
import { Plus, FolderOpen } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';

export default async function AdminPage() {
    const supabase = await createServerClient();

    const { data: projects, count: totalProjects } = await supabase
        .from('projects')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

    const publishedCount = projects?.filter((p) => p.published).length || 0;
    const featuredCount = projects?.filter((p) => p.featured).length || 0;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="st-glow-text font-mono text-3xl font-bold tracking-wider">
                        CONTROL CENTER
                    </h1>
                    <p className="mt-2 font-mono text-sm text-red-400/70">
                        Manage your portfolio projects
                    </p>
                </div>
                <button className="st-glow-button flex items-center gap-2">
                    <Link href="/admin/projects/new" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        NEW PROJECT
                    </Link>
                </button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="st-card rounded-lg p-6">
                    <h3 className="st-glow-text mb-2 font-mono text-sm uppercase tracking-wider">
                        Total Projects
                    </h3>
                    <div className="text-4xl font-bold text-red-500">{totalProjects || 0}</div>
                    <p className="mt-2 font-mono text-xs text-red-400/50">All projects in database</p>
                </div>

                <div className="st-card rounded-lg p-6">
                    <h3 className="st-glow-text mb-2 font-mono text-sm uppercase tracking-wider">
                        Published
                    </h3>
                    <div className="text-4xl font-bold text-red-500">{publishedCount}</div>
                    <p className="mt-2 font-mono text-xs text-red-400/50">Visible to public</p>
                </div>

                <div className="st-card rounded-lg p-6">
                    <h3 className="st-glow-text mb-2 font-mono text-sm uppercase tracking-wider">
                        Featured
                    </h3>
                    <div className="text-4xl font-bold text-red-500">{featuredCount}</div>
                    <p className="mt-2 font-mono text-xs text-red-400/50">Highlighted projects</p>
                </div>
            </div>

            {/* Recent Projects */}
            <div>
                <h2 className="st-glow-text mb-4 font-mono text-2xl font-bold tracking-wider">
                    RECENT PROJECTS
                </h2>
                <div className="space-y-2">
                    {projects?.slice(0, 5).map((project) => (
                        <div key={project.id} className="st-card rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="st-glow-text font-mono text-lg font-semibold">
                                        {project.title}
                                    </h3>
                                    <p className="font-mono text-xs text-red-400/50">/{project.slug}</p>
                                </div>
                                <div className="flex gap-2">
                                    {project.published && (
                                        <span className="rounded border border-green-500/30 bg-green-500/10 px-2 py-1 font-mono text-xs text-green-500">
                                            PUBLISHED
                                        </span>
                                    )}
                                    {project.featured && (
                                        <span className="rounded border border-yellow-500/30 bg-yellow-500/10 px-2 py-1 font-mono text-xs text-yellow-500">
                                            FEATURED
                                        </span>
                                    )}
                                    <button className="st-glow-button rounded px-3 py-1 text-xs">
                                        <Link href={`/admin/projects/${project.id}/edit`}>EDIT</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {(!projects || projects.length === 0) && (
                        <div className="st-card flex flex-col items-center justify-center rounded-lg py-12">
                            <FolderOpen className="mb-4 h-12 w-12 text-red-400/50" />
                            <p className="mb-4 font-mono text-red-400/70">No projects detected</p>
                            <button className="st-glow-button">
                                <Link href="/admin/projects/new">CREATE FIRST PROJECT</Link>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
