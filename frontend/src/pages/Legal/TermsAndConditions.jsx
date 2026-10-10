import React from "react";
import PolicyPageLayout from "./PolicyPageLayout";
import { POLICIES_INDEX } from "./data/policiesData";

export default function TermsAndConditionsPage() {
  const policy = POLICIES_INDEX.find((p) => p.id === "terms");
  return <PolicyPageLayout policy={policy} />;
}
