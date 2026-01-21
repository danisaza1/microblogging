// src/components/TopNewsArticle.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TopNewsArticleProps {
  slug: string;
  imageUrl: string;
  altText: string;
  title: string;
  description: string;
}

const TopNewsArticle: React.FC<TopNewsArticleProps> = ({
  slug,
  imageUrl,
  altText,
  title,
  description,
}) => {
  return (
    <Link
      href={`/articles/${encodeURIComponent(slug)}`} // ✅ lien correct basé sur le vrai slug
      className="flex items-start space-x-4 group"
    >
      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={imageUrl || "https://via.placeholder.com/800x400?text=Image+indisponible"}
          alt={altText || "Image de remplacement"}
          fill
          sizes="96px"
          style={{ objectFit: "cover" }}
          className="rounded-lg group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col">
        <h4 className="font-josefin text-lg font-semibold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors duration-200">
          {title}
        </h4>
        <p className="font-montserrat text-sm text-gray-600 mt-1">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default TopNewsArticle;
