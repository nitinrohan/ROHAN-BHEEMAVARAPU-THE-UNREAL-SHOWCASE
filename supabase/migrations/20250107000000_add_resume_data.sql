-- Insert Resume Experience Data
INSERT INTO resume_items (
    category, title, organization, location, description, start_date, end_date, current, technologies, highlights
) VALUES
-- Add your actual experience here
(
    'experience',
    'Software Engineer',
    'Your Company',
    'Location, State',
    'Brief description of your role and responsibilities',
    '2023-01-01',
    NULL,
    true,
    ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    ARRAY[
        'Led development of key features that improved user engagement by 40%',
        'Architected and implemented scalable backend services',
        'Mentored junior developers and conducted code reviews'
    ]
),
(
    'experience',
    'Full Stack Developer',
    'Previous Company',
    'City, State',
    'Developed and maintained web applications',
    '2021-06-01',
    '2022-12-31',
    false,
    ARRAY['JavaScript', 'Python', 'MySQL', 'AWS'],
    ARRAY[
        'Built responsive web applications serving 10K+ users',
        'Optimized database queries reducing load time by 60%',
        'Collaborated with cross-functional teams'
    ]
);

-- Insert Resume Education Data  
INSERT INTO resume_items (
    category, title, organization, location, description, start_date, end_date
) VALUES
(
    'education',
    'Bachelor of Science in Computer Science',
    'Your University',
    'City, State',
    'GPA: 3.8/4.0 | Relevant Coursework: Data Structures, Algorithms, Software Engineering',
    '2017-09-01',
    '2021-05-31'
);

-- Insert Resume Skills Data
INSERT INTO resume_items (
    category, title, highlights
) VALUES
(
    'skills',
    'Technical Skills',
    ARRAY[
        'Languages: JavaScript, TypeScript, Python, Java, SQL',
        'Frontend: React, Next.js, Vue.js, HTML/CSS, Tailwind CSS',
        'Backend: Node.js, Express, FastAPI, PostgreSQL, MongoDB',
        'Tools: Git, Docker, AWS, Vercel, Supabase',
        'Other: REST APIs, GraphQL, Testing (Jest, Pytest), CI/CD'
    ]
);
