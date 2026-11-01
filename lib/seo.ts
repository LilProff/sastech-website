import type { Metadata } from "next";
import { site, liveSocials, whatsappHref, isFill } from "./site";
import type { Faq } from "./content";

type PageMetaInput = {
  title: string; // aim for <= 60 chars including the brand suffix
  description: string; // aim for <= 155 chars
  path: string; // "/services"
  absoluteTitle?: boolean;
};

export function pageMetadata({ title, description, path, absoluteTitle }: PageMetaInput): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    // Add the " | Sastech Consults" suffix only when the result stays within ~60 chars.
    title: absoluteTitle || title.length > 42 ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const orgId = `${site.url}/#organization`;

export function organizationGraph() {
  const sameAs = liveSocials.map((s) => s.href);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: site.name,
        ...(isFill(site.legal.name) ? {} : { legalName: site.legal.name }),
        url: site.url,
        logo: `${site.url}/brand/sastech-mark.svg`,
        image: `${site.url}/opengraph-image`,
        description: site.description,
        email: site.email,
        areaServed: [
          { "@type": "City", name: "Lagos" },
          { "@type": "Country", name: "Nigeria" },
        ],
        founder: { "@type": "Person", name: site.founder.fullName },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: site.email,
            url: whatsappHref,
            areaServed: "NG",
            availableLanguage: ["en"],
          },
        ],
        knowsAbout: [
          "Website design",
          "Search engine optimisation",
          "WhatsApp automation",
          "CRM systems",
          "AI agents",
          "Business process automation",
        ],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": orgId },
        inLanguage: "en-NG",
      },
    ],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function faqSchema(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(input: { name: string; description: string; path: string; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: new URL(input.path, site.url).toString(),
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "Nigeria" },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.founder.fullName,
    alternateName: site.founder.name,
    jobTitle: "AI Systems Architect",
    image: new URL(site.founder.image, site.url).toString(),
    worksFor: { "@id": orgId },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Dominion University" },
    address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
    sameAs: site.founder.sameAs,
  };
}
