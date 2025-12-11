"use client";

import { useState } from "react";
import { List, X } from "phosphor-react";
import { cn } from "@/lib/utils";
import { useProposalModal } from "@/lib/proposal-modal-context";
import { WillowLogo } from "./willow-logo";

const navLinks = [
  { name: "The Challenge", href: "/the-challenge" },
  { name: "About Us", href: "/about" },
  { name: "Curriculum", href: "/curriculum" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useProposalModal();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <WillowLogo className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={openModal}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
            >
              Request a Proposal
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
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
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                openModal();
                setMobileMenuOpen(false);
              }}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold w-full"
            >
              Request a Proposal
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
