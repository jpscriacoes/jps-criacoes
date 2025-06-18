
-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  material TEXT NOT NULL,
  occasion TEXT NOT NULL,
  theme TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Create RLS policies for categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories" 
  ON public.categories 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage categories" 
  ON public.categories 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Create RLS policies for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products" 
  ON public.products 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage products" 
  ON public.products 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Create storage policies for product images
CREATE POLICY "Anyone can view product images" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update product images" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete product images" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Insert initial categories
INSERT INTO public.categories (name, icon) VALUES
  ('Infantil', '🧸'),
  ('Casamento', '💕'),
  ('Aniversário', '🎂'),
  ('Formatura', '🎓'),
  ('Chá de Bebê', '👶'),
  ('Natal', '🎄'),
  ('Páscoa', '🐰'),
  ('Dia das Mães', '🌹');

-- Insert sample products
INSERT INTO public.products (name, description, category_id, material, occasion, theme, image_url, featured) VALUES
  ('Topo Unicórnio Rosa', 'Adorável topo de bolo com unicórnio em tons pastéis', (SELECT id FROM public.categories WHERE name = 'Infantil'), 'Papel', 'Aniversário Infantil', 'Unicórnio', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', true),
  ('Decoração Casamento Elegante', 'Conjunto elegante para bolo de casamento', (SELECT id FROM public.categories WHERE name = 'Casamento'), 'Acrílico', 'Casamento', 'Romântico', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400', true),
  ('Topo Aniversário Tropical', 'Decoração tropical vibrante para festas', (SELECT id FROM public.categories WHERE name = 'Aniversário'), 'Papel', 'Aniversário', 'Tropical', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', false),
  ('Kit Festa Superhéis', 'Conjunto completo temático de superhéis', (SELECT id FROM public.categories WHERE name = 'Infantil'), 'Papel', 'Aniversário Infantil', 'Superhéis', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', true);
