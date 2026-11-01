import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { Pillars, Problems, Proof, ProcessTimeline, Sectors, SelectedWork } from "@/components/home/Sections";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/ui";
import { homeFaq } from "@/lib/content";
import { faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sastech Consults | AI Systems and Websites, Lagos",
  absoluteTitle: true,
  description:
    "Websites that get found, operations tools and AI automation for Nigerian businesses. Earn more, save time and cut cost. Book a free 15-minute call.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaq)} />
      <Hero />
      <Problems />
      <Pillars />
      <SelectedWork />
      <Proof />
      <ProcessTimeline />
      <Sectors />
      <Faq items={homeFaq} />
      <CtaBand />
    </>
  );
}
