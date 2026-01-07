'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';

type Certification = {
    id: string;
    name: string;
    issuer: string;
    logo_url?: string;
    credential_url?: string;
    issued_date?: string;
};

type CertificationsSectionProps = {
    certifications: Certification[];
};

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
    if (!certifications || certifications.length === 0) {
        return null;
    }

    return (
        <section className="relative py-20">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold md:text-5xl">
                        <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                            Certifications
                        </span>
                    </h2>
                    <p className="mt-2 text-lg text-muted-foreground">
                        That&apos;s It For Now, Don&apos;t Have Any More Ideas Yet
                    </p>
                </motion.div>

                {/* Certifications Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {certifications.map((cert, index) => (
                        <CertificationCard key={cert.id} certification={cert} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CertificationCard({ certification, index }: { certification: Certification; index: number }) {
    const CardWrapper = certification.credential_url ? 'a' : 'div';
    const cardProps = certification.credential_url
        ? { href: certification.credential_url, target: '_blank', rel: 'noopener noreferrer' }
        : {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <CardWrapper
                {...cardProps}
                className="group relative block h-full"
            >
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        y: -8,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 p-6 backdrop-blur-md transition-all"
                >
                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-600/20" />
                    </div>

                    {/* Glass Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col">
                        {/* Logo or Icon */}
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 p-3">
                            {certification.logo_url ? (
                                <img
                                    src={certification.logo_url}
                                    alt={certification.issuer}
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <Award className="h-8 w-8 text-red-500" />
                            )}
                        </div>

                        {/* Certification Name */}
                        <h3 className="mb-2 text-lg font-bold leading-tight transition-colors group-hover:text-red-500">
                            {certification.name}
                        </h3>

                        {/* Issuer */}
                        <p className="mb-auto text-sm text-muted-foreground">
                            {certification.issuer}
                        </p>

                        {/* Date */}
                        {certification.issued_date && (
                            <p className="mt-4 text-xs text-muted-foreground">
                                Issued {new Date(certification.issued_date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </p>
                        )}

                        {/* External Link Icon */}
                        {certification.credential_url && (
                            <div className="mt-2 flex items-center gap-1 text-xs text-red-500 opacity-0 transition-opacity group-hover:opacity-100">
                                <span>View Credential</span>
                                <ExternalLink className="h-3 w-3" />
                            </div>
                        )}
                    </div>

                    {/* Border Glow on Hover */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]" />
                </motion.div>
            </CardWrapper>
        </motion.div>
    );
}
