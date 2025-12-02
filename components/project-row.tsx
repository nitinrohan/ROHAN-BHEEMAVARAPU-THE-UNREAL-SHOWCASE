'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectCard } from './project-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProjectRowProps {
    title: string;
    projects: any[];
}

export function ProjectRow({ title, projects }: ProjectRowProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [projects]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (!projects || projects.length === 0) return null;

    return (
        <div className="group/row relative px-4 md:px-8">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">{title}</h2>

            <div className="relative">
                {/* Left Arrow */}
                {canScrollLeft && (
                    <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                            'absolute left-0 top-1/2 z-20 -translate-y-1/2 bg-black/80 backdrop-blur',
                            'opacity-0 transition-opacity group-hover/row:opacity-100',
                            'hover:bg-black/90'
                        )}
                        onClick={() => scroll('left')}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                )}

                {/* Scrollable Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-4"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {projects.map((project, index) => (
                        <div key={project.id} className="min-w-[280px] md:min-w-[320px]">
                            <ProjectCard project={project} index={index} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                {canScrollRight && (
                    <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                            'absolute right-0 top-1/2 z-20 -translate-y-1/2 bg-black/80 backdrop-blur',
                            'opacity-0 transition-opacity group-hover/row:opacity-100',
                            'hover:bg-black/90'
                        )}
                        onClick={() => scroll('right')}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                )}
            </div>

            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}
