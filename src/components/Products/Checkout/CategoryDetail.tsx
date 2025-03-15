import { Paragraph1, Paragraph2, Paragraph3 } from "@/components/Text";
import React from "react";

interface CategoryDetailProps {
  selectedCategory: string | undefined;
    apartmentName: string;
}

const categoryDetails: Record<string, string[]> = {
  "BUDGET HIDEAWAY": [
    "1 Bedroom",
    "Wi-Fi",
    "Air Conditioning",
    "24Hr Power Supply",
    "Cleaning Service",
    "Laundry Service",
    "Kitchen (No Gas)",
    "Fridge",
    "Smart TV",
    "Wardrobe",
    "Work Desk",
  ],
  "COZY CORNER": [
    "1 Bedrooms",
    "Wi-Fi",
    "Air Conditioning",
    "24Hr Power Supply",
    "Cleaning Service",
    "Laundry Service",
    "Kitchen (No Gas)",
    "Fridge",
    "Smart TV",
    "Wardrobe",
    "Work Desk",
  ],
  "THE CLASSIC STUDIO": [
    "1 Bedroom",
    "Wi-Fi",
    "Air Conditioning",
    "24Hr Power Supply",
    "Cleaning Service",
    "Laundry Service",
    "Kitchen (No Gas)",
    "Fridge",
    "Smart TV",
    "Wardrobe",
    "Work Desk",
  ],
  "THE LUXE HAVEN": [
    "1 Bedroom",
    "Wi-Fi",
    "Air Conditioning",
    "24Hr Power Supply",
    "Cleaning Service",
    "Laundry Service",
    "Kitchen (Gas)",
    "Fridge",
    "Smart TV",
    "Wardrobe",
    "Work Desk",
  ],
  "COZY 1 BEDROOM": [
    "1 Bedroom",
    "Wi-Fi",
    "Air Conditioning",
    "24Hr Power Supply",
    "Cleaning Service",
    "Laundry Service",
    "Kitchen (Gas Cooker, Eating Utensils, Cooking Utensils)",
    "Fridge",
    "Smart TV",
    "Wardrobe",
    "Work Desk",
  ],
  "COZY 2 BEDROOM": [
    "2 Bedrooms",
    "Wi-Fi",
    "Air Conditioning",
    "24Hr Power Supply",
    "Cleaning Service",
    "Laundry Service",
    "Kitchen (Gas Cooker, Eating Utensils, Cooking Utensils)",
    "Fridge",
    "Smart TV",
    "Wardrobe",
    "Work Desk",
  ],
};


const CategoryDetail: React.FC<CategoryDetailProps> = ({
  selectedCategory,
  apartmentName,
}) => {
  const categoryName = selectedCategory || "Unknown Category";
  const details = categoryDetails[categoryName] || ["No details available."];

  return (
    <div className=" h-[200px] sm:bg-white bg-opacity-90   text-white sm:text-black p-4 sm:rounded-lg sm:h-full overflow-y-auto scrollbar-">
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
