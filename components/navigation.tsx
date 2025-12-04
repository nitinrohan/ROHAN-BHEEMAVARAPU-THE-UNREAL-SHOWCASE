'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

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

                {/* Navigation Links - Desktop */}
                <div className="hidden items-center gap-6 md:flex">
                    {/* Only show Home link if NOT on home page */}
                    {!isHomePage && (
                        <Link
                            href="/"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Home
                        </Link>
                    )}
                    <Link
                        href="/blog"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/resume"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Resume
                    </Link>
                    <Link
                        href="/about"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        title="About Me"
                    >
                        <User className="h-5 w-5" />
                    </Link>
                </div>

                {/* Mobile Nav */}
                <div className="flex items-center gap-4 md:hidden">
                    {!isHomePage && (
                        <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            Home
                        </Link>
                    )}
                    <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Blog
                    </Link>
                    <Link href="/resume" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Resume
                    </Link>
                    <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                        <User className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
