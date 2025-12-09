'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Briefcase, GraduationCap, Code } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { ExperienceForm } from './components/experience-form';
import { EducationForm } from './components/education-form';
import { SkillsForm } from './components/skills-form';

type ResumeItem = {
    id: string;
    category: string;
    title: string;
    organization?: string;
    location?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    current?: boolean;
    technologies?: string[];
    highlights?: string[];
};

export default function ResumeAdminPage() {
    const [experiences, setExperiences] = useState<ResumeItem[]>([]);
    const [education, setEducation] = useState<ResumeItem[]>([]);
    const [skills, setSkills] = useState<ResumeItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Form dialog states
    const [expFormOpen, setExpFormOpen] = useState(false);
    const [eduFormOpen, setEduFormOpen] = useState(false);
    const [skillFormOpen, setSkillFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ResumeItem | undefined>();

    const supabase = createClient();

    useEffect(() => {
        fetchResumeData();
    }, []);

    const fetchResumeData = async () => {
        setLoading(true);

        const { data: expData } = await supabase
            .from('resume_items')
            .select('*')
            .eq('category', 'experience')
            .order('start_date', { ascending: false });

        const { data: eduData } = await supabase
            .from('resume_items')
            .select('*')
            .eq('category', 'education')
            .order('start_date', { ascending: false });

        const { data: skillsData } = await supabase
            .from('resume_items')
            .select('*')
            .eq('category', 'skills');

        setExperiences(expData || []);
        setEducation(eduData || []);
        setSkills(skillsData || []);
        setLoading(false);
    };

    const deleteItem = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        const { error } = await supabase
            .from('resume_items')
            .delete()
            .eq('id', id);

        if (!error) {
            fetchResumeData();
        }
    };

    const formatDate = (date?: string) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="st-neon-title mb-2 text-3xl">Resume Management</h1>
                <p className="st-glow-text">Manage your professional experience, education, and skills</p>
            </div>

            <Tabs defaultValue="experience" className="w-full">
                <TabsList className="st-card mb-6 grid w-full grid-cols-3">
                    <TabsTrigger value="experience" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Experience
                    </TabsTrigger>
                    <TabsTrigger value="education" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Education
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Skills
                    </TabsTrigger>
                </TabsList>

                {/* Experience Tab */}
                <TabsContent value="experience">
                    <div className="st-card rounded-lg p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Work Experience</h2>
                            <Button
                                className="st-glow-button"
                                onClick={() => {
                                    setEditingItem(undefined);
                                    setExpFormOpen(true);
                                }}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Experience
                            </Button>
                        </div>

                        {loading ? (
                            <p className="text-muted-foreground">Loading...</p>
                        ) : experiences.length === 0 ? (
                            <p className="text-muted-foreground">No experience added yet. Click "Add Experience" to get started.</p>
                        ) : (
                            <div className="space-y-4">
                                {experiences.map((exp) => (
                                    <div key={exp.id} className="rounded-lg border border-border/40 p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{exp.title}</h3>
                                                <p className="text-primary">{exp.organization}</p>
                                                {exp.location && <p className="text-sm text-muted-foreground">{exp.location}</p>}
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {formatDate(exp.start_date)} - {exp.current ? 'Present' : formatDate(exp.end_date)}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setEditingItem(exp);
                                                        setExpFormOpen(true);
                                                    }}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => deleteItem(exp.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* Education Tab */}
                <TabsContent value="education">
                    <div className="st-card rounded-lg p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Education</h2>
                            <Button
                                className="st-glow-button"
                                onClick={() => {
                                    setEditingItem(undefined);
                                    setEduFormOpen(true);
                                }}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Education
                            </Button>
                        </div>

                        {loading ? (
                            <p className="text-muted-foreground">Loading...</p>
                        ) : education.length === 0 ? (
                            <p className="text-muted-foreground">No education added yet. Click "Add Education" to get started.</p>
                        ) : (
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id} className="rounded-lg border border-border/40 p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{edu.title}</h3>
                                                <p className="text-primary">{edu.organization}</p>
                                                {edu.location && <p className="text-sm text-muted-foreground">{edu.location}</p>}
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setEditingItem(edu);
                                                        setEduFormOpen(true);
                                                    }}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => deleteItem(edu.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* Skills Tab */}
                <TabsContent value="skills">
                    <div className="st-card rounded-lg p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Skills</h2>
                            <Button
                                className="st-glow-button"
                                onClick={() => {
                                    setEditingItem(undefined);
                                    setSkillFormOpen(true);
                                }}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Skills
                            </Button>
                        </div>

                        {loading ? (
                            <p className="text-muted-foreground">Loading...</p>
                        ) : skills.length === 0 ? (
                            <p className="text-muted-foreground">No skills added yet. Click "Add Skills" to get started.</p>
                        ) : (
                            <div className="space-y-4">
                                {skills.map((skill) => (
                                    <div key={skill.id} className="rounded-lg border border-border/40 p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{skill.title}</h3>
                                                {skill.highlights && (
                                                    <ul className="mt-2 space-y-1">
                                                        {skill.highlights.map((item, idx) => (
                                                            <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => deleteItem(skill.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Form Dialogs */}
            <ExperienceForm
                open={expFormOpen}
                onOpenChange={setExpFormOpen}
                onSuccess={fetchResumeData}
                item={editingItem}
            />
            <EducationForm
                open={eduFormOpen}
                onOpenChange={setEduFormOpen}
                onSuccess={fetchResumeData}
                item={editingItem}
            />
            <SkillsForm
                open={skillFormOpen}
                onOpenChange={setSkillFormOpen}
                onSuccess={fetchResumeData}
                item={editingItem}
            />
        </div>
    );
}
