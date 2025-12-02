'use client';

import { useState } from 'use';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBrowserClient } from '@/lib/supabase/client';
import { projectSchema, type ProjectFormData } from '@/lib/validations';
import { slugify } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MediaUploader } from '@/components/admin/media-uploader';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
    const [uploading, setUploading] = useState(false);
    const [mediaUrls, setMediaUrls] = useState<string[]>([]);
    const router = useRouter();
    const supabase = createBrowserClient();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            featured: false,
            published: false,
            tech_tags: [],
        },
    });

    const title = watch('title');

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setValue('slug', slugify(newTitle));
    };

    const onSubmit = async (data: ProjectFormData) => {
        try {
            // Create project
            const { data: project, error: projectError } = await supabase
                .from('projects')
                .insert([data])
                .select()
                .single();

            if (projectError) throw projectError;

            // Upload media and create project_media records
            if (mediaUrls.length > 0) {
                const mediaRecords = mediaUrls.map((url, index) => ({
                    project_id: project.id,
                    url,
                    kind: index === 0 ? 'thumb' : 'image',
                    order_index: index,
                }));

                const { error: mediaError } = await supabase
                    .from('project_media')
                    .insert(mediaRecords);

                if (mediaError) throw mediaError;
            }

            toast.success('Project created successfully!');
            router.push('/admin');
        } catch (error: any) {
            toast.error(error.message || 'Failed to create project');
            console.error('Project creation error:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <Button variant="ghost" asChild>
                    <Link href="/admin">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                </Button>
                <h1 className="mt-4 text-3xl font-bold">Create New Project</h1>
                <p className="text-muted-foreground">Add a new project to your portfolio</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Project title and identification</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label htmlFor="title" className="mb-2 block text-sm font-medium">
                                Title *
                            </label>
                            <Input
                                id="title"
                                {...register('title')}
                                onChange={(e) => {
                                    register('title').onChange(e);
                                    handleTitleChange(e);
                                }}
                                placeholder="Amazing Project"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="slug" className="mb-2 block text-sm font-medium">
                                Slug *
                            </label>
                            <Input
                                id="slug"
                                {...register('slug')}
                                placeholder="amazing-project"
                            />
                            {errors.slug && (
                                <p className="mt-1 text-sm text-destructive">{errors.slug.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="summary" className="mb-2 block text-sm font-medium">
                                Summary
                            </label>
                            <Input
                                id="summary"
                                {...register('summary')}
                                placeholder="A brief one-line description"
                            />
                            {errors.summary && (
                                <p className="mt-1 text-sm text-destructive">{errors.summary.message}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Description */}
                <Card>
                    <CardHeader>
                        <CardTitle>Description</CardTitle>
                        <CardDescription>Detailed project information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            {...register('description')}
                            placeholder="Tell the full story of your project..."
                            rows={8}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-destructive">{errors.description.message}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Tech Tags */}
                <Card>
                    <CardHeader>
                        <CardTitle>Technologies</CardTitle>
                        <CardDescription>Comma-separated list of technologies used</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input
                            placeholder="React, TypeScript, Node.js, PostgreSQL"
                            onChange={(e) => {
                                const tags = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
                                setValue('tech_tags', tags);
                            }}
                        />
                    </CardContent>
                </Card>

                {/* Links */}
                <Card>
                    <CardHeader>
                        <CardTitle>Links</CardTitle>
                        <CardDescription>GitHub repository and live demo</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label htmlFor="github_url" className="mb-2 block text-sm font-medium">
                                GitHub URL
                            </label>
                            <Input
                                id="github_url"
                                {...register('github_url')}
                                placeholder="https://github.com/username/repo"
                            />
                            {errors.github_url && (
                                <p className="mt-1 text-sm text-destructive">{errors.github_url.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="demo_url" className="mb-2 block text-sm font-medium">
                                Demo URL
                            </label>
                            <Input
                                id="demo_url"
                                {...register('demo_url')}
                                placeholder="https://demo.example.com"
                            />
                            {errors.demo_url && (
                                <p className="mt-1 text-sm text-destructive">{errors.demo_url.message}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Media Upload */}
                <Card>
                    <CardHeader>
                        <CardTitle>Media</CardTitle>
                        <CardDescription>Upload project images and videos</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MediaUploader
                            onUploadComplete={(urls) => setMediaUrls(urls)}
                            maxFiles={10}
                        />
                    </CardContent>
                </Card>

                {/* Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>Visibility and featured status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register('published')} className="h-4 w-4" />
                            <span className="text-sm font-medium">Publish (make visible to public)</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register('featured')} className="h-4 w-4" />
                            <span className="text-sm font-medium">Featured (show in hero section)</span>
                        </label>
                    </CardContent>
                </Card>

                {/* Submit */}
                <div className="flex gap-3">
                    <Button type="submit" disabled={isSubmitting} className="gap-2">
                        <Save className="h-4 w-4" />
                        {isSubmitting ? 'Creating...' : 'Create Project'}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href="/admin">Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
