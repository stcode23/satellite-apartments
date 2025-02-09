import React from "react";
import { Paragraph2 } from "./Text";
import Link from "next/link";

function TopNav() {
  return (
    <div className=" bg-primary  w-full text-white  py-1 hidden sm:flex">
      <div className=" container1 flex w-full ">
        <div className=" flex w-full justify-between items-center">
          {" "}
          <div className=" flex gap-4 items-center ">
            <Link
              href="https://www.instagram.com/grandiosegrin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1729676533/utilities/templates/instagram_2_ujmgac.png"
                alt=""
                className="w-[14px] h-[14px]"
              />
            </Link>
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1729676725/utilities/templates/facebook-app-symbol_x2whit.png"
                alt=""
                className="w-[14px] h-[14px]"
              />
            </Link>
            <Link
              href="https://www.x.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1729675779/utilities/templates/twitter_3_sihd1i.png"
                alt=""
                className="w-[14px] h-[14px]"
              />
            </Link>
          </div>{" "}
          <div className=" flex gap-4 items-center">
            <div className=" flex items-center gap-2 text-[#ECECEC]- ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>

              <Paragraph2> grandiosegrin@gmail.com</Paragraph2>
            </div>
            <div className=" flex items-center gap-2 text-[#ECECEC]- ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>

              <Paragraph2> +234 707 832 8640</Paragraph2>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
