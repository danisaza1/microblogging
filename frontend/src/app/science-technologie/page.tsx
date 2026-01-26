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

// Function to fetch articles specifically for the "Science & Technologie" theme
async function getScienceTechnoArticles(): Promise<ArticleSummary[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const theme = "Science & Technologie";

  console.log(
    "Fetching science & techno articles from:",
    `${backendUrl}/api/posts?theme=${encodeURIComponent(theme)}`,
  );

  const res = await fetch(
    `${backendUrl}/api/posts?theme=${encodeURIComponent(theme)}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(
      `Failed to fetch science & techno articles: ${res.status} - ${errorBody}`,
    );
    throw new Error("Failed to fetch science & techno articles");
  }
  return res.json();
}


// Function to fetch top news articles for the "Science & Technologie" theme
async function getTopScienceNews(): Promise<TopNewsArticleProps[]> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const theme = "Science & Technologie";
    const res = await fetch(
      `${backendUrl}/api/posts?theme=${encodeURIComponent(theme)}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(
        `Échec récupération articles : ${res.status} - ${errorBody}`,
      );
      return [];
    }

    const rawArticles: ArticleSummary[] = await res.json();
    return rawArticles;
  } catch (error) {
    console.error("Error fetching top science news:", error);
    return [];
  }
}

const SciencePage: React.FC = async () => {
  const ScienceArticles = await getScienceTechnoArticles();
  const topScienceNews = await getTopScienceNews();

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
        <h1 className="font-josefin text-3xl font-bold text-gray-900 mb-8">
          Science & Technologie
        </h1>

        <div className="flex flex-row">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 grow">
            {ScienceArticles.length > 0 ? (
              ScienceArticles.map((article) => (
                <Link
                  href={`/articles/${article.slug}`}
                  key={article.slug}
                  className="hover:opacity-90 transition duration-300 block"
                >
                  <MainArticleCard
                  postId={""} {...article}
                  categoryName={article.categoryName}                  />
                </Link>
              ))
            ) : (
              <p className="text-gray-600 col-span-full">
                Aucun article sur la Science & Technologie trouvé pour le moment.
              </p>
            )}
          </section>

          <section className="ml-8 w-1/3 min-w-75 hidden lg:block">
            <h2 className="font-josefin text-2xl font-bold text-gray-900 mb-6">
              Le plus populaire
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {topScienceNews.length > 0 ? (
                topScienceNews.map((article) => (
                  <TopNewsArticle key={article.slug} {...article} />
                ))
              ) : (
                <p className="text-gray-600">
                  Aucune actualité science & technologie récente.
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

export default SciencePage;
