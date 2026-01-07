-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    issuer TEXT NOT NULL,
    logo_url TEXT,
    issued_date DATE,
    credential_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Certifications are publicly readable"
    ON certifications
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Create index for ordering
CREATE INDEX idx_certifications_display_order ON certifications(display_order);

-- Insert sample certifications (you can customize these later)
INSERT INTO certifications (name, issuer, issued_date, display_order) VALUES
    ('AWS Certified Solutions Architect', 'Amazon Web Services', '2024-01-15', 1),
    ('Google Cloud Professional', 'Google Cloud', '2023-11-20', 2),
    ('React Advanced Patterns', 'Frontend Masters', '2024-03-10', 3),
    ('Full Stack Development', 'Udemy', '2023-08-05', 4);
