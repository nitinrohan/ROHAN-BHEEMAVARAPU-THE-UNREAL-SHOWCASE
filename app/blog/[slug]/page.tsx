import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const supabase = await createServerClient();
    const { data: blog } = await supabase
        .from('blog_posts')
        .select('title, excerpt')
        .eq('slug', params.slug)
        .single();

    if (!blog) {
        return {
            title: 'Blog Post Not Found',
        };
    }

    return {
        title: `${blog.title} — Rohan Bheemavarapu`,
        description: blog.excerpt,
    };
}

export default async function BlogPost({ params }: Props) {
    const supabase = await createServerClient();

    const { data: blog } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', params.slug)
        .eq('published', true)
        .single();

    if (!blog) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border/40 bg-gradient-to-b from-primary/5 to-background py-12">
                <div className="container mx-auto max-w-4xl px-4">
                    <Link
                        href="/blog"
                        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blog
                    </Link>

                    {blog.featured && (
                        <Badge variant="default" className="mb-4">
                            ⭐ Featured
                        </Badge>
                    )}

                    <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                        {blog.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(blog.created_at).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </div>
                        {blog.reading_time && (
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {blog.reading_time} min read
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {blog.tags.map((tag: string) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Blog Content with Beautiful Typography */}
            <div className="container mx-auto max-w-4xl px-4 py-12">
                <article
                    className="blog-prose"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </div>
        </div>
    );
}
