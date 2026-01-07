import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { FloatingScrollArrow } from '@/components/floating-scroll-arrow';
import { Top10Projects } from '@/components/top-10-projects';
import { CertificationsSection } from '@/components/certifications-section';
import { createServerClient } from '@/lib/supabase/server';

// Placeholder data for Top 10 Projects
const placeholderProjects = Array.from({ length: 10 }, (_, i) => ({
    id: `placeholder-${i + 1}`,
    title: `Project ${i + 1}`,
    slug: `project-${i + 1}`,
    description: 'Add this project from the admin panel to showcase your work',
    tech_tags: ['React', 'Next.js', 'TypeScript'],
    thumbnail_url: undefined,
}));

// Placeholder data for Certifications
const placeholderCertifications = Array.from({ length: 4 }, (_, i) => ({
    id: `cert-placeholder-${i + 1}`,
    name: `Certification ${i + 1}`,
    issuer: 'Add from database',
    logo_url: undefined,
    credential_url: undefined,
    issued_date: undefined,
}));

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

    // Use real data if available, otherwise use placeholders
    const displayProjects = projects && projects.length > 0 ? projects : placeholderProjects;
    const displayCertifications = certifications && certifications.length > 0 ? certifications : placeholderCertifications;

    return (
        <div className="min-h-screen">
            <Navigation />

            {/* Hero Section */}
            <Hero project={featuredProjects[0]} />

            {/* Floating Scroll Arrow */}
            <FloatingScrollArrow />

            {/* Main Content */}
            <main className="relative z-10 min-h-screen space-y-20 pb-20">
                {/* Top 10 Projects Section - Always show with placeholders if needed */}
                <Top10Projects projects={displayProjects} />

                {/* Certifications Section - Always show with placeholders if needed */}
                <CertificationsSection certifications={displayCertifications} />
            </main>
        </div>
    );
}
