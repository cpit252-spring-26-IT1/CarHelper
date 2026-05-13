import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Button from "../components/Button";

const ForgotPasswordPage = ({
  t,
  forgotForm,
  updateForgotForm,
  handleResetPassword,
  authLoading,
  authMessage
}) => {
  return (
    <div className="bg-gray-800/50 p-12 rounded-[3.5rem] border border-gray-700 max-w-xl mx-auto">
      <h2 className="text-4xl font-black mb-6">{t("forgotPassword")}</h2>

      <p className="text-gray-400 mb-6">{t("forgotPasswordDesc")}</p>

      {authMessage && <p className="mb-5 text-yellow-400">{authMessage}</p>}

      <div className="space-y-5">
        <input
          type="email"
          required
          value={forgotForm.email}
          onChange={(e) => updateForgotForm("email", e.target.value)}
          placeholder={t("email")}
          className="w-full bg-gray-900/70 border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500"
        />

        <input
          type="password"
          required
          value={forgotForm.newPassword}
          onChange={(e) => updateForgotForm("newPassword", e.target.value)}
          placeholder={t("newPassword")}
          className="w-full bg-gray-900/70 border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500"
        />

        <Button onClick={handleResetPassword} className="w-full py-5 text-xl" disabled={authLoading}>
          {authLoading ? <Loader2 className="animate-spin w-7 h-7" /> : t("resetPassword")}
        </Button>

        <Link to="/login" className="block text-blue-400 font-bold">
          {t("backToLogin")}
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;