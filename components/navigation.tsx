'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 z-50 w-full transition-all duration-300',
                scrolled
                    ? 'border-b border-border/40 bg-background/95 backdrop-blur-sm'
                    : 'bg-gradient-to-b from-background to-transparent'
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <h1 className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                        ROHAN BHEEMAVARAPU
                    </h1>
                </Link>

                {/* Navigation Links */}
                <div className="hidden items-center gap-6 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Home
                    </Link>
                    <Link
                        href="/blog"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        About
                    </Link>
                    <Link
                        href="/resume"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Resume
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="text-muted-foreground transition-colors hover:text-foreground">
                        <Search className="h-5 w-5" />
                    </button>
                    <Link href="/my-list" className="text-muted-foreground transition-colors hover:text-foreground">
                        <Heart className="h-5 w-5" />
                    </Link>
                    <Link href="/admin" className="text-muted-foreground transition-colors hover:text-foreground">
                        <User className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
