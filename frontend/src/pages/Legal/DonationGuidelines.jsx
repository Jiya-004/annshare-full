import React from "react";
import PolicyPageLayout from "./PolicyPageLayout";
import { POLICIES_INDEX } from "./data/policiesData";

export default function DonationGuidelinesPage() {
  const policy = POLICIES_INDEX.find((p) => p.id === "donation");
  return <PolicyPageLayout policy={policy} />;
}
