"use client"; // This directive is crucial for client-side components in Next.js App Router

import { useState, useEffect, useCallback } from "react";

// Define the shape of a comment returned from your API
interface Comment {
  id: number;
  content: string;
  userId: number; // The user ID of the commenter
  postId: number; // The post ID the comment belongs to
  createdAt: string; // Date string
  user: { // Include user details to display author name
    id: number;
    username: string;
    prenom?: string; // Optional: if you have first name
    nom?: string;    // Optional: if you have last name
  };
}

// Define the prop interface for CommentSection
interface CommentSectionProps {
  postId: string; // The postId passed from ArticlePage will be a string
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Define the correct localStorage key consistently
  // If your token is indeed stored under 'accessToken', change this.
  // Based on previous conversations, '__nextjs-dev-tools-positionbottom-leftaccessToken' seems more likely for default NextAuth,
  // but if you manually set 'accessToken', use that. VERIFY THIS IN YOUR BROWSER'S DEV TOOLS -> APPLICATION -> LOCAL STORAGE.
const LOCAL_STORAGE_TOKEN_KEY = 'accessToken';  // const LOCAL_STORAGE_TOKEN_KEY = 'accessToken'; // Use this if you confirmed it's just 'accessToken'

  // Function to load comments for the given post
  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      // Use the postId directly in the API call
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${postId}/comments`
      );

      if (!res.ok) {
        // If the API returns 404 and there are no comments, it's not always an error.
        // It's an error if the route itself is not found, but not if it just returns an empty array.
        // We'll treat 404 as "no comments found" for display purposes unless it's a severe route error.
        if (res.status === 404) {
            setComments([]); // No comments for this post yet, which is fine
            return;
        }
        throw new Error(`Failed to fetch comments: ${res.status} ${res.statusText}`);
      }

      const data: Comment[] = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Impossible de charger les commentaires.");
    } finally {
      setIsLoading(false);
    }
  }, [postId]); // Depend on postId to refetch comments when the post changes

  // Effect to load comments on component mount or postId change
  useEffect(() => {
    loadComments();
  }, [loadComments]); // Depend on loadComments to run it when the component mounts

  // Effect to check authentication status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      // Optional: If you're using js-cookie for HTTP-only cookies, you might check it here too
      // const token = Cookies.get('yourAuthCookieName'); 
      
      console.log("[CommentSection] Token from localStorage:", token ? "Found" : "Not Found");
      setIsAuthenticated(!!token);
      console.log("[CommentSection] isAuthenticated state:", !!token);
    }
  }, []);

  // ... existing imports and state ...

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!newComment.trim()) {
    return;
  }

  if (!isAuthenticated) {
    setError("Vous devez être connecté pour publier un commentaire.");
    return;
  }

  setIsSubmitting(true);
  setError(null);

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    // Ensure you're handling the 'accessToken' prefix correctly if it's there
    const actualJwt = token?.startsWith('accessToken') ? token.substring('accessToken'.length) : token;

    if (!actualJwt) {
      setError("Erreur: Jeton d'authentification manquant. Veuillez vous reconnecter.");
      setIsSubmitting(false);
      return;
    }

    headers['Authorization'] = `Bearer ${actualJwt}`;

    // ✅ NEW: Decode the JWT to get the userId
    let userId;
    try {
      const payload = JSON.parse(atob(actualJwt.split('.')[1]));
      // IMPORTANT: Verify the actual key for userId in your JWT payload.
      // It's commonly 'sub' (subject) or 'id'. Use the correct one.
      userId = Number(payload.sub || payload.id); 
      if (isNaN(userId)) {
        throw new Error("User ID could not be extracted from token.");
      }
    } catch (decodeError) {
      console.error("Error decoding JWT or extracting userId:", decodeError);
      setError("Erreur: Impossible d'identifier l'utilisateur. Veuillez vous reconnecter.");
      setIsSubmitting(false);
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${postId}/comments`,
      {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          content: newComment.trim(),
          postId: Number(postId),
          userId: userId, // ✅ Use the extracted userId here
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("💥 Backend error raw:", errorText);
      throw new Error(`Erreur ${res.status}: ${errorText}`);
    }

    const comment = await res.json();
    console.log("🧾 Respuesta del backend (comment):", comment);

    // ✅ Add null/undefined checks for safety, though the backend should return it.
    // If 'comment.user' is sometimes undefined, you'll need to handle it gracefully.
    // For now, assume it's there as per your backend's design.
    const formattedNewComment: Comment = {
      id: comment.id,
      content: comment.content,
      userId: comment.userId,
      postId: comment.postId,
      createdAt: comment.createdAt,
      user: {
        id: comment.user?.id, // Use optional chaining for safety
        username: comment.user?.username,
        prenom: comment.user?.prenom,
        nom: comment.user?.nom,
      }
    };
    
    setComments(prevComments => [formattedNewComment, ...prevComments]);
    setNewComment("");
  } catch (err) {
    console.error('Erreur lors de la soumission du commentaire:', err);
    setError(
      err instanceof Error
        ? err.message
        : 'Erreur lors de la publication du commentaire'
    );
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <section className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Commentaires ({comments.length})
      </h2>

      {isLoading ? (
        <p className="text-gray-600">Chargement des commentaires...</p>
      ) : error && comments.length === 0 ? (
        <p className="text-red-500">{error}</p>
      ) : null}

      {/* Comment submission form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical min-h-25"
          placeholder={isAuthenticated ? "Écrivez un commentaire..." : "Connectez-vous pour commenter..."}
          required
          disabled={isSubmitting || !isAuthenticated} // Input is disabled if not authenticated or submitting
          maxLength={500} // Set a max length for comments
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-500">
            {newComment.length}/500 caractères
          </span>
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim() || !isAuthenticated} // Button is disabled if not authenticated, submitting, or no text
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Publication..." : "Publier"}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </form>

      {/* Display comments */}
      {comments.length === 0 && !isLoading && !error ? (
        <p className="text-gray-600">Aucun commentaire pour le moment. Soyez le premier !</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center mb-2">
                <p className="font-semibold text-gray-800">
                    {comment.user?.prenom && comment.user?.nom
                        ? `${comment.user.prenom} ${comment.user.nom}`
                        : comment.user?.username || 'Utilisateur inconnu'}
                </p>
                <p className="text-sm text-gray-500 ml-3">
                  {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}