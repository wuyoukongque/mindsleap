import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import StudyToursHero from "@/components/services/StudyToursHero";

type Props = {
  params: Promise<{ locale: string }>;
};

const content = {
  zh: {
    title: "全球研学之旅",
    subtitle: "Founders Space全球合伙人专属行程",
    heroDescription:
      "以Founders Space全球合伙人身份，为企业家定制高端硅谷AI研学之旅，实现认知升级与资源对接。",
    aboutTitle: "研学之旅概览",
    aboutDescription:
      "MindsLeap全球研学之旅依托Founders Space全球合伙人身份，为中国企业家打造沉浸式硅谷AI体验。我们不做走马观花的旅游团，而是深入硅谷AI创新腹地，与顶级科技公司、顶尖学府和投资机构进行深度对话，帮助企业家实现认知升级、资源对接和投资合作。",
    itineraryTitle: "核心行程",
    itinerary: [
      {
        title: "GTC大会",
        description:
          "NVIDIA GTC全球技术大会，全球最具影响力的AI技术盛会，近距离感受AI前沿突破。",
      },
      {
        title: "斯坦福/伯克利AI Lab",
        description:
          "深入世界顶级AI实验室，与前沿研究者面对面交流，了解即将改变世界的技术趋势。",
      },
      {
        title: "谷歌总部参访",
        description:
          "走进全球AI领导者的创新圣地，了解Google AI的最新产品、研究方向和企业文化。",
      },
      {
        title: "HPE企业参访",
        description:
          "深入了解企业级AI基础设施领导者的技术布局与解决方案。",
      },
    ],
    valueTitle: "研学价值",
    values: [
      {
        title: "认知升级",
        description:
          "亲临AI创新现场，打破信息不对称，建立对AI技术与产业趋势的第一手认知。",
      },
      {
        title: "资源对接",
        description:
          "Founders Space全球合伙人身份加持，获得与硅谷顶级企业和机构的直接对话机会。",
      },
      {
        title: "投资合作",
        description:
          "对接硅谷前沿AI项目与投资机会，发现潜在合作伙伴和投资标的。",
      },
      {
        title: "高端定制",
        description:
          "根据企业需求量身定制行程，确保每一站都与您的业务战略高度相关。",
      },
    ],
    featuresTitle: "行程特色",
    features: [
      "Founders Space全球合伙人身份背书",
      "高端小团定制（8-15人）",
      "全程中英双语陪同",
      "顶级企业高管面对面交流",
      "AI前沿技术深度体验",
      "行程后资源持续对接",
    ],
    pricingNote: "高端定制行程，详情请咨询",
    ctaTitle: "预约您的硅谷研学之旅",
    ctaDescription: "开启一段改变认知、链接全球的AI探索旅程。",
    ctaButton: "立即咨询",
    backLink: "返回所有服务",
  },
  en: {
    title: "Global Study Tours",
    subtitle: "Exclusive Itineraries as Founders Space Global Partners",
    heroDescription:
      "Premium Silicon Valley AI study tours for entrepreneurs, leveraging our Founders Space Global Partner status for unparalleled access and connections.",
    aboutTitle: "Study Tours Overview",
    aboutDescription:
      "MindsLeap Global Study Tours leverage our Founders Space Global Partner status to create immersive Silicon Valley AI experiences for Chinese entrepreneurs. We go beyond surface-level tourism to provide deep engagement with top tech companies, leading universities, and investment institutions, helping entrepreneurs achieve cognitive upgrades, resource connections, and investment collaboration.",
    itineraryTitle: "Core Itinerary",
    itinerary: [
      {
        title: "GTC Conference",
        description:
          "NVIDIA GTC, the world's most influential AI technology conference. Experience cutting-edge AI breakthroughs firsthand.",
      },
      {
        title: "Stanford/Berkeley AI Labs",
        description:
          "Deep dive into world-class AI laboratories, engaging face-to-face with frontier researchers on world-changing technology trends.",
      },
      {
        title: "Google Headquarters Visit",
        description:
          "Step inside the innovation hub of the global AI leader, exploring Google AI's latest products, research directions, and culture.",
      },
      {
        title: "HPE Enterprise Visit",
        description:
          "Gain in-depth understanding of enterprise AI infrastructure leadership, technology positioning, and solutions.",
      },
    ],
    valueTitle: "Tour Value Proposition",
    values: [
      {
        title: "Cognitive Upgrade",
        description:
          "Experience AI innovation firsthand, break information asymmetry, and build first-hand understanding of AI technology and industry trends.",
      },
      {
        title: "Resource Connections",
        description:
          "Backed by Founders Space Global Partner status, gain direct dialogue opportunities with top Silicon Valley companies and institutions.",
      },
      {
        title: "Investment Collaboration",
        description:
          "Connect with cutting-edge Silicon Valley AI projects and investment opportunities, discover potential partners and targets.",
      },
      {
        title: "Premium Customization",
        description:
          "Tailor-made itineraries based on enterprise needs, ensuring every stop is highly relevant to your business strategy.",
      },
    ],
    featuresTitle: "Tour Highlights",
    features: [
      "Founders Space Global Partner endorsement",
      "Premium small groups (8-15 people)",
      "Bilingual Chinese-English accompaniment throughout",
      "Face-to-face exchanges with top enterprise executives",
      "Deep hands-on AI frontier technology experience",
      "Post-tour continuous resource connections",
    ],
    pricingNote: "Premium customized tours, contact us for details",
    ctaTitle: "Book Your Silicon Valley Study Tour",
    ctaDescription:
      "Embark on a journey that transforms perspectives and connects you globally.",
    ctaButton: "Inquire Now",
    backLink: "Back to All Services",
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] || content.zh;
  return {
    title: c.title,
    description: c.heroDescription,
  };
}

export default async function StudyToursPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = content[locale as keyof typeof content] || content.zh;

  return (
    <>
      {/* Hero Section */}
      <StudyToursHero />

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {c.aboutTitle}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {c.aboutDescription}
          </p>
        </div>
      </section>

      {/* Core Itinerary */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {c.itineraryTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {c.itinerary.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {c.valueTitle}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {c.values.map((value) => (
              <div
                key={value.title}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <h3 className="text-lg font-bold text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {c.featuresTitle}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {c.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-primary mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 italic">{c.pricingNote}</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {c.ctaTitle}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {c.ctaDescription}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {c.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
