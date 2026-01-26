"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [latestUser, setLatestUser] = useState<{
    prenom: string;
    nom: string;
    email: string;
  } | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [inscriptionRéussie, setInscriptionRéussie] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            prenom: formData.prenom,
          nom: formData.nom,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMessage(data.error || "Une erreur est survenue.");
        return;
      }

      // Réinitialisation du formulaire + succès
      setFormData({
        prenom: "",
        nom: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      alert("Compte créé avec succès !");
      setInscriptionRéussie(true);

      // Récupère le dernier inscrit
      const resLatest = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/latest-user`,
      );
      const latestData = await resLatest.json();
      setLatestUser(latestData);
    } catch (err) {
      setErrorMessage("Une erreur réseau s’est produite.");
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="flex justify-center items-center">
            <Image
              src="https://res.cloudinary.com/dtbwsvacq/image/upload/v1753284893/journal_abqw1p.jpg"
              alt="journal"
              width={800}
              height={500}
              className="rounded-lg object-cover w-full h-auto max-h-125"
            />
          </div>

          {/* Formulaire */}
          <div className="flex flex-col justify-center">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Créez votre compte
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Rejoignez-nous et exprimez-vous en un éclair ⚡
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {["prenom", "nom", "username", "email"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field === "username"
                      ? "Nom d’utilisateur"
                      : field === "email"
                        ? "Adresse E-mail"
                        : field === "nom"
                          ? "Nom"
                          : "Prénom"}
                  </label>
                  <input
                    type="text"
                    name={field}
                    id={field}
                    required
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                    placeholder={`Entrez votre ${field}`}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                  placeholder="••••••••"
                />
              </div>

              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-orange-500"
              >
                S’inscrire
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Vous avez déjà un compte ?{" "}
                <a
                  href="/login"
                  className="font-medium text-black hover:underline"
                >
                  Connectez-vous
                </a>
              </p>
            </div>

            {/* Affichage du dernier inscrit */}
            {latestUser && inscriptionRéussie && (
              <div className="mt-8 bg-green-50 p-4 border border-green-200 rounded-md text-center">
                <p className="text-sm text-gray-700">
                  Dernier inscrit :{" "}
                  <strong>
                    {latestUser.prenom} {latestUser.nom}
                  </strong>{" "}
                  ({latestUser.email})
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
