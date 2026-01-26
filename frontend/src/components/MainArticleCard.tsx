import React from "react";
import Image from "next/image";
import LikeButton from "./LikeButton";

interface MainArticleCardProps {
  postId: number; // ✅ ID numérico para LikeButton
  slug: string;
  imageUrl: string;
  altText: string;
  categoryName: string;
  title: string;
  description: string;
  authorName: string;
}

const MainArticleCard: React.FC<MainArticleCardProps> = ({
  postId,
  slug,
  imageUrl,
  altText,
  categoryName,
  title,
  description,
  authorName,
}) => {
  return (
    <article className="bg-white rounded-lg overflow-hidden flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
      
      {/* Parte clicable para ir al artículo */}
      <a href={`/articles/${slug}`} className="group">
        <div className="relative w-full h-80 lg:h-96">
          <Image
            src={imageUrl || "https://via.placeholder.com/800x400?text=Image+indisponible"}
            alt={altText || "Image de remplacement"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            style={{ objectFit: "cover" }}
            className="rounded-t-lg grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>

        <div className="p-6">
          <span className="font-montserrat text-sm text-gray-500 uppercase tracking-wider mb-2 block">
            {categoryName}
          </span>
          <h3 className="font-josefin text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
            {title}
          </h3>
          <p className="font-montserrat text-base text-gray-600 mb-6">
            {description}
          </p>
        </div>
      </a>

      {/* Author + LikeButton (fuera del enlace) */}
      <div className="flex items-center justify-between p-6 border-t border-gray-100">
        <span className="font-montserrat text-sm font-semibold text-gray-800">
          By {authorName}
        </span>

        {/* Corazón de like */}
        <LikeButton postId={postId} />
      </div>
    </article>
  );
};

export default MainArticleCard;
