import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ImageDiagnosisPage from "./pages/ImageDiagnosisPage";
import ProblemAnalysisPage from "./pages/ProblemAnalysisPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import {
  analyzeImage,
  analyzeProblem,
  loginUser,
  registerUser,
  resetPassword
} from "./api/api";

export default function App() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("carhelperUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [problemLoading, setProblemLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const [report, setReport] = useState(null);
  const [problemResult, setProblemResult] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [forgotForm, setForgotForm] = useState({
    email: "",
    newPassword: ""
  });

  const [problemForm, setProblemForm] = useState({
    carBrand: "",
    carModel: "",
    carYear: "",
    city: "",
    problemDescription: ""
  });

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
    localStorage.setItem("language", i18n.language);
  }, [i18n.language]);

  const changeLanguage = () => {
    const nextLanguage = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(nextLanguage);
  };

  const isValidEmail = (email) => {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.trim());
  };

  const goHome = () => {
    setReport(null);
    setProblemResult("");
    setAuthMessage("");
    setFile(null);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("carhelperUser");
    setUser(null);
    goHome();
  };

  const updateLoginForm = (name, value) => {
    setLoginForm({
      ...loginForm,
      [name]: value
    });
  };

  const updateSignupForm = (name, value) => {
    setSignupForm({
      ...signupForm,
      [name]: value
    });
  };

  const updateForgotForm = (name, value) => {
    setForgotForm({
      ...forgotForm,
      [name]: value
    });
  };

  const updateProblemForm = (name, value) => {
    setProblemForm({
      ...problemForm,
      [name]: value
    });
  };

  const handleSignup = async () => {
    setAuthMessage("");

    if (!signupForm.username.trim()) {
      setAuthMessage("Username is required.");
      return;
    }

    if (!signupForm.email.trim()) {
      setAuthMessage("Email is required.");
      return;
    }

    if (!isValidEmail(signupForm.email)) {
      setAuthMessage("Please enter a valid email address.");
      return;
    }

    if (!signupForm.password.trim()) {
      setAuthMessage("Password is required.");
      return;
    }

    if (signupForm.password.length < 6) {
      setAuthMessage("Password must be at least 6 characters.");
      return;
    }

    setAuthLoading(true);

    try {
      const { response, data } = await registerUser(signupForm);

      if (!response.ok) {
        setAuthMessage(data.message || "Sign up failed");
        return;
      }

      const loggedUser = {
        id: data.id,
        username: data.username,
        email: data.email
      };

      localStorage.setItem("carhelperUser", JSON.stringify(loggedUser));
      setUser(loggedUser);
      goHome();
    } catch (error) {
      setAuthMessage(t("backendConnectionError") || "Backend connection error");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async () => {
    setAuthMessage("");

    if (!loginForm.email.trim()) {
      setAuthMessage("Email is required.");
      return;
    }

    if (!isValidEmail(loginForm.email)) {
      setAuthMessage("Please enter a valid email address.");
      return;
    }

    if (!loginForm.password.trim()) {
      setAuthMessage("Password is required.");
      return;
    }

    setAuthLoading(true);

    try {
      const { response, data } = await loginUser(loginForm);

      if (!response.ok) {
        setAuthMessage(data.message || "Login failed");
        return;
      }

      const loggedUser = {
        id: data.id,
        username: data.username,
        email: data.email
      };

      localStorage.setItem("carhelperUser", JSON.stringify(loggedUser));
      setUser(loggedUser);
      goHome();
    } catch (error) {
      setAuthMessage(t("backendConnectionError") || "Backend connection error");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setAuthMessage("");

    if (!forgotForm.email.trim()) {
      setAuthMessage("Email is required.");
      return;
    }

    if (!isValidEmail(forgotForm.email)) {
      setAuthMessage("Please enter a valid email address.");
      return;
    }

    if (!forgotForm.newPassword.trim()) {
      setAuthMessage("New password is required.");
      return;
    }

    if (forgotForm.newPassword.length < 6) {
      setAuthMessage("Password must be at least 6 characters.");
      return;
    }

    setAuthLoading(true);

    try {
      const { response, data } = await resetPassword(forgotForm);

      if (!response.ok) {
        setAuthMessage(data.message || "Reset password failed");
        return;
      }

      setAuthMessage(data.message || "Password updated successfully.");
      setForgotForm({
        email: "",
        newPassword: ""
      });
    } catch (error) {
      setAuthMessage(t("backendConnectionError") || "Backend connection error");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleImageAnalysis = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!file) {
      return;
    }

    setLoading(true);

    try {
      const data = await analyzeImage(file, i18n.language);
      setReport(data);
    } catch (error) {
      alert(t("backendError") || "Error: Make sure the Spring Boot server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleProblemAnalysis = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!problemForm.problemDescription.trim()) {
      return;
    }

    setProblemLoading(true);
    setProblemResult("");

    try {
      const data = await analyzeProblem(problemForm, i18n.language);
      setProblemResult(data.result || data.message || data);
    } catch (error) {
      alert(t("backendError") || "Error: Make sure the Spring Boot server is running.");
    } finally {
      setProblemLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "dark bg-[#0a0f1e] text-white" : "bg-gray-50 text-gray-900"}`}>
      <Navbar
        t={t}
        user={user}
        darkMode={darkMode}
        goHome={goHome}
        logout={logout}
        changeLanguage={changeLanguage}
        setDarkMode={setDarkMode}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <Routes>
          <Route path="/" element={<HomePage t={t} />} />

          <Route
            path="/login"
            element={
              <LoginPage
                t={t}
                loginForm={loginForm}
                updateLoginForm={updateLoginForm}
                handleLogin={handleLogin}
                authLoading={authLoading}
                authMessage={authMessage}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <SignupPage
                t={t}
                signupForm={signupForm}
                updateSignupForm={updateSignupForm}
                handleSignup={handleSignup}
                authLoading={authLoading}
                authMessage={authMessage}
              />
            }
          />

          <Route
            path="/forgot-password"
            element={
              <ForgotPasswordPage
                t={t}
                forgotForm={forgotForm}
                updateForgotForm={updateForgotForm}
                handleResetPassword={handleResetPassword}
                authLoading={authLoading}
                authMessage={authMessage}
              />
            }
          />

          <Route
            path="/image-diagnosis"
            element={
              <ImageDiagnosisPage
                t={t}
                file={file}
                setFile={setFile}
                handleImageAnalysis={handleImageAnalysis}
                loading={loading}
                report={report}
              />
            }
          />

          <Route
            path="/problem-analysis"
            element={
              <ProblemAnalysisPage
                t={t}
                problemForm={problemForm}
                updateProblemForm={updateProblemForm}
                handleProblemAnalysis={handleProblemAnalysis}
                problemLoading={problemLoading}
                problemResult={problemResult}
              />
            }
          />
        </Routes>
      </main>

      <footer className="text-center py-16 text-gray-600 border-t border-white/5 mt-20">
        <p className="font-mono tracking-widest text-sm uppercase">By Mohand and Abdulelah 2026 ©</p>
      </footer>
    </div>
  );
}