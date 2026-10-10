import React from "react";
import PolicyPageLayout from "./PolicyPageLayout";
import { POLICIES_INDEX } from "./data/policiesData";

export default function PrivacyPolicyPage() {
  const policy = POLICIES_INDEX.find((p) => p.id === "privacy");
  return <PolicyPageLayout policy={policy} />;
}
