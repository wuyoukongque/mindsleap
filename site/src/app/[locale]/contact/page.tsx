import { setRequestLocale, getTranslations } from "next-intl/server";
import ContactContent from "@/components/contact/ContactContent";
import JsonLd from "@/components/shared/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: locale === "zh" ? "联系我们" : "Contact Us",
    mainEntity: {
      "@type": "Organization",
      name: "MindsLeap",
      email: "contact@mindsleap.com",
      url: "https://mindsleap.com",
    },
  };

  return (
    <>
      <JsonLd data={contactJsonLd} />
      <ContactContent />
    </>
  );
}
