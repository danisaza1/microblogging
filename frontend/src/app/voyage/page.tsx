// src/app/voyage/page.tsx
import React from "react";
import MainArticleCard from "@/components/MainArticleCard";
import TopNewsArticle from "@/components/TopNewsArticle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ArticleSummary {
  id: number;
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

// Function to fetch articles specifically for the "Voyage" theme
async function getVoyageArticles(): Promise<ArticleSummary[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log(
    "Fetching voyage articles from:",
    `${backendUrl}/api/posts?theme=Voyage`,
  );
  const res = await fetch(`${backendUrl}/api/posts?theme=Voyage`, {
    cache: "no-store",
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error(
      `Failed to fetch voyage articles: ${res.status} - ${errorBody}`,
    );
    throw new Error("Failed to fetch voyage articles");
  }
  return res.json();
}

// Function to fetch top news articles for the "Voyage" theme
async function getTopVoyageNews(): Promise<TopNewsArticleProps[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/top-posts?theme=Voyage`,
    {
      cache: "no-store", // Also disable caching here
    },
  );
  if (!res.ok) {
    const errorBody = await res.text();
    console.error(
      `Failed to fetch top voyage news: ${res.status} - ${errorBody}`,
    );
    throw new Error("Failed to fetch top voyage news");
  }
  return res.json();
}

const VoyagePage: React.FC = async () => {
  const voyageArticles = await getVoyageArticles();
  const topVoyageNews = await getTopVoyageNews();

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
        <h1 className="font-josefin text-3xl font-bold text-gray-900 mb-8">
          Voyages
        </h1>

        <div className="flex flex-row">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 grow">
            {voyageArticles.length > 0 ? (
              voyageArticles.map((article) => (
                <MainArticleCard
                  key={article.slug} // ✅ key único
                  postId={article.id} // ✅ para LikeButton
                  {...article}
                  categoryName={article.categoryName}
                />
              ))
            ) : (
              <p className="text-gray-600 col-span-full">
                Aucun article sur les voyages trouvé pour le moment.
              </p>
            )}
          </section>

          <section className="ml-8 w-1/3 min-w-75 hidden lg:block">
            <h2 className="font-josefin text-2xl font-bold text-gray-900 mb-6">
              Le plus populaire
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {topVoyageNews.length > 0 ? (
                topVoyageNews.map((article) => (
                  <TopNewsArticle key={article.slug} {...article} />
                ))
              ) : (
                <p className="text-gray-600">
                  Aucune actualité sur les voyages récente.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VoyagePage;
