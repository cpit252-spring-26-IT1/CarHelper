import React from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";

export default function Navbar({
  t,
  user,
  darkMode,
  goHome,
  logout,
  changeLanguage,
  setDarkMode
}) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link to="/" onClick={goHome} className="text-2xl font-black tracking-tight text-blue-400">
          CarHelper
        </Link>

        <div className="flex items-center gap-4 flex-wrap justify-end">

            <>
              <Link to="/login" className="hover:text-blue-400 transition">
                {t("login")}
              </Link>

              <Link to="/signup" className="hover:text-blue-400 transition">
                {t("signup")}
              </Link>
            </>


          {user && (
            <button
              onClick={logout}
              className="flex items-center gap-2 hover:text-red-400 transition"
            >
              <LogOut size={18} />
              {t("logout")}
            </button>
          )}

          <button
            onClick={changeLanguage}
            className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition"
          >
            {t("language")}
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}