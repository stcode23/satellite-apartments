"use client";

import React, { useState } from "react";
import { Header4 } from "@/components/Text";
import Checkout from "./Checkout";
import { useExchangeRateStore } from "@/stores/exchangeRateStore";
import useBookingStore from "@/stores/useBookingStore";
import ProductDetails from "./LeftProductDetails";
import BookingSummary from "./BookingSummary";

type Apartment = {
  id: string;
  name: string;
  productImageURL1: string;
  selectedCategory?: {
    name: string;
    price: number;
  };
  productWeight?: number;
};

const CheckOutOverview = () => {
  const { selectedCurrency, exchangeRate } = useExchangeRateStore();
  const { selectedApartments } = useBookingStore(); // Use selected apartments from store

  const [shippingFee, setShippingFee] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const currencySymbol = selectedCurrency === "USD" ? "$" : "₦";

  const subtotal = selectedApartments.reduce(
    (total, apt) => total + (apt.selectedCategory?.price || 30000),
    0
  );

  const totalProductWeight = selectedApartments.reduce(
    (total, apt) => total + (apt.productWeight || 0),
    0
  );

  const toggleSummary = () => {
    setIsSummaryVisible(!isSummaryVisible);
  };

  return (
    <div className=" bg-bg_gray-">
      <div className="container1 py-[120px]">
        <Header4 className="mb-4">Reservation</Header4>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 bg-white- rounded-lg">
            <BookingSummary
              isSummaryVisible={isSummaryVisible}
              toggleSummary={toggleSummary}
              currencySymbol={currencySymbol}
              selectedCurrency={selectedCurrency}
              exchangeRate={exchangeRate}
              totalBill={subtotal}
              products={selectedApartments} // Pass apartments instead of products
            />

          {/* Right section - Checkout */}
          <div className="xl:col-span-8 sm:border bg-white rounded-lg sm:p-4">
            <div className="rounded-lg">
              <Checkout
                products={selectedApartments}
                total={subtotal}
                totalProductWeight={totalProductWeight}
                logoUrl="/images/logo.png"
                onShippingFeeChange={setShippingFee}
                onTotalBillChange={setTotalBill}
              />
            </div>
          </div>

          {/* Left section - Product Details */}
         
            <ProductDetails
              products={selectedApartments}
              currencySymbol={currencySymbol}
              selectedCurrency={selectedCurrency}
              exchangeRate={exchangeRate}
              shippingFee={shippingFee}
              totalBill={subtotal}
            />
        </div>
      </div>
    </div>
  );
};

export default CheckOutOverview;
