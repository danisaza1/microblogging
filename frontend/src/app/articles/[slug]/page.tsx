import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Components } from "react-markdown";
import { notFound } from "next/navigation";
import CommentSection from "@/components/CommentSection"; // Make sure this path is correct

// type ArticlePageParams = { slug: string };

interface ArticleDetail {
  id: number; // ✅ Added the 'id' property here. Crucial for comments!
  slug: string;
  imageUrl: string;
  altText: string;
  categoryName: string;
  title: string;
  description: string;
  authorName: string;
  content: string;
  theme: string;
}

// Génération des routes statiques
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`);
    if (!res.ok) {
      console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
      return [];
    }

    const articles: ArticleDetail[] = await res.json();
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const currentSlug = slug;

  let article: ArticleDetail | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${currentSlug}`,
    );

    if (!res.ok) {
      if (res.status === 404) {
        return notFound();
      }
      console.error(
        `Failed to fetch article with slug ${currentSlug}: ${res.status} ${res.statusText}`,
      );
      throw new Error(`Failed to fetch article`);
    }

    article = await res.json();
  } catch (error) {
    console.error(`Error fetching article ${currentSlug}:`, error);
    return notFound();
  }

  if (!article) {
    return notFound();
  }

 const customComponents: Components = {
  h2: (props) => (
    <h2 className="text-blue-700 text-3xl font-bold mb-4" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 leading-relaxed text-gray-800 text-lg" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-5 mb-4 text-gray-800" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-5 mb-4 text-gray-800" {...props} />
  ),
  li: (props) => <li className="mb-2" {...props} />,
  a: (props) => (
    <a className="text-blue-600 hover:underline" {...props} />
  ),
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null; // sécurité si src invalide
    return (
      <div className="my-6 rounded-lg shadow-md relative w-full h-80 md:h-96">
        <Image
          src={src}
          alt={alt || "Image de l'article"} // fallback si alt manquant
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg shadow-md"
        />
      </div>
    );
  },
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6"
      {...props}
    />
  ),
};

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
          {article.title}
        </h1>

        <div className="text-center mb-12 py-8">
          <p className="text-2xl text-gray-600 font-light italic leading-relaxed max-w-3xl mx-auto">
            {article.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
          <span className="flex items-center">
            {/* author */}
            <svg
              className="w-4 h-4 mr-2 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            Par{" "}
            <span className="font-semibold text-gray-700 ml-1">
              {article.authorName}
            </span>
          </span>

          <span className="flex items-center">
            {/* category */}
            <svg
              className="w-4 h-4 mr-2 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            dans{" "}
            <span className="font-medium text-black ml-1">
              {article.categoryName}
            </span>
          </span>
        </div>

        {article.imageUrl && (
          <div className="mb-12 group relative w-full h-96">
            <Image
              src={article.imageUrl}
              alt={article.altText}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-2xl shadow-2xl border border-gray-100 grayscale transition-all duration-500 group-hover:grayscale-0"
            />
          </div>
        )}

        <article className="max-w-none">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <ReactMarkdown
              components={customComponents}
              rehypePlugins={[rehypeRaw]}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* ✅ IMPORTANT: Pass article.id.toString() as the postId */}
        {article && article.id && (
          <CommentSection postId={article.id.toString()} />
        )}

        <div className="mt-16 pt-8 text-center">
          <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <p className="text-gray-600 italic">
              Merci d&apos;avoir lu cet article. N&apos;hésitez pas à le
              partager !
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href={`/${encodeURIComponent(article.theme.toLowerCase())}`}
            className="inline-flex items-center text-black hover:text-blue-800 text-lg font-medium transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour aux articles
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
