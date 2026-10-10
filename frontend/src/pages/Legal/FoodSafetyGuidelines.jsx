import React from "react";
import PolicyPageLayout from "./PolicyPageLayout";
import { POLICIES_INDEX } from "./data/policiesData";

export default function FoodSafetyGuidelinesPage() {
  const policy = POLICIES_INDEX.find((p) => p.id === "food-safety");
  return <PolicyPageLayout policy={policy} />;
}
