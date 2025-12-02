-- Insert sample profile
INSERT INTO profiles (id, name, avatar_url) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Rohan Bheemavarapu', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan');

-- Insert sample projects
INSERT INTO projects (id, title, slug, summary, description, tech_tags, github_url, demo_url, featured, published) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440001',
    'AI-Powered Portfolio Generator',
    'ai-portfolio-generator',
    'Build stunning portfolios with AI assistance and real-time previews',
    'A comprehensive portfolio builder that leverages AI to help users create beautiful, responsive portfolios. Features include drag-and-drop components, AI-generated content suggestions, and one-click deployment.',
    ARRAY['Next.js', 'TypeScript', 'OpenAI', 'Tailwind CSS', 'Supabase'],
    'https://github.com/example/portfolio-generator',
    'https://portfolio-generator-demo.vercel.app',
    true,
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440002',
    'Real-Time Collaboration Platform',
    'realtime-collab-platform',
    'Collaborate with your team in real-time with multiplayer editing',
    'A modern collaboration platform built with WebSockets and CRDTs for conflict-free concurrent editing. Supports real-time cursors, comments, and version history.',
    ARRAY['React', 'WebSocket', 'Node.js', 'PostgreSQL', 'Redis'],
    'https://github.com/example/collab-platform',
    'https://collab-demo.vercel.app',
    true,
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440003',
    'E-Commerce Analytics Dashboard',
    'ecommerce-analytics',
    'Advanced analytics and insights for online stores',
    'A comprehensive analytics dashboard for e-commerce businesses. Tracks sales, customer behavior, inventory, and provides AI-driven insights for business growth.',
    ARRAY['Vue.js', 'Python', 'TensorFlow', 'MongoDB', 'D3.js'],
    'https://github.com/example/analytics-dashboard',
    'https://analytics-demo.vercel.app',
    false,
    true
  );

-- Insert sample project media
INSERT INTO project_media (project_id, kind, url, width, height, order_index) VALUES
  -- AI Portfolio Generator media
  ('550e8400-e29b-41d4-a716-446655440001', 'thumb', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 1920, 1080, 0),
  ('550e8400-e29b-41d4-a716-446655440001', 'image', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 1920, 1080, 1),
  ('550e8400-e29b-41d4-a716-446655440001', 'image', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800', 1920, 1080, 2),
  
  -- Real-Time Collaboration Platform media
  ('550e8400-e29b-41d4-a716-446655440002', 'thumb', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', 1920, 1080, 0),
  ('550e8400-e29b-41d4-a716-446655440002', 'image', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800', 1920, 1080, 1),
  
  -- E-Commerce Analytics media
  ('550e8400-e29b-41d4-a716-446655440003', 'thumb', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 1920, 1080, 0),
  ('550e8400-e29b-41d4-a716-446655440003', 'image', 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800', 1920, 1080, 1);
