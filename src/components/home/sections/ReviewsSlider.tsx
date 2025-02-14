import { Header2, Paragraph1, Paragraph2 } from "@/components/Text";
import React, { useState, useEffect } from "react";

const ReviewsSlider = () => {
  const reviews = [
    {
      name: "John Doe",
      review:
        "The apartments were beyond my expectations! Spacious, clean, and very comfortable. Highly recommend.",
      rating: 5,
    },
    {
      name: "Jane Smith",
      review:
        "Amazing location and top-notch facilities. Booking was seamless and the staff was super helpful.",
      rating: 4,
    },
    {
      name: "Michael Brown",
      review:
        "Loved the quiet environment and the proximity to essential services. The WiFi was super fast too!",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [reviews.length]);

  return (
    <div className="bg-bg_gray  py-10 px-5">
      <Header2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        What Our Guests Say
      </Header2>
      <div className="relative max-w-full mx-auto">
        <div className="overflow-hidden">
          <div
            className="transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              display: "flex",
            }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="min-w-full bg-white shadow-lg rounded-2xl p-6 text-center mx-2"
              >
                <Paragraph1 className=" text-gray-800 italic mb-4">
                  "{review.review}"
                </Paragraph1>
                <Paragraph1 className=" font-semibold text-gray-600">
                  - {review.name}
                </Paragraph1>
                <div className="flex justify-center mt-4">
                  {Array.from({ length: Math.floor(review.rating) }, (_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex
                  ? "bg-primary"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSlider;
