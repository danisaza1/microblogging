"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface LikeButtonProps {
  postId: number; // Siempre numérico para backend
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
  const { token, user } = useAuth();
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch initial likes when component mounts or postId/token changes
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/likes/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            credentials: "include"
          }
        );

        if (!res.ok) {
          console.warn("Error fetching likes:", res.status, res.statusText);
          return;
        }

        const data = await res.json();
        setLikesCount(data.count);
        setLiked(data.likedByUser);
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    };

    fetchLikes();
  }, [postId, token]);

  const toggleLike = async () => {
      console.log("Token en LikeButton:", token);

    if (!user) {
      alert("Conéctate para dar like!");
      return;
    }

    if (!token) {
      alert("No se encontró token de autenticación. Inicia sesión de nuevo.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/likes/posts/${postId}`,
  {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Solo JWT puro
          },
        }
      );

      if (res.status === 401) {
        alert("No autorizado. Inicia sesión nuevamente.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const text = await res.text();
        console.error("Error toggling like:", res.status, text);
        alert("No se pudo dar like. Intenta de nuevo.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setLiked(data.liked);
      setLikesCount(data.count);
    } catch (err) {
      console.error("Error toggling like:", err);
      alert("No se pudo dar like. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${liked ? "fill-red-500 stroke-red-500" : "stroke-gray-500"}`}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21C12 21 4 13.5 4 8.5C4 5.46243 6.46243 3 9.5 3C11.0429 3 12.5 4 12.5 4C12.5 4 13.9571 3 15.5 3C18.5376 3 21 5.46243 21 8.5C21 13.5 12 21 12 21Z"
        />
      </svg>
      <span className="text-sm">{likesCount}</span>
    </button>
  );
};

export default LikeButton;
