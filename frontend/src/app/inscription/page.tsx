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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setErrorMessage(data.error || "Une erreur est survenue.");
        return;
      }

      setFormData({
        prenom: "",
        nom: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setInscriptionRéussie(true);
      alert("Compte créé avec succès !");

      const resLatest = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/latest-user`
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

      <div className="min-h-screen bg-yellow-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="flex justify-center items-center">
            <Image
              src="https://res.cloudinary.com/dtbwsvacq/image/upload/v1753284893/journal_abqw1p.jpg"
              alt="journal"
              width={800}
              height={500}
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>

          {/* Form */}
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
                  <label className="block text-sm font-medium text-gray-700">
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
                    required
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              ))}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm pr-10 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m15 18-.722-3.25" />
                        <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                        <path d="m20 15-1.726-2.05" />
                        <path d="m4 15 1.726-2.05" />
                        <path d="m9 18 .722-3.25" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm pr-10 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
                  >
                     {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m15 18-.722-3.25" />
                        <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                        <path d="m20 15-1.726-2.05" />
                        <path d="m4 15 1.726-2.05" />
                        <path d="m9 18 .722-3.25" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-black text-white rounded-md hover:bg-orange-500"
              >
                S’inscrire
              </button>
            </form>

            {latestUser && inscriptionRéussie && (
              <div className="mt-6 bg-green-50 p-4 rounded-md text-center">
                <p className="text-sm">
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
