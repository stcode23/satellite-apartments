import Button from "@/components/Button";
import Map from "@/components/Story/sections/others/Map";
import React from "react";

function MapView() {
  return (
    <div className=" container1 flex flex-col items-center justify-center py-8">
      <div className=" rounded-[20px] w-full h-[400px] sm:h-[600px] overflow-hidden">
        <Map />
      </div>

      <Button
        text="Find direction"
        href="https://www.google.com/maps/dir/?api=1&destination=Satellite+Apartment+Awori+Street,+Satellite+Town,+Lagos,+Nigeria"
        isLink={true}
        border="border-2 border-primary"
        additionalClasses="border-primary xl:w-fit flex justify-center w-full mt-4"
        target="_blank" // Ensures it opens in a new tab
        rel="noopener noreferrer" // Improves security
      />
    </div>
  );
}

export default MapView;
