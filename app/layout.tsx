import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ChatProvider } from "@/lib/ChatContext";
import { restaurantInfo } from "@/lib/menu";

const siteUrl = "https://restaurant-chatbot.pranaykuwait.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${restaurantInfo.name} — ${restaurantInfo.tagline}`,
    template: `%s · ${restaurantInfo.name}`,
  },
  description: `${restaurantInfo.name} is a ${restaurantInfo.cuisine} restaurant in Kuwait. Chat with our AI host to explore the menu, hours and reservations.`,
  keywords: ["restaurant Kuwait", "Levantine restaurant Kuwait", "Mediterranean food Kuwait", "AI chatbot restaurant"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: restaurantInfo.name,
    title: `${restaurantInfo.name} — ${restaurantInfo.tagline}`,
    description: `A ${restaurantInfo.cuisine} restaurant in Kuwait with an AI concierge to help you order, reserve and explore the menu.`,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurantInfo.name,
  servesCuisine: restaurantInfo.cuisine,
  address: restaurantInfo.address,
  telephone: restaurantInfo.phone,
  url: siteUrl,
  priceRange: "KWD 1 - 9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}
