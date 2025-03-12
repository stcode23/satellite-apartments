import { ParagraphLink2 } from "@/components/Text";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

interface Category {
  id: string;
  name: string;
  parentId?: string;
  price?: number;
}

interface CategorySelectorProps {
  selectedCategory: any;
  categories: any;
  setSelectedCategory: any;
  closeMenu: any;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  setSelectedCategory,
  closeMenu,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [priceDropdown, setPriceDropdown] = useState<string | null>(null);
  const [price, setPrice] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "category"));
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[];

        // Extract prices and set them in state
        const priceData: Record<string, number> = {};
        categoriesData.forEach((category) => {
          priceData[category.id] = category.price || 0;
        });

        setCategories(categoriesData);
        setPrice(priceData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


 const fetchPrice = async (categoryId: string) => {
   try {
     const docRef = doc(db, "category", categoryId);
     const docSnap = await getDoc(docRef);

     if (docSnap.exists()) {
       setPrice((prev) => ({
         ...prev,
         [categoryId]: docSnap.data().price || 0,
       }));
     }
   } catch (error) {
     console.error("Error fetching price:", error);
   }
 };


  const savePrice = async (categoryId: string) => {
    try {
      const docRef = doc(db, "category", categoryId);
      await updateDoc(docRef, { price: price[categoryId] || 0 });

      setPriceDropdown(null);
    } catch (error) {
      console.error("Error saving price:", error);
    }
  };


  return (
    <div className="flex  gap-2 w-fit scrollbar-hide items-center mb-4 flex-wrap justify-center">
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
      {categories.map((category) => (
        <div key={category.id} className="relative">
          <div
            className={`border relative flex justify-between items-center gap-4 w-full rounded-lg px-4 py-2 ${
              selectedCategory === category.id
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <button
              onClick={() => {
                setSelectedCategory(category.id);
                closeMenu();
                setPriceDropdown(null);
              }}
            >
              <ParagraphLink2 className="whitespace-nowrap">
                {category.name} APARTMENTS
              </ParagraphLink2>
            </button>

            <button
              onClick={() => {
                if (priceDropdown === category.id) {
                  setPriceDropdown(null);
                } else {
                  setPriceDropdown(category.id);
                  fetchPrice(category.id);
                }
              }}
            >
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
          </div>
          {priceDropdown === category.id && (
            <div className="absolute left-0 w-full- top-[50px] bg-white p-2 z-10 rounded-lg shadow-lg">
              <div className="flex gap-2 mb-2">
                <ParagraphLink2 className="whitespace-nowrap">
                  Price:
                </ParagraphLink2>
                <div className=" flex items-center border px-1 gap-1 rounded">
                  ₦
                  <input
                    type="number"
                    className=" w-full outline-none "
                    value={price[category.id] || ""}
                    onChange={(e) =>
                      setPrice((prev) => ({
                        ...prev,
                        [category.id]: parseFloat(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex justify-between w-full">
                <button
                  className="px-2 rounded-sm  bg-gray-100 text-[12px]"
                  onClick={() => setPriceDropdown(null)}
                >
                  Close
                </button>
                <button
                  className="px-2 rounded-md  bg-black text-white text-[12px]"
                  onClick={() => savePrice(category.id)}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
