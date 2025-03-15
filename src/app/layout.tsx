import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "aos/dist/aos.css";
import Head from "next/head"; // Import Head for adding custom scripts
import NetworkStatusChecker from "./NetworkStatusChecker";
import { Toaster } from "react-hot-toast"; // Import Toaster

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Satellite Apartments - Luxury Shortlet Homes & Rentals",
  description:
    "Experience premium short-term rentals at Satellite Apartments. Stay in our fully furnished, stylish apartments with modern amenities in prime locations.",
  generator:
    "satellite, Apartments, short-term, rentals, serviced, apartments, luxury, shortlets, furnished, apartments, holiday,   stays, Airbnb, alternative, business, travel, accommodations",
  keywords: [
    "luxury",
    "apartments",
    "short-term",
    "rentals",
    "serviced",
    "furnished",
    "holiday",
    "homes",
    "business",
    "travel",
    "stays",
    "monthly",
    "extended",
    "vacation",
    "satellite",
    "executive",
    "Airbnb",
    "alternative",
    "corporate",
    "housing",
    "shortlets",
    "hotel",
    "alternatives",
    "long-term",
    "relocation",
    "city",
    "cozy",
    "modern",
    "living",
    "spaces",
    "premium",
    "short",
    "stay",
    "temporary",
    "accommodation",
    "high-end",
    "expat",
    "digital",
    "nomad",
    "fully",
    "weekly",
    "best",
    "urban",
    "airbnb-style",
    "private",
    "class",
    "high-rise",
    "family-friendly",
    "center",
    "exclusive",
    "penthouse",
    "top-rated",
    "boutique",
    "weekend",
    "getaway",
    "apartment",
    "hotels",
    "places",
    "real",
    "estate",
    "solutions",
    "Nigeria",
    "Lagos",
    "Lekki",
    "Victoria",
    "Island",
    "Ikoyi",
    "houses",
  ],

  applicationName: "Satellite Apartments & Shortlet Homes",
  openGraph: {
    title: "Satellite Apartments - Luxury Shortlet Homes & Rentals",
    description:
      "Discover the perfect blend of comfort and convenience at Satellite Apartments. Fully serviced, stylish rentals ideal for vacationers and business travelers.",
    url: "https://www.satelliteapartments.com",
    siteName: "Satellite Apartments",
    images: [
      {
        url: "https://res.cloudinary.com/dvao98wnj/image/upload/v1738849472/lagos-pic-13_nc3jec.jpg",
        width: 1200,
        height: 630,
        alt: "Satellite Apartments - Premium Shortlet Homes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@satelliteapartments",
    title: "Satellite Apartments - Luxury Shortlet Homes & Rentals",
    description:
      "Book a stylish, fully furnished apartment at Satellite Apartments. Perfect for short stays, business trips, and holiday getaways.",
    images:
      "https://res.cloudinary.com/dvao98wnj/image/upload/v1738849472/lagos-pic-13_nc3jec.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Add Cloudinary widget script */}
        <script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
          async
        ></script>

        {/* paypal */}
        <script src="https://www.paypal.com/sdk/js?client-id=Aep-bAXPWzzmKCG5WzKI7LH8wO6CkGZKPAbJza0hxxH4EG9uatH_UkW6Z2tUk5JTD72ZbMMv73SfxUBe"></script>

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-F2YRYGXF65"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F2YRYGXF65');
            `,
          }}
        />
      </Head>
      <body className=" bg-[#f1efe8]-">
        <Toaster />
        <NetworkStatusChecker />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
