import { ParagraphLink2 } from "@/components/Text";
import React, { useState } from "react";

interface Category {
  id: string;
  name: string;
  parentId?: string; // Optional for main categories
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: any;
  setSelectedCategory: any;
  closeMenu: any;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  closeMenu,
}) => {
  const [isSubCategoryOpen, setSubCategoryOpen] = useState<string | null>(null);

  // Separate main categories and subcategories
  const mainCategories = categories.filter((category) => !category.parentId);

  return (
    <div className="flex gap-2 w-fit  scrollbar-hide items-center mb-4 flex-nowrap">
      <button
        className={`w-fit py-2 rounded-lg px-4 ${
          !selectedCategory
            ? "bg-black text-white"
            : "bg-white xl:bg-bg_gray text-black hover:bg-gray-100"
        }`}
        onClick={() => {
          setSelectedCategory(null);
          closeMenu();
        }}
      >
        <ParagraphLink2>All</ParagraphLink2>
      </button>
      {mainCategories.map((category) => (
        <div key={category.id}>
          <button
            className={`border relative flex justify-between items-center gap-4 w-full rounded-lg px-4 py-2 ${
              selectedCategory === category.id
                ? "bg-black text-white"
                : "bg-white  text-black hover:bg-gray-100"
            }`}
            onClick={() =>
              setSubCategoryOpen((prev) =>
                prev === category.id ? null : category.id
              )
            }
          >
            <ParagraphLink2 className="whitespace-nowrap">
              {category.name}
            </ParagraphLink2>

            <button>
              {/* drop down button */}
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
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            <div className="absolute hidden -bottom-[80px] left-0 w-full bg-white p-2 z-10 rounded-lg shadow-lg">
              <div className="flex gap-2 mb-2">
                <ParagraphLink2 className="whitespace-nowrap">
                  Price:
                </ParagraphLink2>{" "}
                <input
                  type="number"
                  className="border w-full outline-none rounded"
                  name=""
                  id=""
                />
              </div>
              <div className="flex justify-between w-full ">
                {" "}
                <button className=" p- px-2 rounded-lg border bg-gray-100 text-[12px]">
                  Close
                </button>
                <button className=" p- px-2 rounded-lg border bg-black  text-white  text-[12px]">
                  Save
                </button>
              </div>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
