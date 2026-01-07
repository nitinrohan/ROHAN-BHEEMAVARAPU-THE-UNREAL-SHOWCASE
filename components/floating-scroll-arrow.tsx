'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingScrollArrow() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Hide arrow after scrolling past hero (approximately 100vh)
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition < window.innerHeight * 0.8);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects-section');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    onClick={scrollToProjects}
                    className="fixed bottom-12 left-1/2 z-50 -translate-x-1/2 cursor-pointer"
                    aria-label="Scroll to projects"
                >
                    {/* Floating animation */}
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="relative"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 animate-pulse rounded-full bg-red-500/30 blur-xl" />

                        {/* Arrow container */}
                        <motion.div
                            whileHover={{
                                scale: 1.15,
                            }}
                            whileTap={{
                                scale: 0.95,
                            }}
                            className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500 bg-black/40 backdrop-blur-md transition-all hover:border-red-400 hover:bg-black/60 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] md:h-20 md:w-20"
                        >
                            {/* Inner glow */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-red-500/20 to-transparent" />

                            {/* Arrow icon */}
                            <ChevronDown className="relative h-8 w-8 text-red-500 md:h-10 md:w-10" strokeWidth={2.5} />
                        </motion.div>
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
