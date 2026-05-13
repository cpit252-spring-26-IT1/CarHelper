import { CheckCircle2, Loader2 } from "lucide-react";
import Button from "../components/Button";

const ProblemAnalysisPage = ({ t, problemForm, updateProblemForm, handleProblemAnalysis, problemLoading, problemResult }) => {
  return (
    <>
      <div className="bg-gray-800/50 p-12 rounded-[3.5rem] border border-gray-700">
        <h2 className="text-4xl font-black mb-6">{t("problemTitle")}</h2>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            value={problemForm.carBrand}
            onChange={(e) => updateProblemForm("carBrand", e.target.value)}
            placeholder={t("carBrand")}
            className="bg-gray-900/70 border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500"
          />

          <input
            value={problemForm.carModel}
            onChange={(e) => updateProblemForm("carModel", e.target.value)}
            placeholder={t("carModel")}
            className="bg-gray-900/70 border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500"
          />

          <input
            value={problemForm.carYear}
            onChange={(e) => updateProblemForm("carYear", e.target.value)}
            placeholder={t("carYear")}
            className="bg-gray-900/70 border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500"
          />

          <input
            value={problemForm.city}
            onChange={(e) => updateProblemForm("city", e.target.value)}
            placeholder={t("city")}
            className="bg-gray-900/70 border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500"
          />
        </div>

        <textarea
          value={problemForm.problemDescription}
          onChange={(e) => updateProblemForm("problemDescription", e.target.value)}
          placeholder={t("problemDescription")}
          className="w-full min-h-[180px] mt-5 bg-gray-900/70 border border-gray-700 rounded-3xl p-6 text-lg outline-none focus:border-blue-500"
        />

        <Button onClick={handleProblemAnalysis} className="mt-8 w-full py-5 text-xl" disabled={problemLoading}>
          {problemLoading ? <Loader2 className="animate-spin w-7 h-7" /> : t("problemButton")}
        </Button>
      </div>

      {problemResult && (
        <div className="mt-10 bg-green-600/10 p-10 rounded-[3rem] border border-green-500/30 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="text-green-400 w-8 h-8" />
            <h3 className="text-3xl font-black">{t("problemTitle")}</h3>
          </div>

          <p className="whitespace-pre-line text-lg leading-8 text-gray-200 bg-gray-900/50 p-6 rounded-2xl border border-white/5">
            {problemResult}
          </p>
        </div>
      )}
    </>
  );
};

export default ProblemAnalysisPage;
