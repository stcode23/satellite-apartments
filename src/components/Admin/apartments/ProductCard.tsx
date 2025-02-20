"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Paragraph2, ParagraphLink2 } from "@/components/Text";
import Button from "@/components/Button";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  product,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-full bg-white rounded-lg shadow-l overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {isModalOpen && (
        <ProductModal product={product} onClose={handleModalClose} />
      )}
      <div
        onClick={handleEditClick}
        className="bg-white relative p-2 hover:border-primary cursor-pointer border-2 rounded-lg"
      >
        <div className="absolute text-white inset-0 bg-black bg-opacity-50 rounded-lg opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className=" flex flex-col justify-center items-center text-center">
            <ParagraphLink2 className="">Occupied </ParagraphLink2>
            <div>
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
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <img
          src={
            image
              ? image.replace("/upload/", "/upload/w_500,f_auto/")
              : "/images/default-product.png"
          }
          alt={title}
          className="w-full h-[150px] object-cover rounded-lg hover:scale-110 transition-transform duration-300 "
        />

        <div className=" flex flex-col justify-center border-t pt-2 items-center   ga -rounded-lg  bg-white bg-opacity-65">
          <Paragraph2 className=" font-medium text-center pb-2-  whitespace-nowrap w-[100%] truncate overflow-hidden">
            {" "}
            Apartment: {title}{" "}
          </Paragraph2>

          <Paragraph2 className=" font-medium text-center pb-2  whitespace-nowrap w-[100%] truncate overflow-hidden">
            {" "}
            Standard Apartment
          </Paragraph2>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
