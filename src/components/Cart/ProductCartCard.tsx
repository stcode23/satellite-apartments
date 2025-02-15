import React from "react";
import { Paragraph1, Paragraph2, ParagraphLink2 } from "../Text";
import { useExchangeRateStore } from "@/stores/exchangeRateStore";


type ProductCartCardProps = {
  product: any;
  onRemove: any;
  onQuantityChange: any;
};

const ProductCartCard: React.FC<ProductCartCardProps> = ({
  product,
  onRemove,
  onQuantityChange,
}) => {
  const { selectedCurrency, exchangeRate } = useExchangeRateStore();

  const displayPrice =
    selectedCurrency === "USD" && exchangeRate > 0
      ? product.currentPrice / exchangeRate // Convert to USD
      : product.currentPrice; // Default to NGN

  const currencySymbol = selectedCurrency === "USD" ? "$" : "₦";

  const formattedPrice =
    selectedCurrency === "USD"
      ? displayPrice.toFixed(2) // Format for USD with 2 decimal places
      : displayPrice; // Format for NGN (comma-separated)

  return (
    <div className="flex relative justify-between items-start bg-white p-2  rounded-lg">
      <div className="flex flex-col gap-2 items-center">
        <img
          src={product.productImageURL1.replace(
            "/upload/",
            "/upload/w_100,f_auto/"
          )}
          alt={product.name}
          className="w-full h-[100px] object-cover bg-gray-100 rounded"
        />
        <div className=" space-y-1">
          <ParagraphLink2 className="font-bold truncate overflow-hidden whitespace-nowra-p w-[150px]-">
            {product.name}
          </ParagraphLink2>
          <Paragraph2 className=" whitespace-nowrap">
            {`${currencySymbol} ${new Intl.NumberFormat("en-US").format(
              Number(formattedPrice * product.quantity)
            )}`} per day
          </Paragraph2>
          <div className=" flex- items-center gap-2 pb-4 hidden">
            <img
              src="https://res.cloudinary.com/dvao98wnj/image/upload/v1738956143/star_dpebdl.png"
              className="h-5 w-5"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/dvao98wnj/image/upload/v1738956143/star_dpebdl.png"
              className="h-5 w-5"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/dvao98wnj/image/upload/v1738956143/star_dpebdl.png"
              className="h-5 w-5"
              alt=""
            />{" "}
            <img
              src="https://res.cloudinary.com/dvao98wnj/image/upload/v1738956143/star_dpebdl.png"
              className="h-5 w-5"
              alt=""
            />{" "}
            <img
              src="https://res.cloudinary.com/dvao98wnj/image/upload/v1738956143/star_dpebdl.png"
              className="h-5 w-5"
              alt=""
            />
          </div>
          <div className="flex gap-4 items-center hidden -">
            <Paragraph2 className="text-gray-500">Days:</Paragraph2>
            <div className="flex gap-4 items-center justify-between border rounded-lg px-4">
              <button
                onClick={() => onQuantityChange(product.id, -1)}
                className="text-gray-500"
              >
                -
              </button>
              <p>{product.quantity}</p>
              <button
                onClick={() => onQuantityChange(product.id, 1)}
                className="text-gray-500"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden">
        <button
          onClick={() => onRemove(product.id)}
          className="absolute right-4  top-4 text-[12px] text-gray-500"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
};

export default ProductCartCard;
