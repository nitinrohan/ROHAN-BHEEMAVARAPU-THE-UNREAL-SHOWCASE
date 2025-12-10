'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

type ExperienceFormProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    item?: any;
};

export function ExperienceForm({ open, onOpenChange, onSuccess, item }: ExperienceFormProps) {
    const [loading, setLoading] = useState(false);
    const [technologies, setTechnologies] = useState<string[]>(item?.technologies || []);
    const [newTech, setNewTech] = useState('');
    const [highlights, setHighlights] = useState<string[]>(item?.highlights || []);
    const [newHighlight, setNewHighlight] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            category: 'experience',
            title: formData.get('title') as string,
            organization: formData.get('organization') as string,
            location: formData.get('location') as string,
            description: formData.get('description') as string,
            start_date: formData.get('start_date') as string,
            end_date: formData.get('current') === 'on' ? null : (formData.get('end_date') as string),
            current: formData.get('current') === 'on',
            technologies,
            highlights,
        };

        // Get password from sessionStorage
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

    const addTechnology = () => {
        if (newTech.trim()) {
            setTechnologies([...technologies, newTech.trim()]);
            setNewTech('');
        }
    };

    const removeTechnology = (index: number) => {
        setTechnologies(technologies.filter((_, i) => i !== index));
    };

    const addHighlight = () => {
        if (newHighlight.trim()) {
            setHighlights([...highlights, newHighlight.trim()]);
            setNewHighlight('');
        }
    };

    const removeHighlight = (index: number) => {
        setHighlights(highlights.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{item ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title">Job Title *</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={item?.title}
                                required
                                placeholder="e.g., Senior Software Engineer"
                            />
                        </div>

                        <div>
                            <Label htmlFor="organization">Company / Organization *</Label>
                            <Input
                                id="organization"
                                name="organization"
                                defaultValue={item?.organization}
                                required
                                placeholder="e.g., Tech Company Inc."
                            />
                        </div>

                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                defaultValue={item?.location}
                                placeholder="e.g., San Francisco, CA"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="start_date">Start Date *</Label>
                                <Input
                                    id="start_date"
                                    name="start_date"
                                    type="date"
                                    defaultValue={item?.start_date}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="end_date">End Date</Label>
                                <Input
                                    id="end_date"
                                    name="end_date"
                                    type="date"
                                    defaultValue={item?.end_date}
                                    disabled={item?.current}
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="current" name="current" defaultChecked={item?.current} />
                            <Label htmlFor="current" className="cursor-pointer">
                                I currently work here
                            </Label>
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={item?.description}
                                placeholder="Brief description of your role and responsibilities"
                                rows={3}
                            />
                        </div>

                        <div>
                            <Label>Technologies</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={newTech}
                                    onChange={(e) => setNewTech(e.target.value)}
                                    placeholder="Add technology"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                                />
                                <Button type="button" onClick={addTechnology} variant="outline">
                                    Add
                                </Button>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {technologies.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
                                    >
                                        {tech}
                                        <button
                                            type="button"
                                            onClick={() => removeTechnology(i)}
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Label>Highlights / Accomplishments</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={newHighlight}
                                    onChange={(e) => setNewHighlight(e.target.value)}
                                    placeholder="Add accomplishment"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                                />
                                <Button type="button" onClick={addHighlight} variant="outline">
                                    Add
                                </Button>
                            </div>
                            <ul className="mt-2 space-y-2">
                                {highlights.map((highlight, i) => (
                                    <li key={i} className="flex items-start gap-2 rounded-lg border p-2 text-sm">
                                        <span className="flex-1">• {highlight}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeHighlight(i)}
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : item ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
