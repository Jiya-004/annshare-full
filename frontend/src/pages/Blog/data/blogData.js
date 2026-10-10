// ── ANNShare Blog & Editorial Publication Dataset ─────────────────────────────

export const BLOG_CATEGORIES = [
  "All Stories",
  "Food Waste",
  "Community",
  "Sustainability",
  "Food Safety",
  "ANNShare Updates",
];

export const FEATURED_STORY = {
  id: "featured-1",
  slug: "what-happens-when-surplus-food-finds-a-second-home",
  category: "COMMUNITY IMPACT",
  title: "What happens when surplus food finds a second home?",
  description:
    "Every day, restaurants and hospitality kitchens have wholesome food left over. But with the right community network, that food becomes something much more valuable than waste: radical nourishment.",
  author: "ANNShare Team",
  date: "September 5, 2026",
  readTime: "6 min read",
image: "/volunteer.png",
  imageCaption:
    "Children and community elders sharing fresh, warm meals provided through evening banquet redistribution in Lalitpur.",
  sections: [
    {
      id: "the-problem",
      heading: "The problem isn't always the food",
      content: [
        "In cities like Kathmandu, Lalitpur, and Bhaktapur, surplus food and food poverty exist only streets apart. A wedding banquet venue might conclude service with 150 untouched portions of steaming pulao, dal makhani, and seasonal vegetable curry. Just two kilometers away, an eldercare home or children's shelter plans its next day's grocery budget with anxious care.",
        "The tragedy of food waste in modern urban centers is almost never a lack of willingness to share. It is an infrastructure problem. Chefs and banquet managers are exhausted at midnight after a grueling ten-hour shift. Shelters are staffed by busy caregivers who cannot monitor sporadic phone calls. Without an automated, verified redistribution bridge, good food invariably ends up in the municipal bin.",
      ],
      list: [
        "Over 35% of commercially prepared banquet food in urban centers goes uneaten despite pristine preparation.",
        "Local care shelters spend up to 40% of their operational budget on daily staple groceries.",
        "Redistributing 100 surplus portions averts an estimated 220kg of greenhouse gas emissions.",
        "A reliable digital matching network turns midnight surplus into immediate morning dignity.",
      ],
    },
    {
      id: "restaurant-dilemma",
      heading: "A restaurant's end-of-day dilemma",
      content: [
        "Ask any executive chef in Kathmandu Valley about the end of service, and they will describe the same uncomfortable ritual. Food cooked with pride and premium ingredients sits in stainless chafer trays. It cannot be served to paying guests tomorrow because of strict hospitality standards. Yet throwing it out hurts every kitchen worker who understands the hard agricultural labor behind every grain of rice.",
        "Before ANNShare, kitchens had two imperfect choices: informally give portions to whoever happened to be outside their back gate, or throw everything into black waste sacks. Neither offered hygiene verification, reliable timing, or dignity for the recipients.",
      ],
      keyPoints: [
        "Uncompromising kitchen hygiene standards prevent next-day commercial reheating for guests.",
        "Informal gate handovers lack cold-chain safety monitoring and consistent community equity.",
        "Kitchen teams need an automated protocol that takes less than two minutes at closing time.",
      ],
    },
    {
      id: "where-annshare-comes-in",
      heading: "Where ANNShare comes in",
      content: [
        "ANNShare was engineered specifically to solve the 'last-mile midnight dilemma.' When a banquet manager taps a single button to publish 60 meal portions at 10:15 PM, our smart matching system instantly maps verified community care homes within a tight 5-kilometer turnaround zone.",
        "Volunteer couriers riding electric two-wheelers and local NGO collection vans are dispatched with insulated food-grade containers. Digital handovers are signed in seconds using simple QR verification, and food reaches recipient dining tables while it is still steaming hot—strictly observing the 2-Hour Food Safety window.",
      ],
      steps: [
        {
          title: "Instant Surplus Notification",
          text: "Kitchen manager logs portion counts, food category, and allergens via mobile in under 60 seconds.",
        },
        {
          title: "Verified Nearby Match",
          text: "The platform algorithm pairs the donation with pre-vetted care shelters within a 5km transit perimeter.",
        },
        {
          title: "Insulated Rapid Transit",
          text: "Volunteer couriers transport food inside sanitized, thermal-grade containers maintaining safe temperatures.",
        },
        {
          title: "QR Code Safety Handover",
          text: "Recipient shelters scan the batch QR code to record arrival time, temperature verification, and distribution.",
        },
      ],
    },
    {
      id: "stronger-connections",
      heading: "Building stronger local connections",
      content: [
        "Redistributing food does something deeper than diverting organic waste from landfill heaps. It rebuilds the social fabric of our neighborhoods. When local restaurants, hotels, and community shelters interact every week, empathy replaces indifference.",
        "Over the past year alone, over 12,450 wholesome meals have found a second home across Kathmandu Valley. That represents more than 18 tonnes of greenhouse gas emissions prevented—and, most importantly, thousands of community members nourished with complete dignity.",
      ],
      checklist: [
        "Verify core food temperature stays above 60°C for hot items or below 5°C for chilled portions.",
        "Use certified clean food-grade containers with sealed lids to prevent transit contamination.",
        "Complete delivery and consumption within the mandatory 2-hour food safety redistribution window.",
        "Maintain transparent digital records so every participant is accountable to community health.",
      ],
    },
  ],
  pullQuote: {
    quote: "The value of food doesn't end when a restaurant closes.",
    attribution: "ANNShare Community Partner, Patan",
  },
  toc: [
    { id: "the-problem", label: "The problem" },
    { id: "restaurant-dilemma", label: "A restaurant's dilemma" },
    { id: "where-annshare-comes-in", label: "Where ANNShare comes in" },
    { id: "stronger-connections", label: "Building stronger connections" },
  ],
};

export const LATEST_STORIES = [
  {
    id: "story-1",
    slug: "why-perfectly-good-food-still-ends-up-in-the-bin",
    category: "Food Waste",
    title: "Why perfectly good food still ends up in the bin",
    description:
      "Understanding the everyday structural and logistics causes of commercial food waste in modern hospitality.",
    author: "Siddhartha Bajracharya",
    date: "September 2, 2026",
    readTime: "4 min read",
    image: "/bin.png",
    sections: [
      {
        id: "understanding-waste",
        heading: "The hidden drivers of kitchen excess",
        content: [
          "Commercial kitchens must plan for peak customer volume to ensure no guest goes unfed. This built-in buffer, while necessary for hospitality operations, inevitably creates consistent daily surplus.",
          "By understanding forecasting variances and setting up rapid surplus protocols, restaurants can reduce their kitchen footprint while feeding hundreds of community members every month.",
        ],
      },
    ],
  },
  {
    id: "story-2",
    slug: "the-organizations-turning-surplus-into-support",
    category: "Community",
    title: "The organizations turning surplus into support",
    description:
      "Meet the dedicated shelter directors and caregivers helping nutritious food reach elderly homes and youth centers.",
    author: "Pooja Shrestha",
    date: "August 28, 2026",
    readTime: "5 min read",
    image: "/support.png",
    sections: [
      {
        id: "grassroots-care",
        heading: "Caregivers on the frontlines of nutrition",
        content: [
          "Across Kathmandu Valley, grassroots shelters stretch tight monthly budgets to provide nutritious daily meals for vulnerable children and senior citizens.",
          "Through real-time surplus matching, shelter directors can redirect precious funds previously spent on staple groceries toward education, healthcare, and shelter repairs.",
        ],
      },
    ],
  },
  {
    id: "story-3",
    slug: "small-changes-that-can-reduce-food-waste-at-home",
    category: "Sustainability",
    title: "Small changes that can reduce food waste at home",
    description:
      "Simple storage habits, mindful meal planning, and creative cooking practices that make a measurable household difference.",
    author: "Aarav Sharma",
    date: "August 22, 2026",
    readTime: "4 min read",
    image: "/small.png",
    sections: [
      {
        id: "kitchen-habits",
        heading: "Rethinking home food routines",
        content: [
          "Food waste doesn't just happen at banquets and supermarkets; nearly 40% of discarded food originates in household kitchens.",
          "Simple techniques like the 'first-in, first-out' pantry rule, proper leafy green preservation, and portion awareness can cut domestic waste in half.",
        ],
      },
    ],
  },
  {
    id: "story-4",
    slug: "how-to-prepare-food-for-safe-sharing",
    category: "Food Safety",
    title: "How to prepare food for safe sharing",
    description:
      "A practical, step-by-step hygiene checklist for restaurant chefs and banquet caterers preparing surplus for pickup.",
    author: "Dr. Sunita Karki",
    date: "August 15, 2026",
    readTime: "5 min read",
    image: "/prepare.png",
    sections: [
      {
        id: "safety-standards",
        heading: "Uncompromising temperature & packaging rules",
        content: [
          "Safe redistribution begins at the preparation station. Food must be segregated immediately after service, maintained above 60°C or blast-chilled under 4°C, and packed in food-grade containers.",
          "Clear labeling with allergen notices and preparation timestamps ensures recipient kitchens serve meals with complete safety and confidence.",
        ],
      },
    ],
  },
  {
    id: "story-5",
    slug: "inside-a-day-of-food-collection",
    category: "ANNShare Updates",
    title: "Inside a day of food collection",
    description:
      "Following volunteer electric scooter couriers as they navigate evening traffic to transport hot meals from kitchens to shelters.",
    author: "Bikash Tamang",
    date: "August 10, 2026",
    readTime: "6 min read",
    image: "/box.png",
    sections: [
      {
        id: "night-couriers",
        heading: "The beating heart of neighborhood logistics",
        content: [
          "When most of the city prepares for sleep, ANNShare volunteer riders strap on reflective vests and load thermal containers.",
          "Navigating the narrow alleys of Patan and Thamel, these dedicated couriers bridge the gap between commercial surplus and community care.",
        ],
      },
    ],
  },
  {
    id: "story-6",
    slug: "why-local-partnerships-matter",
    category: "Community",
    title: "Why local partnerships matter",
    description:
      "How close collaboration between municipal wards, local kitchens, and grassroots non-profits builds resilient food ecosystems.",
    author: "Prakash Thapa",
    date: "August 4, 2026",
    readTime: "4 min read",
    image: "/community-sharing2.jpg",
    sections: [
      {
        id: "collaborative-networks",
        heading: "Strength through local solidarity",
        content: [
          "No single entity can solve urban food insecurity alone. Sustainable impact requires a trusted coalition of local business leaders, social workers, and civic organizations.",
          "ANNShare serves as the connective tissue that empowers these community leaders to work as one unified team.",
        ],
      },
    ],
  },
  {
    id: "story-7",
    slug: "how-local-ngos-make-food-redistribution-possible",
    category: "Community",
    title: "How local NGOs make food redistribution possible",
    description:
      "Grassroots non-profits work on the frontlines every day, bridging community shelters and commercial food surpluses.",
    author: "Rina Maharjan",
    date: "July 24, 2026",
    readTime: "6 min read",
    image: "/community-volunteers.jpg",
    sections: [
      {
        id: "ngo-impact",
        heading: "Grassroots mobilization and care",
        content: [
          "Local non-profits understand the pulse of their neighborhoods, ensuring that redistributed meals reach those who need nutrition most.",
        ],
      },
    ],
  },
  {
    id: "story-8",
    slug: "the-real-environmental-cost-of-food-waste",
    category: "Sustainability",
    title: "The real environmental cost of food waste",
    description:
      "Analyzing the methane emissions, water footprint, and systemic environmental toll of unrescued municipal food waste.",
    author: "Anil Shrestha",
    date: "July 18, 2026",
    readTime: "5 min read",
    image: "/surplus-food4.jpg",
    sections: [
      {
        id: "environmental-cost",
        heading: "Methane reduction through food rescue",
        content: [
          "Diverting organic waste from landfills directly mitigates potent greenhouse gas emissions while replenishing vulnerable communities.",
        ],
      },
    ],
  },
  {
    id: "story-9",
    slug: "navigating-food-redistribution-in-monsoon-season",
    category: "Food Safety",
    title: "Navigating food redistribution in monsoon season",
    description:
      "Essential temperature controls, waterproof thermal transit packaging, and rainy season logistics protocols.",
    author: "Dr. Sunita Karki",
    date: "July 12, 2026",
    readTime: "4 min read",
    image: "/nepali-food-safety.jpg",
    sections: [
      {
        id: "monsoon-handling",
        heading: "Keeping food safe during heavy downpours",
        content: [
          "Monsoon rains introduce humidity and transit delays. Our specialized thermal containers keep hot dishes above 60°C regardless of weather conditions.",
        ],
      },
    ],
  },
];

export const MORE_STORIES_LIST = [
  {
    id: "more-1",
    slug: "how-to-safely-package-food-for-donation",
    category: "Food Safety",
    title: "How to safely package food for donation",
    readTime: "4 min read",
    date: "July 29, 2026",
  },
  {
    id: "more-2",
    slug: "how-local-ngos-make-food-redistribution-possible",
    category: "Community",
    title: "How local NGOs make food redistribution possible",
    readTime: "6 min read",
    date: "July 24, 2026",
  },
  {
    id: "more-3",
    slug: "the-real-environmental-cost-of-food-waste",
    category: "Sustainability",
    title: "The real environmental cost of food waste",
    readTime: "5 min read",
    date: "July 18, 2026",
  },
  {
    id: "more-4",
    slug: "navigating-food-redistribution-in-monsoon-season",
    category: "ANNShare Updates",
    title: "Navigating food redistribution in monsoon season",
    readTime: "4 min read",
    date: "July 12, 2026",
  },
];

export const IMPACT_STORY_DATA = {
  label: "IN THE COMMUNITY",
  heading: "Behind every shared meal is a bigger story.",
  description:
    "Food redistribution is about more than just numbers on a balance sheet. It is about honoring human labor, respecting the natural resources that grew our food, and ensuring every child and senior citizen in our community receives wholesome meals with radical dignity.",
  ctaText: "Explore Our Impact",
  ctaLink: "/about#impact",
  images: [
    {
      src: "/community-volunteers.jpg",
      alt: "Community volunteers packaging fresh meals",
    },
    {
      src: "/eating.png",
      alt: "Community sharing fresh meals",
    },
    {
      src: "/community-meal.jpg",
      alt: "Children enjoying nutritious meals in community center",
    },
  ],
};

// ── Helper Resolvers ────────────────────────────────────────────────────────
export function getPostBySlug(slug) {
  if (slug === FEATURED_STORY.slug) {
    return FEATURED_STORY;
  }
  const foundInLatest = LATEST_STORIES.find((s) => s.slug === slug);
  if (foundInLatest) {
    // Fill full article structure for reading page
    return {
      ...FEATURED_STORY,
      ...foundInLatest,
      sections: foundInLatest.sections || FEATURED_STORY.sections,
      pullQuote: foundInLatest.pullQuote || FEATURED_STORY.pullQuote,
      toc: foundInLatest.toc || FEATURED_STORY.toc,
    };
  }
  const foundInMore = MORE_STORIES_LIST.find((s) => s.slug === slug);
  if (foundInMore) {
    return {
      ...FEATURED_STORY,
      ...foundInMore,
      image: "/food.png",
      description:
        "An in-depth editorial analysis exploring best practices for sustainable urban food recovery in Kathmandu Valley.",
      sections: FEATURED_STORY.sections,
      pullQuote: FEATURED_STORY.pullQuote,
      toc: FEATURED_STORY.toc,
    };
  }
  return FEATURED_STORY;
}

export function getRelatedPosts(currentSlug, limit = 3) {
  const all = [FEATURED_STORY, ...LATEST_STORIES];
  return all.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export function getNextAndPrevPosts(currentSlug) {
  const all = [FEATURED_STORY, ...LATEST_STORIES];
  const currentIndex = all.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) {
    return { prevPost: all[0], nextPost: all[1] };
  }
  const prevPost = currentIndex > 0 ? all[currentIndex - 1] : all[all.length - 1];
  const nextPost = currentIndex < all.length - 1 ? all[currentIndex + 1] : all[0];
  return { prevPost, nextPost };
}

export function getCategoryCounts() {
  const all = [FEATURED_STORY, ...LATEST_STORIES];
  const counts = { "All Stories": all.length };
  all.forEach((item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
  });
  return counts;
}
