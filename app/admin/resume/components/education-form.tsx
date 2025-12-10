'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type EducationFormProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    item?: any;
};

export function EducationForm({ open, onOpenChange, onSuccess, item }: EducationFormProps) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            category: 'education',
            title: formData.get('title') as string,
            organization: formData.get('organization') as string,
            location: formData.get('location') as string,
            description: formData.get('description') as string,
            start_date: formData.get('start_date') as string,
            end_date: formData.get('end_date') as string,
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{item ? 'Edit Education' : 'Add Education'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title">Degree / Certificate *</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={item?.title}
                                required
                                placeholder="e.g., Bachelor of Science in Computer Science"
                            />
                        </div>

                        <div>
                            <Label htmlFor="organization">Institution *</Label>
                            <Input
                                id="organization"
                                name="organization"
                                defaultValue={item?.organization}
                                required
                                placeholder="e.g., University of California"
                            />
                        </div>

                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                defaultValue={item?.location}
                                placeholder="e.g., Berkeley, CA"
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
                                <Label htmlFor="end_date">End Date *</Label>
                                <Input
                                    id="end_date"
                                    name="end_date"
                                    type="date"
                                    defaultValue={item?.end_date}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="description">Details</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={item?.description}
                                placeholder="GPA, relevant coursework, honors, etc."
                                rows={3}
                            />
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
