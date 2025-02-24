"use client";

import React from "react";
import useBookingStore from "@/stores/useBookingStore";

const PeriodDisplay = () => {
  const { period } = useBookingStore();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold">Selected Period</h3>
      {period.length > 0 ? (
        <ul className="mt-2">
          {period.map((date) => (
            <li key={date} className="text-sm text-gray-600">
              {date}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No dates selected</p>
      )}
    </div>
  );
};

export default PeriodDisplay;
