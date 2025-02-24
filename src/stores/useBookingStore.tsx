import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { eachDayOfInterval, parseISO, format } from "date-fns";

interface BookingState {
  checkIn: string;
  checkOut: string;
  period: string[];
  guests: string;
  apartmentType: string;
  selectedApartments: any[]; // Store selected apartments
  setCheckIn: (date: string) => void;
  setCheckOut: (date: string) => void;
  setGuests: (guests: string) => void;
  setApartmentType: (type: string) => void;
  setSelectedApartments: (apartments: any[]) => void; // New function
  reset: any;
}

const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      checkIn: "",
      checkOut: "",
      period: [],
      guests: "",
      apartmentType: "",
      selectedApartments: [],

      setCheckIn: (date) => {
        const { checkOut } = get();
        const period = checkOut ? generatePeriod(date, checkOut) : [];
        set({ checkIn: date, period });
      },

      setCheckOut: (date) => {
        const { checkIn } = get();
        const period = checkIn ? generatePeriod(checkIn, date) : [];
        set({ checkOut: date, period });
      },

      setGuests: (guests) => set({ guests }),
      setApartmentType: (type) => set({ apartmentType: type || "" }),
      setSelectedApartments: (apartments) =>
        set({ selectedApartments: apartments }),

      // ✅ Reset function to clear store data
      reset: () =>
        set({
          checkIn: "",
          checkOut: "",
          period: [],
          guests: "",
          apartmentType: "",
          selectedApartments: [],
        }),
    }),
    {
      name: "booking-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);


const generatePeriod = (start: string, end: string): string[] => {
  return eachDayOfInterval({ start: parseISO(start), end: parseISO(end) }).map(
    (date) => format(date, "yyyy-MM-dd")
  );
};

export default useBookingStore;
