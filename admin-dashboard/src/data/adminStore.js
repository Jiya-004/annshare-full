// Centralized Mock Data Store for AnnShare Admin Dashboard
// Pure in-memory state & exported datasets. NO network, fetch, or backend calls.

export const mockAdminUser = {
  id: "ADM-001",
  name: "Sarah Jenkins",
  email: "admin@annshare.org",
  role: "admin",
  organization: "ANNShare Operations",
  badge: "System Admin",
  avatarText: "SJ"
};

export const initialUsersStore = [
  {
    id: "USR-101",
    name: "Sarah Jenkins",
    email: "sarah.j@greenkitchen.com",
    phone: "+977 9841234567",
    role: "donor",
    orgName: "Green Kitchen Restaurant",
    location: "Downtown District",
    joinedDate: "Jan 12, 2026",
    verificationStatus: "verified",
    status: "Active",
    avatarText: "GK",
    totalDonations: 48,
    completedDonations: 45,
    activeDonations: 3,
    docs: [
      { name: "Business License.pdf", type: "License", status: "verified" },
      { name: "Hygiene Certificate.pdf", type: "Safety Cert", status: "verified" }
    ]
  },
  {
    id: "USR-102",
    name: "Mercy Community Food Pantry",
    email: "contact@mercypantry.org",
    phone: "+977 9851012345",
    role: "ngo",
    orgName: "Mercy Pantry Inc",
    location: "East District",
    joinedDate: "Feb 05, 2026",
    verificationStatus: "pending",
    status: "Active",
    avatarText: "MP",
    totalRequests: 32,
    completedPickups: 28,
    docs: [
      { name: "501c3 Tax Exemption.pdf", type: "Tax Exemption", status: "pending" },
      { name: "Food Safety Audit 2026.pdf", type: "Audit", status: "verified" }
    ]
  },
  {
    id: "USR-103",
    name: "St. Jude Youth Shelter",
    email: "info@stjudeshelter.org",
    phone: "+977 9801234567",
    role: "ngo",
    orgName: "St. Jude Foundation",
    location: "Westside",
    joinedDate: "Feb 20, 2026",
    verificationStatus: "verified",
    status: "Active",
    avatarText: "SJ",
    totalRequests: 54,
    completedPickups: 50,
    docs: [
      { name: "NGO Registration.pdf", type: "Registration", status: "verified" }
    ]
  },
  {
    id: "USR-104",
    name: "Central Bistro & Bakery",
    email: "manager@centralbistro.com",
    phone: "+977 9860123456",
    role: "donor",
    orgName: "Central Bistro Ltd",
    location: "Central Avenue",
    joinedDate: "Mar 01, 2026",
    verificationStatus: "verified",
    status: "Active",
    avatarText: "CB",
    totalDonations: 30,
    completedDonations: 26,
    activeDonations: 2,
    docs: [
      { name: "Food Safety Cert.pdf", type: "Safety Cert", status: "verified" }
    ]
  },
  {
    id: "USR-105",
    name: "Cornerstone Cafe",
    email: "owner@cornerstonecafe.com",
    phone: "+977 9812345678",
    role: "donor",
    orgName: "Cornerstone Cafe LLC",
    location: "North District",
    joinedDate: "Apr 10, 2026",
    verificationStatus: "rejected",
    status: "Suspended",
    avatarText: "CC",
    totalDonations: 5,
    completedDonations: 2,
    activeDonations: 0,
    docs: [
      { name: "Health Inspection.pdf", type: "Audit", status: "rejected" }
    ]
  }
];

import { CATEGORIES } from './categories';

export const initialCategoriesStore = CATEGORIES;

export const initialListingsStore = [
  {
    id: "DON-501",
    title: "50 Hot Prepared Meals Boxes",
    foodName: "50 Hot Prepared Meals Boxes",
    category: "Prepared Meals",
    donor: "Green Kitchen Restaurant",
    donorId: "USR-101",
    quantity: "50 boxes",
    weight_kg: 12.5,
    location: "Downtown District",
    postedDate: "Aug 31, 2026 10:30 AM",
    expiryTime: "Today at 6:00 PM",
    expires_at: "2026-08-31 18:00:00",
    status: "Available",
    claimedBy: null,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "DON-502",
    title: "Fresh Bakery Surplus (Bread & Pastries)",
    foodName: "Fresh Bakery Surplus (Bread & Pastries)",
    category: "Bakery & Bread",
    donor: "Central Bistro & Bakery",
    donorId: "USR-104",
    quantity: "25 bags",
    weight_kg: 10.0,
    location: "Central Avenue",
    postedDate: "Aug 31, 2026 09:15 AM",
    expiryTime: "Today at 8:00 PM",
    expires_at: "2026-08-31 20:00:00",
    status: "Requested",
    claimedBy: "St. Jude Youth Shelter",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "DON-503",
    title: "Fresh Vegetables & Fruits Crate",
    foodName: "Fresh Vegetables & Fruits Crate",
    category: "Fruits & Veggies",
    donor: "Fresh Harvest Market",
    donorId: "USR-101",
    quantity: "45 kg",
    weight_kg: 45.0,
    location: "East District",
    postedDate: "Aug 30, 2026 04:00 PM",
    expiryTime: "Sep 01, 2026",
    expires_at: "2026-09-01 18:00:00",
    status: "Picked Up",
    claimedBy: "Mercy Community Food Pantry",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "DON-504",
    title: "Packaged Organic Milk & Yoghurt",
    foodName: "Packaged Organic Milk & Yoghurt",
    category: "Dairy & Pantry",
    donor: "Central Bistro & Bakery",
    donorId: "USR-104",
    quantity: "30 cartons",
    weight_kg: 15.0,
    location: "Central Avenue",
    postedDate: "Aug 30, 2026 02:00 PM",
    expiryTime: "Sep 02, 2026",
    expires_at: "2026-09-02 18:00:00",
    status: "Completed",
    claimedBy: "St. Jude Youth Shelter",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "DON-505",
    title: "Assorted Soup Containers",
    foodName: "Assorted Soup Containers",
    category: "Prepared Meals",
    donor: "Cornerstone Cafe",
    donorId: "USR-105",
    quantity: "15 buckets",
    weight_kg: 10.0,
    location: "North District",
    postedDate: "Aug 29, 2026 11:00 AM",
    expiryTime: "Aug 29, 2026 8:00 PM",
    expires_at: "2026-08-29 20:00:00",
    status: "Expired",
    claimedBy: null,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=300&q=80"
  }
];

export const initialRequestsStore = [];

export const initialSchedulesStore = [
  {
    id: "SCH-1",
    time: "09:30 AM",
    title: "Morning Bakery Pickup",
    sub: "Central Bistro & Bakery • 25 bags surplus",
    type: "pickup",
    date: "2026-08-20"
  },
  {
    id: "SCH-2",
    time: "01:15 PM",
    title: "Pantry NGO Audit Visit",
    sub: "Mercy Community Pantry • Hygiene Verification",
    type: "audit_visit",
    date: "2026-08-20"
  },
  {
    id: "SCH-3",
    time: "04:00 PM",
    title: "Hot Prepared Meals Pickup",
    sub: "Green Kitchen Restaurant • 50 meal boxes",
    type: "pickup",
    date: "2026-08-20"
  }
];

export const initialFeedbackStore = [
  {
    id: "FDB-101",
    fullName: "Sarah Jenkins",
    email: "sarah.j@greenkitchen.com",
    phone: "+977 9841234567",
    organization: "Green Kitchen Restaurant",
    topic: "Food Donation",
    message: "We have regular surplus hot meals every evening around 6:00 PM. We would like to coordinate automated daily pickup matching with local verified shelters.",
    date: "Aug 30, 2026 05:20 PM"
  },
  {
    id: "FDB-102",
    fullName: "Mercy Pantry Operations",
    email: "contact@mercypantry.org",
    phone: "+977 9851012345",
    organization: "Mercy Community Food Pantry",
    topic: "Pickup Support",
    message: "Inquiring about temperature insulation containers for transporting hot prepared meals during evening distributions.",
    date: "Aug 29, 2026 02:45 PM"
  },
  {
    id: "FDB-103",
    fullName: "David Ray",
    email: "manager@centralbistro.com",
    phone: "+977 9860123456",
    organization: "Central Bistro & Bakery",
    topic: "Food Donation",
    message: "We produce fresh bakery surplus every afternoon. Asking if we can extend the expiry window for dry bread and pastries to 24 hours.",
    date: "Aug 28, 2026 11:15 AM"
  },
  {
    id: "FDB-104",
    fullName: "Anita Sharma",
    email: "info@stjudeshelter.org",
    phone: "+977 9801234567",
    organization: "St. Jude Youth Shelter",
    topic: "NGO Account Inquiry",
    message: "Thank you for the quick verification approval. We would like to add an secondary emergency contact number for weekend pickups.",
    date: "Aug 27, 2026 09:30 AM"
  }
];

export const initialBlogsStore = [
  {
    id: "BLG-101",
    title: "How Surplus Food Redistribution is Transforming Hunger Relief in Kathmandu",
    slug: "surplus-food-redistribution-kathmandu",
    authorName: "Sarah Jenkins",
    authorRole: "ANNShare Operations Lead",
    authorAvatar: "SJ",
    category: "Community Impact",
    readTime: "5 min read",
    publishedDate: "Oct 04, 2026",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    excerpt: "Over 40% of prepared food in urban restaurants goes unconsumed. Discover how ANNShare is bridging the gap between surplus kitchens and community shelters.",
    content: "Surplus food rescue is more than just meal delivery; it is a fundamental pillar of urban sustainability. Every day, Kathmandu restaurants produce high-quality meals that can feed hundreds of families in need.\n\nBy leveraging real-time logistics and cold-chain protocols, ANNShare ensures hot food reaches shelters within 2 hours of posting.",
    isFeatured: true,
    status: "Published"
  },
  {
    id: "BLG-102",
    title: "Food Safety Protocols for Commercial Donors & NGO Pickups",
    slug: "food-safety-protocols-donors-ngos",
    authorName: "Dr. Aarav Shrestha",
    authorRole: "Food Hygiene Compliance Inspector",
    authorAvatar: "AS",
    category: "Food Safety",
    readTime: "4 min read",
    publishedDate: "Sep 28, 2026",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    excerpt: "Maintaining thermal storage standards above 60°C for hot meals and below 4°C for dairy items is crucial for recipient safety.",
    content: "Safety is our top priority. All participating kitchens undergo routine hygiene audits. When listing surplus items, donors must adhere to clean packaging standards and state exact preparation timestamps.",
    isFeatured: false,
    status: "Published"
  },
  {
    id: "BLG-103",
    title: "Partner Spotlight: How Himalayan Kitchen Saved 1,200 Surplus Meals",
    slug: "partner-spotlight-himalayan-kitchen",
    authorName: "Maya Gurung",
    authorRole: "Partnership Coordinator",
    authorAvatar: "MG",
    category: "Partner Stories",
    readTime: "6 min read",
    publishedDate: "Sep 15, 2026",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    excerpt: "A deep dive into how one restaurant eliminated kitchen waste and earned Gold Community Partner status.",
    content: "Himalayan Kitchen joined the ANNShare network six months ago. By logging excess daily prep portions, they have diverted over 1.2 tons of food from landfills directly to local youth shelters.",
    isFeatured: false,
    status: "Published"
  }
];

export const initialFaqsStore = [
  {
    id: "FAQ-201",
    question: "Who can register as a surplus food donor on ANNShare?",
    answer: "Any licensed commercial food business—including restaurants, hotels, cafes, bakeries, corporate cafeterias, and event caterers—can register as a donor partner.",
    category: "Food Donors",
    displayOrder: 1,
    status: "Active"
  },
  {
    id: "FAQ-202",
    question: "How are receiving NGOs and shelters verified before claiming food?",
    answer: "Our admin team manually audits government registration documents, tax exemption status, and food hygiene storage capabilities before approving any NGO account.",
    category: "NGO Receivers",
    displayOrder: 2,
    status: "Active"
  },
  {
    id: "FAQ-203",
    question: "What temperature and packaging standards are required for surplus pickups?",
    answer: "Hot meals must be stored above 60°C or thermal-packed, refrigerated items at 2–4°C, and dry bakery goods in sealed food-grade containers.",
    category: "Food Safety & Compliance",
    displayOrder: 3,
    status: "Active"
  },
  {
    id: "FAQ-204",
    question: "Is there any fee for NGOs to request and receive donated surplus food?",
    answer: "No. ANNShare is 100% free for verified community shelters, hunger relief projects, and non-profit partner organizations.",
    category: "General",
    displayOrder: 4,
    status: "Active"
  }
];

export const initialBlogCategoriesStore = [
  { id: "BCAT-1", name: "Community Impact", postCount: 3, createdDate: "14 Mar, 2026", status: "Active" },
  { id: "BCAT-2", name: "Food Safety", postCount: 2, createdDate: "18 Feb, 2026", status: "Active" },
  { id: "BCAT-3", name: "Partner Stories", postCount: 4, createdDate: "05 Jan, 2026", status: "Active" },
  { id: "BCAT-4", name: "Sustainability", postCount: 1, createdDate: "20 Jan, 2026", status: "Active" },
  { id: "BCAT-5", name: "Logistics", postCount: 1, createdDate: "02 Feb, 2026", status: "Active" }
];

export const initialFaqCategoriesStore = [
  { id: "FCAT-1", name: "General", faqCount: 5, createdDate: "10 Jan, 2026", status: "Active" },
  { id: "FCAT-2", name: "Food Donors", faqCount: 4, createdDate: "12 Feb, 2026", status: "Active" },
  { id: "FCAT-3", name: "NGO Receivers", faqCount: 3, createdDate: "15 Mar, 2026", status: "Active" },
  { id: "FCAT-4", name: "Food Safety & Compliance", faqCount: 4, createdDate: "01 Apr, 2026", status: "Active" }
];

export const mockSummaryReport = {
  totalKgRescued: "3,480 kg",
  estimatedMeals: "128,450",
  activeDonations: 5,
  totalDonors: 14,
  totalNgos: 9,
  donationsTrend: [
    { label: "Mar", val: 1200 },
    { label: "Apr", val: 1450 },
    { label: "May", val: 1800 },
    { label: "Jun", val: 2100 },
    { label: "Jul", val: 2400 },
    { label: "Aug", val: 2850 }
  ]
};
