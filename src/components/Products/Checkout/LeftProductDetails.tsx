import React from "react";
import ProductCartCard from "@/components/Cart/ProductCartCard";
import { Paragraph1, ParagraphLink1 } from "@/components/Text";
import useBookingStore from "@/stores/useBookingStore"; // Import Zustand store

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ProductDetailsProps {
  products: Product[];
  currencySymbol: string;
  selectedCurrency: string;
  exchangeRate: number;
  shippingFee: number;
  totalBill: number;
  
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  products,
  currencySymbol,
  selectedCurrency,
  exchangeRate,
  shippingFee,
  totalBill,
  
}) => {
  const { checkIn, checkOut, guests } = useBookingStore(); // Get booking details

  // Calculate number of days
  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;

  let numberOfDays = 1; // Default to 1 day if dates are missing or invalid
  if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
    numberOfDays = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  return (
    <div className="sm:col-span-4 hidden bg-white mt-[50px]- sm:block border rounded-lg p-4">
      <div className="bg-gray-10-">
        <div className=" space-y-1">
          <div className="flex justify-between">
            <Paragraph1>Check-in Date:</Paragraph1>
            <Paragraph1 className="text-gray-500">
              {checkIn || "Not selected"}
            </Paragraph1>
          </div>
          <div className="flex justify-between">
            <Paragraph1>Check-out Date:</Paragraph1>
            <Paragraph1 className="text-gray-500">
              {checkOut || "Not selected"}
            </Paragraph1>
          </div>
          <div className="flex justify-between">
            <Paragraph1>Number of Guests:</Paragraph1>
            <Paragraph1 className="text-gray-500">
              {guests || "Not specified"}
            </Paragraph1>
          </div>
          <div className="flex justify-between pt-2">
            <Paragraph1 className="font-bold">Selected Apartment:</Paragraph1>
          </div>
        </div>
        <div className="space-y-4 ">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCartCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">
              Your Reservation is empty.
            </p>
          )}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <Paragraph1>Number of Nights:</Paragraph1>
          <Paragraph1 className="text-gray-500">
            {numberOfDays} nights
          </Paragraph1>
        </div>
        <div className="flex justify-between font-semibold">
          <ParagraphLink1>Total:</ParagraphLink1>
          <ParagraphLink1>
            {`${currencySymbol} ${new Intl.NumberFormat("en-US").format(
              Number(
                selectedCurrency === "USD" && exchangeRate > 0
                  ? ((totalBill / exchangeRate) * numberOfDays).toFixed(2)
                  : totalBill * numberOfDays
              )
            )}`}
          </ParagraphLink1>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
