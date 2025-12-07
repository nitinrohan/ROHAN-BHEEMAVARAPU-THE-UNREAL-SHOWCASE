import { Metadata } from 'next';
import { Download, Calendar } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Resume — Rohan Bheemavarapu',
    description: 'Professional experience and education',
};

export default async function ResumePage() {
    const supabase = await createServerClient();

    const { data: experiences } = await supabase
        .from('resume_items')
        .select('*')
        .eq('category', 'experience')
        .order('start_date', { ascending: false });

    const { data: education } = await supabase
        .from('resume_items')
        .select('*')
        .eq('category', 'education')
        .order('start_date', { ascending: false });

    const { data: skillsData } = await supabase
        .from('resume_items')
        .select('*')
        .eq('category', 'skills');

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border/40 bg-gradient-to-b from-primary/10 to-background py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold">Resume</h1>
                            <p className="mt-2 text-muted-foreground">
                                Professional Experience & Education
                            </p>
                        </div>
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            <a
                                href="/resume.pdf"
                                download="Rohan_Bheemavarapu_Resume.pdf"
                                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Resume
                            </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-12 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Experience */}
                        <section className="mb-16">
                            <h2 className="mb-6 text-2xl font-bold">Experience</h2>
                            <div className="space-y-8">
                                {experiences && experiences.length > 0 ? (
                                    experiences.map((exp) => (
                                        <div key={exp.id} className="relative border-l-2 border-primary pl-6">
                                            <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary" />
                                            <div className="mb-2 flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                                                    <p className="text-primary">{exp.organization}</p>
                                                    {exp.location && (
                                                        <p className="text-sm text-muted-foreground">
                                                            {exp.location}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-right text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {exp.start_date && new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                        {' - '}
                                                        {exp.current ? 'Present' : exp.end_date && new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                    </div>
                                                </div>
                                            </div>
                                            {exp.description && (
                                                <p className="mb-3 text-muted-foreground">{exp.description}</p>
                                            )}
                                            {exp.highlights && exp.highlights.length > 0 && (
                                                <ul className="mb-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                                                    {exp.highlights.map((highlight: string, idx: number) => (
                                                        <li key={idx}>{highlight}</li>
                                                    ))}
                                                </ul>
                                            )}
                                            {exp.technologies && exp.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.technologies.map((tech: string) => (
                                                        <Badge key={tech} variant="secondary" className="text-xs">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground">No experience listed yet.</p>
                                )}
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="mb-6 text-2xl font-bold">Education</h2>
                            <div className="space-y-8">
                                {education && education.length > 0 ? (
                                    education.map((edu) => (
                                        <div key={edu.id} className="relative border-l-2 border-primary pl-6">
                                            <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary" />
                                            <div className="mb-2 flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-xl font-semibold">{edu.title}</h3>
                                                    <p className="text-primary">{edu.organization}</p>
                                                    {edu.location && (
                                                        <p className="text-sm text-muted-foreground">
                                                            {edu.location}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-right text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {edu.start_date && new Date(edu.start_date).toLocaleDateString('en-US', { year: 'numeric' })}
                                                        {edu.end_date && ` - ${new Date(edu.end_date).toLocaleDateString('en-US', { year: 'numeric' })}`}
                                                    </div>
                                                </div>
                                            </div>
                                            {edu.description && (
                                                <p className="text-muted-foreground">{edu.description}</p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground">No education listed yet.</p>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Skills */}
                        {skillsData && skillsData.length > 0 && (
                            <section className="rounded-lg border border-border bg-card p-6">
                                <h2 className="mb-4 text-xl font-bold">Skills</h2>
                                <div className="space-y-4">
                                    {skillsData.map((skill) => (
                                        <div key={skill.id}>
                                            <h3 className="mb-2 font-semibold">{skill.title}</h3>
                                            {skill.technologies && (
                                                <div className="flex flex-wrap gap-2">
                                                    {skill.technologies.map((tech: string) => (
                                                        <Badge key={tech} variant="outline" className="text-xs">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
