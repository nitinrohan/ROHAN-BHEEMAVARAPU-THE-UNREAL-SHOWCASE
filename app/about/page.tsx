import { Metadata } from 'next';
import Image from 'next/image';
import { Github, Linkedin, Mail, Instagram, Youtube } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { StrangerThingsHeader } from '@/components/admin/stranger-things-header';

export const metadata: Metadata = {
    title: 'About — Rohan Bheemavarapu',
    description: 'Learn more about Rohan Bheemavarapu',
};

export default async function AboutPage() {
    const supabase = await createServerClient();

    const { data: bioSection } = await supabase
        .from('about_sections')
        .select('*')
        .eq('section_type', 'bio')
        .single();

    const { data: skills } = await supabase
        .from('about_sections')
        .select('*')
        .eq('section_type', 'skills')
        .order('order_index');

    const { data: funFacts } = await supabase
        .from('about_sections')
        .select('*')
        .eq('section_type', 'fun_facts')
        .limit(5);

    return (
        <div className="stranger-things-theme relative min-h-screen overflow-hidden">
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
                                    {bioSection?.content ||
                                        "A passionate developer, designer, and creator building amazing experiences on the web."}
                                </p>
                            </div>

                            {/* Social Links with Flickering Effect */}
                            <div className="flex gap-4">
                                <a
                                    href="https://github.com/nitinrohan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="st-glow-button flex h-14 w-14 items-center justify-center rounded transition-all hover:scale-110"
                                    title="GitHub"
                                    style={{ animation: 'flicker 3s infinite' }}
                                >
                                    <Github className="h-7 w-7 text-red-500" strokeWidth={2.5} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/rohan-bheemavarapu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="st-glow-button flex h-14 w-14 items-center justify-center rounded transition-all hover:scale-110"
                                    title="LinkedIn"
                                    style={{ animation: 'flicker 3.2s infinite' }}
                                >
                                    <Linkedin className="h-7 w-7 text-red-500" strokeWidth={2.5} fill="currentColor" />
                                </a>
                                <a
                                    href="https://www.instagram.com/unreal_imagination04"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="st-glow-button flex h-14 w-14 items-center justify-center rounded transition-all hover:scale-110"
                                    title="Instagram"
                                    style={{ animation: 'flicker 2.8s infinite' }}
                                >
                                    <Instagram className="h-7 w-7 text-red-500" strokeWidth={2.5} />
                                </a>
                                <a
                                    href="https://youtube.com/@unreal-journey04"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="st-glow-button flex h-14 w-14 items-center justify-center rounded transition-all hover:scale-110"
                                    title="YouTube"
                                    style={{ animation: 'flicker 3.5s infinite' }}
                                >
                                    <Youtube className="h-7 w-7 text-red-500" strokeWidth={2.5} fill="currentColor" />
                                </a>
                            </div>
                        </div>

                        {/* Profile Image */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-red-500/30 bg-gradient-to-br from-red-900/20 to-black shadow-[0_0_50px_rgba(231,76,60,0.3)]">
                                <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-red-500/50">
                                    RB
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                {skills && skills.length > 0 && (
                    <section className="mb-16">
                        <h2 className="st-glow-text mb-8 font-mono text-3xl font-bold uppercase tracking-wider">
                            Skills & Tech Stack
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {skills.map((skill) => (
                                <div key={skill.id} className="st-card rounded-lg p-6">
                                    <h3 className="st-glow-text mb-4 font-mono text-xl font-semibold uppercase">
                                        {skill.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(skill.metadata?.items || []).map((item: string) => (
                                            <span
                                                key={item}
                                                className="rounded border border-red-500/30 bg-red-500/10 px-2 py-1 font-mono text-xs text-red-400"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Fun Facts */}
                {funFacts && funFacts.length > 0 && (
                    <section>
                        <h2 className="st-glow-text mb-8 font-mono text-3xl font-bold uppercase tracking-wider">
                            Fun Facts
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {funFacts.map((fact, index) => (
                                <div key={fact.id} className="st-card rounded-lg p-6">
                                    <span className="mb-3 inline-block font-mono text-4xl font-bold text-red-500/50">
                                        #{index + 1}
                                    </span>
                                    <p className="font-mono text-sm text-red-400/70">{fact.content}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Default Content if no data */}
                {(!skills || skills.length === 0) && (!funFacts || funFacts.length === 0) && (
                    <section className="flex min-h-[400px] flex-col items-center justify-center">
                        <div className="st-card rounded-lg p-12 text-center">
                            <p className="st-glow-text font-mono text-xl">
                                INITIALIZING PROFILE DATA...
                            </p>
                            <p className="mt-4 font-mono text-sm text-red-400/50">
                                Content loading from the database
                            </p>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
