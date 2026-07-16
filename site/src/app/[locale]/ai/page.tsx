import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { asGeoLocale, brandSummary, geoPeople, geoTopics } from "@/lib/geo";
import { getAllPosts } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const currentLocale = asGeoLocale(locale);
  const siteUrl = getSiteUrl();
  const isZh = currentLocale === "zh";

  return {
    title: isZh ? "AI / Agent 内容索引" : "AI / Agent Content Index",
    description: isZh
      ? "MindsLeap 面向 AI Agent 的权威内容、主题、人物和机器可读入口。"
      : "Authoritative MindsLeap content, topics, people, and machine-readable entry points for AI agents.",
    alternates: {
      canonical: `${siteUrl}/${currentLocale}/ai`,
      languages: {
        zh: `${siteUrl}/zh/ai`,
        en: `${siteUrl}/en/ai`,
      },
    },
  };
}

export default async function AgentIndexPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = asGeoLocale(locale);
  const isZh = currentLocale === "zh";
  const posts = getAllPosts(currentLocale).slice(0, 8);

  setRequestLocale(currentLocale);

  return (
    <main className="bg-white">
      <section className="border-b border-gray-200 bg-[#10233f]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-200">
            AI / Agent Access
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight tracking-normal text-white md:text-5xl">
            {isZh ? "MindsLeap AI / Agent 内容索引" : "MindsLeap AI / Agent Content Index"}
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-blue-50">
            {brandSummary[currentLocale]}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[0.75fr_1.25fr] md:py-20">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#8b6f3a]">
            Machine-readable
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-[#1e477c]">
            {isZh ? "机器可读入口" : "Machine-readable Access"}
          </h2>
        </div>
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {[
            ["llms.txt", "/llms.txt"],
            ["Sitemap XML", "/sitemap.xml"],
            ["RSS Feed", "/feed.xml"],
            ["JSON Feed", "/feed.json"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="flex items-center justify-between py-5 font-bold text-gray-900 hover:text-[#1e477c]">
              <span>{label}</span>
              <span aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#8b6f3a]">Topics</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-[#1e477c]">
              {isZh ? "权威主题" : "Authoritative Topics"}
            </h2>
          </div>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {geoTopics.map((topic) => (
              <Link key={topic.slug} href={`/topics/${topic.slug}`} className="border-t border-gray-300 pt-5 group">
                <h3 className="text-xl font-extrabold tracking-normal text-gray-950 group-hover:text-[#1e477c]">
                  {topic.title[currentLocale]}
                </h3>
                <p className="mt-3 leading-7 text-gray-600">{topic.description[currentLocale]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#8b6f3a]">People</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-[#1e477c]">
            {isZh ? "人物与硅谷网络" : "People and Silicon Valley Network"}
          </h2>
          <div className="mt-7 divide-y divide-gray-200 border-y border-gray-200">
            {geoPeople.map((person) => (
              <Link key={person.slug} href={`/people/${person.slug}`} className="block py-5 group">
                <h3 className="text-lg font-extrabold text-gray-950 group-hover:text-[#1e477c]">{person.name}</h3>
                <p className="mt-2 leading-7 text-gray-600">{person.description[currentLocale]}</p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#8b6f3a]">AI Insights</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-[#1e477c]">
            {isZh ? "最新内容" : "Latest Content"}
          </h2>
          <div className="mt-7 divide-y divide-gray-200 border-y border-gray-200">
            {posts.map((post) => (
              <Link key={post.slug} href={`/news/${post.slug}`} className="block py-5 group">
                <p className="text-xs font-bold text-gray-500">{post.date}</p>
                <h3 className="mt-2 text-lg font-extrabold leading-snug text-gray-950 group-hover:text-[#1e477c]">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
