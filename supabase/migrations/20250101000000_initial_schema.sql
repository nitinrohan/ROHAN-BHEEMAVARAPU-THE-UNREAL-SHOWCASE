-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  description TEXT,
  tech_tags TEXT[] DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create project_media table
CREATE TABLE project_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  kind TEXT CHECK (kind IN ('thumb', 'image', 'video')),
  url TEXT NOT NULL,
  width INT,
  height INT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_published ON projects(published);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_project_media_project_id ON project_media(project_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Create policies for projects
CREATE POLICY "Published projects are viewable by everyone"
  ON projects FOR SELECT
  USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create policies for project_media
CREATE POLICY "Project media is viewable if project is published"
  ON project_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_media.project_id
      AND (projects.published = true OR auth.role() = 'authenticated')
    )
  );

CREATE POLICY "Authenticated users can insert project media"
  ON project_media FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update project media"
  ON project_media FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete project media"
  ON project_media FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for projects updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
