// src/app/voiture/page.tsx
import React from "react";
import MainArticleCard from "@/components/MainArticleCard";
import TopNewsArticle from "@/components/TopNewsArticle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

interface ArticleSummary {
  slug: string;
  imageUrl: string;
  altText: string;
  categoryName: string;
  title: string;
  description: string;
  authorName: string;
  theme: string;
}

interface TopNewsArticleProps {
  slug: string;
  imageUrl: string;
  altText: string;
  title: string;
  description: string;
  categoryName: string;
  authorName: string;
  theme: string;
}

// Function to fetch articles specifically for the "Voiture" theme
async function getVoitureArticles(): Promise<ArticleSummary[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log("Fetching voiture articles from:", `${backendUrl}/api/posts?theme=Voiture`);
  const res = await fetch(`${backendUrl}/api/posts?theme=Voiture`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Failed to fetch voiture articles: ${res.status} - ${errorBody}`);
    throw new Error('Failed to fetch voiture articles');
  }
  return res.json();
}

// Function to fetch top news articles for the "Voiture" theme
async function getTopVoitureNews(): Promise<TopNewsArticleProps[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${backendUrl}/api/posts/top-posts?theme=Voiture`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Failed to fetch top voiture news: ${res.status} - ${errorBody}`);
    throw new Error('Failed to fetch top voiture news');
  }
  return res.json();
}

const VoiturePage: React.FC = async () => {
  const voitureArticles = await getVoitureArticles();
  const topVoitureNews = await getTopVoitureNews();


  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
        <h1 className="font-josefin text-3xl font-bold text-gray-900 mb-8">
          Voiture
        </h1>

        <div className="flex flex-row">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 grow">
            {voitureArticles.length > 0 ? (
              voitureArticles.map((article) => (
                <Link
                  href={`/articles/${article.slug}`}
                  key={article.slug}
                  className="hover:opacity-90 transition duration-300 block"
                >
                  <MainArticleCard {...article} categoryName={article.categoryName} />
                </Link>
              ))
            ) : (
              <p className="text-gray-600 col-span-full">Aucun article sur les voitures trouvé pour le moment.</p>
            )}
          </section>

          <section className="ml-8 w-1/3 min-w-75 hidden lg:block">
            <h2 className="font-josefin text-2xl font-bold text-gray-900 mb-6">
              Le plus populaire 
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {topVoitureNews.length > 0 ? (
                topVoitureNews.map((article) => (
                  <TopNewsArticle key={article.slug} {...article} />
                ))
              ) : (
                <p className="text-gray-600">Aucune actualité voiture récente.</p>
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VoiturePage;