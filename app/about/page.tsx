'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Instagram, Youtube } from 'lucide-react';
import { StrangerThingsHeader } from '@/components/admin/stranger-things-header';
import { GateAnimation } from '@/components/gate-animation';

export default function AboutPage() {
    const [showGate, setShowGate] = useState(true);
    const [pageVisible, setPageVisible] = useState(false);
    const [audioStarted, setAudioStarted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleGateComplete = () => {
        setShowGate(false);
        setPageVisible(true);

        // Start music when gate completes
        if (audioRef.current && !audioStarted) {
            audioRef.current.volume = 0.3; // Set volume to 30%
            audioRef.current.play().catch((error) => {
                console.log('Audio play failed:', error);
            });
            setAudioStarted(true);
        }
    };

    return (
        <>
            {showGate && <GateAnimation onComplete={handleGateComplete} />}

            <div className={`stranger-things-theme relative min-h-screen overflow-hidden transition-opacity duration-1000 ${pageVisible ? 'opacity-100' : 'opacity-0'}`}>
                {/* Background Music - Royalty Free Synth Wave */}
                <audio
                    ref={audioRef}
                    loop
                    className="hidden"
                >
                    <source src="https://cdn.pixabay.com/download/audio/2022/05/13/audio_1808fbf07a.mp3" type="audio/mpeg" />
                </audio>

                {/* Background Image */}
                <div className="fixed inset-0 z-0">
                    <Image
                        src="/upside_down_background.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                </div>

                {/* Static noise effect */}
                <div className="st-static" />

                {/* Header with particles */}
                <div className="relative z-10">
                    <StrangerThingsHeader />
                </div>

                {/* Main Content */}
                <div className="container relative z-10 mx-auto px-4 py-12">
                    {/* Hero Section */}
                    <section className="mb-16">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            {/* Text */}
                            <div>
                                <h1 className="st-neon-title mb-6 text-4xl md:text-5xl">
                                    ROHAN BHEEMAVARAPU
                                </h1>
                                <div className="mb-8">
                                    <p className="st-glow-text font-mono text-lg">
                                        A passionate developer, designer, and creator building amazing experiences on the web.
                                    </p>
                                </div>

                                {/* Social Links with Flickering Effect */}
                                <div className="flex flex-wrap gap-6">
                                    <a
                                        href="https://github.com/nitinrohan"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="st-glow-button flex h-20 w-20 items-center justify-center rounded-lg transition-all hover:scale-110"
                                        title="GitHub"
                                        style={{ animation: 'flicker 3s infinite' }}
                                    >
                                        <Github className="h-12 w-12 text-red-500" strokeWidth={3} />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/rohan-bheemavarapu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="st-glow-button flex h-20 w-20 items-center justify-center rounded-lg transition-all hover:scale-110"
                                        title="LinkedIn"
                                        style={{ animation: 'flicker 3.2s infinite' }}
                                    >
                                        <Linkedin className="h-12 w-12 text-red-500" strokeWidth={3} fill="currentColor" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/unreal_imagination04"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="st-glow-button flex h-20 w-20 items-center justify-center rounded-lg transition-all hover:scale-110"
                                        title="Instagram"
                                        style={{ animation: 'flicker 2.8s infinite' }}
                                    >
                                        <Instagram className="h-12 w-12 text-red-500" strokeWidth={3} />
                                    </a>
                                    <a
                                        href="https://youtube.com/@unreal-journey04"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="st-glow-button flex h-20 w-20 items-center justify-center rounded-lg transition-all hover:scale-110"
                                        title="YouTube"
                                        style={{ animation: 'flicker 3.5s infinite' }}
                                    >
                                        <Youtube className="h-12 w-12 text-red-500" strokeWidth={3} fill="currentColor" />
                                    </a>
                                </div>
                            </div>

                            {/* Hellfire Club Profile Image */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-red-500/30 shadow-[0_0_50px_rgba(231,76,60,0.5)]">
                                    <Image
                                        src="/rohan-hellfire.png"
                                        alt="Rohan Bheemavarapu - Hellfire Club"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Welcome message */}
                    <section className="flex min-h-[400px] flex-col items-center justify-center">
                        <div className="st-card rounded-lg p-12 text-center">
                            <p className="st-glow-text font-mono text-xl">
                                WELCOME TO THE UPSIDE DOWN
                            </p>
                            <p className="mt-4 font-mono text-sm text-red-400/50">
                                Profile loaded successfully
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
