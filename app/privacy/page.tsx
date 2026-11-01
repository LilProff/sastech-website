import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Container, JsonLd } from "@/components/ui";
import { site } from "@/lib/site";
import { breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Sastech Consults collects, uses and protects personal data from our website, in line with the Nigeria Data Protection Act 2023.",
  path: "/privacy",
});

// DRAFT for owner and lawyer review (KB section 10, brief section 7). Not legal advice.
export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Privacy Policy", path: "/privacy" }])} />
      <PageIntro
        crumbs={[{ name: "Privacy Policy", path: "/privacy" }]}
        title="Privacy Policy"
        intro={
          <p>
            Last updated: 1 November 2026
          </p>
        }
      />
      <Container>
        <article className="prose-legal max-w-3xl py-12">
          <p>
            This policy explains how {site.legal.name} (&ldquo;we&rdquo;) handles
            personal data collected through www.sastech.com.ng. We are the data controller for this data. We follow the
            Nigeria Data Protection Act 2023 (NDPA) and guidance from the Nigeria Data Protection Commission (NDPC).
          </p>

          <h2>1. What we collect</h2>
          <ul>
            <li>
              <strong>Contact form:</strong> your name, email, and optionally your business name and phone or WhatsApp
              number, plus the message you write.
            </li>
            <li>
              <strong>Bookings:</strong> if you book a call, Calendly collects your name, email and any answers you give
              on the booking form.
            </li>
            <li>
              <strong>WhatsApp and email:</strong> anything you send us through these channels.
            </li>
            <li>
              <strong>Website analytics:</strong> we use Vercel Web Analytics, which counts page views without cookies
              and without identifying you personally.
            </li>
          </ul>

          <h2>2. Why we use it, and our lawful basis</h2>
          <ul>
            <li>To reply to your enquiry and arrange calls (your consent, and steps you ask us to take before a contract).</li>
            <li>To deliver services if you become a client (performance of a contract).</li>
            <li>To understand how the website is used and improve it (legitimate interest, using anonymous data).</li>
            <li>To meet legal, tax and accounting duties (legal obligation).</li>
          </ul>
          <p>We do not sell your data, and we do not use it for automated decisions that affect you.</p>

          <h2>3. Who we share it with</h2>
          <p>
            We use trusted service providers who process data on our behalf: Vercel (website hosting and analytics),
            Resend (sending contact-form emails), Zoho (business email), Calendly (booking) and Meta (WhatsApp). Some of
            these providers store data outside Nigeria. Where that happens, we rely on the transfer safeguards allowed
            under the NDPA.
          </p>

          <h2>4. How long we keep it</h2>
          <p>
            Enquiries that do not become projects are kept only as long as we need them to reply and follow up, then deleted. Client records are kept for as long as the law requires for tax and accounting.
          </p>

          <h2>5. Your rights</h2>
          <p>Under the NDPA you can ask us to:</p>
          <ul>
            <li>give you a copy of the personal data we hold about you;</li>
            <li>correct data that is wrong or incomplete;</li>
            <li>delete your data, or restrict how we use it;</li>
            <li>move your data to another provider in a usable format;</li>
            <li>stop using your data for a purpose you object to, or withdraw consent at any time.</li>
          </ul>
          <p>
            Email <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>. We will reply within the time the law
            allows. If you are unhappy with our answer, you can complain to the Nigeria Data Protection Commission.
          </p>

          <h2>6. Cookies</h2>
          <p>
            Our website does not set advertising or tracking cookies. Our analytics are cookieless. The booking calendar
            on our contact page only loads from Calendly if you choose to open it, and Calendly may then set its own
            cookies under its own policy.
          </p>

          <h2>7. Security</h2>
          <p>
            We use encrypted connections (HTTPS), access controls and two-factor authentication on the accounts that hold
            your data. No system is perfectly secure, so if a breach affecting your data occurs, we will notify you and
            the NDPC where the law requires.
          </p>

          <h2>8. Client data in systems we build</h2>
          <p>
            When we build or run systems for clients, the client is usually the controller of their customers&apos; data
            and we act as their processor under a written data processing agreement. This policy covers our own website
            only.
          </p>

          <h2>9. Changes</h2>
          <p>We may update this policy. The date at the top shows the latest version.</p>

          <h2>10. Contact</h2>
          <p>
            {site.legal.name}, {site.legal.address}. Privacy:{" "}
            <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>.
          </p>
        </article>
      </Container>
    </>
  );
}
