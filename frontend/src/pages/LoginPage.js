import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Button from "../components/Button";

const LoginPage = ({
  t,
  loginForm,
  updateLoginForm,
  handleLogin,
  authLoading,
  authMessage
}) => {
  return (
    <div className="bg-gray-800/50 p-12 rounded-[3.5rem] border border-gray-700 max-w-xl mx-auto">
      <h2 className="text-4xl font-black mb-6">{t("login")}</h2>

      {authMessage && <p className="mb-5 text-yellow-400">{authMessage}</p>}

      <div className="space-y-5">
        <input
          type="email"
          required
          value={loginForm.email}
          onChange={(e) => updateLoginForm("email", e.target.value)}
          placeholder={t("email")}
          className="w-full bg-gray-900/70 border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500"
        />

        <input
          type="password"
          required
          value={loginForm.password}
          onChange={(e) => updateLoginForm("password", e.target.value)}
          placeholder={t("password")}
          className="w-full bg-gray-900/70 border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500"
        />

        <Button onClick={handleLogin} className="w-full py-5 text-xl" disabled={authLoading}>
          {authLoading ? <Loader2 className="animate-spin w-7 h-7" /> : t("loginAccount")}
        </Button>

        <Link to="/forgot-password" className="block text-blue-400 font-bold">
          {t("forgotPassword")}
        </Link>

        <Link to="/signup" className="block text-blue-400 font-bold">
          {t("noAccount")} {t("signup")}
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;