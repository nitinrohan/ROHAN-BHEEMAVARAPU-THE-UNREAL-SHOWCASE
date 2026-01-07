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

            {/* Main Content - Always render to ensure scroll works */}
            <main className="relative z-10 min-h-screen space-y-20 pb-20">
                {/* Top 10 Projects Section */}
                {projects && projects.length > 0 ? (
                    <Top10Projects projects={projects} />
                ) : (
                    <section id="projects-section" className="relative py-20">
                        <div className="container mx-auto px-4">
                            <h2 className="mb-12 text-4xl font-bold md:text-5xl">
                                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                                    Top 10 Projects
                                </span>
                            </h2>
                            <div className="rounded-2xl border border-border/50 bg-card/50 p-12 text-center backdrop-blur-md">
                                <p className="text-xl text-muted-foreground">
                                    No projects yet. Add some projects from the admin panel!
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Certifications Section */}
                {certifications && certifications.length > 0 ? (
                    <CertificationsSection certifications={certifications} />
                ) : (
                    <section className="relative py-20">
                        <div className="container mx-auto px-4">
                            <h2 className="mb-12 text-4xl font-bold md:text-5xl">
                                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                                    Certifications
                                </span>
                            </h2>
                            <div className="rounded-2xl border border-border/50 bg-card/50 p-12 text-center backdrop-blur-md">
                                <p className="text-xl text-muted-foreground">
                                    No certifications yet. Add some from the database!
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Test Section - Visible content to ensure scroll works */}
                <section className="relative py-20">
                    <div className="container mx-auto px-4">
                        <div className="rounded-2xl border border-red-500/50 bg-red-500/10 p-12 text-center backdrop-blur-md">
                            <h3 className="mb-4 text-2xl font-bold text-red-500">
                                🎯 You scrolled! It works!
                            </h3>
                            <p className="text-muted-foreground">
                                If you can see this, scrolling is working properly.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
