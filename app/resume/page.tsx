'use client';

import { useState, useEffect } from 'react';
import { Calendar, Edit, Download } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PasswordPrompt } from '@/components/password-prompt';
import { ExperienceForm } from '@/app/admin/resume/components/experience-form';
import { EducationForm } from '@/app/admin/resume/components/education-form';
import { SkillsForm } from '@/app/admin/resume/components/skills-form';

export default function ResumeClientPage() {
    const [experiences, setExperiences] = useState<any[]>([]);
    const [education, setEducation] = useState<any[]>([]);
    const [skillsData, setSkillsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

    // Form states
    const [expFormOpen, setExpFormOpen] = useState(false);
    const [eduFormOpen, setEduFormOpen] = useState(false);
    const [skillFormOpen, setSkillFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>();

    const supabase = createBrowserClient();

    useEffect(() => {
        fetchData();
        // Check if already authenticated
        const isAuth = sessionStorage.getItem('resume_auth') === 'true';
        setIsEditMode(isAuth);
    }, []);

    const fetchData = async () => {
        setLoading(true);

        const [expData, eduData, skillsRes] = await Promise.all([
            supabase.from('resume_items').select('*').eq('category', 'experience').order('start_date', { ascending: false }),
            supabase.from('resume_items').select('*').eq('category', 'education').order('start_date', { ascending: false }),
            supabase.from('resume_items').select('*').eq('category', 'skills')
        ]);

        setExperiences(expData.data || []);
        setEducation(eduData.data || []);
        setSkillsData(skillsRes.data || []);
        setLoading(false);
    };

    const handleEditClick = () => {
        if (isEditMode) {
            // Already authenticated, just toggle off
            setIsEditMode(false);
            sessionStorage.removeItem('resume_auth');
        } else {
            // Show password prompt
            setShowPasswordPrompt(true);
        }
    };

    const handlePasswordSuccess = () => {
        setIsEditMode(true);
    };

    const deleteItem = async (id: string) => {
        if (!confirm('Delete this item?')) return;
        await supabase.from('resume_items').delete().eq('id', id);
        fetchData();
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border/40 bg-gradient-to-b from-primary/10 to-background py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-4xl font-bold">Resume</h1>
                            <p className="mt-2 text-muted-foreground">
                                Professional Experience & Education
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleEditClick}
                                variant={isEditMode ? "destructive" : "outline"}
                                className="flex items-center gap-2"
                            >
                                <Edit className="h-4 w-4" />
                                {isEditMode ? 'Exit Edit Mode' : 'Edit Resume'}
                            </Button>
                            <a
                                href="/resume.pdf"
                                download="Rohan_Bheemavarapu_Resume.pdf"
                                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg"
                            >
                                <Download className="h-5 w-5" />
                                <span>Download</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-12 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Experience Section */}
                        <section className="mb-16">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Experience</h2>
                                {isEditMode && (
                                    <Button
                                        onClick={() => {
                                            setEditingItem(undefined);
                                            setExpFormOpen(true);
                                        }}
                                        size="sm"
                                    >
                                        Add Experience
                                    </Button>
                                )}
                            </div>
                            <div className="space-y-8">
                                {experiences && experiences.length > 0 ? (
                                    experiences.map((exp) => (
                                        <div key={exp.id} className="relative border-l-2 border-primary pl-6">
                                            <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary" />
                                            <div className="mb-2 flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                                                    <p className="text-primary">{exp.organization}</p>
                                                    {exp.location && (
                                                        <p className="text-sm text-muted-foreground">{exp.location}</p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="text-right text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            {exp.start_date && new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                            {' - '}
                                                            {exp.current ? 'Present' : exp.end_date && new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                        </div>
                                                    </div>
                                                    {isEditMode && (
                                                        <>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setEditingItem(exp);
                                                                    setExpFormOpen(true);
                                                                }}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={() => deleteItem(exp.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </>
                                                    )}
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
                                                    {exp.technologies.map((tech: string, idx: number) => (
                                                        <Badge key={idx} variant="secondary">{tech}</Badge>
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

                        {/* Education Section - Similar structure */}
                        <section className="mb-16">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Education</h2>
                                {isEditMode && (
                                    <Button
                                        onClick={() => {
                                            setEditingItem(undefined);
                                            setEduFormOpen(true);
                                        }}
                                        size="sm"
                                    >
                                        Add Education
                                    </Button>
                                )}
                            </div>
                            <div className="space-y-8">
                                {education && education.length > 0 ? (
                                    education.map((edu) => (
                                        <div key={edu.id} className="relative border-l-2 border-primary pl-6">
                                            <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary" />
                                            <div className="mb-2 flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold">{edu.title}</h3>
                                                    <p className="text-primary">{edu.organization}</p>
                                                    {edu.location && (
                                                        <p className="text-sm text-muted-foreground">{edu.location}</p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="text-right text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            {edu.start_date && new Date(edu.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                            {' - '}
                                                            {edu.end_date && new Date(edu.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                        </div>
                                                    </div>
                                                    {isEditMode && (
                                                        <>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setEditingItem(edu);
                                                                    setEduFormOpen(true);
                                                                }}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={() => deleteItem(edu.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </>
                                                    )}
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

                    {/* Sidebar - Skills */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Skills</h2>
                                {isEditMode && (
                                    <Button
                                        onClick={() => {
                                            setEditingItem(undefined);
                                            setSkillFormOpen(true);
                                        }}
                                        size="sm"
                                    >
                                        Add Skills
                                    </Button>
                                )}
                            </div>
                            <div className="space-y-6">
                                {skillsData && skillsData.length > 0 ? (
                                    skillsData.map((skillGroup) => (
                                        <div key={skillGroup.id} className="rounded-lg border p-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="mb-3 font-semibold">{skillGroup.title}</h3>
                                                {isEditMode && (
                                                    <div className="flex gap-1">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => {
                                                                setEditingItem(skillGroup);
                                                                setSkillFormOpen(true);
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => deleteItem(skillGroup.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                            {skillGroup.highlights && (
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                    {skillGroup.highlights.map((skill: string, idx: number) => (
                                                        <li key={idx}>• {skill}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground">No skills listed yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Prompt */}
            <PasswordPrompt
                open={showPasswordPrompt}
                onOpenChange={setShowPasswordPrompt}
                onSuccess={handlePasswordSuccess}
            />

            {/* Edit Forms */}
            <ExperienceForm
                open={expFormOpen}
                onOpenChange={setExpFormOpen}
                onSuccess={fetchData}
                item={editingItem}
            />
            <EducationForm
                open={eduFormOpen}
                onOpenChange={setEduFormOpen}
                onSuccess={fetchData}
                item={editingItem}
            />
            <SkillsForm
                open={skillFormOpen}
                onOpenChange={setSkillFormOpen}
                onSuccess={fetchData}
                item={editingItem}
            />
        </div>
    );
}
