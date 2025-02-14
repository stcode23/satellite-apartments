import React from "react";
import { Header3, Header4, Paragraph1 } from "../Text";

const HotLines = () => {
  const contacts = [
    {
      title: "Bookings",
      description:
        "Have questions about availability or need assistance with making a reservation? Feel free to contact us directly.",
      phone: "+234 707 832 8640",
    },
    {
      title: "Customer Support",
      description:
        "For any inquiries or assistance during your stay, our dedicated support team is here for you 24/7.",
      phone: "+234 707 832 8640",
    },
    {
      title: "Feedback",
      description:
        "We value your feedback! Let us know about your experience or any suggestions for improvement.",
      phone: "+234 707 832 8640",
    },
    {
      title: "Partnerships",
      description:
        "Interested in partnering with us or exploring business opportunities? Get in touch today!",
      phone: "+234 707 832 8640",
    },
  ];


  return (
    <div className="bg- bg-slate-100 [#f8f5c9] py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <Header3 className="text-3xl font-bold text-gray-800 mb-8">
          Have any queries?{" "}
          <span className="text-primary">We're here to help.</span>
        </Header3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition duration-300"
            >
              <Header4 className="text-xl font-semibold text-gray-700 mb-2">
                {contact.title}
              </Header4>
              <Paragraph1 className="text-gray-600 mb-4">{contact.description}</Paragraph1>
              <a
                href={`tel:${contact.phone}`}
                className="text-primary font-medium hover:underline"
              >
                {contact.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotLines;
