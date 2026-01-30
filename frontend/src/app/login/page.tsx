"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const raw = await res.text();
      console.log("🧾 Réponse brute du serveur :", raw);

      let data;
     try {
  data = JSON.parse(raw);
} catch {
  throw new Error("Le serveur a renvoyé une réponse invalide.");
}

if (!res.ok) {
  throw new Error(data.error || "Échec de la connexion");
}

login(data.accessToken, data.user);
router.push("/user");
} catch (err: unknown) {
  if (err instanceof Error) {
    alert(err.message);
  } else {
    alert("Erreur inattendue");
  }
}
  };

  return (
    <>
      <Header hideSignUpButton={true} />

      <div>
        <h1 className="font-josefin text-8xl font-black m-9 tracking-wide text-orange-500 text-center uppercase">
          LOGIN
        </h1>
      </div>

      <main className="grow flex items-center justify-center p-4">
        <div className="pb-9">
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />

          {/* 👉 Ajout du lien "Mot de passe oublié" */}
          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-sm text-orange-500 hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default LoginPage;
