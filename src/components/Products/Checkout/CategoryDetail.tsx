import { Paragraph1, Paragraph2, Paragraph3 } from "@/components/Text";
import React from "react";

interface CategoryDetailProps {
  selectedCategory: string | undefined;
    apartmentName: string;
}

const categoryDetails: Record<string, string[]> = {
  "BUDGET HIDEAWAY": [
    "2 Bedrooms",
    "Smart TV",
    "Fully Equipped Kitchen",
    "Bi-Weekly Cleaning Service",
    "Quiet Location",
  ],
  "COZY CORNER": [
    "3 Bedrooms",
    "Wi-Fi Included",
    "Modern Interior",
    "Weekly Housekeeping",
    "City View",
  ],
  "THE CLASSIC STUDIO": [
    "Studio Apartment",
    "Compact Kitchen",
    "Cozy Workspace",
    "Laundry Facilities",
    "Great for Singles",
  ],
  "THE LUXE HAVEN": [
    "1 Bedroom",
    "High-Speed Internet",
    "Minimalist Design",
    "Pet-Friendly",
    "Near Public Transport",
  ],
  "COZY 1 BEDROOM": [
    "Luxury Suite",
    "Private Balcony",
    "24/7 Concierge",
    "Gym Access",
    "Spa & Wellness",
    "Luxury Suite",
    "Private Balcony",
    "24/7 Concierge",
    "Gym Access",
    "Spa & Wellness",
  ],
  "COZY 2 BEDROOM": [
    "Family Apartment",
    "4 Bedrooms",
    "Kids Play Area",
    "Secure Parking",
    "Quiet Neighborhood",
  ],
};

const CategoryDetail: React.FC<CategoryDetailProps> = ({
  selectedCategory,
  apartmentName,
}) => {
  const categoryName = selectedCategory || "Unknown Category";
  const details = categoryDetails[categoryName] || ["No details available."];

  return (
    <div className=" h-[150px] sm:bg-white bg-opacity-90   text-white sm:text-black p-4 sm:rounded-lg sm:h-full overflow-y-auto scrollbar-">
      <div className="  w-full justify-center items-center mb-2 sm:flex hidden">
        <img
          src="/images/logo.png"
          alt=""
          className="h-[60px] xl:flex- hidden-"
        />
      </div>
      <Paragraph2 className="sm:text-xl font-bold mb-2 ">
        No. {apartmentName} - {categoryName} APARTMENT
      </Paragraph2>
      <ul className="list-disc pl-5-">
        {details.map((detail, index) => (
          <li key={index} className="flex items-center">
            {" "}
            <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
            <Paragraph2>{detail}</Paragraph2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDetail;
