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
          className=" flex text-center flex-col gap-[8px] xl:gap-[24px] items-center w-full mb-[24px] xl:mb-[64px]"
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
            <div
              className=" bg-bg_gray rounded-[20px] overflow-hidden "
              data-aos="fade-right"
            >
              <img
                src="https://res.cloudinary.com/dvao98wnj/image/upload/v1738849472/lagos-pic-13_nc3jec.jpg"
                alt="Satellite Apartment"
                className="w-full "
              />{" "}
              <div className=" space-y-[20px] xl:space-y-[32px] p-[24px] xl:p-[32px] flex flex-col w-full">
                <Header4>
                  Prime Serviced Apartments in Lagos – Perfect for Short & Long
                  Stays
                </Header4>{" "}
                <Paragraph1>
                  A home away from home with fully furnished apartments that
                  cater to all your needs. Each unit boasts a modern kitchen,
                  cozy living spaces with a flat-screen TV, and luxurious beds
                  designed for ultimate comfort. Enjoy complimentary cleaning
                  services, free high-speed Wi-Fi, and 24/7 front desk support
                  to ensure a seamless stay. On-site car parking adds
                  convenience to your travel plans.
                </Paragraph1>
                <Button
                  text="Book an apartment"
                  href="/reservation/checkout"
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
                <Header4>Living at the Heart of Africa’s Vibrance</Header4>{" "}
                <Paragraph1>
                  Nestled in a quiet and serene location, the apartments are
                  less than 30 minutes from essential amenities, including
                  pharmacies, supermarkets, restaurants, schools, hospitals, and
                  Lagos' major commercial hubs. Whether you're visiting for
                  business, leisure, or a family trip, these apartments provide
                  the perfect balance of comfort, convenience, and
                  accessibility.
                </Paragraph1>
                {/* <img src="/images/people.svg" alt="branding" className="w-" />{" "} */}
              </div>
            </div>
            <div
              className=" bg-primary relative overflow-hidden text-white rounded-[24px] "
              data-aos="fade-up-left"
            >
              <div className=" absolute bottom-0 -right-[60px] flex w-full justify-end  ">
                <img src="/images/wave2.svg" alt="Satellite Apartment" />
              </div>
              <div className="xl:space-y-[6px] 2xl:space-y-[32px] space-y-[24px] p-[24px] xl:p-[32px]">
                <div className=" flex w-full justify-end  ">
                  <img src="/images/3_circles.svg" alt="Satellite Apartment" />
                </div>
                <Header4>
                  Quick & Easy Apartment Reservations - Book Your Stay in
                  Minutes{" "}
                </Header4>{" "}
                <Paragraph1>
                  Enjoy easy booking and secure international payment options
                  for a hassle-free experience anywhere in the world.
                </Paragraph1>
                <div>
                  <Link
                    href="/contact-us"
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
