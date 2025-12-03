import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/blog/blog-card';

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const supabase = await createServerClient();
    const { data: blog } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', params.slug)
        .eq('published', true)
        .single();

    if (!blog) {
        return {
            title: 'Blog Post Not Found',
        };
    }

    return {
        title: `${blog.title} — Rohan Bheemavarapu`,
        description: blog.excerpt || blog.title,
        openGraph: {
            title: blog.title,
            description: blog.excerpt || '',
            images: blog.cover_image ? [blog.cover_image] : [],
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: { slug: string };
}) {
    const supabase = await createServerClient();

    // Fetch the blog post
    const { data: blog } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', params.slug)
        .eq('published', true)
        .single();

    if (!blog) {
        notFound();
    }

    // Fetch related posts (same tags)
    const { data: relatedPosts } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .neq('id', blog.id)
        .overlaps('tags', blog.tags)
        .limit(3);

    return (
        <div className="min-h-screen bg-background">
            {/* Back Button */}
            <div className="border-b border-border/40">
                <div className="container mx-auto px-4 py-4">
                    <Button variant="ghost" asChild>
                        <Link href="/blog" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blog
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Hero */}
            {blog.cover_image && (
                <div className="relative h-[400px] w-full">
                    <Image
                        src={blog.cover_image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
            )}

            {/* Content */}
            <article className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-3xl">
                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-2">
                        {blog.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl">{blog.title}</h1>

                    {/* Meta */}
                    <div className="mb-8 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(blog.created_at).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>
                        {blog.reading_time && (
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {blog.reading_time} min read
                            </span>
                        )}
                    </div>

                    {/* Excerpt */}
                    {blog.excerpt && (
                        <p className="mb-8 text-xl text-muted-foreground">{blog.excerpt}</p>
                    )}

                    {/* Content */}
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content || '' }}
                    />
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
                <section className="border-t border-border/40 bg-card/30 py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-8 text-3xl font-bold">Related Posts</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            {relatedPosts.map((post) => (
                                <BlogCard key={post.id} blog={post} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
