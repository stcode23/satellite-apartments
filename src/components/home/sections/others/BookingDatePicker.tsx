"use client";

import { Paragraph1 } from "@/components/Text";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BookingDatePickerProps {
  checkIn: string;
  checkOut: string;
  setCheckIn: (date: string) => void;
  setCheckOut: (date: string) => void;
}

const BookingDatePicker: React.FC<BookingDatePickerProps> = ({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
}) => {
  return (
    <div className="col-span-2 grid-cols-2 grid">
      {/* Check-in Date Picker */}
      <div className="xl:border-r border-primary flex w-full flex-col gap-2 items-center p-4">
        <Paragraph1 className="text-start font-bold">Check-in</Paragraph1>
        <DatePicker
          selected={checkIn ? new Date(checkIn) : null}
          onChange={(date) => {
            setCheckIn(date ? date.toISOString().split("T")[0] : "");
            setCheckOut(""); // Reset check-out when check-in changes
          }}
          className="bg-white w-[120px] border bg-opacity-50 p-2 rounded-lg text-center outline-none"
          placeholderText="Select date"
          dateFormat="yyyy-MM-dd"
          minDate={new Date()} // Prevent past dates
        />
      </div>

      {/* Check-out Date Picker */}
      <div className="xl:border-r border-primary flex w-full flex-col gap-2 items-center p-4">
        <Paragraph1 className="text-start font-bold">Check-out</Paragraph1>
        <DatePicker
          selected={checkOut ? new Date(checkOut) : null}
          onChange={(date) =>
            setCheckOut(date ? date.toISOString().split("T")[0] : "")
          }
          className="bg-white w-[120px] border bg-opacity-50 p-2 rounded-lg text-center outline-none"
          placeholderText="Select date"
          dateFormat="yyyy-MM-dd"
          minDate={checkIn ? new Date(checkIn) : new Date()} // Checkout cannot be before Check-in
          disabled={!checkIn} // Disable until check-in is selected
        />
      </div>
    </div>
  );
};

export default BookingDatePicker;
