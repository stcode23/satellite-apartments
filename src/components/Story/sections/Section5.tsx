"use client";

import Button from "@/components/Button";
import { Header3, Header4, Header5, Paragraph1 } from "@/components/Text";
import Link from "next/link";
import React, { useState } from "react";
import AOS from "aos";


function Section5() {
  const [openedQuestionIndex, setOpenedQuestionIndex] = useState(null);

  const toggleParagraphVisibility = (index: any) => {
    setOpenedQuestionIndex(openedQuestionIndex === index ? null : index);
  };

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  // Array of FAQ items
  const faqs = [
    {
      id: 1,
      question: "Q. What types of apartments do you offer?",
      answer:
        "We offer a range of accommodations, including Basic Apartments, Standard Apartments, and Premium Suites, designed to cater to various needs and budgets.",
    },
    {
      id: 2,
      question: "Q. How can I book an apartment?",
      answer:
        "Booking is easy! Enter your check-in and check-out dates, the number of guests, and let our system find available options for you. Follow the guided process to confirm your reservation.",
    },
    {
      id: 3,
      question: "Q. What amenities are included?",
      answer:
        "Our apartments come with fully equipped kitchens, comfortable beds, free Wi-Fi, flat-screen TVs, air conditioning, 24/7 front desk support, and complimentary cleaning services.",
    },
    {
      id: 4,
      question: "Q. Is parking available on the property?",
      answer:
        "Yes, we offer secure parking spaces for all our guests, ensuring the safety of your vehicle during your stay.",
    },
    {
      id: 5,
      question: "Q. What is the cancellation policy?",
      answer:
        "Our cancellation policy depends on the booking terms. Please review the terms during checkout or contact our support team for details.",
    },
    {
      id: 6,
      question: "Q. Are your apartments located near key attractions?",
      answer:
        "Yes, our apartments are situated in a quiet, accessible location, less than 30 minutes away from supermarkets, pharmacies, restaurants, schools, hospitals, and Lagos' major commercial hubs.",
    },
  ];


  return (
    <div>
      <div className=" container1 py-[54px] xl:p5-[100px] text-p_black">
        {" "}
        <div
          className=" flex flex-col xl:gap-[24px] items-center w-full mb-[24px] xl:mb-[64px]"
          data-aos="fade-up"
        >
          <Header3>
            Frequently Asked <span className=" text-primary">Questions</span>
          </Header3>
          <Paragraph1 className="max-w-[883px] text-center">
            Get all the information you need about our apartments, booking
            process, amenities, and more.
          </Paragraph1>
        </div>
        <div
          className="flex-row items-center justify-center py-4 xl:py-[37px] bg-bg_gray rounded-lg "
          data-aos="flip-up"
        >
          {/* Mapping over FAQ items */}
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`w-full px-4 xl:px-[37px] pt-4 xl:py-[21px] ${
                index !== faqs.length - 1
                  ? "border-b-4 border-[#E4E4E7]"
                  : "xl:-mb-6"
              }`}
            >
              <div
                className="flex items-start   justify-between cursor-pointer"
                onClick={() => toggleParagraphVisibility(faq.id)}
              >
                <Header5 className="text-[18px] w-[250px] xl:w-full font-medium text-primary-50">
                  {faq.question}
                </Header5>
                <button
                  className=" flex justify-center items-center h-4 w-4  cursor-pointer"
                  onClick={() => toggleParagraphVisibility(faq.id)}
                >
                  <img
                    src={
                      openedQuestionIndex === faq.id
                        ? "/icons/dash.svg"
                        : "/icons/plus.svg"
                    }
                    alt=""
                    className=""
                    style={{
                      transform:
                        openedQuestionIndex === faq.id
                          ? "rotate(0deg)" // Keep it static or adjust if necessary
                          : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </button>
              </div>
              <p
                className={`text-[12px] xl:text-[14px]- md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[18px]  overflow-hidden  transition-all pb-4 pt-4 max-w-[90%] duration-300 ${
                  openedQuestionIndex === faq.id ? "max-h-[500px]" : "max-h-0"
                }`}
                style={{ opacity: openedQuestionIndex === faq.id ? "1" : "0" }}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section5;
