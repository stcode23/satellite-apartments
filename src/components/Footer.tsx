"use client";

import React from "react";
import {
  HeaderAny,
  Paragraph1,
  Paragraph2,
  ParagraphLink1,
  ParagraphLink2,
} from "./Text";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  if (pathname.includes("/admin")) {
    return null; // Return null to hide the navbar
  }

  return (
    <div
      className={
        ["/reservation", "/blog", "/reservation/checkout"].includes(pathname)
          ? "bg-bg_gray hidden xl:py-[100px]-"
          : " bg-white  xl:py-[100px]-"
      }
    >
      <div className="  bg-bg_gray [#4A4A4A]  ">
        <div className=" container1 py-[32px] xl:py-[40px] ">
          {/* desktop */}
          <div className="xl:flex hidden items-start justify-between ">
            <div className="w-[300px] relative hidden- space-y-4">
              <img
                src="/images/logo2.png"
                className="h-[200px]-"
                alt="Satellite Apartment"
              />

              <Paragraph2>
                {" "}
                Premium short-term rental apartments in the heart of Satellite
                Town, offering comfort, style, and convenience.
              </Paragraph2>
            </div>
            <div className=" flex gap-1 [48px] flex-col">
              <Paragraph2 className=" font-bold text-sm">MORE</Paragraph2>
              <Link href="/">
                <ParagraphLink2
                  className={
                    pathname === "/"
                      ? "text-[#ECECEC]- font-bold- "
                      : " text-[#ECECEC]- "
                  }
                >
                  Home
                </ParagraphLink2>
              </Link>{" "}
              <Link href="/about-us">
                {" "}
                <ParagraphLink2
                  className={
                    pathname === "/about-us"
                      ? "text-[#ECECEC]- font-bold- "
                      : " text-[#ECECEC]- "
                  }
                >
                  About
                </ParagraphLink2>
              </Link>
              <Link href="/reservation">
                {" "}
                <ParagraphLink2
                  className={
                    pathname === "/reservation"
                      ? "text-[#ECECEC]- font-bold- "
                      : " text-[#ECECEC]- "
                  }
                >
                  Apartments & Suites
                </ParagraphLink2>
              </Link>
              {/* <Link href="/blogs">
                {" "}
                <ParagraphLink2
                  className={
                    pathname === "/blogs"
                      ? "text-[#ECECEC]- font-bold- "
                      : " text-[#ECECEC]- "
                  }
                >
                  Blog
                </ParagraphLink2>
              </Link> */}
              <Link href="/contact-us">
                {" "}
                <ParagraphLink2
                  className={
                    pathname === "/contact-us"
                      ? "text-[#ECECEC]- font-bold- "
                      : " text-[#ECECEC]- "
                  }
                >
                  Contact us
                </ParagraphLink2>
              </Link>
            </div>
            <div className=" flex flex-col  gap-2 items-center- justify-center-">
              <div className=" flex gap-4 items-center mb-2">
                <Link
                  href="https://www.instagram.com/satellite.apartments/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://res.cloudinary.com/dvao98wnj/image/upload/v1739497214/instagram_xheimp.png"
                    alt="Lagos Apartment"
                    className="w-[20px] h-[20px]"
                  />
                </Link>
                <Link
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://res.cloudinary.com/dvao98wnj/image/upload/v1739497214/facebook-app-symbol_uqjczg.png"
                    alt="Satellite Apartment"
                    className="w-[20px] h-[20px]"
                  />
                </Link>
                <Link
                  href="https://www.tiktok.com/@satellite.apartments"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://res.cloudinary.com/dvao98wnj/image/upload/v1741757129/tik-tok_1_xld8rp.png"
                    alt="Satellite Apartment"
                    className="w-[20px] h-[20px]"
                  />
                </Link>
              </div>

              <div className=" flex items-center gap-2 text-[#ECECEC]- ">
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <Paragraph2> stapartments23@gmail.com</Paragraph2>
              </div>
              <div className=" flex items-center gap-2 text-[#ECECEC]- ">
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
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>

                <Paragraph2> +234 903 028 4261</Paragraph2>
              </div>
            </div>

            <div className=" py-2 px-4 rounded-lg bg-white flex justify-center items-center gap-2 flex-col">
              <p className=" text-[12px]  ">
                {" "}
                Payments secuered by{" "}
                <span className=" font-bold">Flutterwave</span>{" "}
              </p>
              <div className=" flex gap-4 flex-col- items-center">
                {" "}
                <img
                  src="https://res.cloudinary.com/dtipo8fg3/image/upload/v1732661439/image-removebg-preview_6_sygmis.png"
                  alt="Satellite Apartment"
                  className=" w-[30px] h-[30px]"
                />{" "}
                <img
                  src="https://res.cloudinary.com/dtipo8fg3/image/upload/v1732660748/image-removebg-preview_5_doqrew.png"
                  alt="Satellite Apartment"
                  className=" w-[200px]"
                />
              </div>
            </div>
          </div>
          <div className=" xl:flex justify-center items-center hidden py-4"></div>

          {/* mobile  */}
          <div className=" mb-[24px] xl:hidden xl:mb-[110px]">
            <div className=" space-y-[24px] mb-[24px] ">
              {" "}
              <Link href="/">
                {" "}
                <ParagraphLink2 className=" text-[#ECECEC]-  ">
                  Home{" "}
                </ParagraphLink2>
              </Link>
              <Link href="/about-us">
                {" "}
                <ParagraphLink2 className=" text-[#ECECEC]-  ">
                  About{" "}
                </ParagraphLink2>
              </Link>
              <Link href="/reservation">
                {" "}
                <ParagraphLink2 className=" text-[#ECECEC]- ">
                  Apartments & Suites
                </ParagraphLink2>
              </Link>
              {/* <Link href="/blog">
                {" "}
                <ParagraphLink2 className=" text-[#ECECEC]- ">
                  Blog
                </ParagraphLink2>
              </Link> */}
              <Link href="/contact-us">
                {" "}
                <ParagraphLink2 className=" text-[#ECECEC]- ">
                  Contact us
                </ParagraphLink2>
              </Link>
              <div className=" flex flex-col p-4- gap-2 items-center- justify-center-">
                <div className=" flex gap-4 items-center mb-4">
                  <Link
                    href="https://www.instagram.com/satellite.apartments/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://res.cloudinary.com/dvao98wnj/image/upload/v1739497214/instagram_xheimp.png"
                      alt="Satellite Apartment"
                      className="w-[14px] h-[14px]"
                    />
                  </Link>
                  <Link href="/">
                    <img
                      src="https://res.cloudinary.com/dvao98wnj/image/upload/v1739497214/facebook-app-symbol_uqjczg.png"
                      alt="Satellite Apartment"
                      className="w-[14px] h-[14px]"
                    />
                  </Link>
                  <Link href="https://www.tiktok.com/@satellite.apartments">
                    <img
                      src="https://res.cloudinary.com/dvao98wnj/image/upload/v1741757129/tik-tok_1_xld8rp.png"
                      alt="Satellite Apartment"
                      className="w-[14px] h-[14px]"
                    />
                  </Link>
                </div>
                <div className=" flex items-center gap-2 text-[#ECECEC]- ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>

                  <Paragraph2> stapartments23@gmail.com</Paragraph2>
                </div>
                <div className=" flex items-center gap-2 text-[#ECECEC]- ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>

                  <Paragraph2> +234 903 028 4261</Paragraph2>
                </div>
              </div>
            </div>

            <div className="col-span-1 order-2 xl:order-1 hidden">
              {" "}
              <img
                src="/images/logo2.png"
                alt="Satellite Apartment"
                className=" "
              />{" "}
            </div>
          </div>

          <div className=" border-t border-p_black pt-[24px] xl:pt-[32px] flex flex-wrap justify-between">
            <div className=" flex justify-center items-center xl:hidden py-4">
              <div className=" py-2 px-4 rounded-lg bg-white flex justify-center items-center gap-2 flex-col">
                <p className=" text-[12px]  ">
                  {" "}
                  Payments secuered by{" "}
                  <span className=" font-bold">Flutterwave</span>{" "}
                </p>
                <div className=" flex gap-4 flex-col- items-center">
                  {" "}
                  <img
                    src="https://res.cloudinary.com/dtipo8fg3/image/upload/v1732661439/image-removebg-preview_6_sygmis.png"
                    alt="Lagos Apartment"
                    className=" w-[20px] h-[20px]"
                  />{" "}
                  <img
                    src="https://res.cloudinary.com/dtipo8fg3/image/upload/v1732660748/image-removebg-preview_5_doqrew.png"
                    alt="Satellite Apartment"
                    className=" w-[150px]"
                  />
                </div>
              </div>
            </div>
            <ParagraphLink2 className="  text-[#ECECEC]- ">
              © 2025 Satellite Apartment Ltd. All rights reserved.
            </ParagraphLink2>
            <Link href="https://www.cybalbuzz.com/" className="xl:py-0 py-2">
              {" "}
              <ParagraphLink2 className="  text-[#ECECEC]- ">
                Built with ❤️ by CybalBuzz
              </ParagraphLink2>
            </Link>

            <div className="flex flex-wrap gap-[24px]  items-center">
              <Link href="/privacy-policy" className="">
                {" "}
                <ParagraphLink2 className="  text-[#ECECEC]- underline ">
                  Privacy Policy
                </ParagraphLink2>
              </Link>

              <Link href="/terms-of-service">
                <ParagraphLink2 className="  text-[#ECECEC]- underline">
                  Terms of Service{" "}
                </ParagraphLink2>
              </Link>

              {/* <Link href="/">
                {" "}
                <ParagraphLink2 className=" text-[#ECECEC]- underline">
                  Cookies Settings{" "}
                </ParagraphLink2>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
