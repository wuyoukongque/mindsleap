import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

const sections = [
  {
    key: "why-now",
    eyebrow: "01 / Why Now",
    titleZh: "为什么 FDE 会成为企业 AI 的关键交付形态？",
    titleEn: "Why FDE is becoming the key delivery model for enterprise AI",
    bodyZh:
      "企业 AI 的瓶颈已经从“能不能演示”转向“能不能进入真实流程”。FDE 把产品、工程、业务流程、数据治理和客户成功合并成一个现场小队，目标不是写方案，而是把系统推到生产环境。",
    bodyEn:
      "The bottleneck for enterprise AI has shifted from demos to production adoption. FDE combines product, engineering, workflow redesign, data governance, and customer success into an on-site delivery motion.",
    pointsZh: ["从 PoC 到生产系统", "贴近业务流程与数据现场", "用交付反哺产品化资产"],
    pointsEn: ["From PoC to production", "Close to workflow and data reality", "Turn delivery learning into reusable assets"],
  },
  {
    key: "models",
    eyebrow: "02 / Business Models",
    titleZh: "海外商业化主要有四种模式",
    titleEn: "Four commercialization patterns overseas",
    bodyZh:
      "FDE 并不是单一岗位，而是一套商业化机制。平台公司用 FDE 放大软件收入；独立工程公司直接出售生产交付；咨询与 SI 把 FDE 变成 AI 转型项目；混合型公司则把服务沉淀成行业组件。",
    bodyEn:
      "FDE is not just a role; it is a commercialization mechanism. Platforms use it to expand software revenue, engineering firms sell production delivery, consultancies package it into transformation programs, and hybrid firms convert field learning into reusable components.",
    pointsZh: ["平台内生 FDE", "独立 FDE 工程公司", "咨询 / SI 升级", "产品 + 服务飞轮"],
    pointsEn: ["Platform-native FDE", "Independent FDE firms", "Consulting and SI upgrade", "Product-service flywheel"],
  },
  {
    key: "pricing",
    eyebrow: "03 / Pricing",
    titleZh: "收费从诊断、项目、嵌入到年度运维递进",
    titleEn: "Pricing moves from diagnosis to projects, embedding, and retainers",
    bodyZh:
      "更成熟的 FDE 商业模式通常不会只卖人天，而是按业务阶段定价：2 周诊断、8-12 周生产项目、6-12 个月嵌入合作，以及年度运维 Retainer。",
    bodyEn:
      "Mature FDE models usually avoid pure staff augmentation. Pricing follows the customer journey: diagnostic sprints, production projects, embedded teams, and annual operating retainers.",
    pointsZh: ["3-10 万：2 周 AI 落地诊断", "30-150 万：8-12 周生产项目", "10-50 万/月：嵌入合作", "3-20 万/月：运维 Retainer"],
    pointsEn: ["Diagnostic sprint", "8-12 week production project", "Embedded team engagement", "Operating retainer"],
  },
  {
    key: "hiring",
    eyebrow: "04 / Hiring",
    titleZh: "招聘画像是工程、产品和客户现场能力的组合",
    titleEn: "Hiring blends engineering, product, and customer-facing skills",
    bodyZh:
      "FDE 人才通常需要强工程能力，同时能理解客户流程、快速定义范围、在不完整信息下推进上线。理想人选既能写生产代码，也能和业务负责人对齐 ROI。",
    bodyEn:
      "FDE talent needs strong engineering ability plus workflow understanding, scope definition, and customer-facing execution under uncertainty. The ideal profile can ship code and align ROI with business stakeholders.",
    pointsZh: ["全栈 / 数据 / AI 工程能力", "业务访谈与需求澄清", "系统集成与权限治理", "项目推进与客户沟通"],
    pointsEn: ["Full-stack, data, and AI engineering", "Business discovery", "System integration and governance", "Delivery and stakeholder communication"],
  },
  {
    key: "china",
    eyebrow: "05 / China Opportunity",
    titleZh: "中国市场的机会在于把交付产品化",
    titleEn: "The China opportunity is productizing delivery",
    bodyZh:
      "中国企业 AI 落地会需要大量“现场型 AI 工程小队”。真正有价值的公司不会停留在外包交付，而是把行业流程、评估方法、合规模板和组件库沉淀成可复制产品。",
    bodyEn:
      "Chinese enterprises will need many field AI engineering teams. The valuable companies will not stop at outsourcing; they will productize industry workflows, evaluation methods, compliance templates, and reusable components.",
    pointsZh: ["行业 SOP 与模板库", "Agent / RAG / Workflow 组件", "评估与治理方法", "从项目收入走向平台收入"],
    pointsEn: ["Industry SOPs and templates", "Agent, RAG, and workflow components", "Evaluation and governance methods", "Move from project revenue to platform revenue"],
  },
];

const metrics = [
  { label: "Time-to-production", valueZh: "生产上线周期", valueEn: "Launch speed" },
  { label: "Adoption", valueZh: "真实使用率", valueEn: "Real usage" },
  { label: "Business Impact", valueZh: "ROI 与效率提升", valueEn: "ROI and efficiency" },
  { label: "Governance", valueZh: "权限、审计、稳定性", valueEn: "Access, audit, reliability" },
];

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const title = locale === "zh" ? "FDE 产业商业模式研究" : "FDE Industry Business Model Research";
  const description =
    locale === "zh"
      ? "MindsLeap 关于 Forward Deployed Engineering 商业模式、收费、招聘与项目推进方式的研究报告。"
      : "A MindsLeap research report on Forward Deployed Engineering business models, pricing, hiring, and project delivery.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/research/fde-industry-report`,
      languages: {
        zh: `${siteUrl}/zh/research/fde-industry-report`,
        en: `${siteUrl}/en/research/fde-industry-report`,
      },
    },
  };
}

export default async function FdeIndustryReportPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === "zh";

  return (
    <article className="bg-[#f3eee5] text-gray-950">
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl gap-12 px-6 py-14 md:grid-cols-[1.15fr_.85fr] md:items-end md:py-20">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8b6f3a]">MindsLeap Research · 01</p>
          <h1 className="mt-8 text-6xl font-black leading-none tracking-normal text-[#1e477c] md:text-8xl">
            FDE.
            <span className="block pt-3 text-4xl leading-tight text-gray-950 md:text-6xl">
              {isZh ? "产业商业模式研究" : "Industry Business Model Research"}
            </span>
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-gray-700">
            {isZh
              ? "Forward Deployed Engineering 正在成为企业 AI 从演示走向生产的关键组织与商业化形态。本报告梳理海外收费、招聘、项目推进与中国市场机会。"
              : "Forward Deployed Engineering is becoming a key operating and commercialization model for moving enterprise AI from demos into production."}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {['FDE', 'Enterprise AI', 'Commercialization', '2026'].map((tag) => (
              <span key={tag} className="rounded-full border border-[#1e477c]/20 bg-white/70 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-[#1e477c]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <aside className="border-y border-[#d6cdb9] py-8 md:mb-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8b6f3a]">From Demo to Production</p>
          <div className="mt-8 space-y-5">
            {[
              isZh ? "商业模式：平台、工程公司、咨询/SI、混合飞轮" : "Models: platform, engineering firm, consulting/SI, hybrid flywheel",
              isZh ? "收费方式：诊断、项目、嵌入、年度运维" : "Pricing: diagnosis, project, embedded team, retainer",
              isZh ? "中国机会：把现场交付沉淀为可复制产品" : "China opportunity: turn field delivery into repeatable product assets",
            ].map((item, index) => (
              <div key={item} className="flex gap-5 border-t border-[#d6cdb9] pt-5 text-lg font-bold leading-7">
                <span className="font-mono text-sm text-gray-500">0{index + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8b6f3a]">Executive Summary</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-normal text-[#1e477c] md:text-5xl">
                {isZh ? "核心判断" : "Core Thesis"}
              </h2>
            </div>
            <p className="text-lg leading-8 text-gray-600">
              {isZh
                ? "FDE 的本质不是“派工程师到客户现场”，而是建立一套能把 AI 项目从机会识别、系统集成、上线运营到持续扩张完整闭环的商业化能力。"
                : "FDE is not simply sending engineers on site. It is a commercial capability that connects opportunity discovery, system integration, production launch, operations, and expansion."}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="border border-gray-200 bg-[#f9fafb] p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#8b6f3a]">{metric.label}</p>
                <p className="mt-5 text-2xl font-extrabold leading-tight text-gray-950">{isZh ? metric.valueZh : metric.valueEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.key} className="grid gap-8 border-t border-[#d6cdb9] pt-10 md:grid-cols-[.7fr_1.3fr]">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8b6f3a]">{section.eyebrow}</p>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-normal text-[#1e477c] md:text-4xl">
                  {isZh ? section.titleZh : section.titleEn}
                </h2>
              </div>
              <div>
                <p className="text-lg leading-8 text-gray-700">{isZh ? section.bodyZh : section.bodyEn}</p>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {(isZh ? section.pointsZh : section.pointsEn).map((point, index) => (
                    <div key={point} className="border border-[#d6cdb9] bg-white/70 p-5">
                      <span className="font-mono text-xs text-gray-500">{String(index + 1).padStart(2, '0')}</span>
                      <p className="mt-4 text-lg font-bold leading-7 text-gray-950">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="bg-[#1e477c] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-200">MindsLeap POV</p>
          <h2 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight tracking-normal md:text-5xl">
            {isZh ? "FDE 是企业 AI 转型服务走向产品化的桥梁。" : "FDE is the bridge from AI transformation services to productized enterprise AI."}
          </h2>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-blue-100">
            {isZh
              ? "短期看，FDE 帮企业更快上线 AI 系统；长期看，它会沉淀行业流程、评估体系、合规方法和组件库，成为 AI 原生企业服务公司的护城河。"
              : "In the short term, FDE helps enterprises launch AI systems faster. In the long term, it compounds into industry workflows, evaluation systems, governance methods, and component libraries."}
          </p>
          <div className="mt-10">
            <Link href="/research" className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-extrabold text-[#1e477c] transition hover:bg-blue-50">
              {isZh ? "返回 Research 首页" : "Back to Research"}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
