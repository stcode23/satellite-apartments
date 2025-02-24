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
            <Header1Plus>Terms and Conditions</Header1Plus>
            <Paragraph3>
              Welcome to Satellite Apartments & Shortlet Homes! By making a
              reservation or using our website, you agree to the following terms
              and conditions. Please read them carefully to ensure a smooth and
              enjoyable stay.
            </Paragraph3>
          </div>
          <div className="absolute sm:-bottom-[200px] -bottom-[60px] overflow-hidden flex- hidden w-full">
            <img
              className="min-w-full"
              src="/images/white_bgR.svg"
              alt="terms and conditions"
            />
          </div>
        </div>

        <div className="py-4 sm:py-[50px] rounded-b-[24px] text-p_black z-[10] bg-white px-4 sm:px-[65px] space-y-[18px] sm:space-y-[32px]">
          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Booking and Payment
            </ParagraphLink1>
            <Paragraph1>
              - **Reservation Confirmation**: All bookings are subject to
              availability. A reservation is only confirmed once full payment or
              a deposit has been received.
              <br />
              - **Accepted Payments**: We accept credit/debit cards and other
              secure payment options displayed at checkout.
              <br />- **Cancellation Policy**: Cancellations made within the
              permitted period may qualify for a refund. Late cancellations or
              no-shows may incur charges.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Check-in and Check-out
            </ParagraphLink1>
            <Paragraph1>
              - **Check-in Time**: From 2:00 PM onwards. Early check-ins are
              subject to availability and may incur additional charges.
              <br />
              - **Check-out Time**: By 12:00 PM. Late check-outs may attract
              extra fees unless pre-approved.
              <br />- **Identification**: Guests must present a valid
              government-issued ID upon check-in.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Guest Responsibilities
            </ParagraphLink1>
            <Paragraph1>
              - Guests are responsible for keeping the apartment in good
              condition throughout their stay.
              <br />
              - Any damage to property or missing items will be charged to the
              guest.
              <br />- Noise levels should be kept minimal, especially during
              quiet hours (10:00 PM - 7:00 AM).
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              House Rules
            </ParagraphLink1>
            <Paragraph1>
              - No smoking inside the apartments. A cleaning fee will be charged
              for violations.
              <br />
              - Pets are not allowed unless otherwise specified in the booking.
              <br />- Parties or large gatherings are prohibited without prior
              approval.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Liability and Security
            </ParagraphLink1>
            <Paragraph1>
              - Satellite Apartments & Shortlet Homes is not responsible for
              lost or stolen items. Please use provided safes where available.
              <br />- We reserve the right to refuse service or evict guests
              engaging in unlawful or disruptive behavior.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Modifications and Cancellations
            </ParagraphLink1>
            <Paragraph1>
              - We reserve the right to modify bookings in the case of
              unforeseen circumstances (e.g., maintenance issues, overbooking).
              In such cases, an alternative accommodation or full refund will be
              provided.
              <br />- Guests may modify their bookings based on availability and
              applicable fees.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Contact Us
            </ParagraphLink1>
            <Paragraph1>
              If you have any questions about our terms and conditions, feel
              free to reach out to our customer support team via email or the
              contact form on our website.
            </Paragraph1>
          </div>
        </div>

        <Section6 />
      </div>
    </div>
  );
}

export default Overview;
