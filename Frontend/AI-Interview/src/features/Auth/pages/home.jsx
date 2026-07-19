import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const { user, handleLogout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-white">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900/80 p-10 shadow-xl">
        <h1 className="text-5xl font-semibold mb-4">Welcome home</h1>
      </div>
    </div>
  );
}
