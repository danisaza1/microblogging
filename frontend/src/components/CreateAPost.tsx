"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CreateAPost() {
  const router = useRouter();

  // États du formulaire
  const { user } = useAuth(); 
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [themeId, setThemeId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleReset = () => {
    setTitle("");
    setBody("");
    setCategoryName("");
    setThemeId("");
    setImageUrl("");
  };

  // Fonction pour créer un slug valide
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[àáâãäå]/g, "a")
      .replace(/[èéêë]/g, "e")
      .replace(/[ìíîï]/g, "i")
      .replace(/[òóôõö]/g, "o")
      .replace(/[ùúûü]/g, "u")
      .replace(/[ç]/g, "c")
      .replace(/[^a-z0-9\s-]/g, "") // Supprimer les caractères spéciaux
      .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
      .replace(/-+/g, "-") // Supprimer les tirets multiples
      .replace(/^-|-$/g, ""); // Supprimer les tirets en début/fin
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
  alert("Vous devez être connecté pour créer un post.");
  setIsSubmitting(false);
  return;
}

    if (isSubmitting) return; // Empêcher la double soumission

    setIsSubmitting(true);

    // Validation côté client
    if (!title.trim() || !body.trim() || !categoryName.trim() || !themeId) {
      alert("Veuillez remplir tous les champs obligatoires.");
      setIsSubmitting(false);
      return;
    }

    const formData = {
       userId: user?.id,
      themeId: parseInt(themeId),
      categoryName: categoryName.trim(),
      title: title.trim(),
      description: body.trim().slice(0, 150),
      imageUrl: imageUrl.trim(),
      altText: createSlug(title),
      slug: createSlug(title),
      content: body.trim(),
    };

    console.log("Données envoyées :", formData);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data = null;

      if (res.headers.get("content-type")?.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      console.log("Réponse du serveur :", data);

      if (res.ok) {
        alert("Article créé avec succès !");
        handleReset();
        router.push("/confirmationform");
      } else {
        // Afficher l'erreur spécifique du serveur
        const errorMessage =
          typeof data === "object" && data.error
            ? data.error
            : "Erreur lors de la création de l'article";
        alert(errorMessage);
        console.error("Erreur HTTP :", res.status, data);
      }
    } catch (error) {
      console.error("Erreur de réseau ou JS :", error);
      alert("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative h-auto min-h-50">
        <div className="absolute inset-0 bg-black" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 min-h-20">
          <h2 className="text-5xl mt-6 font-bold">Postez un article</h2>
          <p className="mt-4 text-xl max-w-2xl text-justify">
            Choisissez un thème, une catégorie, créez un sujet et publiez un article.
          </p>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow relative z-20 -mt-20 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Créer un nouveau post
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Titre */}
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Titre du post: <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Définissez un titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                required
                maxLength={200}
              />
            </div>

            {/* Thème */}
            <div>
              <label
                htmlFor="themeId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Thème: <span className="text-red-500">*</span>
              </label>
              <select
                id="themeId"
                value={themeId}
                onChange={(e) => setThemeId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                required
              >
                <option value="">-- Choisir un thème --</option>
                <option value="1">Culture</option>
                <option value="2">Voiture</option>
                <option value="3">Science & Technologie</option>
                <option value="4">Voyage</option>
              </select>
            </div>

            {/* Catégorie */}
            <div>
              <label
                htmlFor="category"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Catégorie: <span className="text-red-500">*</span>
              </label>
              <input
                id="category"
                type="text"
                placeholder="Ex: Lifestyle, Actu, Cinéma, etc."
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                required
                maxLength={50}
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Image URL: <span className="text-red-500">*</span>
              </label>
              <input
                id="imageUrl"
                type="text"
                placeholder="Mettez l'URL de votre image (Image libre de droits!)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                required
              />
            </div>

            {/* Contenu */}
            <div>
              <label
                htmlFor="body"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Contenu du post: <span className="text-red-500">*</span>
              </label>
              <textarea
                id="body"
                rows={6}
                placeholder="Contenu de l'article"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-y"
                required
                minLength={10}
              ></textarea>
            </div>

            {/* Boutons */}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Publication..." : "Publier le post"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                className="text-black hover:underline  font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
              >
                Réinitialiser
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}