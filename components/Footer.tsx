import Link from "next/link";
import { Logo } from "./Logo";
import { Container, HexDivider, SocialLinks } from "./ui";
import { footerExtra, nav, site, whatsappHref } from "@/lib/site";
import { pillars } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-line bg-navy-950">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-ink-2">{site.description}</p>
            <a href={`mailto:${site.email}`} className="mt-5 inline-block font-display font-semibold text-cyan link-underline">
              {site.email}
            </a>
            <SocialLinks className="mt-6" />
          </div>

          <FooterCol title="Services">
            {pillars.map((p) => (
              <FooterLink key={p.slug} href={`/services/${p.slug}`}>
                {p.short}
              </FooterLink>
            ))}
            <FooterLink href="/services">All services</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            {nav
              .filter((n) => n.href !== "/services")
              .map((n) => (
                <FooterLink key={n.href} href={n.href}>
                  {n.label}
                </FooterLink>
              ))}
            {footerExtra.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Talk to us">
            <li>
              <a href={site.booking.url} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">
                {site.booking.label}
              </a>
            </li>
            <li>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">
                WhatsApp
              </a>
            </li>
          </FooterCol>
        </div>

        <HexDivider className="my-10" />

        <div className="flex flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legal.name}. {site.legal.address}.
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/privacy" className="hover:text-ink">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ink">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-sm font-semibold text-ink">{title}</h2>
      <ul className="mt-4 grid gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-ink-2 transition-colors hover:text-ink">
        {children}
      </Link>
    </li>
  );
}
