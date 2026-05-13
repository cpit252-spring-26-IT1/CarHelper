import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Button from "../components/Button";

const SignupPage = ({
  t,
  signupForm,
  updateSignupForm,
  handleSignup,
  authLoading,
  authMessage
}) => {
  return (
    <div className="bg-gray-800/50 p-12 rounded-[3.5rem] border border-gray-700 max-w-xl mx-auto">
      <h2 className="text-4xl font-black mb-6">{t("signup")}</h2>

      {authMessage && <p className="mb-5 text-yellow-400">{authMessage}</p>}

      <div className="space-y-5">
        <input
          required
          value={signupForm.username}
          onChange={(e) => updateSignupForm("username", e.target.value)}
          placeholder={t("username")}
          className="w-full bg-gray-900/70 border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500"
        />

        <input
          type="email"
          required
          value={signupForm.email}
          onChange={(e) => updateSignupForm("email", e.target.value)}
          placeholder={t("email")}
          className="w-full bg-gray-900/70 border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500"
        />

        <input
          type="password"
          required
          value={signupForm.password}
          onChange={(e) => updateSignupForm("password", e.target.value)}
          placeholder={t("password")}
          className="w-full bg-gray-900/70 border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500"
        />

        <Button onClick={handleSignup} className="w-full py-5 text-xl" disabled={authLoading}>
          {authLoading ? <Loader2 className="animate-spin w-7 h-7" /> : t("createAccount")}
        </Button>

        <Link to="/login" className="block text-blue-400 font-bold">
          {t("haveAccount")} {t("login")}
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;