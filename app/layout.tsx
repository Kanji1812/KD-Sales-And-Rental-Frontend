import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Ai-Voria | Premium Cloth Rental & Retail Management",
    template: "%s | Ai-Voria",
  },
  description: "The all-in-one SaaS platform for cloth rental, retail management, inventory tracking, and sales analytics. Scalable, modern, and production-ready.",
  keywords: ["cloth rental", "retail management", "SaaS", "inventory tracking", "sales management", "fashion business"],
  authors: [{ name: "Ai-Voria Team" }],
  creator: "Ai-Voria",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-voria.com",
    title: "Ai-Voria | Premium Cloth Rental & Retail Management",
    description: "The all-in-one SaaS platform for cloth rental, retail management, and inventory tracking.",
    siteName: "Ai-Voria",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ai-Voria | Premium Cloth Rental & Retail Management",
    description: "The all-in-one SaaS platform for cloth rental, retail management, and inventory tracking.",
    creator: "@aivoria",
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
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geist.variable,
          poppins.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
