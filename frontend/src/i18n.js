import i18n from "i18next";
import { initReactI18next } from "react-i18next";

function getDefaultLanguage() {
  const savedLanguage = localStorage.getItem("language");

  if (savedLanguage) {
    return savedLanguage;
  }

  const browserLanguage = navigator.language || navigator.userLanguage;

  if (browserLanguage && browserLanguage.toLowerCase().startsWith("ar")) {
    return "ar";
  }

  return "en";
}

const resources = {
  en: {
    translation: {
      home: "Home",
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      language: "العربية",
      appName: "CarHelper",
      heroTitle1: "Your Smart Assistant",
      heroTitle2: "for Car Inspection",
      heroDesc: "Diagnose car problems and calculate costs with the power of Artificial Intelligence.",
      services: "Our Services",
      servicesDesc: "Choose the service that fits your needs today",
      imageDiagnosis: "Image Diagnosis",
      imageAnalysis: "Image Analysis",
      imageAnalysisDesc: "Upload an image of the damage for instant AI diagnosis.",
      problemAnalysis: "Problem Analysis",
      problemAnalysisDesc: "Describe noise, vibration, smoke, leak, overheating, or any car issue.",
      carValuation: "Car Valuation",
      carValuationDesc: "Know your car's market value accurately.",
      uploadPrompt: "Click to upload damage photo",
      analyzeBtn: "Analyze with AI",
      reportTitle: "AI Inspection Report",
      back: "Back to Home",
      cost: "Estimated Cost",
      sar: "SAR",
      problemTitle: "Problem Analysis",
      carBrand: "Car Brand",
      carModel: "Car Model",
      carYear: "Car Year",
      city: "City",
      problemDescription: "Describe the car problem",
      problemButton: "Analyze Problem",
      username: "Username",
      email: "Email",
      password: "Password",
      newPassword: "New Password",
      forgotPassword: "Forgot Password?",
      forgotPasswordDesc: "Enter your email and new password to reset your account password.",
      resetPassword: "Reset Password",
      backToLogin: "Back to Login",
      createAccount: "Create Account",
      loginAccount: "Login",
      haveAccount: "Already have an account?",
      noAccount: "Do not have an account?",
      welcome: "Welcome",
      comingSoon: "Coming Soon",
      backendError: "Error: Make sure the Spring Boot server is running.",
      backendConnectionError: "Backend connection error",
      geminiText: "AI is being used for analysis",
      detectedProblems: "Detected Problems",
      repairSuggestion: "Repair Suggestion"
    }
  },
  ar: {
    translation: {
      home: "الرئيسية",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      logout: "تسجيل الخروج",
      language: "English",
      appName: "CarHelper",
      heroTitle1: "مساعدك الذكي",
      heroTitle2: "لفحص السيارات",
      heroDesc: "شخّص مشاكل السيارة واحسب التكاليف باستخدام الذكاء الاصطناعي.",
      services: "خدماتنا",
      servicesDesc: "اختر الخدمة المناسبة لك اليوم",
      imageDiagnosis: "تشخيص الصور",
      imageAnalysis: "تحليل الصور",
      imageAnalysisDesc: "ارفع صورة للضرر أو لمبة التحذير للحصول على تقرير ذكي.",
      problemAnalysis: "تحليل المشكلة",
      problemAnalysisDesc: "اكتب صوت أو اهتزاز أو دخان أو تهريب أو ارتفاع حرارة.",
      carValuation: "تقييم السيارة",
      carValuationDesc: "اعرف القيمة السوقية التقريبية للسيارة.",
      uploadPrompt: "اضغط لرفع صورة الضرر",
      analyzeBtn: "تحليل باستخدام AI",
      reportTitle: "تقرير الفحص الذكي",
      back: "الرجوع للرئيسية",
      cost: "التكلفة التقديرية",
      sar: "ريال",
      problemTitle: "تحليل المشكلة",
      carBrand: "الشركة",
      carModel: "الموديل",
      carYear: "السنة",
      city: "المدينة",
      problemDescription: "اكتب مشكلة السيارة",
      problemButton: "تحليل المشكلة",
      username: "اسم المستخدم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      newPassword: "كلمة المرور الجديدة",
      forgotPassword: "نسيت كلمة المرور؟",
      forgotPasswordDesc: "أدخل البريد الإلكتروني وكلمة المرور الجديدة لتغيير كلمة المرور.",
      resetPassword: "تغيير كلمة المرور",
      backToLogin: "الرجوع لتسجيل الدخول",
      createAccount: "إنشاء حساب",
      loginAccount: "تسجيل الدخول",
      haveAccount: "لديك حساب؟",
      noAccount: "ليس لديك حساب؟",
      welcome: "مرحباً",
      comingSoon: "قريباً",
      backendError: "خطأ: تأكد أن Spring Boot يعمل.",
      backendConnectionError: "خطأ في الاتصال بالباك إند",
      geminiText: "يتم استخدام AI للتحليل",
      detectedProblems: "المشاكل المكتشفة",
      repairSuggestion: "اقتراح الإصلاح"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: getDefaultLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;