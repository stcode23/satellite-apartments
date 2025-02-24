import { ParagraphLink1 } from "@/components/Text";
import { format } from "date-fns";

const TodayDate = () => {
  const todayFormatted = format(new Date(), "EEEE, do MMMM yyyy"); // Example: "Sunday, 12th October 2025"

  return <ParagraphLink1>Today, {todayFormatted}</ParagraphLink1>;
};

export default TodayDate;
