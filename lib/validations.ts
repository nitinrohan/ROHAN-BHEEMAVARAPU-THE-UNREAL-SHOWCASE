import { z } from 'zod';

export const projectSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    slug: z.string().min(1).max(100),
    summary: z.string().max(200).optional(),
    description: z.string().optional(),
    tech_tags: z.array(z.string()).default([]),
    github_url: z.string().url().optional().or(z.literal('')),
    demo_url: z.string().url().optional().or(z.literal('')),
    featured: z.boolean().default(false),
    published: z.boolean().default(false),
});

export const fileUploadSchema = z.object({
    file: z.instanceof(File),
    kind: z.enum(['thumb', 'image', 'video']),
});

export const searchQuerySchema = z.object({
    q: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
export type FileUpload = z.infer<typeof fileUploadSchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
