"use client";

import {
  LinkedinLogo,
  TwitterLogo,
  InstagramLogo,
  FacebookLogo,
} from "phosphor-react";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Case studies", href: "#case-studies" },
  ],
  company: [
    { name: "About us", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ],
  resources: [
    { name: "Help center", href: "#help" },
    { name: "Research", href: "#research" },
    { name: "Community", href: "#community" },
    { name: "Events", href: "#events" },
  ],
  legal: [
    { name: "Privacy policy", href: "#privacy" },
    { name: "Terms of service", href: "#terms" },
    { name: "Cookie policy", href: "#cookies" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", icon: LinkedinLogo, href: "#" },
  { name: "Twitter", icon: TwitterLogo, href: "#" },
  { name: "Instagram", icon: InstagramLogo, href: "#" },
  { name: "Facebook", icon: FacebookLogo, href: "#" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <div className="w-32 h-8 bg-gray-300 rounded mb-4" />
            <p className="text-gray-400 text-sm">
              Transforming career readiness through innovative curriculum and
              technology.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-heading font-medium text-white mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-medium text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-heading font-medium text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-heading font-medium text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Willow Education. All rights reserved.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <Icon size={24} weight="regular" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
