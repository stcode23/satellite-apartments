import React from "react";
import {
  Header4,
  Header5,
  Paragraph1,
  ParagraphLink1,
} from "@/components/Text";
import ProductCartCard from "@/components/Cart/ProductCartCard";
import useBookingStore from "@/stores/useBookingStore"; // Import Zustand store

interface BookingSummaryProps {
  isSummaryVisible: boolean;
  toggleSummary: () => void;
  currencySymbol: string;
  selectedCurrency: string;
  exchangeRate: number;
  totalBill: number;
  products: { id: string; name: string; price: number }[];
 
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  isSummaryVisible,
  toggleSummary,
  currencySymbol,
  selectedCurrency,
  exchangeRate,
  totalBill,
  products,
  
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
    <div className="block sm:hidden">
      <div className="flex justify-between border p-2 px-2 rounded-lg items-center">
        <button
          onClick={toggleSummary}
          className="flex gap-1 items-center text-[12px] text-primary"
        >
          {isSummaryVisible ? "Hide booking summary" : "Show booking summary"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-4 h-4 transition-transform ${
              isSummaryVisible ? "rotate-180" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <ParagraphLink1 className="text-lg font-bold">
          {`${currencySymbol} ${new Intl.NumberFormat("en-US").format(
            Number(
              selectedCurrency === "USD" && exchangeRate > 0
                ? ((totalBill / exchangeRate) * numberOfDays).toFixed(2)
                : totalBill * numberOfDays
            )
          )}`}
        </ParagraphLink1>
      </div>

      {isSummaryVisible && (
        <div className="space-y-2 mt-4">
          <div className="space-y-4 overflow-y-auto bg-bg_gray- p-2 rounded-lg h-[300px] scrollbar-hide">
            <div className="px-4- border-t py-4 space-y-1">
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
                <Paragraph1>Number of Nights:</Paragraph1>
                <Paragraph1 className="text-gray-500">
                  {numberOfDays}
                </Paragraph1>
              </div>
              <div className="flex justify-between">
                <Paragraph1>Number of Guests:</Paragraph1>
                <Paragraph1 className="text-gray-500">
                  {guests || "Not specified"}
                </Paragraph1>
              </div>
              <div className="flex justify-between">
                <Paragraph1 className="font-bold">
                  Selected Apartment:
                </Paragraph1>
              </div>
            </div>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCartCard
                  key={product.id}
                  product={product}
                 
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                Your Reservation is empty.
              </p>
            )}
          </div>
          <hr />

          
          <div className="flex justify-between font-semibold">
            <ParagraphLink1>Total ({numberOfDays} nights):</ParagraphLink1>
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
      )}
    </div>
  );
};

export default BookingSummary;
