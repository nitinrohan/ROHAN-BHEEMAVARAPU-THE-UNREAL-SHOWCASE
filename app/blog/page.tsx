import { Metadata } from 'next';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
    title: 'Blog — Rohan Bheemavarapu',
    description: 'Thoughts, tutorials, and insights on web development and design',
};

export default async function BlogPage() {
    const supabase = await createServerClient();

    const { data: posts } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border/40 bg-gradient-to-b from-primary/5 to-background py-16">
                <div className="container mx-auto px-4">
                    <h1 className="mb-4 text-5xl font-bold">Blog</h1>
                    <p className="text-xl text-muted-foreground">
                        Thoughts, tutorials, and insights on development, design, and creativity
                    </p>
                </div>
            </div>

            {/* Notion-Style Blog Cards */}
            <div className="container mx-auto px-4 py-12">
                {posts && posts.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group block"
                            >
                                <div className="notion-card h-full rounded-lg border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                                    {/* Featured Badge */}
                                    {post.featured && (
                                        <Badge variant="default" className="mb-4">
                                            ⭐ Featured
                                        </Badge>
                                    )}

                                    {/* Title - Only this shows on card */}
                                    <h2 className="mb-4 text-2xl font-bold leading-tight transition-colors group-hover:text-primary">
                                        {post.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                                        {post.excerpt}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </div>
                                        {post.reading_time && (
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {post.reading_time} min read
                                            </div>
                                        )}
                                    </div>

                                    {/* Tags */}
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {post.tags.slice(0, 3).map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="rounded bg-primary/10 px-2 py-1 text-xs text-primary"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="text-center">
                            <p className="text-xl text-muted-foreground">
                                No blog posts yet. Check back soon!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
