"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// --- Types ---
type User = {
  id: number;
  email: string;
  username: string;
  prenom: string;
  nom: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
};

// --- Stockage du token en mémoire (hors React) ---
let _accessToken: string | null = null;

export function getAccessToken() {
  return (
    _accessToken ??
    (typeof window !== "undefined" ? localStorage.getItem("accessToken") : null)
  );
}

export function setAccessToken(token: string | null) {
  _accessToken = token;
  if (typeof window !== "undefined") {
    if (token) localStorage.setItem("accessToken", token);
    else localStorage.removeItem("accessToken");
  }
}

// --- Contexte React ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getAccessToken());
  const router = useRouter();

  // 🟢 Rafraîchissement du token au montage
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/api/auth/refresh-token",
          {
            method: "POST",
            credentials: "include", // Important si usas cookies HttpOnly
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Échec du refresh token");
        }

        const data = await res.json();
        setToken(data.accessToken);
        setAccessToken(data.accessToken); // 🔐 update global
        setUser(data.user);
        console.log("🔄 Token rafraîchi !");
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Erreur lors du refresh :", err.message);
        } else {
          console.error("Erreur lors du refresh :", err);
        }
        setToken(null);
        setAccessToken(null);
        setUser(null);
        router.push("/login"); // Redirige al login si falla el refresh
      }
    };

    refresh();
  }, [router]);

  const login = (newToken: string, user: User) => {
    setToken(newToken);
    setAccessToken(newToken);
    setUser(user);
    console.log("✅ Connecté :", user);
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Erreur logout :", err);
    }
    setToken(null);
    setAccessToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
