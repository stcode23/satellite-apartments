"use client";

import Button from "@/components/Button";
import { Header3, Paragraph1, ParagraphLink1 } from "@/components/Text";
import React, { useEffect, useState } from "react";
import useBookingStore from "@/stores/useBookingStore";
import BookingDatePicker from "./BookingDatePicker";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

function CheckAvailability({
  onBookingChange,
  handleInnerNext,
}: {
  onBookingChange?: () => void;
  handleInnerNext: () => void;
}) {
  const router = useRouter();
  const {
    checkIn,
    checkOut,
    guests,
    apartmentType,
    setCheckIn,
    setCheckOut,
    setGuests,
    setApartmentType,
  } = useBookingStore();

  const [selectedApartmentType, setSelectedApartmentType] = useState<string>(
    apartmentType || ""
  );
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (selectedApartmentType) {
      setApartmentType(selectedApartmentType);
    }
  }, [selectedApartmentType, setApartmentType]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "category"));
        const categoriesData = querySnapshot.docs.map((doc) => doc.data().name);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCheckAvailability = () => {
    const missingFields = [];

    if (!checkIn) missingFields.push("Check-in date");
    if (!checkOut) missingFields.push("Check-out date");
    if (!guests) missingFields.push("Number of guests");
    if (!selectedApartmentType) missingFields.push("Apartment type");

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following fields before proceeding:\n- ${missingFields.join(
          "\n- "
        )}`
      );
      return;
    }

    setApartmentType(selectedApartmentType);
    if (onBookingChange) onBookingChange();
    router.push("/reservation/checkout");
      handleInnerNext();

    
  };

  return (
    <div className="p-4 bg-white bg-opacity-70 rounded-[20px] flex flex-col items-center">
      <Header3 className="text-center">Apartments & Suites</Header3>
      <Paragraph1 className="max-w-[800px] hidden- text-center">
        Explore our premium apartments designed to offer modern comfort and
        luxury. Booking your ideal stay is just a few clicks away:
      </Paragraph1>
      <div className="grid grid-cols-2 sm:gap-4 py-4 sm:grid-cols-4 w-full items-center">
        <BookingDatePicker
          checkIn={checkIn}
          checkOut={checkOut}
          setCheckIn={setCheckIn}
          setCheckOut={setCheckOut}
        />
        <div className="sm:border-r border-primary flex w-full flex-col gap-2 items-center p-4">
          <ParagraphLink1 className="text-start font-bold">
            Guest
          </ParagraphLink1>
          <input
            type="number"
            placeholder="Number of guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="bg-white w-[120px] border bg-opacity-50 p-2 rounded-lg text-center outline-none"
          />
        </div>
        <div className="sm:border-r- border-primary flex w-full flex-col gap-2 items-center p-4">
          <ParagraphLink1 className="text-start font-bold whitespace-nowrap">
            Apartment Type
          </ParagraphLink1>
          <Dropdown
            options={categories}
            onSelect={(value) => {
              setSelectedApartmentType(value);
              setApartmentType(value);
            }}
            placeholder="Select an option"
            initialValue={apartmentType}
            buttonClassName="max-w-[120px] bg-opacity-50 border p-2 rounded-lg text-center outline-none"
          />
        </div>
      </div>
      <div className="px-4">
        <Button
          text="Check Availability"
          onClick={handleCheckAvailability}
          border="border-2-"
          additionalClasses="border-primary xl:w-fit flex justify-center w-full"
        />
      </div>
    </div>
  );
}

export default CheckAvailability;
