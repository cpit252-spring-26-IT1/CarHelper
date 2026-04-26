import React, { useState } from "react";
import { Moon, Sun, Car, FileText, Image as ImageIcon, ArrowRight, Wrench, Loader2, Globe, UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";

const translations = {
  ar: {
    login: "تسجيل دخول", signup: "حساب جديد", appName: "CarHelper",
    heroTitle1: "مساعدك الذكي", heroTitle2: "لفحص السيارات",
    heroDesc: "شخّص مشاكل سيارتك، احسب تكلفة الإصلاح، واعرف سعرها الحقيقي في السوق بمساعدة الذكاء الاصطناعي.",
    services: "خدماتنا", servicesDesc: "اختر الخدمة التي تناسب احتياجك اليوم",
    srv1: "تحليل الصور", srv1Desc: "ارفع صورة للضرر وسنقوم بتحديده وتقدير تكلفة إصلاحه فورياً.",
    srv2: "وصف المشكلة", srv2Desc: "اشرح المشكلة التي تسمعها أو تشعر بها، وسنعطيك التشخيص.",
    srv3: "تقييم السيارة", srv3Desc: "أدخل مواصفات سيارتك لمعرفة قيمتها السوقية الحالية بدقة.",
    uploadPrompt: "اضغط لاختيار صورة للضرر", analyzeBtn: "بدء التحليل الفعلي",
    analyzing: "جاري تحليل الصورة بالذكاء الاصطناعي...", reportTitle: "تقرير الفحص الذكي",
    back: "الرجوع للرئيسية", cost: "التكلفة التقديرية", sar: "ريال سعودي"
  },
  en: {
    login: "Login", signup: "Sign Up", appName: "CarHelper",
    heroTitle1: "Your Smart Assistant", heroTitle2: "for Car Inspection",
    heroDesc: "Diagnose car problems and calculate costs with the power of Artificial Intelligence.",
    services: "Our Services", servicesDesc: "Choose the service that fits your needs today",
    srv1: "Image Analysis", srv1Desc: "Upload an image of the damage for instant AI diagnosis.",
    srv2: "Problem Analysis", srv2Desc: "Describe the issue and get immediate feedback.",
    srv3: "Car Valuation", srv3Desc: "Know your car's market value accurately.",
    uploadPrompt: "Click to upload damage photo", analyzeBtn: "Analyze with Gemini AI",
    analyzing: "AI is processing...", reportTitle: "AI Inspection Report",
    back: "Back to Home", cost: "Estimated Cost", sar: "SAR"
  }
};

const Button = ({ children, variant = "solid", className = "", ...props }) => {
  const baseStyle = "px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    solid: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg",
    outline: "border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:text-blue-500"
  };
  return <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState("ar");
  const [activeService, setActiveService] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const t = (key) => translations[lang]?.[key] || key;
  const isRtl = lang === "ar";

  const handleImageAnalysis = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/diagnosis/image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setReport(data);
    } catch (error) {
      alert("Error: Make sure the Spring Boot server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={`min-h-screen transition-colors duration-500 ${darkMode ? "dark bg-[#0a0f1e] text-white" : "bg-gray-50 text-gray-900"}`}>

      <nav className="flex justify-between items-center px-6 py-5 bg-white/5 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center gap-3 font-black text-2xl text-blue-500 cursor-pointer" onClick={() => {setActiveService(null); setReport(null);}}>
          <div className="relative">
             <Car className="w-9 h-9" />
             <Wrench className="w-5 h-5 absolute -top-1 -right-1 text-yellow-500 rotate-45" />
          </div>
          <span className="tracking-tighter">{t("appName")}</span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => alert("قريباً")} className="text-sm font-bold hover:text-blue-400">{t("login")}</button>
          <Button onClick={() => alert("قريباً")}>{t("signup")}</Button>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="p-2.5 rounded-full border border-gray-600"><Globe className="w-5 h-5"/></button>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-full border border-gray-600">
            {darkMode ? <Sun className="text-yellow-400 w-5 h-5"/> : <Moon className="w-5 h-5"/>}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {!activeService ? (
          <section className="animate-in fade-in duration-700">
            {/* Hero Section */}
            <div className="text-center mb-24">
              <h1 className="text-6xl md:text-8xl font-black mb-8">
                {t("heroTitle1")} <br/>
                <span className="text-blue-500">{t("heroTitle2")}</span>
              </h1>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">{t("heroDesc")}</p>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">{t("services")}</h2>
              <p className="text-gray-500">{t("servicesDesc")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { id: 'img', title: t("srv1"), desc: t("srv1Desc"), icon: <ImageIcon className="text-blue-500 w-12 h-12"/>, color: "hover:border-blue-500" },
                { id: 'prob', title: t("srv2"), desc: t("srv2Desc"), icon: <FileText className="text-green-500 w-12 h-12"/>, color: "hover:border-green-500" },
                { id: 'val', title: t("srv3"), desc: t("srv3Desc"), icon: <Car className="text-purple-500 w-12 h-12"/>, color: "hover:border-purple-500" }
              ].map(srv => (
                <div
                  key={srv.id}
                  onClick={() => srv.id === 'img' ? setActiveService('img') : alert('Coming Soon')}
                  className={`bg-gray-800/40 p-10 rounded-[3rem] border-2 border-transparent ${srv.color} cursor-pointer transition-all duration-300 hover:-translate-y-3 shadow-2xl`}
                >
                  <div className="bg-gray-700/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">{srv.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{srv.title}</h3>
                  <p className="text-gray-400 text-sm">{srv.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-500">
            <button onClick={() => {setActiveService(null); setReport(null);}} className="flex items-center gap-2 text-blue-400 font-bold mb-10 hover:underline">
              <ArrowRight className={isRtl ? "" : "rotate-180"}/> {t("back")}
            </button>

            <div className="bg-gray-800/50 p-12 rounded-[3.5rem] border-4 border-dashed border-gray-700 text-center">
              <input type="file" id="fileInput" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
              <label htmlFor="fileInput" className="cursor-pointer block group">
                <UploadCloud className="w-20 h-20 text-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-2">{file ? file.name : t("uploadPrompt")}</h3>
                <p className="text-gray-500">Google Gemini is being used for analysis</p>
              </label>

              {file && (
                <Button onClick={handleImageAnalysis} className="mt-10 w-full py-5 text-xl" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin w-7 h-7"/> : t("analyzeBtn")}
                </Button>
              )}
            </div>

            {report && (
              <div className="mt-10 bg-blue-600/10 p-10 rounded-[3rem] border border-blue-500/30 animate-in slide-in-from-top-10 shadow-blue-500/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="text-green-400 w-8 h-8"/>
                  <h3 className="text-3xl font-black">{t("reportTitle")}</h3>
                </div>
                <div className="space-y-6">
                  <p className="text-2xl font-medium text-blue-100 bg-gray-900/50 p-6 rounded-2xl border border-white/5">{report.issueName}</p>
                  <div className="flex justify-between items-center p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
                    <span className="text-lg font-bold">{t("cost")}:</span>
                    <span className="text-4xl font-black text-green-400">{report.estimatedCost} <span className="text-sm">{t("sar")}</span></span>
                  </div>
                  <p className="text-xs text-gray-500 italic mt-6">{report.aiDisclaimer}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="text-center py-16 text-gray-600 border-t border-white/5 mt-20">
        <p className="font-mono tracking-widest text-sm uppercase">By Mohand and Abdulelah 2026 ©</p>
      </footer>
    </div>
  );
}