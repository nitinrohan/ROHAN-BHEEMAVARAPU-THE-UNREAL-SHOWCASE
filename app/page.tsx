import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { FloatingScrollArrow } from '@/components/floating-scroll-arrow';
import { Top10Projects } from '@/components/top-10-projects';
import { CertificationsSection } from '@/components/certifications-section';
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

    // Fetch certifications
    const { data: certifications } = await supabase
        .from('certifications')
        .select('*')
        .order('display_order', { ascending: true });

    const featuredProjects = projects?.filter((p) => p.featured) || [];

    return (
        <div className="min-h-screen">
            <Navigation />

            {/* Hero Section */}
            <Hero project={featuredProjects[0]} />

            {/* Floating Scroll Arrow */}
            <FloatingScrollArrow />

            {/* Main Content */}
            <main className="relative z-10 space-y-20 pb-20">
                {/* Top 10 Projects Section */}
                {projects && projects.length > 0 && (
                    <Top10Projects projects={projects} />
                )}

                {/* Certifications Section */}
                {certifications && certifications.length > 0 && (
                    <CertificationsSection certifications={certifications} />
                )}
            </main>
        </div>
    );
}
