import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Görev Yönetimi 📝
        </h2>
        <TodoForm onTaskAdded={() => setRefresh(prev => !prev)} />
        <TodoList refresh={refresh} />
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
