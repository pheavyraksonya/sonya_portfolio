import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "../styles/globals.css"
import PageLoader from "@/components/PageLoader"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://ryhar.my.id"),
  title: {
    default: "Sonya | Portfolio",
    template: "%s | Sonya Portfolio",
  },
  description: "Personal portfolio of Sonya (PheavyrakSonya Sean). Software Engineering student specializing in Frontend Development with React, Next.js, and TypeScript.",
  keywords: ["Sonya", "PheavyrakSonya", "Portfolio", "Software Engineering", "Frontend Developer", "Web Development", "Next.js", "React", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Sonya" }],
  creator: "Sonya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Sonya | Portfolio",
    description: "Personal portfolio of Sonya (PheavyrakSonya Sean). Software Engineering student specializing in Frontend Development with React, Next.js, and TypeScript.",
    siteName: "Sonya Portfolio",
    images: [
      {
        url: "/images/about.jpg",
        width: 1200,
        height: 630,
        alt: "Sonya Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonya | Portfolio",
    description: "Personal portfolio of Sonya (PheavyrakSonya Sean). Software Engineering student specializing in Frontend Development with React, Next.js, and TypeScript.",
    images: ["/images/about.jpg"],
    creator: "@Sonya",
  },
  icons: {
    icon: [
      { url: "/images/dark_logo.png", media: "(prefers-color-scheme: light)" },
      { url: "/images/logo.png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: "/images/dark_logo.png",
    apple: "/images/dark_logo.png",
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "ZbLhiilDbtLDyIx5eH6Jeoe1jPkXNKId-LhXG1HhLWA",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <PageLoader />
        {children}
      </body>
    </html>
  )
}

