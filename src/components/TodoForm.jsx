import { useState } from "react";
import api from "../api/axios";

export default function TodoForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await api.post("/todos", { title });
      setTitle("");
      onTaskAdded(); // listeyi yenile
    } catch (err) {
      console.error("Görev eklenemedi:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
      <input
        type="text"
        placeholder="Yeni görev ekle..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Ekle
      </button>
    </form>
  );
}
