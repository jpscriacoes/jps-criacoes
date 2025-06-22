
-- Criar uma tabela para armazenar dados de usuários administrativos
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir o usuário administrativo específico
INSERT INTO public.admin_users (email, password_hash, role) 
VALUES ('jpscriacoes@gmail.com', '$2b$10$8K1p/a0dF4q.Gqx8zXl8OOxB5x5Yt9YbQz3l2Kp4r6tS8uV0wX2yA', 'admin');

-- Adicionar RLS (Row Level Security)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Política para permitir seleção apenas para usuários autenticados
CREATE POLICY "Admin users can be selected" 
  ON public.admin_users 
  FOR SELECT 
  USING (true);
