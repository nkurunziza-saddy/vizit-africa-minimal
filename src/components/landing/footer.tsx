import Link from "next/link";
import {
  RiTwitterXLine,
  RiInstagramLine,
  RiFacebookLine,
  RiLinkedinLine,
} from "@remixicon/react";

const footerLinks = {
  services: [
    { label: "Trips & Packages", href: "/experiences" },
    { label: "Custom Itineraries", href: "/plan-trip" },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQ", href: "/#faq" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  contact: [
    { label: "hello@vizitafrica.rw", href: "mailto:hello@vizitafrica.rw" },
    { label: "+250 788 000 000", href: "tel:+250788000000" },
    { label: "WhatsApp", href: "https://wa.me/250788000000" },
  ],
};

const socialLinks = [
  { icon: RiTwitterXLine, href: "https://twitter.com", label: "Twitter" },
  { icon: RiInstagramLine, href: "https://instagram.com", label: "Instagram" },
  { icon: RiFacebookLine, href: "https://facebook.com", label: "Facebook" },
  { icon: RiLinkedinLine, href: "https://linkedin.com", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-[oklch(20%_0_0)] text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-xl font-bold text-white">
                Vizit Africa
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Your trusted Rwanda travel partner. Professional planning for
              unforgettable African experiences.
            </p>

            {/* social icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="size-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2025 Vizit Africa. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">Made with ❤️ in Kigali</p>
        </div>
      </div>
    </footer>
  );
}
