'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

type SkillsFormProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    item?: any;
};

export function SkillsForm({ open, onOpenChange, onSuccess, item }: SkillsFormProps) {
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState<string[]>(item?.highlights || []);
    const [newSkill, setNewSkill] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            category: 'skills',
            title: formData.get('title') as string,
            highlights: skills,
        };

        const password = sessionStorage.getItem('resume_password') || '';

        const response = await fetch('/api/resume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password,
                action: item?.id ? 'update' : 'create',
                id: item?.id,
                data,
            }),
        });

        setLoading(false);

        if (response.ok) {
            onSuccess();
            onOpenChange(false);
        } else {
            alert('Failed to save. Please try again.');
        }
    };

    const addSkill = () => {
        if (newSkill.trim()) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{item ? 'Edit Skills' : 'Add Skills'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title">Category Title *</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={item?.title}
                                required
                                placeholder="e.g., Technical Skills, Languages, Tools"
                            />
                        </div>

                        <div>
                            <Label>Skills / Items</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    placeholder="Add a skill"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                />
                                <Button type="button" onClick={addSkill} variant="outline">
                                    Add
                                </Button>
                            </div>
                            <ul className="mt-2 space-y-2">
                                {skills.map((skill, i) => (
                                    <li key={i} className="flex items-start gap-2 rounded-lg border p-2 text-sm">
                                        <span className="flex-1">• {skill}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(i)}
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {skills.length === 0 && (
                                <p className="mt-2 text-sm text-muted-foreground">No skills added yet.</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading || skills.length === 0}>
                            {loading ? 'Saving...' : item ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
