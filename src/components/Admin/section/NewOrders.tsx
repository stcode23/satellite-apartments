"use client";

import {
  Header1,
  Header2,
  Header3,
  Header4,
  Header5,
  Paragraph1,
  Paragraph2,
  ParagraphLink2,
} from "@/components/Text";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; // Firestore setup
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"; // Firestore functions
import AOS from "aos";
import SearchBar from "./SearchBar";
import SummaryBlocks from "./SummaryBlocks";
import { AnyARecord } from "dns";
import countries from "../logistics/CountriesWithFlags";
import { format, isAfter, parseISO, isSameDay } from "date-fns";

type Product = {
  id: string;
  initials: string;
  name: string;
  productImageURL1: string;
  selectedCategory: any;
  price: number;
  TotalPaid: any;
};

type Order = {
  id: string;
  initials: string;
  name: string;
  quantity: number;
  products: Product[];
  firstName: string;
  lastName: string;
  email: string;
  checkIn: string;
  period: string[];
  checkOut: string;
  guests: number;
  selectedApartments: any;
  phoneNumber: string;
  expired: any;
  currency: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  message: string;
  totalPaid: string;
  shippingFee: string;
  paymentMethod: string;
  viewed: boolean;
  shipped: boolean;
  returned: boolean;
  timestamp: string;
};

function NewOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [totalOrders, setTotalOrders] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Orders"));

        const ordersData: Order[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const products = data.products || []; // Ensure products is defined as an array

          // Get today's date
          const today = new Date();

          // Check if orders have expired
          const lastDate = data.period?.length
            ? parseISO(data.period[data.period.length - 1])
            : null;

          const isExpired = lastDate ? isAfter(today, lastDate) : false;

          // Check if any date in the period matches today's date
          const isInService =
            data.period?.some((date: any) => isSameDay(parseISO(date), today)) ??
            false;


          return {
            id: doc.id,
            name: `${doc.data().firstName} ${doc.data().lastName}`,
            initials: doc.data().firstName[0] + doc.data().lastName[0], // Assuming you have firstName and lastName in your form
            products: data.selectedApartments || [],
            quantity: products.reduce(
              (total: any, product: any) => total + (product.quantity || 0),
              0
            ),
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            currency: data.currency,
            address: data.address,
            expired: isExpired, // Add expired status to the order
            guests: data.guests,
            checkIn: data.checkIn,
            period: data.period,
            checkOut: data.checkOut,
            selectedApartments: data.selectedApartments,
            country: data.country,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            message: data.message,
            totalPaid: data.totalPaid,
            shippingFee: data.shippingFee,
            paymentMethod: data.paymentMethod,
            viewed: data.viewed || false,
            shipped: data.shipped || false,
            returned: data.returned || false,
            timestamp: data.timestamp ? data.timestamp.toDate() : null,
          };
        });

        setTotalOrders(ordersData.length);
        setUnreadCount(ordersData.filter((order) => !order.viewed).length);

        ordersData.sort((a, b) => {
          const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
          const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
          return timeB - timeA;
        });

        setOrders(ordersData);
        setFilteredOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [refresh]);

  const showUnreadOrders = () => {
    const unread = orders.filter((order) => !order.viewed);
    setFilteredOrders(unread);
  };

  const showUnshippedOrders = () => {
    const unshipped = orders.filter((order) => !order.shipped);
    setFilteredOrders(unshipped);
  };

  const showShippedOrders = () => {
    const shipped = orders.filter((order) => order.shipped);
    setFilteredOrders(shipped);
  };

  const showReturedOrders = () => {
    const returned = orders.filter((order) => order.returned);
    setFilteredOrders(returned);
  };

  const showAllOrders = () => {
    setFilteredOrders(orders);
  };

  const handleClick = async (order: Order) => {
    // Update the viewed status in Firestore
    const orderDocRef = doc(db, "Orders", order.id.toString()); // Assuming id is the Firestore document ID

    try {
      await updateDoc(orderDocRef, { viewed: true }); // Update the viewed field
      console.log("Order viewed status updated successfully");
    } catch (error) {
      console.error("Error updating order: ", error);
    }

    // Set the order as viewed in the local state
    const updatedOrders = orders.map((ord) =>
      ord.id === order.id ? { ...ord, viewed: true } : ord
    );
    setOrders(updatedOrders); // Update the orders state
    setFilteredOrders(updatedOrders); // Ensure filtered list reflects changes
    setSelectedOrder(order);
    setRefresh((prev) => !prev);

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedOrder(null);
  };

  // Predefined list of colors to cycle through
  const bgColors = ["bg-red-500", "bg-green-500", "bg-blue-600"];

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  const markAsShipped = async (orderId: any) => {
    try {
      const orderRef = doc(db, "Orders", orderId); // Reference to the specific document
      await updateDoc(orderRef, { shipped: true }); // Update the shipped field to true
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const markAsRetured = async (orderId: any) => {
    try {
      const orderRef = doc(db, "Orders", orderId); // Reference to the specific document
      await updateDoc(orderRef, { returned: true }); // Update the shipped field to true
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const formatTimestamp = (timestamp: Date | null): string => {
    if (!timestamp) return "N/A";

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const formattedTime = timestamp.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const formattedDate = timestamp.toLocaleDateString("en-US", options);

    // Extract day from formattedDate to append "th", "st", "nd", or "rd"
    const day = timestamp.getDate();
    const daySuffix = (day: any) => {
      if (day > 3 && day < 21) return "th"; // We only need to worry about 11-13 for suffix
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return ` ${formattedDate}`;
  };

  return (
    <div>
      {" "}
      <div className="mx-4- xl:mx-0 ">
        <div className="  bg-white py-[35px]  rounded-lg shadow-md">
          <div className="px-2  xl:px-4">
            {selectedOrder ? (
              // Render the detailed view if a submission is selected
              <div data-aos="zoom-in" className="">
                <div className=" flex  border-b pb-2 w-full text-[14px]  gap-4 items-center">
                  <button
                    onClick={handleBack}
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                      />
                    </svg>
                  </button>

                  <div className=" flex w-full-">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-[50px] h-[50px] flex items-center justify-center  rounded-full bg-primary -${
                          bgColors[selectedOrder.id.length % bgColors.length]
                        }`}
                      >
                        <span className="text-lg font-bold uppercase">
                          {selectedOrder.initials}
                        </span>
                      </div>
                      <div>
                        <Header5 className="text-[23px]  ">
                          {selectedOrder.name}
                        </Header5>
                        <Paragraph2 className="text-sm sm:-mt-2 font-semibold-">
                          {selectedOrder.email}
                        </Paragraph2>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mt-[20px] space-y-[20px]">
                  <div className=" px-4 sm:px-[20px] py-[20px] bg-bg_gray rounded-[15px] space-y-[20px]">
                    <div className=" flex justify-between items-center">
                      <Paragraph2 className="text-sm text-gray-500  underline-">
                        {formatTimestamp(
                          typeof selectedOrder.timestamp === "string"
                            ? new Date(selectedOrder.timestamp) // Convert string to Date
                            : selectedOrder.timestamp // Use as is if it's already a Date object
                        )}{" "}
                        {/* Use the custom formatting function */}
                      </Paragraph2>
                      <Paragraph2 className="text-sm text-gray-500  underline-">
                        {selectedOrder.shipped ? "shipped" : " "}
                      </Paragraph2>
                    </div>

                    {selectedOrder.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex grid- grid-cols-6 relative justify-between items-center bg-white p-2 rounded-lg"
                      >
                        <img
                          src={product.productImageURL1.replace(
                            "/upload/",
                            "/upload/w_1000,f_auto/"
                          )}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <Paragraph2 className=" font-bold  w-[150px]-">
                          No. {product.name}
                        </Paragraph2>
                        <ParagraphLink2 className="font-bold text-[14px] col-span-2 ">
                          {product.selectedCategory.name}
                        </ParagraphLink2>

                        <p className="text-[14px]">
                          Nights: {selectedOrder.period.length}
                        </p>
                        <p className="text-[14px]">
                          Check-In: {selectedOrder.checkIn}
                        </p>
                        <p className="text-[14px]">
                          Check-Out {selectedOrder.checkOut}
                        </p>
                        <p className="text-gray-500 text-[14px]">
                          ₦{" "}
                          {new Intl.NumberFormat("en-US").format(
                            Number(product.selectedCategory.price )
                          )} per night
                        </p>
                      </div>
                    ))}
                    <div className=" grid grid-cols-1 xl:grid-cols-2 items-center gap-4 sm:gap-[20px] ">
                      <div>{/*  */}</div>
                      <div>
                        <ParagraphLink2 className="  text-[14px] font-bold ">
                          Total Paid
                        </ParagraphLink2>
                        <div className=" p-4 bg-white rounded-[12px] border-b border-secondary">
                          <p className=" text-[14px] font-bold ">
                            ₦{" "}
                            {new Intl.NumberFormat("en-US", {}).format(
                              Number(selectedOrder.totalPaid)
                            )}
                          </p>
                        </div>
                      </div>
                      <div>
                        <ParagraphLink2 className="  text-[14px] font-bold ">
                          First Name
                        </ParagraphLink2>
                        <div className=" p-4 bg-white rounded-[12px]">
                          <p className=" text-[14px] ">
                            {selectedOrder.firstName}
                          </p>
                        </div>
                      </div>
                      <div>
                        <ParagraphLink2 className="  text-[14px] font-bold ">
                          Last Name
                        </ParagraphLink2>
                        <div className=" p-4 bg-white rounded-[12px]">
                          <p className=" text-[14px] ">
                            {selectedOrder.lastName}
                          </p>
                        </div>
                      </div>
                      <div>
                        <ParagraphLink2 className="  text-[14px] font-bold ">
                          E-mail address{" "}
                        </ParagraphLink2>
                        <div className=" p-4 bg-white rounded-[12px]">
                          <p className=" text-[14px] ">{selectedOrder.email}</p>
                        </div>
                      </div>
                      <div>
                        <ParagraphLink2 className="  text-[14px] font-bold ">
                          Phone Number{" "}
                        </ParagraphLink2>
                        <div className=" p-4 bg-white rounded-[12px]">
                          <p className=" text-[14px] ">
                            {selectedOrder.phoneNumber}
                          </p>
                        </div>
                      </div>

                      <div>
                        <ParagraphLink2 className="  text-[14px] font-bold ">
                          Country{" "}
                        </ParagraphLink2>
                        <div className=" p-4 bg-white rounded-[12px]">
                          <p className=" text-[14px] ">
                            {selectedOrder.country}

                            {countries.find(
                              (country) =>
                                country.code === selectedOrder.country
                            )?.name || selectedOrder.country}
                          </p>
                        </div>
                      </div>
                      <div>
                        <ParagraphLink2 className="  text-[14px] font-bold ">
                          State{" "}
                        </ParagraphLink2>
                        <div className=" p-4 bg-white rounded-[12px]">
                          <p className=" text-[14px] ">{selectedOrder.state}</p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className=" px-[30px] py-[39px] bg-bg_gray rounded-[15px] space-y-[40px]">
                    <div>
                      <ParagraphLink2 className="  text-[14px] font-bold ">
                        Payment Method{" "}
                      </ParagraphLink2>
                      <div className=" p-4 bg-white rounded-[12px]">
                        <p className=" text-[14px] ">
                          {selectedOrder.paymentMethod}
                        </p>
                      </div>
                    </div>
                    <div>
                      <ParagraphLink2 className="  text-[14px] font-bold ">
                        Address{" "}
                      </ParagraphLink2>
                      <div className=" p-4 bg-white rounded-[12px]">
                        <p className=" text-[14px] ">{selectedOrder.address}</p>
                      </div>
                    </div>
                    <div className=" grid grid-cols-2  gap-4 sm:gap-[40px] ">
                      <div>
                        <ParagraphLink2 className="  text-[14px] font-bold ">
                          City
                        </ParagraphLink2>
                        <div className=" p-4 bg-white rounded-[12px]">
                          <p className=" text-[14px] ">{selectedOrder.city}</p>
                        </div>
                      </div>
                      <div>
                        <ParagraphLink2 className="  text-[14px] font-bold ">
                          Zip Code
                        </ParagraphLink2>
                        <div className=" p-4 bg-white rounded-[12px]">
                          <p className=" text-[14px] ">
                            {selectedOrder.zipCode}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <ParagraphLink2 className="  text-[14px] font-bold ">
                        Message/Note{" "}
                      </ParagraphLink2>
                      <div className=" p-4 bg-white rounded-[12px]">
                        <p className=" text-[14px] ">{selectedOrder.message}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 ">
                    <button
                      className="px-4 py-1  rounded-lg text-black hidden bg-bg_gray text-[14px] hover:b"
                      onClick={() => {
                        markAsRetured(selectedOrder.id);
                        handleClick(selectedOrder);
                      }}
                    >
                      Cancled
                    </button>
                    <button
                      className={`px-4 py-1 rounded-lg text-white text-[14px] ${
                        selectedOrder.shipped
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-black hover:bg-primary"
                      }`}
                      onClick={() => {
                        markAsShipped(selectedOrder.id);
                        handleClick(selectedOrder);
                      }}
                      disabled={selectedOrder.shipped}
                    >
                      Checked-In
                    </button>
                  </div>
                </div>
              </div>
            ) : loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              // Render the list of submissions if none is selected
              <div className="space-y-2 scrollable-div- overflow-y-auto- max-h-screen- ">
                <div className=" flex items-center justify-between gap-4">
                  <SearchBar
                    orders={orders} // Pass orders instead of submissions
                    // @ts-ignore
                    onSearchResults={setFilteredOrders} // Use setFilteredOrders to update results
                  />
                  <div className="relative hidden">
                    <button onClick={toggleFilter}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                        />
                      </svg>
                    </button>

                    {isFilterOpen && (
                      <div className="absolute space-y- z-10 top-[30px] right-0 bg-white px-4 py-2 rounded-lg shadow-md">
                        <button onClick={() => showAllOrders()}>
                          <Paragraph2 className="text-sm whitespace-nowrap">
                            All Order
                          </Paragraph2>
                        </button>

                        <button onClick={() => showUnreadOrders()}>
                          <Paragraph2 className="text-sm whitespace-nowrap">
                            Unread orders
                          </Paragraph2>
                        </button>
                        <button onClick={() => showShippedOrders()}>
                          <Paragraph2 className="text-sm whitespace-nowrap">
                            Shipped Orders
                          </Paragraph2>
                        </button>

                        <button onClick={() => showUnshippedOrders()}>
                          <Paragraph2 className="text-sm whitespace-nowrap">
                            Unshipped Orders
                          </Paragraph2>
                        </button>
                        <button onClick={() => showReturedOrders()}>
                          <Paragraph2 className="text-sm whitespace-nowrap">
                            Returned Orders
                          </Paragraph2>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className=" h-screen space-y-4 overflow-y-auto scrollable-div px-2 ">
                  <Header5 className="pt-3">New Reservations</Header5>

                  {filteredOrders.map((order, index) => (
                    <div
                      key={order.id}
                      className={`flex- grid grid-cols-2 sm:grid-cols-8 items-center border px-2  space-x-4 py-2 bg-white rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 ${
                        order.viewed ? "text-gray-400" : "" // Change text color for viewed orders
                      }`}
                      onClick={() => handleClick(order)}
                    >
                      <div
                        className={` h-full flex items-center justify-center  text- rounded-lg  `}
                      >
                        {/* <img src="/images/testProduct.jpg" alt="" /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                          />
                        </svg>
                      </div>
                      <Paragraph1 className="sm:text-lg font-semibold w-full  whitespace-nowrap truncate overflow-hidden">
                        {order.name}
                      </Paragraph1>
                      <Paragraph1 className=" sm:block hidden whitespace-nowrap truncate overflow-hidden ">
                        Guests: {order.guests}
                      </Paragraph1>
                      <Paragraph1 className=" sm:block hidden whitespace-nowrap truncate overflow-hidden ">
                        Apartments: {order.selectedApartments.length}
                      </Paragraph1>
                      <Paragraph1 className=" sm:block hidden whitespace-nowrap truncate overflow-hidden ">
                        {countries.find(
                          (country) => country.code === order.country
                        )?.name || order.country}{" "}
                      </Paragraph1>
                      <Paragraph1 className=" sm:block hidden whitespace-nowrap truncate overflow-hidden ">
                        {new Date(order.timestamp).toLocaleDateString("en-US")}
                      </Paragraph1>
                      <Paragraph1 className="sm:block hidden whitespace-nowrap font-bold truncate overflow-hidden ">
                        ₦
                        {new Intl.NumberFormat("en-US", {}).format(
                          Number(order.totalPaid)
                        )}
                      </Paragraph1>
                      <Paragraph1
                        key={order.id}
                        className={`text-primary- whitespace-nowrap truncate overflow-hidden ${
                          order.expired
                            ? "text-gray-500" // Expired orders
                            : order.returned
                            ? "text-red-500"
                            : order.shipped
                            ? "text-green-500"
                            : "text-[#e6c533]"
                        }`}
                      >
                        {order.expired
                          ? "Expired"
                          : order.returned
                          ? "x"
                          : order.shipped
                          ? "In Service"
                          : "Pending"}
                      </Paragraph1>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOrders;
