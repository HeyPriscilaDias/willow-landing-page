"use client";

import { useState } from "react";
import { List, X } from "phosphor-react";
import { cn } from "@/lib/utils";
import { useProposalModal } from "@/lib/proposal-modal-context";
import { WillowLogo } from "./willow-logo";
import { Button } from "./button";

const navLinks = [
  { name: "The challenge", href: "/the-challenge" },
  { name: "Willow vs Others", href: "/willow-vs-others" },
  { name: "About us", href: "/about" },
  { name: "Curriculum", href: "/curriculum" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useProposalModal();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <div className="flex items-center h-16 relative">
          {/* Logo */}
          <div className="flex items-center">
            <WillowLogo className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation - Right aligned */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[14px] text-primary hover:text-heading transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://app.willowed.org/public/login"
              className="text-secondary text-[14px] font-normal hover:text-heading transition-colors"
            >
              Login
            </a>
            <Button onClick={openModal}>
              Request a proposal
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary hover:text-heading p-2"
            >
              {mobileMenuOpen ? (
                <X size={24} weight="regular" />
              ) : (
                <List size={24} weight="regular" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14px] text-primary hover:text-heading transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://app.willowed.org/public/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-secondary text-[14px] font-normal hover:text-heading transition-colors"
            >
              Login
            </a>
            <Button
              onClick={() => {
                openModal();
                setMobileMenuOpen(false);
              }}
              className="w-full"
            >
              Request a proposal
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
