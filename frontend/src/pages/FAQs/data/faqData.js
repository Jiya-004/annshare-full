// ── FAQ Dataset for ANNShare Help Center ─────────────────────────────────────

export const FAQ_CATEGORIES = [
  {
    id: "getting-started",
    name: "Getting Started",
    description: "Learn the basics of using ANNShare.",
    iconName: "IoRocketOutline",
  },
  {
    id: "food-donations",
    name: "Food Donations",
    description: "Questions about sharing surplus food.",
    iconName: "IoRestaurantOutline",
  },
  {
    id: "receiving-food",
    name: "Receiving Food",
    description: "Information for NGOs and organizations.",
    iconName: "IoPeopleOutline",
  },
  {
    id: "food-safety",
    name: "Food Safety",
    description: "Safe food preparation and handling guidelines.",
    iconName: "IoShieldCheckmarkOutline",
  },
  {
    id: "pickups-logistics",
    name: "Pickups & Delivery",
    description: "Questions about food collection and logistics.",
    iconName: "IoBicycleOutline",
  },
  {
    id: "partnerships-accounts",
    name: "Partnerships & Accounts",
    description: "Information about verification and partnerships.",
    iconName: "IoBusinessOutline",
  },
];

export const EXPLORE_TOPICS = [
  { id: "getting-started", label: "Getting Started" },
  { id: "food-donations", label: "Food Donations" },
  { id: "receiving-food", label: "Receiving Food" },
  { id: "food-safety", label: "Food Safety" },
  { id: "pickups-logistics", label: "Pickups & Logistics" },
  { id: "ngos-verification", label: "NGOs & Verification" },
  { id: "accounts", label: "Accounts" },
  { id: "partnerships", label: "Partnerships" },
];

export const POPULAR_QUESTIONS = [
  {
    id: "pop-1",
    question: "How does ANNShare work?",
    answer:
      "ANNShare connects surplus food donors—such as restaurants, banquet halls, corporate cafeterias, and bakeries—with verified non-profits, shelters, and community kitchens. Donors post available meals in minutes, our system coordinates routing with nearby verified recipients, and pickups are safely completed within the designated freshness window.",
  },
  {
    id: "pop-2",
    question: "Who can donate food?",
    answer:
      "Any commercial kitchen, restaurant, hotel, caterer, grocery store, event organizer, or corporate cafeteria with unserved, safe surplus food can register as a donor. Individual home cooks and community members with clean, sealed surplus can also donate non-perishable goods and bakery surplus.",
  },
  {
    id: "pop-3",
    question: "Who can receive donated food?",
    answer:
      "Verified non-governmental organizations (NGOs), community shelters, orphanages, elder care centers, and grassroots volunteer kitchens who prepare or serve meals to vulnerable communities are eligible to receive food on ANNShare.",
  },
  {
    id: "pop-4",
    question: "Is ANNShare free to use?",
    answer:
      "Yes, ANNShare is 100% free for both food donors and recipient organizations. There are no listing fees, subscription charges, or hidden transaction costs. Our mission is purely focused on fighting hunger and preventing environmental food waste.",
  },
  {
    id: "pop-5",
    question: "How quickly can surplus food be collected?",
    answer:
      "Depending on your location and notice window, pickups can typically be coordinated within 30 to 90 minutes for urgent batches, or scheduled in advance for regular end-of-service shifts. Urgent notifications are broadcast immediately to verified partners in your immediate radius.",
  },
  {
    id: "pop-6",
    question: "What type of food can be donated?",
    answer:
      "We accept properly handled hot prepared meals, cold unserved banquet trays, fresh produce, breads and pastries, dairy, and unopened packaged groceries. All prepared food must be unserved—meaning it remained strictly in kitchen chafers or warming trays, never on patron plates.",
  },
];

export const ALL_CATEGORY_FAQS = [
  {
    categoryId: "getting-started",
    categoryTitle: "Getting Started",
    description: "Learn the fundamentals of the ANNShare platform and how to begin sharing or receiving food.",
    items: [
      {
        id: "gs-1",
        question: "What is ANNShare?",
        answer:
          "ANNShare is a community food-sharing platform built to bridge the gap between commercial food surplus and local hunger. We provide an intuitive digital pipeline that connects commercial kitchens, caterers, and food businesses with accredited non-profits and community organizations.",
      },
      {
        id: "gs-2",
        question: "How does ANNShare work?",
        answer:
          "When a food provider has unserved surplus, they list the meal count, packaging state, and pickup window on the platform. Verified NGOs in the immediate geographic zone receive an alert, claim the food based on dietary requirements, and arrange collection via volunteer transport or shelter vehicles.",
      },
      {
        id: "gs-3",
        question: "Is ANNShare free to use?",
        answer:
          "Yes, ANNShare is entirely free. We never charge donors for listing food or NGOs for claiming it. Donors also receive verifiable community impact metrics and food waste reduction records at no cost.",
      },
      {
        id: "gs-4",
        question: "Where is ANNShare currently available?",
        answer:
          "ANNShare is currently operating across major urban zones in the Kathmandu Valley (Kathmandu, Lalitpur, and Bhaktapur) and is expanding pilot networks to Pokhara, Chitwan, and Biratnagar.",
      },
    ],
  },
  {
    categoryId: "food-donations",
    categoryTitle: "Food Donations",
    description: "Guidelines and procedures for restaurants, caterers, and food businesses listing surplus.",
    items: [
      {
        id: "fd-1",
        question: "What kind of food can I donate?",
        answer:
          "You can donate prepared cooked foods (hot or cold, stored within safe temperature ranges), packaged groceries, whole raw produce, dairy, breads, and baked goods. All items must be unserved, wholesome, and prepared in a sanitary environment.",
      },
      {
        id: "fd-2",
        question: "Can restaurants donate leftover food?",
        answer:
          "Yes, restaurants can donate unserved kitchen surplus—such as batch items remaining in steam tables, prep line excesses, or fresh pre-portioned dishes. We strictly prohibit food that was previously served to guests or returned to kitchen pass tables.",
      },
      {
        id: "fd-3",
        question: "How should food be packaged?",
        answer:
          "Food must be placed in clean, food-grade containers, aluminum trays, or sealed plastic tubs. Each batch should have a simple label indicating the dish name, vegetarian/non-vegetarian status, allergen notes, and the date and time prepared.",
      },
      {
        id: "fd-4",
        question: "Can I schedule a future donation?",
        answer:
          "Yes! For scheduled banquets, weddings, or recurring restaurant prep schedules, you can pre-schedule a surplus listing up to 48 hours in advance so our logistics team can line up receiving shelters ahead of time.",
      },
      {
        id: "fd-5",
        question: "How do I list surplus food?",
        answer:
          "Simply click 'I Have Food' from anywhere on the platform, input the estimated portions, cuisine/dietary type, packaging status, and pickup deadline. The listing goes live to nearby verified partners in under 60 seconds.",
      },
      {
        id: "fd-6",
        question: "Can I cancel a donation if plans change?",
        answer:
          "Yes. If a listing hasn't been claimed yet, you can cancel it with one click from your dashboard. If an NGO has already been dispatched, please contact our helpline immediately so the driver is notified.",
      },
    ],
  },
  {
    categoryId: "receiving-food",
    categoryTitle: "Receiving Food",
    description: "Everything verified non-profits, shelters, and community groups need to know.",
    items: [
      {
        id: "rf-1",
        question: "Who can request food?",
        answer:
          "Legally registered charitable trusts, non-governmental organizations, homeless shelters, children's homes, elder care facilities, and community relief groups operating active feeding programs can request food.",
      },
      {
        id: "rf-2",
        question: "How does NGO verification work?",
        answer:
          "During signup, NGOs submit their Social Welfare Council (SWC) affiliation, municipal Ward registration, primary contact details, and facility storage capacity (refrigeration and hygienic serving space). Our team verifies credentials within 24 hours.",
      },
      {
        id: "rf-3",
        question: "Can organizations request specific food?",
        answer:
          "Yes, organizations can set dietary filters in their profile (e.g., strictly vegetarian, halal, diabetic-friendly, or child-appropriate meals) and receive prioritized alerts for matching donations.",
      },
      {
        id: "rf-4",
        question: "Is there a limit to how much food can be requested?",
        answer:
          "There is no platform cap, but organizations must only claim amounts they have the refrigeration and beneficiary capacity to serve safely within the recommended freshness window.",
      },
      {
        id: "rf-5",
        question: "How do I claim available food?",
        answer:
          "When you receive a listing notification that matches your location and capacity, review the food description and tap 'Claim Food'. You will receive donor contact details, exact pickup instructions, and a digital collection pass.",
      },
    ],
  },
  {
    categoryId: "food-safety",
    categoryTitle: "Food Safety",
    description: "Maintaining strict hygiene, temperature standards, and consumer safety.",
    items: [
      {
        id: "fs-1",
        question: "How does ANNShare ensure food is safe?",
        answer:
          "We follow a strict 4-tier safety protocol: all donors agree to sanitary handling pledges, temperature control benchmarks (hot foods >60°C, cold foods <5°C), time-stamped freshness tracking, and verification checks at the moment of handoff.",
      },
      {
        id: "fs-2",
        question: "What food cannot be donated?",
        answer:
          "We do not accept: expired dairy/meats, alcohol, food that sat out at room temperature for longer than 2 hours, previously touched table leftovers, items with broken seals, or foods with mold or suspicious odors.",
      },
      {
        id: "fs-3",
        question: "How should donated food be labelled?",
        answer:
          "Every package should have a clearly visible label noting: (1) Dish name, (2) Veg/Non-Veg, (3) Common allergens (nuts, dairy, gluten), and (4) Date and time of preparation.",
      },
      {
        id: "fs-4",
        question: "What should I do if I have a food safety concern?",
        answer:
          "If a recipient identifies any safety or hygiene issues upon inspection, they are empowered to reject the batch immediately without penalty. Our 24/7 safety incident helpline handles documentation and review.",
      },
    ],
  },
  {
    categoryId: "pickups-logistics",
    categoryTitle: "Pickups & Logistics",
    description: "Details on transportation, pickup coordination, timing, and delays.",
    items: [
      {
        id: "pl-1",
        question: "Who collects the food?",
        answer:
          "Pickups are carried out by designated NGO staff, authorized community volunteers, or ANNShare logistics dispatch partners equipped with thermal insulated transport bags.",
      },
      {
        id: "pl-2",
        question: "How are pickup times arranged?",
        answer:
          "The donor specifies their preferred pickup window during listing (for example, 9:30 PM to 10:30 PM). The claiming organization must confirm arrival within this agreed window.",
      },
      {
        id: "pl-3",
        question: "What happens if a pickup is delayed?",
        answer:
          "The driver or recipient must notify the donor via the built-in messaging/call feature at least 15 minutes before the cutoff. If no one arrives, the listing is automatically re-routed to a secondary backup shelter.",
      },
      {
        id: "pl-4",
        question: "Can I schedule a future pickup?",
        answer:
          "Yes, donors can set future pickup windows up to 48 hours in advance, allowing partner shelters to coordinate vehicle logistics well ahead of time.",
      },
    ],
  },
  {
    categoryId: "ngos-verification",
    categoryTitle: "NGOs & Verification",
    description: "Account credentials, trust checks, and community verification protocols.",
    items: [
      {
        id: "nv-1",
        question: "What documents are required for NGO verification?",
        answer:
          "We require: (1) Official registration certificate (SWC affiliation or Ward office registration), (2) PAN certificate of the organization, (3) Government-issued ID of the authorized representative, and (4) Photo of storage/kitchen premises.",
      },
      {
        id: "nv-2",
        question: "How long does verification take?",
        answer:
          "Our verification team reviews applications within 24 hours. Once approved, you will receive an SMS and email notification granting full access to claim food in your area.",
      },
      {
        id: "nv-3",
        question: "Can individual volunteers or unverified groups claim food?",
        answer:
          "To guarantee food safety and prevent commercial resale, bulk prepared meals are only dispatched to verified institutional partners. Individuals can access neighborhood community pantry drops listed on the explore map.",
      },
    ],
  },
  {
    categoryId: "accounts",
    categoryTitle: "Accounts & Management",
    description: "Managing your user profile, team permissions, and notification preferences.",
    items: [
      {
        id: "acc-1",
        question: "How do I create an account?",
        answer:
          "Click 'Sign Up' in the header navigation, select your account type (Donor Kitchen, Non-Profit Organization, or Volunteer), and enter your basic contact details.",
      },
      {
        id: "acc-2",
        question: "Can I have multiple team members on one account?",
        answer:
          "Yes. Organization accounts support multiple branch managers and kitchen staff logins under a single verified entity, with customizable roles for listing and pickup authorization.",
      },
      {
        id: "acc-3",
        question: "How do I update my account details or notification settings?",
        answer:
          "Go to your profile settings to adjust notification preferences (WhatsApp, SMS, or Email alerts), change pickup address coordinates, or update key staff contact numbers.",
      },
    ],
  },
  {
    categoryId: "partnerships",
    categoryTitle: "Partnerships & Impact",
    description: "Corporate social responsibility (CSR), institutional donors, and community alliances.",
    items: [
      {
        id: "pt-1",
        question: "How can my business partner with ANNShare?",
        answer:
          "Hotels, supermarket chains, banquet halls, and food manufacturers can join our Corporate Zero-Waste Alliance. We provide scheduled recurring pickups, staff training on surplus management, and ESG sustainability reports.",
      },
      {
        id: "pt-2",
        question: "Do donors receive certified impact reports?",
        answer:
          "Yes! Every kilogram of food shared is logged on your dashboard with corresponding metrics for meals served, CO₂ emissions prevented, and landfill diversion data suitable for audited corporate ESG reports.",
      },
      {
        id: "pt-3",
        question: "Can we sponsor or fund ANNShare's logistics network?",
        answer:
          "We welcome funding partnerships from CSR funds, philanthropic foundations, and clean mobility providers to sponsor electric cargo vans and cold-chain storage. Reach out to partners@annshare.org.",
      },
    ],
  },
];
