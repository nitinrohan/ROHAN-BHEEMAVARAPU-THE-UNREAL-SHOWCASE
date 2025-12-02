import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { ProjectRow } from '@/components/project-row';
import { createServerClient } from '@/lib/supabase/server';

export default async function HomePage() {
    const supabase = await createServerClient();

    // Fetch all published projects
    const { data: projects } = await supabase
        .from('projects')
        .select(`
      *,
      project_media(*)
    `)
        .eq('published', true)
        .order('created_at', { ascending: false });

    // Group projects by tech tags
    const featuredProjects = projects?.filter((p) => p.featured) || [];
    const recentProjects = projects?.slice(0, 10) || [];

    // Extract unique tech tags
    const allTags = new Set<string>();
    projects?.forEach((p) => {
        p.tech_tags?.forEach((tag: string) => allTags.add(tag));
    });

    const projectsByTech: Record<string, any[]> = {};
    allTags.forEach((tag) => {
        projectsByTech[tag] = projects?.filter((p) => p.tech_tags?.includes(tag)) || [];
    });

    return (
        <div className="min-h-screen">
            <Navigation />
            <Hero project={featuredProjects[0]} />

            <main className="relative z-10 -mt-32 space-y-12 pb-20">
                {featuredProjects.length > 0 && (
                    <ProjectRow title="Featured Projects" projects={featuredProjects} />
                )}

                {recentProjects.length > 0 && (
                    <ProjectRow title="Recent Work" projects={recentProjects} />
                )}

                {Object.entries(projectsByTech).map(([tag, tagProjects]) => (
                    <ProjectRow
                        key={tag}
                        title={`Built with ${tag}`}
                        projects={tagProjects}
                    />
                ))}
            </main>
        </div>
    );
}
