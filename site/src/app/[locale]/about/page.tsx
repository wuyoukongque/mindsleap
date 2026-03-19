import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import JsonLd from "@/components/shared/JsonLd";
import AboutContent from "@/components/about/AboutContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("storyText"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: locale === "zh" ? "关于MindsLeap" : "About MindsLeap",
    description: locale === "zh"
      ? "MindsLeap致力于打造AI时代的全球生态网络"
      : "MindsLeap is dedicated to building a global ecosystem for the AI era",
    mainEntity: {
      "@type": "Organization",
      name: "MindsLeap",
      founder: [
        { "@type": "Person", name: "Lincoln", jobTitle: "CEO" },
        { "@type": "Person", name: "Steve Hoffman", jobTitle: "Founder, Founders Space" },
      ],
    },
  };

  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <AboutContent />
    </>
  );
}
