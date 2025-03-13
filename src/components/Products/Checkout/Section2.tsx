import React, { useState, useEffect } from "react";
import { Paragraph1, ParagraphLink2 } from "../../Text";
import { useExchangeRateStore } from "@/stores/exchangeRateStore";
import useBookingStore from "@/stores/useBookingStore";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "./ProductCard";

interface Apartment {
  id: string;
  name: string;
  productImageURL1: string;
  selectedCategory?: {
    name: string;
    price: number;
  };
  BookedDays?: string[]; // Fetch booked days from Firestore
}

function Section2({
  handleInnerBack,
  handleInnerNext,
}: {
  handleInnerBack: () => void;
  handleInnerNext: () => void;
}) {
  const { selectedCurrency, exchangeRate } = useExchangeRateStore();
  const { period, apartmentType, guests, setSelectedApartments } =
    useBookingStore();
  const [availableApartments, setAvailableApartments] = useState<Apartment[]>(
    []
  );
  const [currentIndices, setCurrentIndices] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailableApartments = async () => {
      try {
        setLoading(true);
        setError(null);

        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData: Apartment[] = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Apartment)
        );

        // Filter apartments based on availability
        const filteredApartments = productsData.filter((apartment) => {
          const categoryMatch =
            apartment.selectedCategory?.name === apartmentType;
          const isAvailable =
            !apartment.BookedDays ||
            apartment.BookedDays.every((date) => !period.includes(date)); // Check if selected dates are available

          return categoryMatch && isAvailable;
        });

        if (filteredApartments.length === 0) {
          setError(
            "The selected dates are unavailable. Please choose different dates."
          );
        }

        // Ensure enough apartments for the number of guests
        const maxGuestsPerApartment = 2;
        const requiredApartments = Math.ceil(
          Number(guests) / maxGuestsPerApartment
        );

        if (filteredApartments.length < requiredApartments) {
          setError(
            `Not enough ${apartmentType} apartments available for ${guests} guests within your selected time of stay. Please adjust your selection.`
          );
        }

        setAvailableApartments(filteredApartments);

        // Initialize with unique random indices
        const totalCards = Math.min(
          filteredApartments.length,
          requiredApartments
        );
        setCurrentIndices(
          generateUniqueIndices(filteredApartments.length, totalCards)
        );
      } catch (error) {
        console.error("Error fetching apartments:", error);
        setError("Failed to load apartments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (apartmentType && period.length) {
      fetchAvailableApartments();
    } else {
      setLoading(false);
    }
  }, [apartmentType, period, guests]);

  const generateUniqueIndices = (max: number, count: number) => {
    const indices = new Set<number>();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * max));
    }
    return Array.from(indices);
  };

  const handleNextApartment = (index: number) => {
    setCurrentIndices((prevIndices) => {
      const usedIndices = new Set(prevIndices);
      let nextIndex = (prevIndices[index] + 1) % availableApartments.length;

      while (usedIndices.has(nextIndex)) {
        nextIndex = (nextIndex + 1) % availableApartments.length;
      }

      const newIndices = [...prevIndices];
      newIndices[index] = nextIndex;
      return newIndices;
    });
  };

  // Save selected apartments before moving to the next section
  const handleNextWithSave = () => {
    const selectedApartments = currentIndices.map(
      (index) => availableApartments[index]
    );

    setSelectedApartments(selectedApartments); // Save to booking store
    handleInnerNext(); // Proceed to next step
  };

  if (loading) return <Paragraph1>Loading available apartments...</Paragraph1>;

  return (
    <div className="flex flex-col items-center justify-center">
      {error && <Paragraph1 className="text-red-500 mb-4">{error}</Paragraph1>}

      {!error &&
        currentIndices.map((apartmentIndex, index) => {
          const apartment = availableApartments[apartmentIndex];
          const price = apartment?.selectedCategory?.price || 30000;
          const currencySymbol = selectedCurrency === "USD" ? "$" : "₦";
          const displayPrice =
            selectedCurrency === "USD" && exchangeRate > 0
              ? price / exchangeRate
              : price;
          const formattedPrice =
            selectedCurrency === "USD"
              ? displayPrice.toFixed(2)
              : new Intl.NumberFormat("en-NG").format(displayPrice);

          return (
            <ProductCard
              key={apartment.id} // Use apartment ID instead of index
              apartment={apartment}
              currencySymbol={currencySymbol}
              formattedPrice={formattedPrice}
              onNextApartment={() => handleNextApartment(index)}
              alternativesAvailable={availableApartments.length - 1}
            />
          );
        })}

      <div className="flex w-full items-center gap-2 justify-between mt-4">
        <button
          className="p-2 bg-gray-300 w-full hover:bg-gray-200 rounded"
          onClick={handleInnerBack}
        >
          <ParagraphLink2 className="sm:text-[16px]">Back</ParagraphLink2>
        </button>
        <button
          className="p-2 bg-primary hover:bg-black w-full text-white rounded disabled:opacity-50"
          onClick={handleNextWithSave}
          disabled={!!error || availableApartments.length === 0} // Next button disabled if there's an error
        >
          <ParagraphLink2 className="sm:text-[16px]">Next</ParagraphLink2>
        </button>
      </div>
    </div>
  );
}

export default Section2;
