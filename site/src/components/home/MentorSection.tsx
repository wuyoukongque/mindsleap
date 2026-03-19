"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import SectionTitle from "@/components/shared/SectionTitle";

const mentors = [
  {
    name: "Steve Hoffman",
    role: { zh: "Founders Space 创始人", en: "Founder, Founders Space" },
    image: "/images/mentors/hoffman.jpg",
  },
  {
    name: "Zack Kass",
    role: { zh: "OpenAI 前市场负责人", en: "OpenAI Former Go-to-Market Head" },
    image: "/images/mentors/zack.jpg",
  },
  {
    name: "Piero Scaruffi",
    role: { zh: "硅谷AI研究院创始人", en: "Silicon Valley AI Research Institute Founder" },
    image: "/images/mentors/piero.jpg",
  },
  {
    name: "Barry Katz",
    role: { zh: "斯坦福D School教授", en: "Stanford D School Professor" },
    image: "/images/mentors/barry.jpg",
  },
  {
    name: "李佳教授",
    role: { zh: "LiveX联合创始人 / 斯坦福教授", en: "LiveX Co-founder / Stanford Professor" },
    image: "/images/mentors/lijia.jpg",
  },
];

export default function MentorSection() {
  const t = useTranslations("mentors");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-12">
          {mentors.map((mentor) => (
            <div
              key={mentor.name}
              className="text-center group"
            >
              <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 ring-4 ring-gray-100 group-hover:ring-primary/20 transition-all">
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">{mentor.name}</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{mentor.role.zh}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
