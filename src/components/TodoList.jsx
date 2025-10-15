import { useState, useEffect } from "react";
import api from "../api/axios";

export default function TodoList({ refresh }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, [refresh]);

  const fetchTodos = async () => {
    try {
      const response = await api.get("/todos");
      setTodos(response.data.data || []);
    } catch (err) {
      console.error("Görevler alınamadı:", err);
      setTodos([]);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await api.put(`/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };

  return (
    <div className="mt-6 w-full max-w-md bg-white shadow-lg rounded-xl p-4">
      <h3 className="text-xl font-semibold mb-3 text-gray-700">Görevler</h3>
      {todos.length === 0 ? (
        <p className="text-gray-500">Henüz görev yok.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
            >
              <span
                onClick={() => toggleComplete(todo)}
                className={`cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : "text-gray-700"
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
