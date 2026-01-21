"use client";
import { useState, useEffect } from "react";
import { fetchWithAuth } from "../app/utils/fetchWithAuth";

type User = {
  id: string;
  nom: string;
  email: string;
  role: "USER" | "ADMIN";
};

type Post = {
  id: string;
  title: string;
  description: string;
  authorName: string;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>({});
  const [pendingPosts, setPendingPosts] = useState<Post[]>([]);

  // Récupération des utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetchWithAuth("http://localhost:3001/api/users");
      const data = await res.json();
      if (res.ok) setUsers(data as User[]);
      else console.error("Erreur chargement des utilisateurs :", data.error);
    };
    fetchUsers();
  }, []);

  // Récupération des posts en attente
  useEffect(() => {
    const fetchPendingPosts = async () => {
      const res = await fetchWithAuth("http://localhost:3001/api/admin/pending-posts");
      const data = await res.json();
      if (res.ok) setPendingPosts(data as Post[]);
      else console.error("Erreur chargement des posts en attente :", data.error);
    };
    fetchPendingPosts();
  }, []);

  // Changement de rôle
  const handleRoleChange = async (userId: string, newRole: "USER" | "ADMIN") => {
    try {
      const res = await fetchWithAuth("http://localhost:3001/api/admin/assign-role", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      if (res.ok) {
        setSelectedRoles((prev) => ({ ...prev, [userId]: newRole }));
        console.log("Rôle mis à jour !");
      } else {
        const errorData = await res.json();
        console.error("Erreur assignation :", errorData.error);
      }
    } catch (err) {
      console.error("Erreur serveur :", err);
    }
  };

  // Validation des posts
  const handleApprove = async (id: string) => {
    await fetchWithAuth(`http://localhost:3001/api/admin/posts/${id}/approve`, { method: "PUT" });
    setPendingPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handleReject = async (id: string) => {
    await fetchWithAuth(`http://localhost:3001/api/admin/posts/${id}/reject`, { method: "PUT" });
    setPendingPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Dashboard Administrateur</h2>

      {/* Gestion des rôles */}
      <div className="overflow-x-auto mb-12">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Nom</th>
              <th className="text-left p-3">Email</th>
              <th className="text-center p-3">Rôle</th>
              <th className="text-right p-3">Changer rôle</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="p-3">{user.nom}</td>
                <td className="p-3 text-sm text-gray-700">{user.email}</td>
                <td className="p-3 text-center font-medium text-gray-600">{user.role}</td>
                <td className="p-3 text-right">
                  <select
                    value={selectedRoles[user.id] || user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as "USER" | "ADMIN")}
                    className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring focus:border-orange-500"
                  >
                    <option value="USER">Utilisateur</option>
                    <option value="ADMIN">Administrateur</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Validation des posts */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Posts en attente</h3>
        {pendingPosts.length > 0 ? (
          <div className="grid gap-6">
            {pendingPosts.map((post) => (
              <div key={post.id} className="bg-gray-50 p-4 rounded-lg shadow border">
                <h4 className="text-lg font-semibold text-gray-800">{post.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{post.description}</p>
                <p className="text-xs text-gray-500 mb-4">Auteur: {post.authorName}</p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => handleApprove(post.id)}
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Approuver
                  </button>
                  <button
                    onClick={() => handleReject(post.id)}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Rejeter
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Aucun post en attente pour le moment.</p>
        )}
      </section>
    </section>
  );
}
