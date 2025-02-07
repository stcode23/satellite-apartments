"use client";

import Button from "@/components/Button";
import {
  Header3,
  Header4,
  Paragraph1,
  ParagraphLink1,
} from "@/components/Text";
import Link from "next/link";
import React from "react";
import AOS from "aos";

function Section2() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <div>
      <div className=" container1 pt-[24px] xl:pt-[50px]  text-p_black">
        {" "}
        <div
          className=" flex flex-col gap-[8px] xl:gap-[24px] items-center w-full mb-[24px] xl:mb-[64px]"
          data-aos="fade-up"
        >
          <Header3>The Satellite Apartments & Shortlet Homes </Header3>
          <Paragraph1 className=" max-w-[883px] text-center ">
            Welcome to Satellite Apartments & Shortlet Homes, your premier
            destination for short-term rental accommodations in the heart of
            Lagos, Nigeria. Nestled in the vibrant Satellite Town, our
            apartments offer the perfect blend of modern comfort and authentic
            African charm. Whether you're visiting for business, leisure, or a
            special occasion, our fully furnished spaces provide a seamless
            booking experience and a luxurious stay tailored just for you.
            Explore, book, and immerse yourself in the essence of the perfect
            African experience!
          </Paragraph1>
        </div>
        <div className=" grid grid-cols-1 xl:grid-cols-5  sm:grid-cols-1 gap-[24px] xl:gap-[30px]">
          <div className="  xl:col-span-3">
            <div className=" bg-bg_gray rounded-[20px] overflow-hidden " data-aos="fade-right">
              <img
                src="https://res.cloudinary.com/dvao98wnj/image/upload/v1738849472/lagos-pic-13_nc3jec.jpg"
                alt="branding"
                className="w-full "
              />{" "}
              <div className=" space-y-[20px] xl:space-y-[32px] p-[24px] xl:p-[32px] flex flex-col w-full">
                <Header4>Your Perfect Stay Awaits</Header4>{" "}
                <Paragraph1>
                  Offering premium short-term rental accommodations designed for
                  comfort and convenience. Each apartment is fully furnished,
                  featuring modern amenities and thoughtful details to ensure a
                  luxurious experience. Whether for business or leisure, these
                  spaces provide the ideal setting for relaxation and
                  productivity.
                </Paragraph1>
                <Button
                  text="Book an apartment"
                  href="/apply"
                  isLink={true}
                  additionalClasses="border-0 xl:w-fit w-full "
                />
              </div>
            </div>
          </div>
          <div className=" xl:col-span-2 space-y-[24px] xl:space-y-[30px]">
            <div
              className=" bg-bg_gray rounded-[20px] "
              data-aos="fade-down-left"
            >
              <div className="space-y-[24px] xl:space-y-[32px] p-[24px] xl:p-[32px]">
                <Header4>At the Center of the African Experience</Header4>{" "}
                <Paragraph1>
                  Experience the vibrant culture, rich heritage, and unmatched
                  energy of Lagos from a space designed for comfort and
                  convenience. Surrounded by the bustling charm of Satellite
                  Town, these accommodations provide the perfect retreat after a
                  day of exploration, business, or leisure. Immerse yourself in
                  the rhythm of Africa while enjoying a modern, luxurious haven.
                </Paragraph1>
                {/* <img src="/images/people.svg" alt="branding" className="w-" />{" "} */}
              </div>
            </div>
            <div
              className=" bg-primary relative overflow-hidden text-white rounded-[24px] "
              data-aos="fade-up-left"
            >
              <div className=" absolute bottom-0 -right-[60px] flex w-full justify-end  ">
                <img src="/images/wave2.svg" alt="" />
              </div>
              <div className="xl:space-y-[6px] 2xl:space-y-[32px] space-y-[24px] p-[24px] xl:p-[32px]">
                <div className=" flex w-full justify-end  ">
                  <img src="/images/3_circles.svg" alt="" />
                </div>
                <Header4>Seamless Booking</Header4>{" "}
                <Paragraph1>
                  Enjoy easy booking and secure international payment options
                  for a hassle-free experience anywhere in the world.
                </Paragraph1>
                <div>
                  <Link
                    href="/apply"
                    className=" text-[20px] font-bold text-white underline"
                  >
                    <ParagraphLink1> Let{"'"}s talk</ParagraphLink1>
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

export default Section2;
