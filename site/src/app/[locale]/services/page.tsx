import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ServicesHero from "@/components/services/ServicesHero";

type Props = {
  params: Promise<{ locale: string }>;
};

const content = {
  zh: {
    title: "我们的服务",
    subtitle: "连接中国企业与全球AI前沿，加速数字化转型",
    services: [
      {
        title: "企业家AI俱乐部",
        description:
          "企业家AI转型实战社群，30-50人精品闭门会，私享会、Workshop、企业参访，极致坦诚、共创共赢。",
        href: "/services/ai-club",
        icon: "🤝",
      },
      {
        title: "独角兽孵化",
        description:
          "联合Founders Space全球网络，为AI创业者提供场景对接、投资对接、硅谷资源导入等全方位孵化服务。",
        href: "/services/incubation",
        icon: "🦄",
      },
      {
        title: "高管AI培训",
        description:
          "硅谷大咖+国内专家联合授课，涵盖AI战略咨询、转型陪跑、变革管理，服务发那科、联想等知名企业。",
        href: "/services/training",
        icon: "🎓",
      },
      {
        title: "全球研学之旅",
        description:
          "以Founders Space全球合伙人身份，定制GTC大会、斯坦福AI Lab、谷歌等高端硅谷研学行程。",
        href: "/services/study-tours",
        icon: "🌍",
      },
    ],
  },
  en: {
    title: "Our Services",
    subtitle:
      "Bridging Chinese enterprises with global AI innovation to accelerate digital transformation",
    services: [
      {
        title: "Founders AI Club",
        description:
          "An exclusive AI transformation community for entrepreneurs. Intimate 30-50 person closed-door sessions featuring workshops, site visits, and candid knowledge sharing.",
        href: "/services/ai-club",
        icon: "🤝",
      },
      {
        title: "Unicorn Incubation",
        description:
          "Leveraging the global Founders Space network to provide AI startups with scenario matching, investment connections, and Silicon Valley resource integration.",
        href: "/services/incubation",
        icon: "🦄",
      },
      {
        title: "Executive AI Training",
        description:
          "Joint programs with Silicon Valley leaders and Chinese experts covering AI strategy consulting, transformation coaching, and change management for enterprises like FANUC and Lenovo.",
        href: "/services/training",
        icon: "🎓",
      },
      {
        title: "Global Study Tours",
        description:
          "Premium Silicon Valley study tours as Founders Space Global Partners, featuring GTC Conference, Stanford AI Lab, Google, and HPE visits.",
        href: "/services/study-tours",
        icon: "🌍",
      },
    ],
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] || content.zh;
  return {
    title: c.title,
    description: c.subtitle,
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = content[locale as keyof typeof content] || content.zh;

  return (
    <>
      <ServicesHero />

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {c.services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="text-primary font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {locale === "zh" ? "了解更多" : "Learn more"}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {locale === "zh"
              ? "准备好开启AI转型之旅？"
              : "Ready to Start Your AI Transformation?"}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {locale === "zh"
              ? "联系我们，了解最适合您的AI转型方案"
              : "Contact us to discover the AI transformation solution that fits your needs"}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {locale === "zh" ? "联系我们" : "Contact Us"}
          </Link>
        </div>
      </section>
    </>
  );
}
