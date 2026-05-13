import React from "react";
import { Link } from "react-router-dom";
import { Camera, Wrench, Car } from "lucide-react";

export default function HomePage({ t }) {
  return (
    <div className="space-y-20">
      <section className="text-center py-16">
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
          {t("heroTitle1")}
          <br />
          <span className="text-blue-400">{t("heroTitle2")}</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {t("heroDesc")}
        </p>
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">{t("services")}</h2>
          <p className="text-gray-400">{t("servicesDesc")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Link
            to="/image-diagnosis"
            className="group p-8 rounded-3xl bg-white/10 border border-white/10 hover:border-blue-400 transition cursor-pointer"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition">
              <Camera className="text-blue-400" size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-4">{t("imageAnalysis")}</h3>
            <p className="text-gray-400 leading-relaxed">{t("imageAnalysisDesc")}</p>
          </Link>

          <Link
            to="/problem-analysis"
            className="group p-8 rounded-3xl bg-white/10 border border-white/10 hover:border-blue-400 transition cursor-pointer"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition">
              <Wrench className="text-blue-400" size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-4">{t("problemAnalysis")}</h3>
            <p className="text-gray-400 leading-relaxed">{t("problemAnalysisDesc")}</p>
          </Link>

          <div className="group p-8 rounded-3xl bg-white/10 border border-white/10 opacity-70">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
              <Car className="text-blue-400" size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-4">{t("carValuation")}</h3>
            <p className="text-gray-400 leading-relaxed">{t("carValuationDesc")}</p>

            <p className="mt-6 text-blue-400 font-bold">{t("comingSoon")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}