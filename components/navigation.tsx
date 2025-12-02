'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
                scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center">
                    <h1 className="bg-gradient-to-r from-primary to-red-400 bg-clip-text text-xl font-bold tracking-tight text-transparent md:text-2xl">
                        ROHAN BHEEMAVARAPU
                    </h1>
                </Link>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/search" aria-label="Search projects">
                            <Search className="h-5 w-5" />
                        </Link>
                    </Button>

                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/my-list" aria-label="My list">
                            <Heart className="h-5 w-5" />
                        </Link>
                    </Button>

                    <Button variant="outline" size="sm" asChild className="hidden md:flex">
                        <Link href="/admin">Admin</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
