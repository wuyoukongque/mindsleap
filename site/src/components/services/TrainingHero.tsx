"use client";

import { useTranslations } from "next-intl";
import PageHero from "@/components/shared/PageHero";

export default function TrainingHero() {
  const h = useTranslations("trainingHero");

  const slides = [
    {
      title: h("slide1Title"),
      heading: h("slide1Heading"),
      subtitle: h("slide1Subtitle"),
      image: "/images/hero/slide-3.jpg",
    },
    {
      title: h("slide2Title"),
      heading: h("slide2Heading"),
      subtitle: h("slide2Subtitle"),
      image: "/images/hero/slide-2.jpg",
    },
  ];

  return <PageHero slides={slides} />;
}
