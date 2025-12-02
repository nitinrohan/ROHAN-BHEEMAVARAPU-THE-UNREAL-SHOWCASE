-- Add blog_posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  tags TEXT[] DEFAULT '{}',
  cover_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  reading_time INT, -- minutes
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add about_sections table
CREATE TABLE about_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_type TEXT NOT NULL, -- 'bio', 'skills', 'experience', 'education', 'fun_facts'
  title TEXT,
  content TEXT,
  order_index INT DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add resume_items table
CREATE TABLE resume_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL, -- 'experience', 'education', 'skills', 'awards', 'certifications'
  title TEXT NOT NULL,
  organization TEXT,
  location TEXT,
  start_date DATE,
  end_date DATE,
  current BOOLEAN DEFAULT FALSE,
  description TEXT,
  highlights TEXT[],
  technologies TEXT[],
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX idx_about_sections_type ON about_sections(section_type);
CREATE INDEX idx_resume_items_category ON resume_items(category);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_items ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Published blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts FOR DELETE
  USING (auth.role() = 'authenticated');

-- About sections policies
CREATE POLICY "About sections are viewable by everyone"
  ON about_sections FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage about sections"
  ON about_sections FOR ALL
  USING (auth.role() = 'authenticated');

-- Resume items policies
CREATE POLICY "Resume items are viewable by everyone"
  ON resume_items FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage resume items"
  ON resume_items FOR ALL
  USING (auth.role() = 'authenticated');

-- Update triggers
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
