"use client";

import {
  Header3,
  Header4,
  Paragraph1,
  ParagraphLink1,
} from "@/components/Text";
import Link from "next/link";
import React, { useState } from "react";
import AOS from "aos";
import Map from "./others/Map";


function Section3() {
  const [showMore, setShowMore] = useState(false);

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });


  return (
    <div>
      {" "}
      <div className=" container1 py-[24px] xl:py-[100px]  text-p_black">
        {" "}
        <div
          className=" flex xl:gap-[24px] flex-col items-center w-full mb-[24px] xl:mb-[64px]"
          data-aos="fade-up"
        >
          <Header3>Get to Know Us</Header3>
          <Paragraph1 className="max-w-[883px] text-center">
            Your destination for premium short-term stays and exceptional living
            experiences.
          </Paragraph1>
        </div>
        <div className=" grid col-span-1 xl:items-center xl:grid-cols-6 gap-[24px] xl:gap-[30px]">
          <div className=" xl:col-span-3">
            <div
              className=" bg-white rounded-lg h-[400px] sm:h-[500px] p-[31px overflow-hidden "
              data-aos="fade-left"
            >
              {/* <img
                src="/images/section3.jpg"
                alt="branding"
                className="w-full rounded-lg"
              />{" "} */}
              <Map />
            </div>
          </div>
          <div className=" xl:col-span-3  xl:space-y-[30px]">
            <div className="  " data-aos="fade-right">
              <div className="space-y-[12px]  xl:space-y-[32px] md:space-y-[32px]">
                <Header4>Dedicated to Your Comfort and Convenience</Header4>
                <Paragraph1>
                  Our modern apartments are thoughtfully designed to provide the
                  perfect blend of luxury and practicality, ensuring your stay
                  is as comfortable as possible. Located in a serene and easily
                  accessible neighborhood, we’re less than 30 minutes away from
                  pharmacies, supermarkets, restaurants, schools, hospitals, and
                  Lagos' major commercial hubs.
                </Paragraph1>
                <Paragraph1>
                  Backed by a dedicated management team, we are committed to
                  meeting your needs at any time. From spotless cleaning
                  services to ensuring secure and seamless stays, we pride
                  ourselves on delivering an exceptional experience. Whether
                  you're here for business or leisure, you can count on us to
                  make your stay stress-free and memorable.
                </Paragraph1>

                
              </div>
            </div>
          </div>
        </div>
          <div className=" pt-4">
            <Paragraph1>
              For professionals, families, and travelers seeking reliability and
              convenience, we provide a solution to the hassle of finding
              short-term accommodations that balance comfort with essential
              amenities. From fully equipped kitchens to luxurious bedding and
              spacious living areas, our apartments are tailored to make you
              feel at home while addressing the unique needs of every guest.
            </Paragraph1>
            <Paragraph1>
              Our management team is dedicated to ensuring your stay is
              smooth and stress-free. Whether it’s addressing last-minute
              requests, providing local recommendations, or maintaining the
              highest standards of cleanliness and security, we go the extra
              mile to meet and exceed your expectations. With us, you can focus
              on what matters most—whether it’s work, rest, or exploration.
            </Paragraph1>
          </div>
      </div>
    </div>
  );
}

export default Section3;
