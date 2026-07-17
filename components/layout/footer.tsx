import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/primitives/container";
import { site } from "@/lib/site";
import { footer } from "@/lib/content";

type FooterProps = {
  facebook?: string;
  instagram?: string;
  openingHours?: string;
};

export function Footer({ facebook, instagram, openingHours }: FooterProps) {
  const year = 2026;
  const fbUrl = facebook || site.social.facebook;
  const igUrl = instagram || site.social.instagram;
  const hours = openingHours || site.hours.display;

  return (
    <footer
      id="contact"
      className="scroll-mt-24 bg-navy text-cream/70"
    >
      <Container className="relative z-[2] py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <span className="inline-flex rounded-2xl bg-paper px-4 py-3 shadow-soft">
              <Logo className="h-12 w-auto" />
            </span>
            <p className="mt-6 text-[0.97rem] leading-relaxed text-cream/65">
              A community-owned, not-for-profit early learning centre in St
              Lucia, Brisbane — where every child belongs.
            </p>
            {(fbUrl || igUrl) && (
              <div className="mt-7 flex items-center gap-3">
                {fbUrl && (
                  <a
                    href={fbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="The Munro Centre on Facebook"
                    className="inline-flex size-11 items-center justify-center rounded-pill border border-cream/15 text-cream/70 transition-colors hover:border-cream/35 hover:text-cream"
                  >
                    <FacebookIcon />
                  </a>
                )}
                {igUrl && (
                  <a
                    href={igUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="The Munro Centre on Instagram"
                    className="inline-flex size-11 items-center justify-center rounded-pill border border-cream/15 text-cream/70 transition-colors hover:border-cream/35 hover:text-cream"
                  >
                    <InstagramIcon />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow text-sage">{col.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="link-underline text-[0.97rem] text-cream/70 hover:text-cream"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="eyebrow text-sage">Visit us</h3>
            <ul className="mt-5 flex flex-col gap-4 text-[0.97rem] text-cream/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-sage" strokeWidth={1.6} />
                <a href={site.address.mapUrl} className="hover:text-cream">
                  {site.address.full}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-sage" strokeWidth={1.6} />
                <a href={site.contact.phoneHref} className="hover:text-cream">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-sage" strokeWidth={1.6} />
                <a href={site.contact.emailHref} className="hover:text-cream">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-sage" strokeWidth={1.6} />
                <span>{hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Acknowledgement of Country */}
        <div className="mt-16 rounded-[var(--radius)] border border-cream/10 bg-cream/[0.03] p-6 sm:p-8">
          <p className="max-w-3xl text-sm leading-relaxed text-cream/55">
            {site.acknowledgement}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-cream/10 pt-8 text-sm text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Community-owned &amp; not-for-profit.
          </p>
          <div className="flex items-center gap-6">
            <a href={site.contact.phoneHref} className="hover:text-cream/80">
              {site.contact.phone}
            </a>
            <a
              href={site.owna.waitlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cream/80 hover:text-cream"
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* Brand glyphs (lucide removed trademarked brand icons). */
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-5">
      <path d="M14 8.5h2.2V5.6c-.38-.05-1.3-.16-2.4-.16-2.37 0-4 1.45-4 4.11V12H7.3v3.2h2.5V23h3.2v-7.8h2.5l.46-3.2H13V9.9c0-.93.25-1.4 1-1.4Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-5">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}
