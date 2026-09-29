"use client";

import { useTranslations } from "next-intl";
import SectionTitle from "@/components/shared/SectionTitle";

const clients = [
  "Qualcomm", "Huawei", "Alibaba", "Bosch", "Intel", "Disney",
  "Volkswagen", "PwC", "Siemens", "联想", "恒安集团", "发那科",
  "Warner Bros", "NBC", "MetLife", "Ralph Lauren", "Ford",
];

export default function ClientLogos() {
  const t = useTranslations("clients");

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        {/* Logo marquee */}
        <div className="relative overflow-hidden mt-12">
          <div className="flex animate-marquee">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client}-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center h-16"
              >
                <span className="text-lg font-semibold text-gray-400 whitespace-nowrap hover:text-gray-600 transition-colors">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
