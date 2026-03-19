"use client";

import { useTranslations } from "next-intl";

export default function ValueProposition() {
  const t = useTranslations("valueProp");

  return (
    <section className="bg-[#1e477c] py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">{t("title")}</h2>
            <div className="space-y-6 text-blue-100 text-lg">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
            </div>
            <div className="mt-8">
              <img src="/images/joint-logo.png" alt="MindsLeap x Founders Space" className="h-16 w-auto" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <blockquote className="text-2xl font-light italic leading-relaxed">
                &ldquo;{t("quote")}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center space-x-4">
                <img src="/images/about/lincoln.jpg" alt="Lincoln" className="w-12 h-12 rounded-full object-cover shrink-0" />
                <div>
                  <p className="font-bold">Lincoln</p>
                  <p className="text-sm text-blue-300">{t("quoteRole")}</p>
                  <p className="text-sm text-blue-300">{t("quoteRole2")}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <blockquote className="text-xl font-light italic leading-relaxed">
                &ldquo;{t("hoffmanQuote")}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center space-x-4">
                <img src="/images/about/hoffman.png" alt="Steve Hoffman" className="w-12 h-12 rounded-full object-cover shrink-0" />
                <div>
                  <p className="font-bold">Steve Hoffman</p>
                  <p className="text-sm text-blue-300">{t("hoffmanRole")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
