import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Container, JsonLd } from "@/components/ui";
import { site } from "@/lib/site";
import { breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Website Terms of Use",
  description: "The terms that apply when you use the Sastech Consults website at www.sastech.com.ng.",
  path: "/terms",
});

// DRAFT for owner and lawyer review. Not legal advice.
export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Terms", path: "/terms" }])} />
      <PageIntro
        crumbs={[{ name: "Terms", path: "/terms" }]}
        title="Website Terms of Use"
        intro={
          <p>
            Last updated: 1 November 2026
          </p>
        }
      />
      <Container>
        <article className="prose-legal max-w-3xl py-12">
          <p>
            These terms apply to your use of www.sastech.com.ng, run by {site.legal.name}, based in {site.legal.address}. By using the website you agree to them.
          </p>

          <h2>1. Information on this website</h2>
          <p>
            We write the content on this website to explain our services in general terms. It is not professional,
            legal or financial advice for your situation. We aim to keep it accurate, but services, examples and
            features may change.
          </p>

          <h2>2. Our services</h2>
          <p>
            Nothing on this website is an offer that becomes a contract when accepted. Any work we do for you is governed
            by a written agreement and statement of work signed by both sides. If those documents conflict with these
            terms, the signed documents win.
          </p>

          <h2>3. Intellectual property</h2>
          <p>
            The Sastech name, logo, text, graphics and code on this website belong to us or our licensors. You may view
            and share pages for your own non-commercial use, but you may not copy, sell or reuse our content or brand
            without written permission.
          </p>

          <h2>4. Acceptable use</h2>
          <ul>
            <li>Do not try to break, overload or gain unauthorised access to the website.</li>
            <li>Do not use our forms to send spam, malicious content or other people&apos;s personal data without permission.</li>
            <li>Do not use automated tools to scrape the website in a way that harms it.</li>
          </ul>

          <h2>5. Links to other websites</h2>
          <p>
            We link to services such as Calendly and WhatsApp. We are not responsible for their content or how they
            handle your data. Please read their terms and privacy policies.
          </p>

          <h2>6. Liability</h2>
          <p>
            We provide this website &ldquo;as is&rdquo;. To the extent the law allows, we are not liable for any loss
            arising from your use of the website or reliance on its content. Nothing in these terms limits liability
            that cannot be limited by law.
          </p>

          <h2>7. Privacy</h2>
          <p>
            Our <a href="/privacy">Privacy Policy</a> explains how we handle personal data you share through this
            website.
          </p>

          <h2>8. Governing law</h2>
          <p>
            These terms are governed by the laws of the Federal Republic of Nigeria, and the courts of Lagos State have
            jurisdiction.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </article>
      </Container>
    </>
  );
}
