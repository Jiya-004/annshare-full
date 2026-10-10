export const donorProfile = {
  name: "Green Kitchen",
  role: "Verified Donor",
  avatarText: "GK",
  location: "123 Market Street, Downtown",
  contact: "+977 9841234567",
  memberSince: "2024",
  stats: {
    mealsShared: 245,
    foodSavedKg: 55,
    successfulRescues: 18
  }
};

export const activeDonationsData = [
  {
    id: "DON-101",
    title: "30 Mixed Prepared Meal Trays",
    category: "Hot Prepared Meals",
    quantity: "30 Trays (12.5 kg)",
    pickupTime: "Pick up by 6:00 PM",
    location: "Green Kitchen - Main Pickup Bay",
    status: "Waiting for NGO",
    statusType: "warning", // amber
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    matchedNGO: null,
    tempRequirement: "Keep Warm (>60°C)",
    notes: "Includes 15 vegetarian pasta trays and 15 roasted chicken bowls."
  },
  {
    id: "DON-102",
    title: "15 Boxes Bakery Surplus (Bread & Pastries)",
    category: "Bakery Items",
    quantity: "15 Boxes (8.0 kg)",
    pickupTime: "Pickup 4:00 PM",
    location: "Green Kitchen - Back Door",
    status: "Matched with NGO",
    statusType: "info", // blue
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
    matchedNGO: "Hope Foundation",
    tempRequirement: "Ambient Temperature",
    notes: "Baked fresh this morning. Contains croissants, sourdough loaves, and artisan rolls."
  },
  {
    id: "DON-103",
    title: "25 Fresh Veggie & Salad Boxes",
    category: "Fresh Produce",
    quantity: "25 Boxes (10.0 kg)",
    pickupTime: "Pickup 5:30 PM",
    location: "Green Kitchen - Cooler Station 2",
    status: "Courier Dispatched",
    statusType: "success", // mint green
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
    matchedNGO: "Community Food Bank",
    courier: "SpeedDelivery #4821 (Alex Rivera)",
    tempRequirement: "Chilled (2-4°C)",
    notes: "Pre-packaged garden salads with olive oil vinaigrette packets attached."
  }
];

export const smartMatchData = {
  matchPercentage: 96,
  ngoName: "Hope Foundation",
  needDescription: "Needs 20-30 warm meals within 5 km • 15 min pickup capability",
  distance: "2.1 km Away",
  pickupETA: "15 min Pickup",
  capacity: "Capacity: 50 kg",
  tags: [
    "Proximity: < 3 km",
    "Food Type: Hot Prepared",
    "Portion Quantity: Ideal Match",
    "Pickup Window: Immediate"
  ]
};

export const donationHistoryData = [
  { id: "HIS-901", item: "45 Meals", date: "Yesterday, 7:30 PM", recipient: "Hope Foundation", status: "Delivered", statusType: "delivered" },
  { id: "HIS-902", item: "20 Bakery Items", date: "Aug 28, 2026", recipient: "Shelter Care", status: "Delivered", statusType: "delivered" },
  { id: "HIS-903", item: "15 Sandwiches", date: "Aug 26, 2026", recipient: "Youth Community Hub", status: "Picked Up", statusType: "pickedup" },
  { id: "HIS-904", item: "10 Meals", date: "Aug 24, 2026", recipient: "Unassigned", status: "Expired", statusType: "expired" }
];

export const liveTrackingData = {
  trackingId: "#FR-88421",
  currentStepIndex: 4, // 0 to 5
  courierDistance: "1.2 km away",
  courierETA: "~6 mins",
  steps: [
    { label: "Listed", time: "2:15 PM", status: "completed" },
    { label: "Matched", time: "2:18 PM", status: "completed" },
    { label: "Requested", time: "2:22 PM", status: "completed" },
    { label: "Approved", time: "2:25 PM", status: "completed" },
    { label: "Pickup", time: "2:40 PM", status: "active" },
    { label: "Delivered", time: "Est 3:15 PM", status: "pending" }
  ],
  gridInfo: {
    donor: { name: "Green Kitchen", address: "123 Market St, Bay 2" },
    receivingNgo: { name: "Hope Foundation", address: "45 Shelter Way, Central" },
    courier: { name: "Alex Rivera", details: "Toyota Prius • #4821" },
    payload: { pickupTime: "2:40 PM Today", quantity: "25 Meals (10.0 kg)" }
  }
};

export const mapSignalsData = [
  { id: 1, type: "food", title: "Green Kitchen (You)", desc: "30 Warm Meals • Ready for pickup", lat: 50, lng: 35, color: "#2ECC71" },
  { id: 2, type: "ngo", title: "Hope Foundation Shelter", desc: "Needs 40 portions tonight", lat: 35, lng: 55, color: "#F39C12" },
  { id: 3, type: "courier", title: "Volunteer Courier #4821", desc: "En route to Green Kitchen • 1.2 km away", lat: 60, lng: 45, color: "#3498DB" },
  { id: 4, type: "food", title: "Central Bistro", desc: "12 Bakery Boxes • Pickup by 7 PM", lat: 40, lng: 25, color: "#2ECC71" },
  { id: 5, type: "ngo", title: "St. Jude Food Pantry", desc: "Open for ambient surplus intake", lat: 65, lng: 70, color: "#F39C12" }
];

export const activeRescuesNearYouData = [
  {
    id: "RES-01",
    title: "Kitchen Depot",
    info: "15 Warm Meals • 0.8 km away",
    status: "Waiting for Pickup",
    statusColor: "#F39C12",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "RES-02",
    title: "Fresh Harvest Market",
    info: "40 kg Fresh Produce • 1.4 km away",
    status: "Matched with NGO",
    statusColor: "#3498DB",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "RES-03",
    title: "Golden Artisan Bakery",
    info: "20 Pastry Packs • 2.5 km away",
    status: "Courier Dispatched",
    statusColor: "#2ECC71",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "RES-04",
    title: "Cornerstone Cafe",
    info: "10 Soup Containers • 3.1 km away",
    status: "Waiting for Pickup",
    statusColor: "#F39C12",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=200&q=80"
  }
];

export const impactStatsData = [
  { label: "Meals Rescued", value: "12,450+", subtext: "Total meals served" },
  { label: "Food Saved", value: "6.2 Tons", subtext: "Diverted from landfill" },
  { label: "Food Donors", value: "320+", subtext: "Active partner kitchens" },
  { label: "Verified NGOs", value: "88", subtext: "Shelters & pantries" },
  { label: "Successful Rescues", value: "4,620", subtext: "Completed dispatches" }
];

export const monthlyRescuesChartData = [
  { month: "Jan", value: 1200, height: "45%" },
  { month: "Feb", value: 1550, height: "58%" },
  { month: "Mar", value: 2100, height: "72%" },
  { month: "Apr", value: 2450, height: "85%" },
  { month: "May", value: 2700, height: "92%" },
  { month: "Jun", value: 3100, height: "100%" }
];

export const categoryBreakdownData = [
  { name: "Prepared Warm Meals", percentage: 45, color: "#1B4D3E" },
  { name: "Bakery & Fresh Bread", percentage: 28, color: "#2ECC71" },
  { name: "Fresh Produce & Fruit", percentage: 17, color: "#10B981" },
  { name: "Dairy & Refrigerated Items", percentage: 10, color: "#3498DB" }
];

export const trustBadgesData = [
  {
    icon: "ngo",
    title: "Verified NGOs",
    description: "Every receiving partner undergoes rigorous compliance, hygiene, and background verification."
  },
  {
    icon: "safety",
    title: "Food Safety Standards",
    description: "Thermal tracking logging and temperature guidelines enforced for hot and chilled surplus."
  },
  {
    icon: "tracking",
    title: "Rescue Tracking",
    description: "Real-time GPS visibility for active courier pickups with automated digital chain of custody."
  },
  {
    icon: "transparent",
    title: "Transparent Impact",
    description: "Audited impact metrics and automated tax-deductible donation receipts generated."
  }
];
