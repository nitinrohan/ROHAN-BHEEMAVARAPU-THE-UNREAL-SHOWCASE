'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <>
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

                    {/* HOME PAGE: Normal Desktop Navigation */}
                    {isHomePage && (
                        <div className="hidden items-center gap-6 md:flex">
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
                    )}

                    {/* OTHER PAGES: Hamburger Menu (All Devices) */}
                    {!isHomePage && (
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    )}

                    {/* HOME PAGE: Mobile Icons */}
                    {isHomePage && (
                        <div className="flex items-center gap-4 md:hidden">
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
                    )}
                </div>
            </nav>

            {/* Menu Overlay - Only on non-home pages */}
            {!isHomePage && mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Menu Slide-in - Only on non-home pages */}
            {!isHomePage && (
                <div
                    className={cn(
                        'fixed right-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform bg-background border-l border-border/40 shadow-xl transition-transform duration-300 ease-in-out',
                        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    )}
                >
                    <div className="flex flex-col gap-2 p-6">
                        <Link
                            href="/"
                            className="rounded-lg px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                        >
                            Home
                        </Link>
                        <Link
                            href="/blog"
                            className="rounded-lg px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/resume"
                            className="rounded-lg px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                        >
                            Resume
                        </Link>
                        <Link
                            href="/about"
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                        >
                            <User className="h-5 w-5" />
                            About Me
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
