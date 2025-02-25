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
    "Satellite Apartments, short-term rentals, serviced apartments, luxury shortlets, furnished apartments, holiday stays, Airbnb alternative, business travel accommodations",
  keywords: [
    "luxury apartments",
    "short-term rentals",
    "serviced apartments",
    "furnished apartments",
    "holiday homes",
    "business travel stays",
    "monthly rentals",
    "extended stays",
    "vacation rentals",
    "Satellite Apartments",
    "executive apartments",
    "Airbnb alternative",
    "corporate housing",
    "luxury shortlets",
    "hotel alternatives",
    "long-term stays",
    "relocation housing",
    "city apartments",
    "cozy rentals",
    "modern living spaces",
    "premium apartment rentals",
    "short stay apartments",
    "temporary accommodation",
    "luxury Airbnb-style stays",
    "high-end serviced apartments",
    "expat housing",
    "digital nomad stays",
    "fully furnished apartments",
    "corporate stay apartments",
    "weekly apartment rentals",
    "monthly serviced apartments",
    "best shortlet apartments",
    "luxury vacation stays",
    "affordable apartments for rent",
    "business trip accommodation",
    "premium shortlet homes",
    "luxury urban apartments",
    "airbnb-style serviced apartments",
    "private vacation homes",
    "business-class apartments",
    "high-rise luxury apartments",
    "family-friendly vacation rentals",
    "corporate travel housing",
    "city-center apartments",
    "exclusive penthouse rentals",
    "top-rated Airbnb alternatives",
    "boutique apartment stays",
    "weekend getaway apartments",
    "apartment hotels",
    "best places to stay for business trips",
    "premium vacation stays",
    "luxury relocation housing",
    "temporary housing solutions",
    "real estate rental homes",
    "luxury apartments in Lagos",
    "shortlet apartments in Lagos",
    "serviced apartments in Nigeria",
    "furnished apartments in Lekki",
    "holiday rentals in Lagos",
    "business travel stays in Nigeria",
    "monthly rentals in Victoria Island",
    "Airbnb alternative in Lagos",
    "premium shortlets in Ikoyi",
    "corporate housing in Lagos",
    "apartments in Lagos",
    "apartments in Lagos",
    "apartments in Nigeria",
    "apartments in Lekki",
    "rentals in Lagos",
    "travel stays in Nigeria",
    "rentals in Victoria Island",
    "houses in Lagos",
    "shortlets in Ikoyi",
    "housing in Lagos",
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
