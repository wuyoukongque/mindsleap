import { setRequestLocale, getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/posts";
import NewsListClient from "@/components/news/NewsListClient";
import JsonLd from "@/components/shared/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function NewsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { tab } = await searchParams;
  setRequestLocale(locale);

  const posts = getAllPosts(locale);
  const initialFilter = tab === "all" || tab === "events" || tab === "insights" ? tab : "events";

  const newsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "zh" ? "最新动态" : "Latest News",
    description: locale === "zh" ? "MindsLeap活动资讯与行业洞察" : "MindsLeap events and industry insights",
    publisher: {
      "@type": "Organization",
      name: "MindsLeap",
    },
  };

  return (
    <>
      <JsonLd data={newsJsonLd} />
      <NewsListClient posts={posts} initialFilter={initialFilter} />
    </>
  );
}
