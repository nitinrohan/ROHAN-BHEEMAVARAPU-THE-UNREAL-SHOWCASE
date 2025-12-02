'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface UploadFile {
    id: string;
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'success' | 'error';
    url?: string;
    error?: string;
}

interface MediaUploaderProps {
    projectId?: string;
    onUploadComplete?: (urls: string[]) => void;
    maxFiles?: number;
    acceptedFileTypes?: Record<string, string[]>;
}

export function MediaUploader({
    projectId,
    onUploadComplete,
    maxFiles = 10,
    acceptedFileTypes = {
        'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
        'video/*': ['.mp4', '.webm'],
    },
}: MediaUploaderProps) {
    const [files, setFiles] = useState<UploadFile[]>([]);
    const supabase = createBrowserClient();

    const uploadFile = async (uploadFile: UploadFile) => {
        try {
            setFiles((prev) =>
                prev.map((f) => (f.id === uploadFile.id ? { ...f, status: 'uploading' as const } : f))
            );

            const fileExt = uploadFile.file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${projectId || 'temp'}/${fileName}`;

            const { data, error } = await supabase.storage
                .from('project-media')
                .upload(filePath, uploadFile.file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from('project-media')
                .getPublicUrl(data.path);

            setFiles((prev) =>
                prev.map((f) =>
                    f.id === uploadFile.id
                        ? { ...f, status: 'success' as const, progress: 100, url: publicUrl }
                        : f
                )
            );

            return publicUrl;
        } catch (error: any) {
            setFiles((prev) =>
                prev.map((f) =>
                    f.id === uploadFile.id
                        ? { ...f, status: 'error' as const, error: error.message }
                        : f
                )
            );
            toast.error(`Failed to upload ${uploadFile.file.name}`);
            throw error;
        }
    };

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const newFiles: UploadFile[] = acceptedFiles.slice(0, maxFiles - files.length).map((file) => ({
                id: Math.random().toString(36),
                file,
                progress: 0,
                status: 'pending' as const,
            }));

            setFiles((prev) => [...prev, ...newFiles]);

            // Upload files
            const uploadPromises = newFiles.map((f) => uploadFile(f));

            try {
                const urls = await Promise.all(uploadPromises);
                if (onUploadComplete) {
                    onUploadComplete(urls.filter(Boolean) as string[]);
                }
                toast.success(`Uploaded ${urls.length} file(s) successfully`);
            } catch (error) {
                console.error('Upload error:', error);
            }
        },
        [files, maxFiles, projectId]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
        maxFiles,
        disabled: files.length >= maxFiles,
    });

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const retryUpload = (file: UploadFile) => {
        uploadFile(file);
    };

    return (
        <div className="space-y-4">
            {/* Dropzone */}
            <div
                {...getRootProps()}
                className={cn(
                    'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                    isDragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50',
                    files.length >= maxFiles && 'opacity-50 cursor-not-allowed'
                )}
            >
                <input {...getInputProps()} />
                <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                {isDragActive ? (
                    <p className="text-lg font-medium">Drop files here...</p>
                ) : (
                    <div className="space-y-2">
                        <p className="text-lg font-medium">
                            Drag & drop files here, or click to select
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Images (JPG, PNG, WebP) or Videos (MP4, WebM) • Max {maxFiles} files
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {files.length} / {maxFiles} files uploaded
                        </p>
                    </div>
                )}
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                        >
                            {/* Status Icon */}
                            <div className="flex-shrink-0">
                                {file.status === 'pending' && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                                {file.status === 'uploading' && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                                {file.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                                {file.status === 'error' && <AlertCircle className="h-5 w-5 text-destructive" />}
                            </div>

                            {/* File Info */}
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">{file.file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {(file.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                                {file.status === 'uploading' && (
                                    <Progress value={file.progress} className="mt-2 h-1" />
                                )}
                                {file.status === 'error' && (
                                    <p className="mt-1 text-xs text-destructive">{file.error}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex-shrink-0">
                                {file.status === 'error' && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => retryUpload(file)}
                                    >
                                        Retry
                                    </Button>
                                )}
                                {file.status !== 'uploading' && (
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => removeFile(file.id)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
