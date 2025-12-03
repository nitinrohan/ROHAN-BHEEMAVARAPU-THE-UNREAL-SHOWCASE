import { Metadata } from 'next';
import Image from 'next/image';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="border-b border-border/40 bg-gradient-to-b from-primary/10 to-background py-20">
                <div className="container mx-auto px-4">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        {/* Text */}
                        <div>
                            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                                Hi, I&apos;m Rohan
                            </h1>
                            <div className="prose prose-lg dark:prose-invert">
                                <p className="text-xl text-muted-foreground">
                                    {bioSection?.content ||
                                        "A passionate developer, designer, and creator building amazing experiences on the web."}
                                </p>
                            </div>
                            {/* Social Links */}
                            <div className="mt-8 flex gap-4">
                                <Button variant="outline" size="icon" asChild>
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                        <Github className="h-5 w-5" />
                                    </a>
                                </Button>
                                <Button variant="outline" size="icon" asChild>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                </Button>
                                <Button variant="outline" size="icon" asChild>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                </Button>
                                <Button variant="outline" size="icon" asChild>
                                    <a href="mailto:hello@example.com">
                                        <Mail className="h-5 w-5" />
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {/* Profile Image Placeholder */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative h-80 w-80 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                                <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-primary/30">
                                    RB
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            {skills && skills.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-8 text-3xl font-bold">Skills & Technologies</h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {skills.map((skill) => (
                                <div key={skill.id} className="rounded-lg border border-border bg-card p-6">
                                    <h3 className="mb-4 text-xl font-semibold">{skill.title}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(skill.metadata?.items || []).map((item: string) => (
                                            <Badge key={item} variant="secondary">
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Fun Facts */}
            {funFacts && funFacts.length > 0 && (
                <section className="bg-card/30 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-8 text-3xl font-bold">Fun Facts</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {funFacts.map((fact, index) => (
                                <div key={fact.id} className="rounded-lg border border-border bg-background p-6">
                                    <span className="mb-2 inline-block text-4xl font-bold text-primary/30">
                                        {index + 1}
                                    </span>
                                    <p className="text-muted-foreground">{fact.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Default Content if no data */}
            {(!skills || skills.length === 0) && (!funFacts || funFacts.length === 0) && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex min-h-[400px] flex-col items-center justify-center">
                            <p className="text-xl text-muted-foreground">
                                More details coming soon...
                            </p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
