export const adminProfile = {
  name: "Sarah Jenkins",
  role: "Operations Admin",
  badge: "System Admin",
  avatarText: "SJ",
  email: "admin@annshare.org"
};

export const adminBannerStats = {
  totalMealsRescued: "45,280",
  activeListings: 24,
  pendingVerifications: 8,
  activeRescues: 12
};

export const adminQuickActionsData = [
  { id: 1, title: "Verify NGOs", subtitle: "8 applications pending", icon: "verify", color: "#F39C12" },
  { id: 2, title: "Manage Listings", subtitle: "24 active across platform", icon: "listings", color: "#3498DB" },
  { id: 3, title: "Volunteer Assignments", subtitle: "5 unassigned pickups", icon: "volunteers", color: "#2ECC71" },
  { id: 4, title: "Generate Report", subtitle: "Export impact analytics", icon: "report", color: "#9333EA" }
];

export const adminAlertsData = [
  {
    id: "ALT-01",
    type: "expiring",
    icon: "clock",
    title: "Surplus Expiring Soon",
    desc: "Central Bistro - 18 Salad Boxes expiring in 45 minutes without matched NGO.",
    timestamp: "10 mins ago",
    severity: "danger"
  },
  {
    id: "ALT-02",
    type: "verification",
    icon: "shield",
    title: "NGO Verification Overdue",
    desc: "St. Jude Shelter application pending review for > 48 hours.",
    timestamp: "2 hours ago",
    severity: "warning"
  },
  {
    id: "ALT-03",
    type: "unassigned",
    icon: "truck",
    title: "Unassigned Courier Pickup",
    desc: "Rescue #FR-9012 (Bakery Surplus, 15kg) has no assigned volunteer courier.",
    timestamp: "15 mins ago",
    severity: "danger"
  },
  {
    id: "ALT-04",
    type: "flagged",
    icon: "flag",
    title: "Flagged Donor Account",
    desc: "Cornerstone Cafe flagged for temperature non-compliance on Pickup #FR-8810.",
    timestamp: "4 hours ago",
    severity: "warning"
  }
];

export const platformActivityData = [
  { id: 1, text: "Green Kitchen listed 50 warm meal boxes", time: "5 mins ago", type: "list", icon: "food" },
  { id: 2, text: "Hope Foundation claimed 50 warm meal boxes from Green Kitchen", time: "12 mins ago", type: "claim", icon: "ngo" },
  { id: 3, text: "Volunteer Courier Rohan completed delivery #FR-88410", time: "25 mins ago", type: "deliver", icon: "courier" },
  { id: 4, text: "New NGO Application submitted by Mercy Food Bank", time: "1 hour ago", type: "apply", icon: "shield" },
  { id: 5, text: "Fresh Harvest Market listed 40 kg fresh produce", time: "2 hours ago", type: "list", icon: "food" }
];

export const ngoVerificationQueueData = [
  { id: "NGO-101", name: "Mercy Community Pantry", date: "Aug 30, 2026", docsStatus: "Tax Exemption & Hygiene Verified", city: "Downtown" },
  { id: "NGO-102", name: "St. Jude Youth Shelter", date: "Aug 29, 2026", docsStatus: "501(c)(3) Pending Audit", city: "East District" },
  { id: "NGO-103", name: "Sunrise Meal Ministry", date: "Aug 28, 2026", docsStatus: "All Docs Complete", city: "Westside" },
  { id: "NGO-104", name: "City Care Kitchens", date: "Aug 27, 2026", docsStatus: "Food Safety Audit Complete", city: "Central" }
];

export const foodListingsOverviewData = [
  { id: "LST-501", restaurant: "Green Kitchen", foodType: "Hot Prepared Meals", quantity: "30 Trays (12.5 kg)", status: "Available", statusType: "warning", pickupWindow: "5:00 PM - 7:00 PM", matchedNgo: "Unmatched" },
  { id: "LST-502", restaurant: "Central Bistro", foodType: "Bakery Surplus", quantity: "15 Boxes (8.0 kg)", status: "Claimed", statusType: "info", pickupWindow: "4:00 PM - 6:00 PM", matchedNgo: "Hope Foundation" },
  { id: "LST-503", restaurant: "Fresh Harvest Market", foodType: "Fresh Produce", quantity: "40 kg Vegetables", status: "Picked Up", statusType: "success", pickupWindow: "3:30 PM - 5:30 PM", matchedNgo: "Mercy Pantry" },
  { id: "LST-504", restaurant: "Golden Bakery", foodType: "Pastry & Bread", quantity: "20 Bags (10 kg)", status: "Expired", statusType: "danger", pickupWindow: "Expired 2:00 PM", matchedNgo: "None" },
  { id: "LST-505", restaurant: "Cornerstone Cafe", foodType: "Soup Containers", quantity: "10 Buckets (15 L)", status: "Available", statusType: "warning", pickupWindow: "6:00 PM - 8:00 PM", matchedNgo: "Unmatched" }
];

export const activeRescuesAdminData = [
  { id: "RSC-01", route: "Green Kitchen → Hope Foundation", courier: "Alex Rivera (Prius #4821)", status: "Pickup In Progress", step: 4 },
  { id: "RSC-02", route: "Central Bistro → Shelter Care", courier: "Rohan Patel (E-Bike #102)", status: "Matched", step: 2 },
  { id: "RSC-03", route: "Fresh Harvest → Mercy Pantry", courier: "Maria Santos (Van #991)", status: "Delivered", step: 6 }
];

export const volunteerDirectoryData = [
  { id: "VOL-01", name: "Alex Rivera", status: "Active (On Delivery)", deliveries: 142, vehicle: "Toyota Prius" },
  { id: "VOL-02", name: "Rohan Patel", status: "Available", deliveries: 89, vehicle: "Cargo E-Bike" },
  { id: "VOL-03", name: "Maria Santos", status: "Active (On Delivery)", deliveries: 210, vehicle: "Ford Transit Van" },
  { id: "VOL-04", name: "David Kim", status: "Available", deliveries: 64, vehicle: "Honda Civic" }
];

export const topDonorsData = [
  { rank: 1, name: "Green Kitchen", mealsRescued: "4,250", kgSaved: "1,120 kg" },
  { rank: 2, name: "Fresh Harvest Market", mealsRescued: "3,890", kgSaved: "1,450 kg" },
  { rank: 3, name: "Central Bistro", mealsRescued: "2,940", kgSaved: "780 kg" },
  { rank: 4, name: "Golden Artisan Bakery", mealsRescued: "2,100", kgSaved: "620 kg" }
];

export const topNgosData = [
  { rank: 1, name: "Hope Foundation", mealsReceived: "5,120", activePickups: 3 },
  { rank: 2, name: "Mercy Pantry", mealsReceived: "4,300", activePickups: 2 },
  { rank: 3, name: "St. Jude Shelter", mealsReceived: "3,150", activePickups: 1 },
  { rank: 4, name: "Youth Community Hub", mealsReceived: "2,840", activePickups: 1 }
];

export const userManagementData = {
  restaurants: [
    { id: "RST-01", name: "Green Kitchen", contact: "manager@greenkitchen.com", status: "Active", joined: "Jan 2024" },
    { id: "RST-02", name: "Central Bistro", contact: "info@centralbistro.com", status: "Active", joined: "Mar 2024" },
    { id: "RST-03", name: "Cornerstone Cafe", contact: "owner@cornerstone.com", status: "Suspended", joined: "May 2024" }
  ],
  ngos: [
    { id: "NGO-01", name: "Hope Foundation", contact: "director@hopefoundation.org", status: "Active", joined: "Feb 2024" },
    { id: "NGO-02", name: "Mercy Pantry", contact: "help@mercypantry.org", status: "Active", joined: "Apr 2024" },
    { id: "NGO-03", name: "St. Jude Shelter", contact: "contact@stjude.org", status: "Active", joined: "Jun 2024" }
  ],
  volunteers: [
    { id: "VOL-01", name: "Alex Rivera", contact: "+977 9841234567", status: "Active", joined: "Jan 2024" },
    { id: "VOL-02", name: "Rohan Patel", contact: "+977 9851012345", status: "Active", joined: "Feb 2024" },
    { id: "VOL-03", name: "David Kim", contact: "+977 9801234567", status: "Suspended", joined: "Jul 2024" }
  ]
};
