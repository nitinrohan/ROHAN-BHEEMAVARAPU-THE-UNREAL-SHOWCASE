-- Add real projects to the database
-- This migration adds 5 real projects to showcase on the homepage

-- Insert Project 1: Global Superstore Analytics
INSERT INTO projects (
  title,
  slug,
  summary,
  description,
  tech_tags,
  demo_url,
  thumbnail_url,
  published,
  featured,
  display_order
) VALUES (
  'Global Superstore – Sales & Profit Performance Analysis',
  'global-superstore-analytics',
  'End-to-end data analytics project analyzing 50,000+ global retail transactions',
  'End-to-end data analytics project analyzing 50,000+ global retail transactions to evaluate business health, uncover profitability drivers, and identify revenue concentration, seasonal trends, geographic performance, and discount-driven losses through an interactive Tableau dashboard.',
  ARRAY['Google Sheets', 'Tableau Public', 'Data Analytics'],
  'https://public.tableau.com/views/GLOBALSUPERSTORE-SALESPROFIT/GlobalSuperstore-SalesProfitAnalysis?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
  '/projects/global-superstore.png',
  true,
  true,
  1
);

-- Insert Project 2: SATURDAY AI Chatbot
INSERT INTO projects (
  title,
  slug,
  summary,
  description,
  tech_tags,
  github_url,
  thumbnail_url,
  published,
  featured,
  display_order
) VALUES (
  'SATURDAY – Emotion‑Aware AI Chatbot',
  'saturday-ai-chatbot',
  'Full‑stack AI chatbot with fine‑tuned BERT model for emotion detection',
  'A full‑stack AI chatbot that detects user emotions using a fine‑tuned BERT model and generates empathetic, contextually appropriate responses in real time. Includes a responsive web interface and API-based backend with optimized deployment under free-tier cloud constraints.',
  ARRAY['Python', 'Flask', 'BERT', 'PyTorch', 'Transformers', 'Hugging Face', 'Railway'],
  'https://github.com/nitinrohan/SATURDAY/tree/master',
  '/projects/saturday-chatbot.png',
  true,
  true,
  2
);

-- Insert Project 3: JobPiece Job Tracker
INSERT INTO projects (
  title,
  slug,
  summary,
  description,
  tech_tags,
  demo_url,
  thumbnail_url,
  published,
  featured,
  display_order
) VALUES (
  'JobPiece – Job Application Tracker Web App',
  'jobpiece-tracker',
  'Full-stack job tracker with anime-themed UI and dynamic charts',
  'Developed a full-stack job application tracker with anime-themed UI, enabling users to log, monitor, and visualize their job search. Includes authentication, status tracking, resume uploads, CSV exports, and dynamic charts to analyze progress. Designed for jobseekers to stay organized with an intuitive and stylish interface.',
  ARRAY['Firebase', 'HTML', 'CSS', 'JavaScript', 'Chart.js', 'Google Sheets'],
  'https://jobpiece-2fc41.web.app/',
  '/projects/jobpiece.png',
  true,
  true,
  3
);

-- Insert Project 4: Steel Company Presentation
INSERT INTO projects (
  title,
  slug,
  summary,
  description,
  tech_tags,
  demo_url,
  thumbnail_url,
  published,
  featured,
  display_order
) VALUES (
  'STEEL COMPANY PRESENTATION',
  'steel-company-analytics',
  'Manufacturing analytics dashboard for 3,000+ operations data points',
  'Complete data cleaning and analytics workflow using Tableau Public. Worked on a messy manufacturing operations dataset with over 3,000 rows and transformed it into a clean, interactive dashboard that addresses real business questions without relying on timestamps or KPIs.',
  ARRAY['Tableau Public', 'Data Cleaning', 'Manufacturing Analytics'],
  'https://public.tableau.com/views/STEELCOMPANYPRESENTATION/WorkPermitProcessingOverviewDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
  '/projects/steel-company.png',
  true,
  false,
  4
);

-- Insert Project 5: Airbnb Sales Data
INSERT INTO projects (
  title,
  slug,
  summary,
  description,
  tech_tags,
  demo_url,
  thumbnail_url,
  published,
  featured,
  display_order
) VALUES (
  'Airbnb Sales Data Dashboard',
  'airbnb-sales-dashboard',
  'Tableau dashboard analyzing 1M+ rows of Airbnb sales data',
  'First Tableau dashboard project using the Airbnb Sales dataset with 1M+ rows. Data join, aggregation, geospatial plotting, and revenue trend analysis. Includes visualizations for pricing by zip code, bedroom count, and weekly revenue trends. Combined insights into a comprehensive interactive dashboard.',
  ARRAY['Tableau Public', 'SQL', 'Google Sheets', 'MySQL Workbench'],
  'https://public.tableau.com/shared/XWSYCKBKT?:display_count=n&:origin=viz_share_link',
  '/projects/airbnb-sales.png',
  true,
  false,
  5
);
