"use client";

import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

type Props = {
  email: string;
  password: string;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const LoginForm: React.FC<Props> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full transform transition-all duration-300 hover:scale-105">
      <form onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div className="mb-6">
          <div className="relative flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all duration-200">
            <span className="absolute left-3 text-gray-400">
              <FaUser className="text-lg" />
            </span>
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
              required
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-8">
          <div className="relative flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all duration-200">
            <span className="absolute left-3 text-gray-400">
              <FaLock className="text-lg" />
            </span>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              className="w-full pl-10 pr-12 py-3 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Mot de passe"
              required
            />

            {/* EYE TOGGLE */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-400 hover:text-black transition"
              aria-label={
                showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"
              }
            >
              {showPassword ? (
                /* 👁️ OPEN */
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
                /* 🙈 CLOSED */
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

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md font-semibold text-lg hover:bg-orange-500 transition"
        >
          Se connecter
        </button>
      </form>

      {/* LINK */}
      <div className="flex flex-col mt-6 text-center text-gray-600 text-sm">
        Pas encore inscrit.e ?{" "}
        <a
          href="inscription"
          className="text-black hover:underline font-medium"
        >
          Création d&apos;un compte
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
