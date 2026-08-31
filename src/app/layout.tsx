import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Shiyali HR Services | Global Recruitment Partner for GCC, EPC & Oil & Gas",
  description:
    "Government-approved overseas recruitment specialist with 20+ years of experience. Connecting global employers with skilled talent across GCC, EPC, Oil & Gas, Infrastructure, Manufacturing and Healthcare sectors.",
  keywords: [
    "Shiyali HR Services",
    "GCC recruitment",
    "overseas recruitment",
    "Oil & Gas recruitment",
    "EPC recruitment",
    "construction staffing",
    "healthcare recruitment",
    "Saudi Arabia recruitment",
    "UAE recruitment",
    "Qatar recruitment",
  ],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Shiyali HR Services | Global Recruitment Partner",
    description:
      "Connecting global employers with skilled talent across GCC, EPC, Oil & Gas and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
