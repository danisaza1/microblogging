"use client";

import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

const ContactFAQPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <Header />

      {/* Page Header neutre */}
      <header className="m-10 text-center ">
        <h1 className="text-4xl  md:text-5xl font-josefin font-bold mb-4">
          Contact & FAQ
        </h1>
        <p className="text-lg md:text-xl font-montserrat text-gray-700">
          Une question ou suggestion ? Contactez-nous ou consultez notre FAQ
          ci-dessous.
        </p>
      </header>

      {/* Main content */}
      <main className="grow bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Contact Form - gauche */}
          <section className="md:w-1/2 bg-white shadow-lg rounded-2xl p-8 md:p-12">
            {submitted ? (
              <div className="text-center">
                <h2 className="text-2xl font-josefin font-bold mb-4">
                  Merci pour votre message !
                </h2>
                <p className="font-montserrat text-gray-700">
                  Nous vous répondrons dès que possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <h2 className="text-3xl font-josefin text-center font-bold mb-6">
                  Contact
                </h2>

                <div>
                  <label
                    htmlFor="name"
                    className="font-montserrat font-semibold mb-1 block"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="font-montserrat font-semibold mb-1 block"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                    placeholder="Votre email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="font-montserrat font-semibold mb-1 block"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                    placeholder="Votre message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-orange-500 text-white font-bold py-3 px-6 rounded hover:bg-orange-600 transition-colors duration-200"
                >
                  Envoyer
                </button>
              </form>
            )}
          </section>

          {/* FAQ - droite */}
          <section className="md:w-1/2 bg-white shadow-lg rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-josefin text-center font-bold mb-6">
              FAQ
            </h2>
            <div className="space-y-4">
              <details className="bg-gray-100 p-4 rounded">
                <summary className="font-semibold cursor-pointer">
                  Comment puis-je créer un compte ?
                </summary>
                <p className="mt-2 text-gray-700">
                  Vous pouvez créer un compte en cliquant sur{" "}
                  <Link
                    href="/inscription"
                    className="text-orange-500 hover:underline"
                  >
                    "S'inscrire"
                  </Link>{" "}
                  en haut à droite.
                </p>
              </details>
              <details className="bg-gray-100 p-4 rounded">
                <summary className="font-semibold cursor-pointer">
                  Comment récupérer mon mot de passe ?
                </summary>
                <p className="mt-2 text-gray-700">
                  Cliquez sur <Link
                    href="/forgot-password"
                    className="text-orange-500 hover:underline"
                  >
                    Mot de passe oublié ?"
                  </Link>{" "} lors de la connexion et
                  suivez les instructions.
                </p>
              </details>
              <details className="bg-gray-100 p-4 rounded">
                <summary className="font-semibold cursor-pointer">
                  Comment contacter le support ?
                </summary>
                <p className="mt-2 text-gray-700">
                  Utilisez ce formulaire de contact ou envoyez-nous un email à
                  support@example.com.
                </p>
              </details>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactFAQPage;
