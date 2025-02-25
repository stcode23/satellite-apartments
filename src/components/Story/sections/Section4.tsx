"use client";


import { Header3, Header4, Paragraph1, Paragraph2, ParagraphLink1 } from "@/components/Text";
import Link from "next/link";
import React from "react";
import AOS from "aos";

function Section4() {

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <div className=" bg-bg_gray">
      <div className=" container1 py-[54px] xl:py-[100px]  text-p_black">
        {" "}
        <div
          className=" flex flex-col xl:gap-[24px] items-center w-full mb-[24px] xl:mb-[64px]"
          data-aos="fade-up"
        >
          <Header3 className="text-center">
            Our <span className="text-primary">Simple 3-Step</span> Process for
            Effortless Booking
          </Header3>
          <Paragraph1 className="max-w-[883px] text-center">
            Finding your ideal short-term rental has never been easier. Follow
            our simple steps to secure your perfect apartment and enjoy a
            seamless experience.
          </Paragraph1>
        </div>
        <div className=" grid grid-cols-1 xl:grid-cols-6 gap-[24px] xl:gap-[30px]">
          <div className=" xl:col-span-2">
            <div
              className=" bg-[#e1ceff] py-[24px] xl:py-[53px] p-[32px] rounded-lg "
              data-aos="fade-right"
            >
              <div className="space-y-[24px] xl:space-y-[32px]    ">
                <div className=" flex w-full justify-end-  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                </div>
                <Header4>Search & Select</Header4>
                <Paragraph2>
                  Begin by entering your check-in and check-out dates, along
                  with the number of guests. Our system will filter and display
                  apartments that suit your needs, making it simple to find the
                  perfect fit.
                </Paragraph2>
                <div>
                  <Link
                    href="/reservation/checkout"
                    className="text-[20px] font-bold underline"
                  >
                    <ParagraphLink1>Start Your Search</ParagraphLink1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className=" xl:col-span-2 ">
            <div className=" bg-[#c7cbb9]  rounded-lg " data-aos="fade-up">
              <div className="space-y-[24px] xl:space-y-[32px] p-[32px] py-[24px]  xl:py-[53px]">
                <div className=" flex w-full justify-end-  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                </div>
                <Header4>Choose Your Apartment</Header4>
                <Paragraph2>
                  Select your ideal apartment and proceed with a secure booking.
                  Enjoy a seamless reservation experience designed for your
                  comfort and convenience.
                </Paragraph2>
                <div>
                  <Link
                    href="/reservation/checkout"
                    className="text-[20px] font-bold underline"
                  >
                    <ParagraphLink1>Proceed to Book</ParagraphLink1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className=" xl:col-span-2 ">
            <div className=" bg-[#ff7878]  rounded-lg " data-aos="fade-left">
              <div className="space-y-[24px] xl:space-y-[32px] p-[32px] py-[24px]  xl:py-[53px]">
                <div className=" flex w-full justify-end-  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                    />
                  </svg>
                </div>
                <Header4>Stay & Enjoy</Header4>
                <Paragraph2>
                  Once booked, your apartment will be ready to welcome you.
                  Enjoy amenities like free Wi-Fi, 24/7 front desk support, and
                  serene surroundings. Relax and focus on your work, leisure, or
                  adventure during your stay.
                </Paragraph2>
                <div>
                  <Link href="/" className="text-[20px] font-bold underline">
                    <ParagraphLink1>Explore Amenities</ParagraphLink1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section4;
