import { CheckCircle2, Loader2, UploadCloud } from "lucide-react";
import Button from "../components/Button";

const ImageDiagnosisPage = ({ t, file, setFile, handleImageAnalysis, loading, report }) => {
  return (
    <>
      <div className="bg-gray-800/50 p-12 rounded-[3.5rem] border-4 border-dashed border-gray-700 text-center">
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
        />

        <label htmlFor="fileInput" className="cursor-pointer block group">
          <UploadCloud className="w-20 h-20 text-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold mb-2">{file ? file.name : t("uploadPrompt")}</h3>
          <p className="text-gray-500">{t("geminiText")}</p>
        </label>

        {file && (
          <Button onClick={handleImageAnalysis} className="mt-10 w-full py-5 text-xl" disabled={loading}>
            {loading ? <Loader2 className="animate-spin w-7 h-7" /> : t("analyzeBtn")}
          </Button>
        )}
      </div>

      {report && (
        <div className="mt-10 bg-blue-600/10 p-10 rounded-[3rem] border border-blue-500/30 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="text-green-400 w-8 h-8" />
            <h3 className="text-3xl font-black">{t("reportTitle")}</h3>
          </div>

          <div className="space-y-6">
            <p className="text-2xl font-medium text-blue-100 bg-gray-900/50 p-6 rounded-2xl border border-white/5">
              {report.issueName}
            </p>

            <div className="p-6 bg-gray-900/50 rounded-2xl border border-white/5">
              <h4 className="font-bold mb-2">{t("detectedProblems")}</h4>
              <p className="whitespace-pre-line text-gray-300">{report.detectedProblems}</p>
            </div>

            <div className="p-6 bg-gray-900/50 rounded-2xl border border-white/5">
              <h4 className="font-bold mb-2">{t("repairSuggestion")}</h4>
              <p className="whitespace-pre-line text-gray-300">{report.repairSuggestion}</p>
            </div>

            <div className="flex justify-between items-center p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
              <span className="text-lg font-bold">{t("cost")}:</span>
              <span className="text-4xl font-black text-green-400">
                {report.estimatedCost} <span className="text-sm">{t("sar")}</span>
              </span>
            </div>

            <p className="text-xs text-gray-500 italic mt-6">{report.aiDisclaimer}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageDiagnosisPage;
