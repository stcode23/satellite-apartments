"use client";

import Button from "@/components/Button";
import { Header1, Header1Plus, Header3, Paragraph3 } from "@/components/Text";
import React from "react";
import AOS from "aos";

function HeroSection() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
  return (
    <div className="sm:mt-[120px]">
      <div className=" container1 relative h- [460px xl:rounded-lg overflow-hidden w-full bg-black">
        <div
          className="relative z-10 px-2 xl:p-[100px] py-[32px] pt-[150px] xl:py-[70px]"
          data-aos="fade-right"
        >
          <div className=" flex flex-col xl:w-[60%] w-full xl:space-y-[24px] ">
            <Header3 className="text-white col-span-1">
              Stay in Style: Premium Furnished Apartments for Every Traveler
            </Header3>
            <Paragraph3 className="xl:mt-[16px] mb-[24px] xl:mb-[48px] text-white">
              We provide thoughtfully designed spaces that combine luxury,
              convenience, and a relaxing environment for every guest.
            </Paragraph3>

            <Button
              text="Book Your Stay Now"
              href="/reservation/checkout"
              isLink={true}
              additionalClasses="border-primary xl:w-fit w-full"
            />
          </div>
        </div>

        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover xl:-top-[800px] xl:-left-[0px] -left-[150px] -top-[104px] bg-center- z-0"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dvao98wnj/image/upload/v1739475559/b1a98dcc_edited_17d0_li0qq9.webp')",
          }}
        ></div>
        {/* Dark overlay for the background image */}
        <div className="absolute inset-0  bg-black opacity-55 z-0"></div>
      </div>
    </div>
  );
}

export default HeroSection;
