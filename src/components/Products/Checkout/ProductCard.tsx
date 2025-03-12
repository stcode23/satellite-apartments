import React, { useState } from "react";
import { Paragraph1, Paragraph2 } from "../../Text";
import CategoryDetail from "./CategoryDetail";

interface Apartment {
  id: string;
  name: string;
  productImageURL1: string;
  productImageURL2?: string;
  productImageURL3?: string;
  productImageURL4?: string;
  productImageURL5?: string;
  selectedCategory?: {
    name: string;
    price: number;
  };
}

interface ProductCardProps {
  apartment: Apartment;
  currencySymbol: string;
  formattedPrice: string;
  onNextApartment: () => void;
  alternativesAvailable: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  apartment,
  currencySymbol,
  formattedPrice,
  onNextApartment,
  alternativesAvailable,
}) => {
  const images = [
    apartment.productImageURL1,
    apartment.productImageURL2,
    apartment.productImageURL3,
    apartment.productImageURL4,
    apartment.productImageURL5,
  ].filter(Boolean);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full items-center mb-4">
      <div className="flex flex-col gap-1 items-center">
        <div className="rounded-[10px] w-full overflow-hidden border">
          <div
            onClick={() => openModal(0)}
            className="h-[400px] cursor-pointer overflow-hidden rounded-t-[10px] w-full bg-primary"
          >
            <img
              src={
                apartment?.productImageURL1
                  ? apartment?.productImageURL1.replace(
                      "/upload/",
                      "/upload/w_1000,f_auto/"
                    )
                  : "/images/default-product.png"
              }
              alt="Apartment"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="bg-white px-4 p-2 pb-4">
            <Paragraph1 className="font-bold">
              No. {apartment?.name} - {apartment?.selectedCategory?.name}
            </Paragraph1>
            <Paragraph2>
              <span className="font-bold">{`${currencySymbol}${formattedPrice}`}</span>{" "}
              per day
            </Paragraph2>
          </div>
        </div>
        <div className="flex w-full items-center gap-2 justify-between">
          <Paragraph2>
            {alternativesAvailable} Alternatives Available
          </Paragraph2>
          {alternativesAvailable > 0 && (
            <button
              className="border flex gap-2 items-center py-1 px-2 rounded-lg"
              onClick={onNextApartment}
            >
              <Paragraph2>Change</Paragraph2>
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-3xl z-10"
            onClick={closeModal}
          >
            &times;
          </button>

          <div className=" grid sm:grid-cols-4 w-[90%] gap-4 bg-white- bg-opacity-65- rounded-lg ">
            <div className=" sm:col-span-3 relative flex justify-center items-center">
              <button
                className="absolute left-4 text-white text-3xl bg-black bg-opacity-50 rounded-full p-2"
                onClick={prevImage}
              >
                &#10094;
              </button>
              <button
                className="absolute right-4 text-white text-3xl bg-black bg-opacity-50 rounded-full p-2 "
                onClick={nextImage}
              >
                &#10095;
              </button>
              <img
                src={
                  images[currentImageIndex]
                    ? images[currentImageIndex].replace(
                        "/upload/",
                        "/upload/w_2000,f_auto/"
                      )
                    : "/images/default-product.png"
                }
                alt="Apartment"
                className=" w-[100%] max-h-[80vh] object-cover"
              />
            </div>
            <CategoryDetail
              apartmentName={apartment?.name}
              selectedCategory={apartment?.selectedCategory?.name}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
