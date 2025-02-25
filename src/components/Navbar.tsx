"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./Button";
import { ParagraphLink1 } from "./Text";
import { usePathname } from "next/navigation";
import Image from "next/image";
import CartSummary from "./Cart/CartSummary";
import useCartStore, { useCartCount } from "@/stores/cartStore";
import SearchBar from "./SearchBar";
import CurrencySwitcher from "./CurrencySwitcher";
import TopNav from "./TopNav";

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const cartCount = useCartCount();
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartOpen = useCartStore((state) => state.cartOpen);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  if (pathname.includes("/admin")) {
    return null; // Return null to hide the navbar
  }

  return (
    <div className="fixed w-full z-20">
      <TopNav />

      <div
        className={
          ["/contact-us", "/privacy-policy", "/terms-of-service"].includes(
            pathname
          )
            ? "bg-bg_gray- bg-white py-[8px]-- border-b border-primary-   flex w-full z-20 py-[8px] "
            : " bg-white py-[8px]-  flex w-full border-b border-primary- z-20"
        }
      >
        <div className="  w-full">
          <div className=" container1 flex justify-between font-semibold- w-full items-center">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt=""
                className="h-[60px] xl:flex hidden-"
              />
              {/* <img
              src="/images/logo3.png"
              alt=""
              className="h-[30px] xl:hidden"
            /> */}
            </Link>
            {/* <div className=" relative">
            {" "}
            <div className=" border-2 border-primary rounded-full w-2 h-2 p- absolute top-1 -left-1 "></div>
            <HeaderAny className=" text-[24px]">GrandioseGrin</HeaderAny>{" "}
          </div> */}
            <div className="  gap-[48px] items-center hidden lg:flex">
              <Link href="/">
                <ParagraphLink1
                  className={pathname === "/" ? "text-primary font-bold " : " "}
                >
                  Home
                </ParagraphLink1>
              </Link>
              <Link href="/reservation/checkout">
                {" "}
                <ParagraphLink1
                  className={
                    pathname === "/reservation/checkout"
                      ? "text-primary font-bold "
                      : "  "
                  }
                >
                  Make a Reservation
                </ParagraphLink1>
              </Link>

              <Link href="/about-us">
                {" "}
                <ParagraphLink1
                  className={
                    pathname === "/about-us" ? "text-primary font-bold " : "  "
                  }
                >
                  About
                </ParagraphLink1>
              </Link>

              {/* <Link href="/blog">
                {" "}
                <ParagraphLink1
                  className={
                    pathname === "/blog" ? "text-primary font-bold " : "  "
                  }
                >
                  Blog
                </ParagraphLink1>
              </Link> */}
              <Link href="/contact-us">
                {" "}
                <ParagraphLink1
                  className={
                    pathname === "/contact-us"
                      ? "text-primary font-bold "
                      : "  "
                  }
                >
                  Contact us
                </ParagraphLink1>
              </Link>

              {/* <SearchBar toggleMenu={toggleMenu} /> */}
            </div>
            <div className="hidden lg:flex items-center gap-[24px]">
              <CurrencySwitcher />
            </div>
            <div className="lg:hidden border p-2 flex items-center rounded-lg">
              <button onClick={toggleMenu} className="focus:outline-none">
                <Image
                  height={2}
                  width={20}
                  src={menuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
                  alt="menu"
                  className=""
                />
              </button>
            </div>
            {/* <div
              onClick={() => toggleCart()}
              className=" border rounded-lg p-2 cursor-pointer flex relative "
            >
              {" "}
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              <div className=" absolute -top-2 -right-4 bg-primary p-1 px-2 text-white text-[10px] rounded-full">
                {cartCount > 0 ? cartCount : 0}
              </div>
            </div> */}

            {/* <CartSummary isOpen={cartOpen} onClose={() => toggleCart()} /> */}
          </div>

          {/* mobile dropdown */}
          {menuOpen && (
            <div className="p-[24px] flex flex-col justify-center font-semibold items-center">
              <div className=" container1 flex flex-col w-full space-y-[24px] justify-between items-center">
                <Link href="/" onClick={toggleMenu}>
                  <ParagraphLink1
                    className={
                      pathname === "/" ? "text-primary font-bold " : " "
                    }
                  >
                    Home
                  </ParagraphLink1>
                </Link>
                <Link href="/reservation/checkout" onClick={toggleMenu}>
                  {" "}
                  <ParagraphLink1
                    className={
                      pathname === "/reservation/checkout"
                        ? "text-primary font-bold "
                        : "  "
                    }
                  >
                    Make a Reservation
                  </ParagraphLink1>
                </Link>
                <Link href="/about-us" onClick={toggleMenu}>
                  {" "}
                  <ParagraphLink1
                    className={
                      pathname === "/about-us"
                        ? "text-primary font-bold "
                        : "  "
                    }
                  >
                    About
                  </ParagraphLink1>
                </Link>

                {/* <Link href="/blog" onClick={toggleMenu}>
                  {" "}
                  <ParagraphLink1
                    className={
                      pathname === "/blog" ? "text-primary font-bold " : "  "
                    }
                  >
                    Blog
                  </ParagraphLink1>
                </Link> */}
                <Link href="/contact-us" onClick={toggleMenu}>
                  {" "}
                  <ParagraphLink1
                    className={
                      pathname === "/contact-us"
                        ? "text-primary font-bold "
                        : "  "
                    }
                  >
                    Contact us
                  </ParagraphLink1>
                </Link>
                <CurrencySwitcher />
                {/* <SearchBar toggleMenu={toggleMenu} /> */}
              </div>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
