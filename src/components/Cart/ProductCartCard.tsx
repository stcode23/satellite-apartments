import React from "react";
import { Paragraph1, Paragraph2, ParagraphLink2 } from "../Text";
import { useExchangeRateStore } from "@/stores/exchangeRateStore";

type ProductCartCardProps = {
  product: any;
};

const ProductCartCard: React.FC<ProductCartCardProps> = ({ product }) => {
  const { selectedCurrency, exchangeRate } = useExchangeRateStore();

  const displayPrice =
    selectedCurrency === "USD" && exchangeRate > 0
      ? product.selectedCategory.price / exchangeRate // Convert to USD
      : product.selectedCategory.price; // Default to NGN

  const currencySymbol = selectedCurrency === "USD" ? "$" : "₦";

  const formattedPrice =
    selectedCurrency === "USD"
      ? displayPrice.toFixed(2) // Format for USD with 2 decimal places
      : displayPrice; // Format for NGN (comma-separated)

  return (
    <div className="flex relative justify-between items-start bg-white border p-2  rounded-lg">
      <div className="flex w-full flex-col gap-2 items-center-">
        <img
          src={product.productImageURL1.replace(
            "/upload/",
            "/upload/w_1000,f_auto/"
          )}
          alt={product.name}
          className="w-full h-[150px] object-cover bg-gray-100 rounded"
        />
        <div className=" space-y-1">
          <ParagraphLink2 className="font-bold truncate overflow-hidden whitespace-nowra-p w-[150px]-">
            No. {product.name} - {product.selectedCategory.name}
          </ParagraphLink2>
          <Paragraph2 className=" whitespace-nowrap">
            {`${currencySymbol} ${new Intl.NumberFormat("en-US").format(
              Number(formattedPrice)
            )}`}{" "}
            per day
          </Paragraph2>
        </div>
      </div>
    </div>
  );
};

export default ProductCartCard;
