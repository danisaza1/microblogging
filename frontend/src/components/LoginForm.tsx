"use client";

import React from "react";
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
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full transform transition-all duration-300 hover:scale-105">
      <form onSubmit={handleSubmit}>
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
        <div className="mb-8">
          <div className="relative flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all duration-200">
            <span className="absolute left-3 text-gray-400">
              <FaLock className="text-lg" />
            </span>
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full pl-10 pr-4 py-3 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Mot de passe"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md font-semibold text-lg hover:bg-orange-500"
        >
          Se connecter
        </button>
      </form>
      <div className="flex flex-col mt-6 text-center text-gray-600 text-sm">
        Pas encore inscrit.e?{" "}
        <a href="inscription" className="text-black hover:underline font-medium">
          Creation d&apos;un compte
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
