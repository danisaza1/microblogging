"use client";

import React, { useState } from "react";
import Footer from "../../components/Footer"  // Assure-toi du chemin
import Header from "@/components/Header";


const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
      {/* Hero Section */}

      <header className="m-10 rounded-full bg-orange-500 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-josefin font-bold mb-4">
          Contactez-nous
        </h1>
        <p className="text-lg md:text-xl font-montserrat">
          Une question, une suggestion ou juste dire bonjour ? Écrivez-nous !
        </p>
      </header>

      {/* Contact Form */}
      <main className="grow bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
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
              <div>
                <label htmlFor="name" className="font-montserrat font-semibold mb-1 block">
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
                <label htmlFor="email" className="font-montserrat font-semibold mb-1 block">
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
                <label htmlFor="message" className="font-montserrat font-semibold mb-1 block">
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
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
