"use client";

import React from "react";
import { Header1Plus, Paragraph1, Paragraph3, ParagraphLink1 } from "../Text";
import Section6 from "../home/sections/Section6";
import AOS from "aos";

function Overview() {

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
  
  return (
    <div className="pt-[100px] bg-bg_gray">
      <div data-aos="flip-right" className="container1">
        <div className="relative overflow-hidden">
          <div className="flex flex-col bg-primary sm:gap-[20px] px-4 sm:p-[65px] py-12 sm:py- rounded-t-[24px] w-full sm:text-center text-white">
            <Header1Plus>Privacy Policy</Header1Plus>
            <Paragraph3>
              At Satellite Apartments & Shortlet Homes, we prioritize your
              privacy. This policy outlines how we collect, use, and safeguard
              your personal information when you book a stay with us or interact
              with our website.
            </Paragraph3>
          </div>
          <div className="absolute hidden sm:-bottom-[200px] -bottom-[60px] overflow-hidden flex- w-full">
            <img
              className="min-w-full"
              src="/images/white_bgR.svg"
              alt="privacy"
            />
          </div>
        </div>

        <div className="py-4 sm:py-[50px] rounded-b-[24px] text-p_black z-[10] bg-white px-4 sm:px-[65px] space-y-[18px] sm:space-y-[32px]">
          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Information We Collect
            </ParagraphLink1>
            <Paragraph1>
              To ensure a seamless booking and stay experience, we may collect:
              <br />
              - **Personal Information**: Name, email, phone number, and payment
              details when making a reservation.
              <br />
              - **Booking Details**: Check-in/check-out dates, preferred
              apartment, and guest count.
              <br />- **Usage Data**: Website interactions, cookies, and IP
              address to enhance user experience.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              How We Use Your Information
            </ParagraphLink1>
            <Paragraph1>
              Your information allows us to:
              <br />
              - **Process & Manage Bookings**: Confirm reservations, provide
              check-in details, and offer customer support.
              <br />
              - **Enhance Services**: Personalize recommendations and improve
              our website.
              <br />- **Communicate With You**: Send booking confirmations,
              updates, and promotional offers (if subscribed).
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Safeguarding Your Data
            </ParagraphLink1>
            <Paragraph1>
              We implement security measures to protect your personal
              information. While we take all reasonable precautions, no system
              is 100% secure. We encourage you to use strong passwords and avoid
              sharing personal details in public spaces.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Sharing Your Information
            </ParagraphLink1>
            <Paragraph1>
              We do not sell your information. However, we may share it with:
              <br />
              - **Payment Processors**: To facilitate secure transactions.
              <br />
              - **Service Providers**: Such as cleaning, security, and
              maintenance teams to ensure a comfortable stay.
              <br />- **Legal Authorities**: If required by law or to prevent
              fraudulent activities.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Your Rights
            </ParagraphLink1>
            <Paragraph1>
              You have the right to:
              <br />
              - Access, update, or delete your personal information.
              <br />
              - Opt-out of marketing communications.
              <br />- Manage cookies through your browser settings.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              External Links & Third-Party Services
            </ParagraphLink1>
            <Paragraph1>
              Our website may contain links to external platforms (e.g., payment
              gateways, review sites). Please review their privacy policies as
              we are not responsible for their data practices.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Updates to This Policy
            </ParagraphLink1>
            <Paragraph1>
              We may update this Privacy Policy periodically. Changes will be
              posted here with an effective date. We encourage you to review it
              regularly.
            </Paragraph1>
          </div>
        </div>

        <Section6 />
      </div>
    </div>
  );
}

export default Overview;
