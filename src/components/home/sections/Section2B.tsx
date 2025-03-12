import React from "react";
import { useExchangeRateStore } from "@/stores/exchangeRateStore";
import { Header2, Header3, Paragraph1, Paragraph2 } from "@/components/Text";
import Button from "@/components/Button";

const Pricing = () => {
  const { selectedCurrency, exchangeRate } = useExchangeRateStore();

  const currencySymbol = selectedCurrency === "USD" ? "$" : "₦";

  const plans = [
    {
      title: "BUDGET HIDEAWAY",
      price: 25000,
      features: [
        "1 Bedroom",
        "Free Wi-Fi",
        "Basic Kitchen Setup",
        "Weekly Cleaning Service",
      ],
      image:
        "https://res.cloudinary.com/dvao98wnj/image/upload/v1739438630/naomi-hebert-MP0bgaS_d1c-unsplash_hpvmp6.jpg",
    },
    {
      title: "COZY CORNER",
      price: 35000,
      features: [
        "2 Bedrooms",
        "Smart TV",
        "Fully Equipped Kitchen",
        "Bi-Weekly Cleaning Service",
        "Quiet Location",
      ],
      image:
        "https://res.cloudinary.com/dvao98wnj/image/upload/v1739438626/outsite-co-R-LK3sqLiBw-unsplash_lsdfkh.jpg",
    },
    {
      title: "THE CLASSIC APARTMENT",
      price: 45000,
      features: [
        "3 Bedrooms",
        "Luxury Furnishings",
        "24/7 Concierge Service",
        "Daily Cleaning Service",
        "Private Balcony",
        "Free Parking",
      ],
      image:
        "https://res.cloudinary.com/dvao98wnj/image/upload/v1739438628/jason-briscoe-GliaHAJ3_5A-unsplash_buyidn.jpg",
    },
    {
      title: "THE LUXE HAVEN",
      price: 55000,
      features: [
        "1 Bedroom",
        "Free Wi-Fi",
        "Basic Kitchen Setup",
        "Weekly Cleaning Service",
      ],
      image:
        "https://res.cloudinary.com/dvao98wnj/image/upload/v1739438630/naomi-hebert-MP0bgaS_d1c-unsplash_hpvmp6.jpg",
    },
    {
      title: "COZY 1 BEDROOM",
      price: 102000,
      features: [
        "2 Bedrooms",
        "Smart TV",
        "Fully Equipped Kitchen",
        "Bi-Weekly Cleaning Service",
        "Quiet Location",
      ],
      image:
        "https://res.cloudinary.com/dvao98wnj/image/upload/v1739438626/outsite-co-R-LK3sqLiBw-unsplash_lsdfkh.jpg",
    },
    {
      title: "COZY 2 BEDROOM",
      price: 120000,
      features: [
        "3 Bedrooms",
        "Luxury Furnishings",
        "24/7 Concierge Service",
        "Daily Cleaning Service",
        "Private Balcony",
        "Free Parking",
      ],
      image:
        "https://res.cloudinary.com/dvao98wnj/image/upload/v1739438628/jason-briscoe-GliaHAJ3_5A-unsplash_buyidn.jpg",
    },
  ];

  return (
    <div className="bg-bg_gray py-10 px-5">
      <Header3 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Pricing Plans
      </Header3>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {plans.map((plan, index) => {
          const displayPrice =
            selectedCurrency === "USD" && exchangeRate > 0
              ? plan.price / exchangeRate // Convert to USD
              : plan.price; // Default to NGN

          const formattedPrice =
            selectedCurrency === "USD"
              ? displayPrice.toFixed(2) // Format for USD with 2 decimal places
              : new Intl.NumberFormat("en-NG").format(displayPrice); // Format for NGN (comma-separated)

          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={plan.image}
                alt={plan.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <Paragraph1 className="text-xl font-bold text-gray-800 mb-3">
                  {plan.title}
                </Paragraph1>
                <Paragraph2>
                  {" "}
                  <span className=" font-bold">
                    {" "}
                    {`${currencySymbol} ${formattedPrice}`}{" "}
                  </span>{" "}
                  per day
                </Paragraph2>
                <ul className="text-gray-600 mb-4 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                      <Paragraph2>{feature}</Paragraph2>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className=" flex justify-center mt-8">
        {" "}
        <Button
          text="Book Now"
          href="/reservation/checkout"
          isLink={true}
          border="border-2- border-primary- "
          additionalClasses="border-primary xl:w-fit- flex justify-center  w-full- "
        />
      </div>
    </div>
  );
};

export default Pricing;
