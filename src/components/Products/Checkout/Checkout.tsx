import React, { useState, useRef, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db } from "@/lib/firebase"; // Import Firestore database
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore"; // Firestore functions
import { sendEmail } from "@/lib/serverActions"; // Import server action
import useCartStore from "@/stores/cartStore";
import useUserInfoStore from "@/stores/userInfoStore"; // Import the user info store
import html2canvas from "html2canvas";
import { useExchangeRateStore } from "@/stores/exchangeRateStore";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import {
  HeaderAny,
  Paragraph2,
  ParagraphLink1,
  ParagraphLink2,
} from "@/components/Text";
import Section2 from "./Section2";
import CheckAvailability from "@/components/home/sections/others/CheckAvailability";
import PeriodDisplay from "./PeriodDisplay";
import useBookingStore from "@/stores/useBookingStore";
import BookingReceipt from "./BookingReceipt";

type CheckoutProps = {
  products: any;
  total: number;
  logoUrl: string;
  totalProductWeight: any;
  onShippingFeeChange: (fee: number) => void; // Callback for shipping fee
  onTotalBillChange: (totalBill: number) => void;
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
});

const Checkout: React.FC<CheckoutProps> = ({
  products,
  total,
  logoUrl,
  totalProductWeight,
}) => {
  const {
    email,
    phoneNumber,
    country,
    firstName,
    lastName,
    city,
    state,
    saveInfo,
    setUserInfo,
  } = useUserInfoStore();
  const [activeTab, setActiveTab] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    email: email || "",
    phoneNumber: phoneNumber || "",
    country: country || "",
    firstName: firstName || "",
    lastName: lastName || "",
    city: city || "",
    state: state || "",
    saveInfo: saveInfo || true,
    note: "",
  });
  const {
    checkIn,
    checkOut,
    guests,
    apartmentType,
    selectedApartments,
    period,
  } = useBookingStore.getState();

  const clearCart = useCartStore((state) => state.clearCart);
  const [isloading, setIsLoading] = useState(false);
  const [paymentDenied, setPaymentDenied] = useState(false);
  const [canceledPay, setCanceledPay] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState<string>(""); // State to store payment response
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const { selectedCurrency, exchangeRate } = useExchangeRateStore();

  const currencySymbol = selectedCurrency === "USD" ? "$" : "₦";

  const handleBack = () => setActiveTab((prev) => prev - 1);

  const handleSaveInfo = (values: any, save: boolean) => {
    if (save) {
      setUserInfo({
        ...values,
        saveInfo: true,
      });
    }
  };

  // Calculate number of days
  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;

  let numberOfDays = 1; // Default to 1 day if dates are missing or invalid
  if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
    numberOfDays = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  const [innerTab, setInnerTab] = useState(0);

  const handleInnerNext = () => {
    if (innerTab < 2) {
      setInnerTab((prev) => prev + 1);
    }
  };

  const handleInnerBack = () => {
    setInnerTab((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const totalBill = total * numberOfDays;

  const sanitizeProduct = (product: any) => {
    if (
      !product.id ||
      !product.name ||
      product.productImageURL1 === undefined ||
      product.selectedCategory.price === undefined
    ) {
      throw new Error(`Invalid product data: ${JSON.stringify(product)}`);
    }

    return {
      id: product.id,
      name: product.name,
      productImageURL1: product.productImageURL1,
      price: parseFloat(product.selectedCategory.price), // Ensure numeric type
    };
  };

  const totalBillWave =
    selectedCurrency === "USD" && exchangeRate > 0
      ? (totalBill / exchangeRate).toFixed(2)
      : totalBill;

  const currencyWave = selectedCurrency === "USD" ? "USD" : "NGN";

  const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;

  const config = {
    public_key: publicKey,
    tx_ref: Date.now(),
    amount: totalBillWave,
    currency: currencyWave,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email,
      phone_number: phoneNumber,
      name: `${firstName} ${lastName}`,
    },
    customizations: {
      title: "Satellite Apartments Payment",
      description: "Payment for the Selected Apartments",
      logo: "https://res.cloudinary.com/dvao98wnj/image/upload/v1738849472/Untitled_design_1_wz4aea.png",
    },
  };

  // @ts-ignore
  const handleFlutterPayment = useFlutterwave(config);

  
  const submitOrderToFirestore = async (values: any) => {
    setIsLoading(true);
    try {
      // Sanitize and format the products array
      const sanitizedProducts = products.map(sanitizeProduct);

      // Add the order document to Firestore
      const docRef = await addDoc(collection(db, "Orders"), {
        ...values,
        checkIn,
        checkOut,
        guests,
        apartmentType,
        period,
        selectedApartments,
        paymentResponse,
        timestamp: new Date(),
        viewed: false,
        returned: false,
        totalPaid: totalBill,
        products: sanitizedProducts, // Use sanitized products
      });

      // Update `BookedDays` for each product in Firestore
      const updateProductPromises = products.map(async (product: any) => {
        const productRef = doc(db, "products", product.id);
        const productSnapshot = await getDoc(productRef);

        if (!productSnapshot.exists()) {
          console.error(`Product with ID ${product.id} does not exist.`);
          return;
        }

        const productData = productSnapshot.data();
        const existingBookedDays = productData.BookedDays || [];

        // Merge existing booked days with the new period
        const updatedBookedDays = Array.from(
          new Set([...existingBookedDays, ...period])
        );

        // Update Firestore with the new booked days
        await updateDoc(productRef, { BookedDays: updatedBookedDays });
      });

      // Wait for all product updates to complete
      await Promise.all(updateProductPromises);

      console.log("Document written with ID: ", docRef.id);

      // Wait for all updates to complete

      // Send email notification
      await sendEmail();

      // useBookingStore.getState().reset();

      setIsLoading(false); // Mark loading as complete
      console.log("Order and product quantities updated successfully.");
    } catch (error) {
      console.error("Error processing order: ", error);
      setIsLoading(false); // Mark loading as complete in case of error
    }
  };

  return (
    <div className="  space-y-6 bg-white  p-0 relative rounded-lg">
      {isloading && (
        <div className=" absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-[100px] w-[100px] border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      {/* <button onClick={async () => await sendEmail()}>Send Email</button> */}

      <div className="flex justify-around- items-center gap-2 border-b- pb-3">
        <div
          // onClick={() => setActiveTab(0)}
          className={`text-sm  ${
            activeTab === 0 ? "text-primary font-semibold" : "text-gray-400"
          }`}
        >
          Information
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>

        <div
          // onClick={() => setActiveTab(1)}
          className={`text-sm ${
            activeTab === 1 ? "text-primary font-semibold" : "text-gray-400"
          }`}
        >
          Payment
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
        <div
          // onClick={() => setActiveTab(2)}
          className={`text-sm  ${
            activeTab === 2 ? "text-primary font-semibold" : "text-gray-400"
          }`}
        >
          Receipt
        </div>
      </div>

      {/* Information Tab */}
      {activeTab === 0 && (
        <div>
          <div className="">
            {/* Inner Tab Content */}
            <div className="">
              {innerTab === 0 && (
                <div className=" border rounded-lg">
                  <CheckAvailability handleInnerNext={handleInnerNext} />

                  {/* <PeriodDisplay /> */}
                </div>
              )}
              {innerTab === 1 && (
                <div>
                  <Section2
                    handleInnerBack={handleInnerBack}
                    handleInnerNext={handleInnerNext}
                  />
                </div>
              )}
              {innerTab === 2 && (
                <div>
                  {" "}
                  <Formik
                    initialValues={shippingInfo}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      // handleNext(values);
                      console.log("Submit clicked", values); // Add this

                      handleSaveInfo(values, values.saveInfo);
                      // submitOrderToFirestore(shippingInfo);
                      handleFlutterPayment({
                        callback: (response) => {
                          console.log(response);
                          if (response.status === "successful") {
                            const PaymentFlw_ref = response.flw_ref;
                            setPaymentResponse(PaymentFlw_ref);
                            submitOrderToFirestore(shippingInfo);
                            setActiveTab(2);
                          } else {
                            setPaymentDenied(true);
                          }
                          closePaymentModal();
                        },
                        onClose: () => {
                          setCanceledPay(true);
                        },
                      });
                    }}
                  >
                    {({ setFieldValue }) => (
                      <Form className="space-y-4 min-h-screen">
                        <form>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <ParagraphLink2 className="block text-sm font-bold text-gray-700">
                                Email
                              </ParagraphLink2>
                              <Field
                                name="email"
                                type="email"
                                className="mt-1 block w-full p-2 border rounded-md"
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div>
                              <ParagraphLink2 className="block text-sm font-bold text-gray-700">
                                Phone number
                              </ParagraphLink2>
                              <Field
                                name="phoneNumber"
                                className="mt-1 block w-full p-2 border rounded-md"
                              />
                              <ErrorMessage
                                name="phoneNumber"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          </div>
                        </form>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <ParagraphLink2 className="block text-sm font-bold text-gray-700">
                              First Name
                            </ParagraphLink2>
                            <Field
                              name="firstName"
                              className="mt-1 block w-full p-2 border rounded-md"
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div>
                            <ParagraphLink2 className="block text-sm font-bold text-gray-700">
                              Last Name
                            </ParagraphLink2>
                            <Field
                              name="lastName"
                              className="mt-1 block w-full p-2 border rounded-md"
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <ParagraphLink2 className="block text-sm font-bold text-gray-700">
                            Country
                          </ParagraphLink2>
                          <Field
                            name="country"
                            className="mt-1 block w-full p-2 border rounded-md"
                          />

                          <ErrorMessage
                            name="country"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <ParagraphLink2 className="block text-sm font-bold text-gray-700">
                              State
                            </ParagraphLink2>
                            <Field
                              name="state"
                              className="mt-1 block w-full p-2 border rounded-md"
                            />

                            <ErrorMessage
                              name="state"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div>
                            <ParagraphLink2 className="block text-sm font-bold text-gray-700">
                              City
                            </ParagraphLink2>
                            <Field
                              name="city"
                              className="mt-1 block w-full p-2 border rounded-md"
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[12px] ">
                          <Field
                            type="checkbox"
                            name="saveInfo"
                            // className="mr-2"
                            className="form-checkbox min-h-4 min-w-4 text-orange-500 appearance-none checked:bg-primary checked:border-transparent focus:outline-none border border-primary rounded checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:flex checked:after:justify-center"
                          />
                          <ParagraphLink2>
                            Save this information for next time
                          </ParagraphLink2>
                        </div>
                        {paymentDenied && (
                          <div className=" flex p-4 items-center h-[200px] w-full  justify-center rounded-lg border mt-4 bg-white bg-opacity-50 z-50">
                            <p>
                              Your payment was declined. Please{" "}
                              <span
                                onClick={() => window.location.reload()}
                                className=" text-primary underline cursor-pointer"
                              >
                                try again later.{" "}
                              </span>
                            </p>
                          </div>
                        )}

                        {canceledPay && (
                          <div className=" flex p-4 items-center justify-center h-[200px] w-full rounded-lg border mt-4 bg-white bg-opacity-50 z-50">
                            <p>
                              Your payment was canceled by you. Please{" "}
                              <span
                                onClick={() => window.location.reload()}
                                className=" text-primary underline cursor-pointer"
                              >
                                try again later.{" "}
                              </span>
                            </p>
                          </div>
                        )}
                        <div className=" gap-1 flex justify-between items-center">
                          <button
                            className="p-2 px-4 sm:w-full hover:bg-gray-200 bg-gray-300 rounded disabled:opacity-50"
                            onClick={handleInnerBack}
                          >
                            <ParagraphLink2>Back</ParagraphLink2>
                          </button>{" "}
                          <button
                            type="submit"
                            className={`w-full font-bold bg-primary text-white p-2 rounded-md hover:bg-black ml-4 ${
                              paymentDenied || canceledPay
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={paymentDenied || canceledPay} // Disable the button conditionally
                          >
                            <ParagraphLink2 className=" whitespace-nowrap">
                              Proceed to Payment
                            </ParagraphLink2>{" "}
                          </button>
                        </div>
                        
                      </Form>
                    )}
                  </Formik>
                  
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
          </div>
        </div>
      )}

      {/* Payment Tab */}

      {activeTab === 1 && (
        <div className="hidden">
          {" "}
          <button
            type="submit"
            className={`w-full font-bold bg-primary text-white p-2 rounded-md hover:bg-black ml-4 ${
              paymentDenied || canceledPay
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={paymentDenied || canceledPay} // Disable the button conditionally
          >
            <ParagraphLink2 className=" whitespace-nowrap">
              Proceed to Payment
            </ParagraphLink2>{" "}
          </button>
          v <button></button>
        </div>
      )}
      {/* Receipt Tab */}
      {activeTab === 2 && (
        <BookingReceipt
          logoUrl={logoUrl} // Change to your actual logo path
          currencySymbol={currencySymbol}
          selectedCurrency={selectedCurrency}
          exchangeRate={exchangeRate}
          totalBill={totalBill}
          products={products}
          paymentResponse={paymentResponse}
        />
      )}
    </div>
  );
};

export default Checkout;
