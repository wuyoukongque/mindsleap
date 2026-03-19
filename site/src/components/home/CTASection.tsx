"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-24 bg-brand-gradient relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-all hover:shadow-lg text-lg"
          >
            {t("button")}
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
