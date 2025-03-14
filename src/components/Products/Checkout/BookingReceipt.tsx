import React from "react";
import { Paragraph2, ParagraphLink1, ParagraphLink2 } from "@/components/Text";
import useBookingStore from "@/stores/useBookingStore";
import useUserInfoStore from "@/stores/userInfoStore"; // Import the user info store
import html2canvas from "html2canvas";


interface BookingReceiptProps {
  logoUrl: string;
  currencySymbol: string;
  selectedCurrency: string;
  exchangeRate: number;
  totalBill: number;
  products: {
    id: string;
    name: string;
    selectedCategory: any;
    productImageURL1: string;
  }[];
  paymentResponse: string;
}

const BookingReceipt: React.FC<BookingReceiptProps> = ({
  logoUrl,
  currencySymbol,
  selectedCurrency,
  exchangeRate,
  totalBill,
  products,
  paymentResponse,
}) => {
  const { checkIn, checkOut, guests } = useBookingStore();
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    city,
    state,
  } = useUserInfoStore();

  // Calculate number of nights
  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;

  let numberOfNights = 1; // Default to 1 if dates are missing
  if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
    numberOfNights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

     const handleDownloadReceipt = async () => {
       const receiptDiv = document.getElementById("receipt");

       if (receiptDiv) {
         // Ensure images are loaded
         const images = receiptDiv.querySelectorAll("img");
         await Promise.all(
           Array.from(images).map((img) => {
             return new Promise((resolve) => {
               if (img.complete) resolve(true);
               else img.onload = img.onerror = () => resolve(true);
             });
           })
         );

         // Capture the receipt div
         const canvas = await html2canvas(receiptDiv, {
           useCORS: true,
           height: 1122,
           scale: 2,
         });

         // Convert to image and download
         const image = canvas.toDataURL("image/png");
         const link = document.createElement("a");
         link.href = image;
         link.download = "receipt-a4.png";
         link.click();
       }

      useBookingStore.getState().reset();
       window.location.href = "/";
     };
  return (
    <div id="receipt" className="max-w-[793px] bg-white p-6 border rounded-lg">
      {/* Header */}
      <div className="text-center">
        <img src={logoUrl} alt="Company Logo" className="mx-auto h-20" />
        <p className="text-gray-500 text-sm mt-2">Payment Successful</p>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 mt-8 border p-4 rounded-lg gap-4">
        {/* Customer Details */}
        <div className="rounded-lg">
          <ParagraphLink1 className="font-semibold text-gray-700 mb-2">
            Customer Details
          </ParagraphLink1>
          <div className="text-sm space-y-2">
            <p>
              <span className="text-gray-500">Name:</span>{" "}
              <span className="font-medium">
                {firstName} {lastName}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Email:</span>{" "}
              <span className="font-medium">{email}</span>
            </p>
            <p>
              <span className="text-gray-500">Phone:</span>{" "}
              <span className="font-medium">
                {phoneNumber || "Not Provided"}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Country:</span>{" "}
              <span className="font-medium">{country || "Not Provided"}</span>
            </p>
            <p>
              <span className="text-gray-500">Address:</span>{" "}
              <span className="font-medium">
                {city}, {state}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Guests:</span>{" "}
              <span className="font-medium">{guests}</span>
            </p>
            <p>
              <span className="text-gray-500">Transaction Reference:</span>{" "}
              <span className="font-medium">{paymentResponse}</span>
            </p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="  rounded-lg">
          <ParagraphLink1 className="font-semibold text-gray-700 mb-2">
            Booking Details
          </ParagraphLink1>
          <div className="text-sm space-y-2">
            <p>
              <span className="text-gray-500">Check-in Date:</span>{" "}
              <span className="font-medium">{checkIn || "Not selected"}</span>
            </p>
            <p>
              <span className="text-gray-500">Check-out Date:</span>{" "}
              <span className="font-medium">{checkOut || "Not selected"}</span>
            </p>
            <p>
              <span className="text-gray-500">Number of Nights:</span>{" "}
              <span className="font-medium">{numberOfNights}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-6">
        <ParagraphLink1 className="font-semibold text-gray-700">
          Selected Apartments
        </ParagraphLink1>
        <div className="border-t mt-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-5 items-center py-4 border-b"
            >
              <div className="col-span-2 flex items-center gap-2">
                <img
                  src={
                    product.productImageURL1
                      ? product.productImageURL1.replace(
                          "/upload/",
                          "/upload/w_500,f_auto/"
                        )
                      : " "
                  }
                  alt={product.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className=" flex flex-col gap-2">
                  <Paragraph2 className=" font-bold  w-[150px]-">
                    No. {product.name} - {product.selectedCategory.name}
                  </Paragraph2>
                  <p className=" whitespace-nowrap">
                    {`${currencySymbol} ${new Intl.NumberFormat("en-US").format(
                      Number(product.selectedCategory.price)
                    )}`}{" "}
                    per day
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Amount */}
      <div className="mt-6 font-semibold flex justify-between text-gray-700  pt-4">
        <p>Total ({numberOfNights} nights):</p>
        <p>{`${currencySymbol} ${new Intl.NumberFormat("en-US").format(
          Number(
            selectedCurrency === "USD" && exchangeRate > 0
              ? totalBill / exchangeRate
              : totalBill
          )
        )}`}</p>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadReceipt}
        className="mt-6 w-full bg-primary text-white py-2 rounded-md hover:bg-black font-bold"
      >
        <ParagraphLink2>Download Receipt</ParagraphLink2>
      </button>
    </div>
  );
};

export default BookingReceipt;
