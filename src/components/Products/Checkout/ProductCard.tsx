import React from "react";
import { Paragraph1, Paragraph2 } from "../../Text";

interface Apartment {
  id: string;
  name: string;
  productImageURL1: string;
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
  return (
    <div className="w-full items-center mb-4">
      <div className="flex flex-col gap-1 items-center">
        <div className="rounded-[10px] w-full overflow-hidden border">
          <div className="h-[400px] overflow-hidden rounded-t-[10px] w-full bg-primary">
            <img
              src={apartment?.productImageURL1}
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
    </div>
  );
};

export default ProductCard;
