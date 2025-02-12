import { Header4, Paragraph2 } from "@/components/Text";
import React from "react";
import AOS from "aos";

function Features() {
  const features = [
    {
      title: "Prime Location",
      description:
        "Situated in the heart of Satellite Town, each apartment offers easy access to key attractions and conveniences.",
      icon: "https://res.cloudinary.com/dtipo8fg3/image/upload/v1732732969/planet-earth_jgsslh.png", // Replace with actual image path
    },
    {
      title: "Modern Comfort",
      description:
        "Experience fully furnished apartments with premium amenities designed for relaxation and convenience.",
      icon: "https://res.cloudinary.com/dvao98wnj/image/upload/v1738977068/double-bed_xaaqs9.png", // Replace with actual image path
    },
    {
      title: "Flexible Stays",
      description:
        "Choose from a variety of rental options, whether you need a short-term getaway or a longer stay.",
      icon: "https://res.cloudinary.com/dvao98wnj/image/upload/v1738976955/eco-hotel_x5odlf.png", // Replace with actual image path
    },
    {
      title: "Secure Payments",
      description:
        "Book with confidence using our secure international payment options, designed for your peace of mind.",
      icon: "https://res.cloudinary.com/dtipo8fg3/image/upload/v1732732969/lock_fgzy8m.png", // Replace with actual image path
    },
  ];
  

    React.useEffect(() => {
      AOS.init({
        duration: 1000,
      });
    });

  return (
    <div className="container1 py-[100px] text-p_black">
      <div className="grid grid-cols-1 sm:grid-cols-4  gap-[24px] sm:gap-[36px] items-start">
        {features.map((feature, index) => (
          <div
            data-aos="fade-up"
            key={index}
            className="flex flex-col gap-4 justify-center text-center pb-4 "
          >
            <img
              src={feature.icon}
              alt={feature.title}
              className="w-16 h-16 mx-auto"
            />
            <Header4 className="text-lg font-semibold">{feature.title}</Header4>
            <Paragraph2 className="text-sm text-gray-600">{feature.description}</Paragraph2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
