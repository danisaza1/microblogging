// src/components/MainArticleCard.tsx
import React from 'react';
import Image from 'next/image';

interface MainArticleCardProps {
  imageUrl: string;
  altText: string;
  categoryName: string;
  title: string;
  description: string;
  authorName: string;
}

const MainArticleCard: React.FC<MainArticleCardProps> = ({
  imageUrl,
  altText,
  categoryName,
  title,
  description,
  authorName,
}) => {
  return (
    <article className="bg-white rounded-lg overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative w-full h-80 lg:h-96">
     <Image
  src={imageUrl || "https://via.placeholder.com/800x400?text=Image+indisponible"}
  alt={altText || "Image de remplacement"}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
  style={{ objectFit: 'cover' }}
  className="w-full max-h-150 object-cover rounded-2xl shadow-2xl border border-gray-100 grayscale hover:grayscale-0 transition-all duration-500"
/>
      </div>



      {/* Content */}
      <div className="p-6 flex flex-col grow">
        <span className="font-montserrat text-sm text-gray-500 uppercase tracking-wider mb-2">
          {categoryName}
        </span>
        <h3 className="font-josefin text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
          {title}
        </h3>
        <p className="font-montserrat text-base text-gray-600 mb-6 grow">
          {description}
        </p>

        {/* Author */}
        <div className="flex items-center">
          <span className="font-montserrat text-sm font-semibold text-gray-800">
            By {authorName}
          </span>
        </div>
        
        {/* Si vous affichez 'content' dans MainArticleCard,
            vous devrez le vérifier avant de l'afficher car il peut être undefined.
            Cependant, MainArticleCard est un aperçu, donc 'content' n'est généralement
            pas affiché ici mais sur la page de l'article complet.
            Si vous n'affichez pas 'content' dans MainArticleCard, vous n'avez pas d'autres changements à faire ici.
        */}
      </div>
    </article>
  );
};

export default MainArticleCard;