"use client";

import { Header4, HeaderAny } from "@/components/Text";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; // Firestore setup
import { collection, doc, getDocs, getDoc } from "firebase/firestore"; // Firestore functions
import { format } from "date-fns";

function SummaryBlocks() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [currentlyOccupied, setCurrentlyOccupied] = useState(0);
  const [upcomingCheckins, setUpcomingCheckins] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersSnapshot = await getDocs(collection(db, "Orders"));
        let revenue = 0;
        let bookings = 0;
        let occupied = 0;
        let checkins = 0;

        const today = format(new Date(), "yyyy-MM-dd");

        ordersSnapshot.forEach((doc) => {
          const order = doc.data();
          revenue += order.totalPaid || 0;
          bookings += 1;

          if (
            order.Checkin &&
            format(new Date(order.Checkin), "yyyy-MM-dd") > today
          ) {
            checkins += 1;
          }
        });

        // Fetch products collection to check currently occupied apartments
        const productsSnapshot = await getDocs(collection(db, "products"));
        for (const productDoc of productsSnapshot.docs) {
          const productRef = doc(db, "products", productDoc.id);
          const productSnapshot = await getDoc(productRef);

          if (productSnapshot.exists()) {
            const productData = productSnapshot.data();
            const bookedDays = productData.BookedDays || [];

            if (bookedDays.includes(today)) {
              occupied += 1;
            }
          }
        }

        setTotalRevenue(revenue);
        setTotalBookings(bookings);
        setCurrentlyOccupied(occupied);
        setUpcomingCheckins(checkins);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="col-span-1 hidden">
            <div className="w-full bg-white rounded-lg p-6 shadow-lg">
              <HeaderAny>Total Revenue</HeaderAny>
              <HeaderAny className="text-black">
                ₦ {totalRevenue.toLocaleString()}
              </HeaderAny>
            </div>
          </div>
          <div className="hidden sm:block col-span-1">
            <div className="w-full bg-white rounded-lg p-6 shadow-lg">
              <HeaderAny>Total Bookings</HeaderAny>
              <HeaderAny className="text-black">
                {totalBookings.toLocaleString()}
              </HeaderAny>
            </div>
          </div>
          <div className="hidden sm:block col-span-1">
            <div className="w-full bg-white rounded-lg p-6 shadow-lg">
              <HeaderAny>Currently Occupied Apartments</HeaderAny>
              <HeaderAny className="text-black">
                {currentlyOccupied.toLocaleString()}
              </HeaderAny>
            </div>
          </div>
          <div className="col-span-1">
            <div className="w-full bg-white rounded-lg p-6 shadow-lg">
              <HeaderAny>Upcoming Check-ins</HeaderAny>
              <HeaderAny className="text-black">
                {upcomingCheckins.toLocaleString()}
              </HeaderAny>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryBlocks;
