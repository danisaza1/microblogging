'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ForgotPasswordPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('❌ Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        'http://localhost:3001/api/auth/reset-password-direct',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Une erreur est survenue.');
        return;
      }

      setMessage('✅ Mot de passe modifié avec succès.');
      setFormData({ email: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.error(error);
      setErrorMessage('Erreur réseau. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-yellow-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center">
            Réinitialiser le mot de passe
          </h2>

          <p className="mt-2 text-sm text-gray-600 text-center">
            Entrez votre email et choisissez un nouveau mot de passe.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}

            {message && (
              <p className="text-sm text-green-600">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-orange-500 disabled:opacity-50"
            >
              {loading ? 'Mise à jour...' : 'Changer le mot de passe'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/login"
              className="text-sm font-medium text-black hover:underline"
            >
              ← Retour à la connexion
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ForgotPasswordPage;
