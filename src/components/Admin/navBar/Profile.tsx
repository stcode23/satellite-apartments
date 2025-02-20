"use client";

import { ParagraphLink1, ParagraphLink2 } from "@/components/Text";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/admin/auth/login"); // Redirect to sign-in after logging out
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative- inline-block-  whitespace-nowrap text-left">
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className="flex- hidden justify-between items-center gap-2 px-2   rounded-[8px] sm:w-48 w-[250px] sm:bg-white sm:border transition"
      >
        <div className="flex items-center gap-2  ">
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <ParagraphLink1 className="font-bold-">Admin-only</ParagraphLink1>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {/* {isOpen && ( */}
      <div className="absolute- right-0   rounded-[8px]">
        <div className=" flex flex-col sm:flex-row gap-4 sm:gap-[44px]">
          <Link
            href="/admin/dashboard"
            // className=" bg-white rounded-lg px-4 flex gap-2 items-center "
            className={
              pathname === "/admin/dashboard"
                ? "text-primary font-bold flex gap-2 items-center "
                : "flex gap-2 items-center "
            }
          >
           

            <ParagraphLink1 className="font-bold-">Dashboard</ParagraphLink1>
          </Link>
          <Link
            href="/admin/apartments"
            className={
              pathname === "/admin/apartments"
                ? "text-primary font-bold flex gap-2 items-center "
                : "flex gap-2 items-center "
            }
          >
          

            <ParagraphLink1 className="font-bold-">Apartments</ParagraphLink1>
          </Link>

          <Link
            href="/admin/logistics"
            className={
              pathname === "/admin/logistics"
                ? "text-primary font-bold flex- hidden gap-2 items-center "
                : "flex- gap-2 items-center hidden"
            }
          >
           

            <ParagraphLink1 className="font-bold-">Logistics</ParagraphLink1>
          </Link>
         
          <Link
            href="/admin/customers"
            className={
              pathname === "/admin/customers"
                ? "text-primary font-bold flex gap-2 items-center "
                : "flex gap-2 items-center "
            }
          >
          

            <ParagraphLink1 className="font-bold-">Guests</ParagraphLink1>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full text-left  text-sm text-gray-700 flex items-center gap-2 hover:bg-gray-100"
          >
          
            <ParagraphLink1>Log Out</ParagraphLink1>
          </button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default ProfileDropdown;
