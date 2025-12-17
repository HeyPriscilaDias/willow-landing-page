import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ProposalModalProvider } from "@/lib/proposal-modal-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Willow Education | Career Exploration Curriculum Platform",
  description:
    "A career exploration curriculum and platform designed to significantly increase economic mobility for students. Partner with Willow Education to transform career readiness in your school.",
  keywords: [
    "career exploration",
    "curriculum platform",
    "economic mobility",
    "education technology",
    "student career readiness",
    "K-12 education",
  ],
  authors: [{ name: "Willow Education" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://willoweducation.com",
    title: "Willow Education | Career Exploration Curriculum Platform",
    description:
      "A career exploration curriculum and platform designed to significantly increase economic mobility for students.",
    siteName: "Willow Education",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Willow Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Willow Education | Career Exploration Curriculum Platform",
    description:
      "A career exploration curriculum and platform designed to significantly increase economic mobility for students.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <ProposalModalProvider>{children}</ProposalModalProvider>
      </body>
    </html>
  );
}
