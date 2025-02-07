import Button from "@/components/Button";
import { Header3, Paragraph1, ParagraphLink1 } from "@/components/Text";
import React, { useState, useEffect } from "react";

interface BannerCarouselProps {
  imageUrls: string[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    // Load images from external URLs
    const imagePromises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then((loadedImages) => setImages(loadedImages as HTMLImageElement[]))
      .catch((error) => console.error("Error loading images:", error));
  }, [imageUrls]);

  useEffect(() => {
    // Automatically change images every 2 seconds
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(intervalId); // Cleanup on unmount
    };
  }, [currentIndex, images]);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const DotIndicator: React.FC<{ active: boolean }> = ({ active }) => (
    <span
      className={`inline-block  w-2 h-2 bg-primary rounded-full mx-2 ${
        active ? "bg-secondary w-2 h-2" : "bg-primary"
      }`}
    />
  );

  return (
    <div className="relative container1- flex justify-center items-center">
      <div className="absolute z-10">
        <div className="flex flex-col bg-primary bg-opacity-50 p-8 rounded-[20px] justify-center items-center">
          <div className=" flex flex-col space-y-5 pb-6 ">
            <Header3 className=" text-white">Apartments & Suites </Header3>
            {/* <Paragraph1 className=" w-[500px]">
              Discover the perfect blend of comfort and elegance with our
              thoughtfully designed apartments and suites. Each space is
              tailored to provide a luxurious and relaxing experience
            </Paragraph1>{" "}
            <Button
              text="Learn More"
              href="/products"
              isLink={true}
              border="border-2 border-primary "
              additionalClasses="border-primary xl:w-fit- flex justify-center  w-full "
            />{" "} */}
          </div>
          <div className="p-4 bg-white rounded-[20px]">
            <div className="grid grid-cols-4 w-full items-center">
              <div className="border-r px-4">
                <ParagraphLink1 className="text-start font-bold">
                  Check-in
                </ParagraphLink1>
                <div>
                  <input type="text" placeholder="Add date" />
                </div>
              </div>
              <div className="border-r px-4">
                <ParagraphLink1 className="text-start font-bold">
                  Check-out
                </ParagraphLink1>
                <div>
                  <input type="text" placeholder="Add date" />
                </div>
              </div>
              <div className="border-r px-4">
                <ParagraphLink1 className="text-start font-bold">
                  Guest
                </ParagraphLink1>
                <div>
                  <input type="text" placeholder="Number of guests" />
                </div>
              </div>
              <div className="px-4">
                <Button
                  text="Check Availability"
                  href="/products"
                  isLink={true}
                  border="border-2 border-primary"
                  additionalClasses="border-primary xl:w-fit flex justify-center w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" absolute top-0 left-[200px] hidden h-full w-[300px] bg-opacity-75 bg-white z-10">
        <div className=" flex flex-col space-y-5 p-8 ">
          <Header3 className=" ">Apartments & Suites </Header3>
          <Paragraph1>
            Discover the perfect blend of comfort and elegance with our
            thoughtfully designed apartments and suites. Each space is tailored
            to provide a luxurious and relaxing experience
          </Paragraph1>{" "}
          <Button
            text="Learn More"
            href="/products"
            isLink={true}
            border="border-2 border-primary "
            additionalClasses="border-primary xl:w-fit- flex justify-center  w-full "
          />{" "}
        </div>
      </div>
      <div className="w-[100%] relative sm:h-[550px] h-[250px] border- border-primary-   rounded-lg- mx-auto overflow-hidden rou">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`Banner ${index + 1}`}
            className={`absolute top-0 left-0 w-[100%] mx-auto sm:h-[550px] opacity-85 h-[250px] transition-transform duration-500 ${
              index === currentIndex ? "translate-x-0" : "translate-x-full"
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={prevSlide}
          className="absolute sm:-left-4- - left-2 top-1/2 transform -translate-y-1/2 text-bg_gray bg-black bg-opacity-60 p-1 font-bold rounded-full"
        >
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute bg-black bg-opacity-60 - right-2 sm:-right-4- top-1/2 transform -translate-y-1/2  text-bg_gray p-1 font-bold rounded-full"
        >
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
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className="flex- justify-center pb-2 hidden">
        {images.map((_, index) => (
          <DotIndicator key={index} active={index === currentIndex} />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
