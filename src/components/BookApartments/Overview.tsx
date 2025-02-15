import React from "react";
import Button from "../Button";
import { Header3, Paragraph1, ParagraphLink1 } from "../Text";
import Section1 from "../Products/Checkout/Section1";
import Section2 from "../Products/Checkout/Section2";
import Section3 from "./Section3";

function Overview() {
  return (
    <div className=" min-h-screen">
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
}

export default Overview;
