import Link from 'next/link';
import { Plus, FolderOpen } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Manage your portfolio projects</p>
                </div>
                <Button asChild>
                    <Link href="/admin/projects/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Project
                    </Link>
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Projects</CardTitle>
                        <CardDescription>All projects in the database</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{totalProjects || 0}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Published</CardTitle>
                        <CardDescription>Visible to public</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{publishedCount}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Featured</CardTitle>
                        <CardDescription>Highlighted projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{featuredCount}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Projects */}
            <div>
                <h2 className="mb-4 text-2xl font-bold">Recent Projects</h2>
                <div className="space-y-2">
                    {projects?.slice(0, 5).map((project) => (
                        <Card key={project.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{project.title}</CardTitle>
                                        <CardDescription>{project.slug}</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        {project.published && (
                                            <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-500">
                                                Published
                                            </span>
                                        )}
                                        {project.featured && (
                                            <span className="rounded-full bg-yellow-500/10 px-2 py-1 text-xs text-yellow-500">
                                                Featured
                                            </span>
                                        )}
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/projects/${project.id}/edit`}>Edit</Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}

                    {(!projects || projects.length === 0) && (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <FolderOpen className="mb-4 h-12 w-12 text-muted-foreground" />
                                <p className="text-muted-foreground">No projects yet</p>
                                <Button asChild className="mt-4">
                                    <Link href="/admin/projects/new">Create your first project</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
