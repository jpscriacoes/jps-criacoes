import React from 'react';

interface CategoryIconProps {
  icon: string;
  className?: string;
}

const CategoryIcon = ({ icon, className = '' }: CategoryIconProps) => {
  // Verifica se o ícone é uma URL de imagem válida
  const isUrl = icon?.startsWith('http') || icon?.startsWith('/');

  if (isUrl) {
    return (
      <img 
        src={icon} 
        alt="Ícone da categoria" 
        className={`w-8 h-8 rounded-full object-cover ${className}`} 
      />
    );
  }

  // Se não for uma URL, renderiza como texto (emoji)
  return (
    <span className={`flex items-center justify-center text-2xl w-8 h-8 ${className}`}>
      {icon}
    </span>
  );
};

export default CategoryIcon; 