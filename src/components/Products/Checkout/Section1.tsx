import React from "react";
import Button from "../../Button";
import { Header3, Paragraph1, ParagraphLink1 } from "../../Text";

function Section1() {
  return (
    <div>
      <div className=" bg-primary- py-8- ">
        <div className=" ">
          <div className="p-4- hidden- bg-white bg-opacity-70  rounded-[20px] flex flex-col items-center ">
            <Header3 className=" text-white- text-center ">
              Apartments & Suites
            </Header3>
            <Paragraph1 className=" max-w-[800px] - text-center">
              Explore our premium apartments designed to offer modern comfort
              and luxury. Booking your ideal stay is just a few clicks away:
              {/* ensuring a seamless and stress-free experience. */}
            </Paragraph1>
            <div className="grid grid-cols-1 gap-4 py-4 xl:grid-cols-2 w-full items-center">
              <div className="xl:border-r border-primary flex w-full flex-col gap-2 items-center   px-4">
                <ParagraphLink1 className="text-start font-bold">
                  Check-in
                </ParagraphLink1>
                <div>
                  <input
                    type="text"
                    placeholder="Add date"
                    className=" bg-white bg-opacity-50 p-2 border rounded-lg text-center outline-none  "
                  />
                </div>
              </div>
              <div className="xl:border-r- border-primary flex w-full flex-col gap-2 items-center px-4">
                <ParagraphLink1 className="text-start font-bold">
                  Check-out
                </ParagraphLink1>
                <div>
                  <input
                    type="text"
                    placeholder="Add date"
                    className=" bg-white bg-opacity-50 border p-2 rounded-lg text-center outline-none"
                  />
                </div>
              </div>
              <div className="xl:border-r border-primary - flex w-full flex-col gap-2 items-center px-4">
                <ParagraphLink1 className="text-start font-bold">
                  Guest
                </ParagraphLink1>
                <div>
                  <input
                    type="text"
                    placeholder="Number of guests"
                    className=" bg-white bg-opacity-50 p-2 border rounded-lg text-center outline-none"
                  />
                </div>
              </div>
              <div className="xl:border-r- border-primary- flex w-full flex-col gap-2 items-center px-4">
                {" "}
                <ParagraphLink1 className=" font-bold">
                  Apartment Type
                </ParagraphLink1>
                <div>
                  <input
                    type="text"
                    placeholder="Number of guests"
                    className=" bg-white bg-opacity-50 p-2 border rounded-lg w-full text-center outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="px-4 pt-8">
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
  );
}

export default Section1;
