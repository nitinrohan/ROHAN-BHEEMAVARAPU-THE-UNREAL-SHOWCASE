import { createServerClient } from '@/lib/supabase/server';

export default async function sitemap() {
    const supabase = await createServerClient();

    const { data: projects } = await supabase
        .from('projects')
        .select('slug, updated_at')
        .eq('published', true);

    const projectUrls = projects?.map((project) => ({
        url: `https://your-domain.com/projects/${project.slug}`,
        lastModified: new Date(project.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    })) || [];

    return [
        {
            url: 'https://your-domain.com',
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: 'https://your-domain.com/my-list',
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.5,
        },
        ...projectUrls,
    ];
}
