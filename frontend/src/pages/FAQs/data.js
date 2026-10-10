// ── Editorial FAQ Dataset for ANNShare ──────────────────────────────────────

export const ROLE_SECTIONS = [
  {
    num: "01",
    title: "I Have Surplus Food",
    audience: "For restaurants, cafes, caterers, and households.",
    questions: [
      { text: "How to create a listing in under 2 mins", targetId: "dn-list" },
      { text: "What food items we can and cannot accept", targetId: "ma-2" },
      { text: "Tax invoices and donation certificates", targetId: "dn-tax" },
      { text: "Delivery & pickup scheduling", targetId: "pk-track" },
    ],
    linkLabel: "Donate Food Quick Guide",
    targetSection: "donations-group",
    bgVariant: "#FFFFFF",
  },
  {
    num: "02",
    title: "I Represent an Organization",
    audience: "For NGOs, community kitchens, and relief organizations.",
    questions: [
      { text: "How to apply as a verified partner", targetId: "org-join" },
      { text: "Setting up custom food alerts", targetId: "org-alerts" },
      { text: "Food safety and distribution guidelines", targetId: "org-safety" },
      { text: "Bulk request procedures", targetId: "org-bulk" },
    ],
    linkLabel: "Partner Organization Guide",
    targetSection: "organizations-group",
    bgVariant: "#FFFFFF",
  },
  {
    num: "03",
    title: "I'm New Here",
    audience: "For anyone curious how community food sharing works.",
    questions: [
      { text: "How ANNShare works", targetId: "ma-1" },
      { text: "Food safety commitments", targetId: "ma-3" },
      { text: "Volunteering & spreading the word", targetId: "acc-profile" },
      { text: "App download & quick access", targetId: "acc-profile" },
    ],
    linkLabel: "Getting Started Guide",
    targetSection: "most-asked-section",
    bgVariant: "#FFFFFF",
  },
];

export const MOST_ASKED_FAQS = [
  {
    num: "01",
    id: "ma-1",
    question: "How does ANNShare actually work?",
    answer:
      "When a restaurant, banquet hall, or bakery has unserved surplus food, they list the meal count and pickup deadline on the platform. Verified local non-profits and community shelters within a 5-kilometer radius receive an immediate alert, claim the food based on dietary suitability, and collect it within the specified freshness window using secure handoff verification.",
  },
  {
    num: "02",
    id: "ma-2",
    question: "Who can donate food?",
    answer:
      "Any commercial kitchen, caterer, hotel, grocery store, corporate cafeteria, or event organizer with clean, unserved food can register. Donated food must be surplus that stayed strictly in kitchen chafers or cooling units—never food returned from patron tables.",
  },
  {
    num: "03",
    id: "ma-3",
    question: "Is the food checked before sharing?",
    answer:
      "Yes. Donors sign a verified food safety pledge agreeing to temperature compliance (hot foods above 60°C, chilled foods below 5°C). Food is labeled with preparation times and dietary classifications, and recipient organizations conduct sensory and temperature checks at handoff before accepting batches.",
  },
  {
    num: "04",
    id: "ma-4",
    question: "How quickly can we receive available food?",
    answer:
      "Verified organizations receive immediate WhatsApp and platform notifications when surplus is listed nearby. Coordinators review portion counts and allergen tags, claim the listing with one tap, and dispatch a designated driver or volunteer to complete pickup within 30 to 90 minutes.",
  },
  {
    num: "05",
    id: "ma-5",
    question: "Does ANNShare charge a fee?",
    answer:
      "No. ANNShare is 100% free for both food donors and recipient organizations. There are zero listing fees, platform charges, or transaction costs. We operate as a community mission to eradicate food waste and hunger.",
  },
];

export const SAFETY_PRINCIPLES = [
  {
    title: "Verification",
    description: "Every organization is vetted before receiving food.",
  },
  {
    title: "Transparency",
    description: "Full batch tracking and allergen info on every listing.",
  },
  {
    title: "Traceability",
    description: "Real-time updates from pickup to handover.",
  },
];

export const MORE_ANSWERS_COLUMNS = {
  left: [
    {
      groupKey: "donations-group",
      groupTitle: "Donations",
      items: [
        {
          id: "dn-list",
          question: "How do I list surplus food?",
          answer:
            "Listing surplus takes under 60 seconds. Simply click 'I Have Surplus Food', input estimated meal portions, dietary category (veg/non-veg), storage condition, and pickup deadline. Nearby verified shelters receive instant notifications.",
        },
        {
          id: "dn-cooked",
          question: "Can I donate leftover cooked food?",
          answer:
            "Yes, as long as it has been prepared in a food-safe commercial environment, properly chilled or kept above safety temperatures, and untouched by consumers. Perishable cooked food is prioritized for immediate nearby pickup.",
        },
        {
          id: "dn-advance",
          question: "Can I schedule a donation in advance?",
          answer:
            "Yes! You can post scheduled donations up to 48 hours ahead for catered events, weddings, or regular kitchen prep routines, allowing partner shelters to coordinate vehicle transport in advance.",
        },
        {
          id: "dn-unclaimed",
          question: "What happens if nobody claims my food?",
          answer:
            "If an immediate match isn't found within 30 minutes, our rapid response team automatically expands the notification radius and alerts secondary volunteer hubs and backup community kitchens.",
        },
        {
          id: "dn-tax",
          question: "Are donations tax-deductible?",
          answer:
            "Yes. All registered verified charities and NGOs issue digital donation certificates through the platform for eligible commercial food donations at the end of each fiscal period.",
        },
      ],
    },
    {
      groupKey: "pickups-group",
      groupTitle: "Pickups",
      items: [
        {
          id: "pk-track",
          question: "How do I track my pickup status?",
          answer:
            "Once an organization claims your donation, you can view live real-time status updates, driver contact details, and estimated arrival time directly on your dashboard.",
        },
        {
          id: "pk-modify",
          question: "Can I change pickup times or locations?",
          answer:
            "You can update the pickup window or collection address directly from the active listing before a volunteer is dispatched. Direct contact details are shared immediately once claimed.",
        },
        {
          id: "pk-vehicle",
          question: "What equipment or vehicles do I need?",
          answer:
            "Recipient organizations arrive with insulated thermal boxes and hygienic food-grade transport crates. Donors only need to ensure food is securely packed in clean containers.",
        },
      ],
    },
  ],
  right: [
    {
      groupKey: "organizations-group",
      groupTitle: "Organizations",
      items: [
        {
          id: "org-join",
          question: "How do we register as a verified partner?",
          answer:
            "Non-profit shelters, children's homes, and community kitchens can register online by providing non-profit certificates (SWC affiliation or Ward office registration) and food storage capacity. Approval takes under 24 hours.",
        },
        {
          id: "org-branches",
          question: "Can multiple branches share one account?",
          answer:
            "Yes. Multi-location organizations can register child branches under a parent account with centralized administrator management and separate local pickup coordinates.",
        },
        {
          id: "org-charges",
          question: "Are there delivery charges for community kitchens?",
          answer:
            "No. ANNShare is 100% free for both donors and receiving non-profits. We do not charge listing fees, delivery fees, or subscription costs.",
        },
        {
          id: "org-safety",
          question: "How do we update our organization details?",
          answer:
            "Coordinators can easily modify address coordinates, daily beneficiary headcounts, and emergency contact numbers directly from their organization settings dashboard.",
        },
      ],
    },
    {
      groupKey: "accounts-group",
      groupTitle: "Accounts",
      items: [
        {
          id: "acc-profile",
          question: "How do I create and manage my profile?",
          answer:
            "Click 'Sign Up' in the main navigation, choose your role (Donor, Organization, or Volunteer), and verify your email to access your personal dashboard.",
        },
        {
          id: "acc-password",
          question: "How do I reset my password?",
          answer:
            "Click 'Log In' in the header navigation, choose 'Forgot Password', and enter your registered email to receive a secure password reset link immediately.",
        },
        {
          id: "acc-notif",
          question: "How do I turn off email notifications?",
          answer:
            "Go to Settings > Notifications to customize which alerts you receive via email, WhatsApp, or in-app push notifications.",
        },
        {
          id: "acc-delete",
          question: "Can I delete my account and data?",
          answer:
            "You can request permanent account removal and data deletion at any time under Account Settings > Privacy & Data > Delete Account.",
        },
        {
          id: "acc-privacy",
          question: "How is my personal information protected?",
          answer:
            "We use bank-level encryption (TLS 1.3) and never sell your personal contact information to third parties. Only verified partners involved in an active pickup can view contact details.",
        },
      ],
    },
  ],
};

export const COMMUNITY_METRICS = [
  {
    label: "Food Saved",
    value: "25,000+",
    unit: "meals",
  },
  {
    label: "Community Partners",
    value: "350+",
    unit: "verified NGOs",
  },
  {
    label: "Active Donors",
    value: "1,200+",
    unit: "food partners",
  },
];

