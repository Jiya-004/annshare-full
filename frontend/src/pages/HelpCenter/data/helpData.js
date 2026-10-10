// ── Central Dataset for ANNShare Help Center ─────────────────────────────────

export const QUICK_ACTIONS = [
  {
    id: "action-1",
    num: "01",
    title: "I Have Food",
    desc: "Learn how to list and donate surplus food.",
    linkText: "Donation Guide",
    targetSection: "topic-food-donations",
    iconName: "IoRestaurantOutline",
  },
  {
    id: "action-2",
    num: "02",
    title: "I Need Food",
    desc: "Learn how to request available food.",
    linkText: "Receiving Food Guide",
    targetSection: "topic-requesting-food",
    iconName: "IoPeopleOutline",
  },
  {
    id: "action-3",
    num: "03",
    title: "I Represent an NGO",
    desc: "Learn about verification and organization accounts.",
    linkText: "NGO Guide",
    targetSection: "topic-accounts-verification",
    iconName: "IoBusinessOutline",
  },
  {
    id: "action-4",
    num: "04",
    title: "I Need Technical Help",
    desc: "Get help with your ANNShare account.",
    linkText: "Account Support",
    targetSection: "contact-support-section",
    iconName: "IoHelpCircleOutline",
  },
];

export const HELP_TOPICS = [
  {
    id: "topic-getting-started",
    title: "Getting Started",
    desc: "Everything you need to know before using ANNShare.",
    iconName: "IoRocketOutline",
    articles: [
      { id: "art-gs-1", title: "What is ANNShare?", readTime: "3 min read" },
      { id: "art-gs-2", title: "Creating an account", readTime: "4 min read" },
      { id: "art-gs-3", title: "How ANNShare works", readTime: "5 min read" },
    ],
  },
  {
    id: "topic-food-donations",
    title: "Food Donations",
    desc: "Help for restaurants, businesses, and individuals sharing food.",
    iconName: "IoRestaurantOutline",
    articles: [
      { id: "art-fd-1", title: "How to donate food", readTime: "4 min read" },
      { id: "art-fd-2", title: "Listing surplus food", readTime: "3 min read" },
      { id: "art-fd-3", title: "Managing donations", readTime: "5 min read" },
    ],
  },
  {
    id: "topic-requesting-food",
    title: "Requesting Food",
    desc: "Support for organizations receiving food.",
    iconName: "IoPeopleOutline",
    articles: [
      { id: "art-rf-1", title: "Finding available food", readTime: "3 min read" },
      { id: "art-rf-2", title: "Requesting a donation", readTime: "4 min read" },
      { id: "art-rf-3", title: "Managing requests", readTime: "4 min read" },
    ],
  },
  {
    id: "topic-food-safety",
    title: "Food Safety",
    desc: "Guidelines for safe and responsible food sharing.",
    iconName: "IoShieldCheckmarkOutline",
    articles: [
      { id: "art-fs-1", title: "Food safety requirements", readTime: "5 min read" },
      { id: "art-fs-2", title: "Packaging food", readTime: "4 min read" },
      { id: "art-fs-3", title: "Food storage guidelines", readTime: "6 min read" },
    ],
  },
  {
    id: "topic-pickups-logistics",
    title: "Pickups & Logistics",
    desc: "Information about food collection and handovers.",
    iconName: "IoBicycleOutline",
    articles: [
      { id: "art-pl-1", title: "Scheduling pickups", readTime: "4 min read" },
      { id: "art-pl-2", title: "Preparing for collection", readTime: "3 min read" },
      { id: "art-pl-3", title: "Delayed pickups", readTime: "4 min read" },
    ],
  },
  {
    id: "topic-accounts-verification",
    title: "Accounts & Verification",
    desc: "Manage your ANNShare account and organization profile.",
    iconName: "IoKeyOutline",
    articles: [
      { id: "art-av-1", title: "Account settings", readTime: "3 min read" },
      { id: "art-av-2", title: "NGO verification", readTime: "5 min read" },
      { id: "art-av-3", title: "Password and login help", readTime: "3 min read" },
    ],
  },
];

export const FEATURED_GUIDES = [
  {
    id: "guide-1",
    num: "Guide 01",
    badge: "FOR DONORS",
    title: "How to donate surplus food through ANNShare",
    desc: "A complete step-by-step guide for restaurants, hotels, caterers, and corporate kitchens. Learn packaging benchmarks, pickup scheduling, and verification handoffs.",
    image: "/food.png",
    linkText: "Read guide",
    content: {
      overview: "Commercial kitchens and banquet venues can safely redistribute unserved prepared food to verified local shelters in under 10 minutes following service.",
      steps: [
        "Segregate immediately: Move unserved chafer trays directly to clean prep stations. Never combine unserved food with table scrapings.",
        "Check temperatures: Ensure hot foods remain above 60°C or have been blast-chilled below 4°C within 90 minutes of prep.",
        "Secure in food-grade packaging: Pack items into clean stainless steel trays or food-grade thermal containers.",
        "Publish on ANNShare: Open the app, input meal portions, dietary notes (e.g., Pure Veg), and pickup deadline.",
        "Handover sign-off: Verify the courier's digital ANNShare badge upon arrival and confirm handover in the portal.",
      ],
      tip: "Kathmandu Valley hospitality partners can schedule regular recurring evening collection windows directly with our night logistics team.",
    },
  },
  {
    id: "guide-2",
    num: "Guide 02",
    badge: "FOR RECIPIENTS",
    title: "How NGOs can request and receive food",
    desc: "Everything verified non-profit shelters, children's homes, and relief organizations need to know about claiming surplus and arranging safe transportation.",
    linkText: "Read guide",
    content: {
      overview: "Verified shelters and care homes receive real-time notifications when matching food surplus becomes available within their geographic ward.",
      steps: [
        "Monitor live matching: Receive instant notifications matching your daily beneficiary count and dietary criteria.",
        "Claim allocation: Confirm request through your shelter dashboard within 20 minutes of listing publication.",
        "Coordinate reception: Ensure shelter kitchen staff are on standby with clean holding counters and temperature probes.",
        "Inspect upon delivery: Verify the tamper seal, inspect sensory freshness, and sign off the digital delivery manifest.",
        "Serve or refrigerate: Distribute warm meals within 45 minutes of receipt or immediately refrigerate at below 4°C.",
      ],
      tip: "Shelters with daily headcounts exceeding 50 children or elderly residents are prioritized during evening banquet redistribution.",
    },
  },
  {
    id: "guide-3",
    num: "Guide 03",
    badge: "SAFETY FIRST",
    title: "Food safety checklist for donors",
    desc: "Simple, practical protocols covering safe holding temperatures (hot >60°C, cold <5°C), labelling essentials, and sanitization before handover.",
    linkText: "Read guide",
    content: {
      overview: "Radical dignity and safety form the cornerstone of ANNShare. This quick checklist ensures zero compromise on food hygiene.",
      steps: [
        "The 2-Hour Window: Cooked meals must be packaged and transferred within 2 hours of leaving the active heating source.",
        "Temperature Thresholds: Hot food must be maintained at or above 60°C; cold items must be kept at 4°C or lower.",
        "Allergen & Dietary Labelling: Clearly mark containers with date, preparation time, and allergens (peanuts, dairy, gluten).",
        "Sanitized Packaging: Use only clean, single-use food-grade foil containers or sanitized reusable food-grade tubs.",
        "Personal Hygiene: Packaging staff must wear gloves, hairnets, and ensure all packaging counters are disinfected.",
      ],
      tip: "Download our printable laminated Kitchen Safety SOP sheet to display on your restaurant prep station.",
    },
  },
];

export const POPULAR_ARTICLES = [
  {
    num: "01",
    id: "pop-art-1",
    title: "How does ANNShare work?",
    summary: "A quick introduction to our automated community food redistribution platform.",
    linkTo: "/how-it-works",
  },
  {
    num: "02",
    id: "pop-art-2",
    title: "What food can I donate?",
    summary: "Understand ANNShare's accepted food categories, hygiene requirements, and prohibitions.",
    linkTo: "/donation-guidelines",
  },
  {
    num: "03",
    id: "pop-art-3",
    title: "How do I become a verified NGO?",
    summary: "Learn about SWC credentials, municipal Ward documentation, and the 24-hour verification process.",
    linkTo: "/community-guidelines",
  },
  {
    num: "04",
    id: "pop-art-4",
    title: "How quickly can food be collected?",
    summary: "Understanding rapid dispatch timeframes, pickup windows, and volunteer courier routing.",
    linkTo: "/pickup-guidelines",
  },
  {
    num: "05",
    id: "pop-art-5",
    title: "What should I do if a pickup is delayed?",
    summary: "Actionable steps to take when transport plans change, and how backup routing is triggered.",
    linkTo: "/pickup-guidelines",
  },
];

export const SUPPORT_STEPS = [
  {
    num: "01",
    title: "Choose what you need help with.",
    desc: "Select your role or topic to explore tailored guides for donors, shelters, and volunteers.",
  },
  {
    num: "02",
    title: "Explore guides and answers.",
    desc: "Read step-by-step documentation, safety checklists, and operational best practices.",
  },
  {
    num: "03",
    title: "Contact our team if you still need support.",
    desc: "Reach out via direct message or emergency food support for immediate coordination.",
  },
];

export const COMMUNITY_RESOURCES = [
  {
    title: "Community Guidelines",
    desc: "Standards for respectful and cooperative community sharing.",
    linkTo: "/community-guidelines",
  },
  {
    title: "Food Safety Policy",
    desc: "Mandatory hygiene, temperature, and packaging standards.",
    linkTo: "/food-safety",
  },
  {
    title: "Donation Guidelines",
    desc: "Clear criteria on acceptable items and portioning.",
    linkTo: "/donation-guidelines",
  },
  {
    title: "Pickup Guidelines",
    desc: "Protocols for secure handovers, timings, and vehicles.",
    linkTo: "/pickup-guidelines",
  },
];
