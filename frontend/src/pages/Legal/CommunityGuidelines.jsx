import React from "react";
import PolicyPageLayout from "./PolicyPageLayout";
import { POLICIES_INDEX } from "./data/policiesData";

export default function CommunityGuidelinesPage() {
  const policy = POLICIES_INDEX.find((p) => p.id === "community");
  return <PolicyPageLayout policy={policy} />;
}
