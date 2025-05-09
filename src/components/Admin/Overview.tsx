"use client";

import React from "react";
import NewSubmission from "./section/NewSubmission";
import useSyncCategories from "@/hooks/useSyncCategories";

function Overview() {
  useSyncCategories();

  return (
    <div>
      <NewSubmission />
    </div>
  );
}

export default Overview;
