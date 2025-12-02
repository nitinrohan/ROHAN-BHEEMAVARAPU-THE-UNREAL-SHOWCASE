'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image?: string;
    tags: string[];
    reading_time?: number;
    created_at: string;
}

interface BlogCardProps {
    blog: Blog;
    variant?: 'default' | 'featured';
}

export function BlogCard({ blog, variant = 'default' }: BlogCardProps) {
    const isFeatured = variant === 'featured';

    return (
        <Link href={`/blog/${blog.slug}`}>
            <motion.div
                className={cn(
                    'group relative overflow-hidden rounded-lg bg-card transition-all duration-300',
                    isFeatured ? 'h-[400px]' : 'h-[320px]'
                )}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Cover Image */}
                <div className="relative h-full w-full">
                    {blog.cover_image ? (
                        <Image
                            src={blog.cover_image}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                            <span className="text-4xl font-bold text-primary/30">
                                {blog.title.charAt(0)}
                            </span>
                        </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                        {/* Tags */}
                        <div className="mb-3 flex flex-wrap gap-2">
                            {blog.tags.slice(0, 3).map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="bg-primary/20 text-xs backdrop-blur-sm"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Title */}
                        <h3
                            className={cn(
                                'font-bold text-white line-clamp-2',
                                isFeatured ? 'text-2xl mb-3' : 'text-xl mb-2'
                            )}
                        >
                            {blog.title}
                        </h3>

                        {/* Excerpt */}
                        {blog.excerpt && (
                            <p className="mb-3 text-sm text-gray-300 line-clamp-2">
                                {blog.excerpt}
                            </p>
                        )}

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(blog.created_at).toLocaleDateString()}
                            </span>
                            {blog.reading_time && (
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {blog.reading_time} min read
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-primary/10 backdrop-blur-[2px]" />
                    <div className="absolute bottom-6 left-6 flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">Read More</span>
                        <svg
                            className="h-4 w-4 text-white transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
