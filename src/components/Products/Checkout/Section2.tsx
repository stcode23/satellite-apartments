"use client";

import React from "react";
import { Paragraph1, Paragraph2 } from "../../Text";
import { useExchangeRateStore } from "@/stores/exchangeRateStore";

function Section2() {
  const { selectedCurrency, exchangeRate } = useExchangeRateStore();

  const price = 30000;
  const currencySymbol = selectedCurrency === "USD" ? "$" : "₦";
  const displayPrice =
    selectedCurrency === "USD" && exchangeRate > 0
      ? price / exchangeRate // Convert to USD
      : price; // Default to NGN

  const formattedPrice =
    selectedCurrency === "USD"
      ? displayPrice.toFixed(2) // Format for USD with 2 decimal places
      : new Intl.NumberFormat("en-NG").format(displayPrice); // Format for NGN (comma-separated)
  return (
    <div>
      <div className=" flex flex-col items-center justify-center ">
        {/* Apartment card */}

        <div className=" w-full items-center">
          <div className=" flex flex-col gap-1 items-center ">
            <div className="rounded-[10px] w-full overflow-hidden border">
              <div className=" h-[400px] sm:h-[400px] overflow-hidden rounded-[20px]- w-full sm:w-[600px]- bg-primary">
                <img
                  src="https://res.cloudinary.com/dvao98wnj/image/upload/v1739438628/jason-briscoe-GliaHAJ3_5A-unsplash_buyidn.jpg"
                  alt=""
                  className=" h-full w-full object-cover"
                />
              </div>
              <div className="bg-white sm:px-4 p-2 sm:pb-4">
                <Paragraph1 className="font-bold">
                  {/* {plan.title} */}No. 200 - Standard Apartment
                </Paragraph1>
                <Paragraph2>
                  {" "}
                  <span className=" font-bold">
                    {" "}
                    {`${currencySymbol}
                  ${formattedPrice}`}{" "}
                  </span>{" "}
                  per day
                </Paragraph2>
              </div>
            </div>

            <div className=" flex w-full items-center gap-2 justify-between">
              <Paragraph2>3 Alternatives Available</Paragraph2>
              <button className="border flex gap-2 items-center py-1  px-2  rounded-lg ">
                <Paragraph2>Change</Paragraph2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section2;
