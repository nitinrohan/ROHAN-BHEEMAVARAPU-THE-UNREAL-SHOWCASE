import { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import { BlogCard } from '@/components/blog/blog-card';
import { ProjectRow } from '@/components/project-row';

export const metadata: Metadata = {
    title: 'Blog — Rohan Bheemavarapu',
    description: 'Thoughts, ideas, and stories from Rohan Bheemavarapu',
};

export default async function BlogPage() {
    const supabase = await createServerClient();

    const { data: blogs } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    const featuredBlogs = blogs?.filter((b) => b.featured) || [];
    const recentBlogs = blogs?.filter((b) => !b.featured) || [];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="border-b border-border/40 bg-gradient-to-b from-primary/10 to-background py-20">
                <div className="container mx-auto px-4">
                    <h1 className="mb-4 text-5xl font-bold">Blog</h1>
                    <p className="text-xl text-muted-foreground">
                        Thoughts, ideas, and stories about tech, design, and more
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Featured Posts */}
                {featuredBlogs.length > 0 && (
                    <section className="mb-16">
                        <h2 className="mb-6 text-3xl font-bold">Featured Stories</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {featuredBlogs.slice(0, 3).map((blog) => (
                                <BlogCard key={blog.id} blog={blog} variant="featured" />
                            ))}
                        </div>
                    </section>
                )}

                {/* Recent Posts */}
                {recentBlogs.length > 0 && (
                    <section>
                        <h2 className="mb-6 text-3xl font-bold">Recent Posts</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {recentBlogs.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {(!blogs || blogs.length === 0) && (
                    <div className="flex min-h-[400px] flex-col items-center justify-center">
                        <p className="text-xl text-muted-foreground">No blog posts yet</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Check back soon for new content!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
