import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import TrainingHero from "@/components/services/TrainingHero";

type Props = {
  params: Promise<{ locale: string }>;
};

const content = {
  zh: {
    title: "高管AI培训",
    subtitle: "硅谷大咖 x 国内专家 联合赋能",
    heroDescription:
      "从AI认知到战略落地，为企业高管提供全方位的AI转型培训与咨询服务。",
    aboutTitle: "培训服务概览",
    aboutDescription:
      "MindsLeap高管AI培训项目汇聚硅谷顶级AI专家与国内行业领袖，为企业高管打造沉浸式AI学习体验。我们不做泛泛而谈的理论培训，而是聚焦于企业实际业务场景的AI战略制定与落地执行，确保每一位学员都能带着可执行的AI转型方案离开。",
    servicesTitle: "服务模块",
    services: [
      {
        title: "AI培训课程",
        description:
          "硅谷大咖与国内专家联合授课，涵盖AI前沿技术、应用场景、商业模式等核心主题。",
      },
      {
        title: "Hoffman AI战略咨询",
        description:
          "由Founders Space创始人Steve Hoffman领衔的AI战略咨询服务，为企业量身定制AI转型路线图。",
      },
      {
        title: "转型陪跑",
        description:
          "不止于培训，持续陪伴企业完成AI转型落地，提供从规划到执行的全程指导与支持。",
      },
      {
        title: "变革管理",
        description:
          "帮助企业应对AI转型过程中的组织变革挑战，包括文化重塑、团队赋能、流程再造。",
      },
    ],
    casesTitle: "服务客户",
    cases: [
      { name: "发那科 (FANUC)", industry: "智能制造" },
      { name: "联想 (Lenovo)", industry: "科技企业" },
      { name: "恒安集团", industry: "消费品" },
      { name: "阿里巴巴", industry: "互联网科技" },
    ],
    featuresTitle: "培训特色",
    features: [
      "硅谷一线AI专家实战分享",
      "定制化企业AI战略方案",
      "小班制深度互动教学",
      "实际业务场景AI应用演练",
      "培训后持续跟踪与辅导",
      "全球AI前沿案例库",
    ],
    ctaTitle: "定制您的AI培训方案",
    ctaDescription: "让我们为您量身打造最适合的AI转型培训计划。",
    ctaButton: "咨询详情",
    backLink: "返回所有服务",
  },
  en: {
    title: "Executive AI Training",
    subtitle: "Silicon Valley Leaders x Chinese Experts",
    heroDescription:
      "From AI awareness to strategic implementation, providing comprehensive AI transformation training and consulting for executives.",
    aboutTitle: "Training Overview",
    aboutDescription:
      "The MindsLeap Executive AI Training program brings together top Silicon Valley AI experts and Chinese industry leaders to create an immersive AI learning experience for executives. We go beyond generic theory, focusing on AI strategy development and implementation for real business scenarios, ensuring every participant leaves with an actionable AI transformation plan.",
    servicesTitle: "Service Modules",
    services: [
      {
        title: "AI Training Programs",
        description:
          "Joint courses led by Silicon Valley leaders and domestic experts, covering cutting-edge AI technology, application scenarios, and business models.",
      },
      {
        title: "Hoffman AI Strategy Consulting",
        description:
          "AI strategy consulting led by Founders Space founder Steve Hoffman, creating customized AI transformation roadmaps for enterprises.",
      },
      {
        title: "Transformation Coaching",
        description:
          "Beyond training, continuous support through the entire AI transformation journey, providing guidance from planning to execution.",
      },
      {
        title: "Change Management",
        description:
          "Helping enterprises navigate organizational change challenges during AI transformation, including culture reshaping, team empowerment, and process reengineering.",
      },
    ],
    casesTitle: "Client Portfolio",
    cases: [
      { name: "FANUC", industry: "Smart Manufacturing" },
      { name: "Lenovo", industry: "Technology" },
      { name: "Hengan Group", industry: "Consumer Goods" },
      { name: "Alibaba", industry: "Internet Technology" },
    ],
    featuresTitle: "Training Highlights",
    features: [
      "Hands-on sharing from frontline Silicon Valley AI experts",
      "Customized enterprise AI strategy plans",
      "Small-class deep interactive teaching",
      "Real business scenario AI application drills",
      "Post-training continuous tracking and coaching",
      "Global AI frontier case library",
    ],
    ctaTitle: "Customize Your AI Training Plan",
    ctaDescription:
      "Let us create the AI transformation training program that best fits your needs.",
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

export default async function TrainingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = content[locale as keyof typeof content] || content.zh;

  return (
    <>
      {/* Hero Section */}
      <TrainingHero />

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

      {/* Service Modules */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {c.servicesTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {c.services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Portfolio */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {c.casesTitle}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {c.cases.map((client) => (
              <div
                key={client.name}
                className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {client.name}
                </h3>
                <p className="text-sm text-gray-500">{client.industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {c.featuresTitle}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
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
