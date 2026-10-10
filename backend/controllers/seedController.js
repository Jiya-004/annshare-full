const User = require('../models/User');
const Listing = require('../models/listing');
const Request = require('../models/Request');
const Category = require('../models/Category');
const Feedback = require('../models/Feedback');
const Blog = require('../models/Blog');
const Faq = require('../models/Faq');
const BlogCategory = require('../models/BlogCategory');
const FaqCategory = require('../models/FaqCategory');
const Notification = require('../models/Notification');

const seedDatabase = async (req, res) => {
  try {
    await runAutoSeed();
    res.status(200).json({ message: 'Database successfully seeded with ANNShare initial datasets!' });
  } catch (err) {
    res.status(500).json({ message: 'Seed failed: ' + err.message });
  }
};

const runAutoSeed = async () => {
  // 1. Seed Users
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    const users = [
      {
        name: 'Sarah Jenkins',
        email: 'admin@annshare.org',
        password: 'admin123',
        role: 'admin',
        orgName: 'ANNShare Operations',
        organization: 'ANNShare Operations',
        badge: 'System Admin',
        phone: '+977 9841000001',
        location: 'Kathmandu, Nepal',
        verificationStatus: 'verified',
        status: 'Active',
      },
      {
        name: 'Ramesh Shrestha',
        email: 'ramesh@himalayankitchen.com',
        password: 'password123',
        role: 'donor',
        orgName: 'Himalayan Kitchen & Café',
        organization: 'Himalayan Kitchen & Café',
        badge: 'Verified Food Donor',
        phone: '+977 9841234567',
        location: 'Thamel, Kathmandu',
        verificationStatus: 'verified',
        status: 'Active',
        totalDonations: 48,
        completedDonations: 45,
        activeDonations: 3,
        docs: [
          { name: 'Business License.pdf', type: 'License', status: 'verified' },
          { name: 'Hygiene Certificate.pdf', type: 'Safety Cert', status: 'verified' },
        ],
      },
      {
        name: 'Hope Foundation Nepal',
        email: 'coordination@hopefoundation.org',
        password: 'password123',
        role: 'ngo',
        orgName: 'Hope Foundation',
        organization: 'Hope Foundation',
        badge: 'Verified Community NGO',
        phone: '+977 9851012345',
        location: 'Jhamsikhel, Lalitpur',
        verificationStatus: 'verified',
        status: 'Active',
        totalRequests: 32,
        completedPickups: 28,
        docs: [
          { name: '501c3 Registration.pdf', type: 'Registration', status: 'verified' },
          { name: 'Food Safety Audit 2026.pdf', type: 'Audit', status: 'verified' },
        ],
      },
      {
        name: 'St. Jude Youth Shelter',
        email: 'info@stjudeshelter.org',
        password: 'password123',
        role: 'ngo',
        orgName: 'St. Jude Foundation',
        organization: 'St. Jude Foundation',
        badge: 'Verified Community NGO',
        phone: '+977 9801234567',
        location: 'Westside, Kathmandu',
        verificationStatus: 'verified',
        status: 'Active',
        totalRequests: 54,
        completedPickups: 50,
        docs: [{ name: 'NGO Registration.pdf', type: 'Registration', status: 'verified' }],
      },
      {
        name: 'Central Bistro & Bakery',
        email: 'manager@centralbistro.com',
        password: 'password123',
        role: 'donor',
        orgName: 'Central Bistro Ltd',
        organization: 'Central Bistro Ltd',
        badge: 'Verified Food Donor',
        phone: '+977 9860123456',
        location: 'Central Avenue, Kathmandu',
        verificationStatus: 'verified',
        status: 'Active',
        totalDonations: 30,
        completedDonations: 26,
        activeDonations: 2,
        docs: [{ name: 'Food Safety Cert.pdf', type: 'Safety Cert', status: 'verified' }],
      },
    ];

    for (const u of users) {
      await User.create(u);
    }
  }

  // 2. Seed Categories
  const catCount = await Category.countDocuments();
  if (catCount === 0) {
    const categories = [
      { name: 'Prepared Meals', icon: 'cooked', itemCount: 142, color: '#173F35', description: 'Hot & cold prepared meals' },
      { name: 'Bakery & Bread', icon: 'bakery', itemCount: 98, color: '#B9684D', description: 'Fresh bread, cakes & pastries' },
      { name: 'Fruits & Veggies', icon: 'vegetables', itemCount: 186, color: '#28624D', description: 'Fresh seasonal fruits & raw vegetables' },
      { name: 'Packaged Food', icon: 'packaged', itemCount: 85, color: '#789B82', description: 'Sealed shelf-stable items' },
      { name: 'Rice & Grains', icon: 'grains', itemCount: 64, color: '#A5AD72', description: 'Rice, lentils, flour & grains' },
      { name: 'Dairy & Pantry', icon: 'dairy', itemCount: 54, color: '#9BBCA4', description: 'Milk, cheese, butter & pantry staples' },
      { name: 'Other Items', icon: 'other', itemCount: 29, color: '#E7DDC9', description: 'Miscellaneous surplus ingredients' },
    ];
    await Category.insertMany(categories);
  }

  // 3. Seed Listings
  const listingCount = await Listing.countDocuments();
  if (listingCount === 0) {
    const listings = [
      {
        title: 'Fresh Vegetable Rice Meals',
        foodName: 'Fresh Vegetable Rice Meals',
        category: 'Prepared Meals',
        quantity: '48 portions',
        portions: '48 portions',
        weight_kg: 14.5,
        donor: 'Green Leaf Café',
        restaurantName: 'Green Leaf Café',
        location: 'Thamel, Kathmandu',
        address: 'Thamel, Kathmandu',
        contactPhone: '+977 984-1234567',
        pickupWindow: 'Today · 5:00 PM – 7:30 PM',
        expiryTime: 'Today at 8:00 PM',
        status: 'Available',
        image: '/food/food1.jpg',
        images: ['/food/food1.jpg', '/food/food2.jpg', '/food/food3.jpg'],
        dietaryTags: ['Vegetarian', 'Nut-Free'],
        description: 'Nutritious mixed vegetable dal bhat meals cooked today in hygienic sealed compostable containers.',
        handlingInstructions: 'Cooked at 1:30 PM today. Maintained at >65°C until packaging.',
      },
      {
        title: 'Fresh Bakery & Croissant Assortment',
        foodName: 'Fresh Bakery & Croissant Assortment',
        category: 'Bakery & Bread',
        quantity: '32 packs',
        portions: '32 packs',
        weight_kg: 10.0,
        donor: 'Himalayan Bakehouse',
        restaurantName: 'Himalayan Bakehouse',
        location: 'Lazimpat, Kathmandu',
        address: 'Lazimpat, Kathmandu',
        contactPhone: '+977 980-2345678',
        pickupWindow: 'Today · 6:00 PM – 8:00 PM',
        expiryTime: 'Today at 8:00 PM',
        status: 'Available',
        image: '/food/food2.jpg',
        images: ['/food/food2.jpg', '/food/food3.jpg', '/food/food4.jpg'],
        dietaryTags: ['Vegetarian'],
        description: 'Unsold daily freshly baked sourdough loaves, butter croissants, cinnamon rolls, and baguettes.',
      },
      {
        title: 'Cooked Dal, Tarkari & Basmati Rice',
        foodName: 'Cooked Dal, Tarkari & Basmati Rice',
        category: 'Prepared Meals',
        quantity: '75 portions',
        portions: '75 portions',
        weight_kg: 22.0,
        donor: 'Community Banquet Kitchen',
        restaurantName: 'Community Banquet Kitchen',
        location: 'Baneshwor, Kathmandu',
        address: 'Baneshwor, Kathmandu',
        contactPhone: '+977 985-1029384',
        pickupWindow: 'Today · 5:00 PM – 7:30 PM',
        expiryTime: 'Today at 7:30 PM',
        status: 'Available',
        image: '/food/food3.jpg',
        images: ['/food/food3.jpg', '/food/food4.jpg', '/food/food5.jpg'],
        dietaryTags: ['Vegetarian', 'Gluten-Free'],
        description: 'Untouched banquet food: Yellow lentil dal, seasonal cauliflower and green pea tarkari, basmati rice.',
      },
      {
        title: 'Fresh Garden Produce & Greens',
        foodName: 'Fresh Garden Produce & Greens',
        category: 'Fruits & Veggies',
        quantity: '25 kg',
        portions: '25 kg',
        weight_kg: 25.0,
        donor: 'FreshMart Agro Store',
        restaurantName: 'FreshMart Agro Store',
        location: 'Jhamsikhel, Lalitpur',
        address: 'Jhamsikhel, Lalitpur',
        contactPhone: '+977 981-9988776',
        pickupWindow: 'Today · 4:00 PM – 7:00 PM',
        expiryTime: 'Tomorrow at 12:00 PM',
        status: 'Available',
        image: '/food/food4.jpg',
        images: ['/food/food4.jpg', '/food/food5.jpg'],
        dietaryTags: ['Raw Produce', 'Organic'],
        description: 'Crisp green mustard leaves, fresh spinach, tomatoes, cucumbers, and carrots from local organic farms.',
      },
      {
        title: 'Packaged Organic Milk & Yoghurt',
        foodName: 'Packaged Organic Milk & Yoghurt',
        category: 'Dairy & Pantry',
        quantity: '30 cartons',
        portions: '30 cartons',
        weight_kg: 15.0,
        donor: 'Central Bistro & Bakery',
        restaurantName: 'Central Bistro & Bakery',
        location: 'Central Avenue, Kathmandu',
        address: 'Central Avenue, Kathmandu',
        contactPhone: '+977 9860123456',
        pickupWindow: 'Today · 3:00 PM – 6:00 PM',
        expiryTime: 'Sep 02, 2026',
        status: 'Available',
        image: '/food/food5.jpg',
        images: ['/food/food5.jpg', '/food/food6.jpg'],
        dietaryTags: ['Dairy', 'Pasteurized'],
        description: 'Sealed pasteurized whole milk cartons and fresh yoghurt tubs.',
      },
    ];
    await Listing.insertMany(listings);
  }

  // 4. Seed Requests
  const reqCount = await Request.countDocuments();
  if (reqCount === 0) {
    const requests = [
      {
        foodTitle: 'Fresh Vegetable Rice Meals',
        foodName: 'Fresh Vegetable Rice Meals',
        receiverName: 'Hope Foundation Nepal',
        ngoName: 'Hope Foundation Nepal',
        ngoOrg: 'Hope Foundation',
        donorName: 'Green Leaf Café',
        requestedQuantity: '48 portions',
        portions: '48 portions',
        location: 'Thamel, Kathmandu',
        pickupWindow: 'Today · 5:00 PM - 7:30 PM',
        status: 'confirmed',
        requestedAt: '15m ago',
        image: '/food/food1.jpg',
        contact: 'Sunil Shrestha (+977 984-1234567)',
      },
      {
        foodTitle: 'Fresh Bakery & Croissant Assortment',
        foodName: 'Fresh Bakery & Croissant Assortment',
        receiverName: 'St. Jude Youth Shelter',
        ngoName: 'St. Jude Youth Shelter',
        ngoOrg: 'St. Jude Foundation',
        donorName: 'Himalayan Bakehouse',
        requestedQuantity: '32 packs',
        portions: '32 packs',
        location: 'Lazimpat, Kathmandu',
        pickupWindow: 'Today · 6:00 PM – 8:00 PM',
        status: 'pending',
        requestedAt: '45m ago',
        image: '/food/food2.jpg',
        contact: 'Pooja Gurung (+977 980-2345678)',
      },
    ];
    await Request.insertMany(requests);
  }

  // 5. Seed Blogs
  const blogCount = await Blog.countDocuments();
  if (blogCount === 0) {
    const blogs = [
      {
        title: 'How Surplus Food Redistribution is Transforming Hunger Relief in Kathmandu',
        slug: 'surplus-food-redistribution-kathmandu',
        authorName: 'Sarah Jenkins',
        authorRole: 'ANNShare Operations Lead',
        authorAvatar: 'SJ',
        category: 'Community Impact',
        readTime: '5 min read',
        publishedDate: 'Oct 04, 2026',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
        excerpt: 'Over 40% of prepared food in urban restaurants goes unconsumed. Discover how ANNShare bridges the gap.',
        content: 'Surplus food rescue is more than just meal delivery; it is a fundamental pillar of urban sustainability. Every day, Kathmandu restaurants produce high-quality meals that can feed hundreds of families in need.\n\nBy leveraging real-time logistics and cold-chain protocols, ANNShare ensures hot food reaches shelters within 2 hours of posting.',
        isFeatured: true,
        status: 'Published',
      },
      {
        title: 'Food Safety Protocols for Commercial Donors & NGO Pickups',
        slug: 'food-safety-protocols-donors-ngos',
        authorName: 'Dr. Aarav Shrestha',
        authorRole: 'Food Hygiene Compliance Inspector',
        authorAvatar: 'AS',
        category: 'Food Safety',
        readTime: '4 min read',
        publishedDate: 'Sep 28, 2026',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
        excerpt: 'Maintaining thermal storage standards above 60°C for hot meals and below 4°C for dairy items is crucial.',
        content: 'Safety is our top priority. All participating kitchens undergo routine hygiene audits. When listing surplus items, donors must adhere to clean packaging standards and state exact preparation timestamps.',
        isFeatured: false,
        status: 'Published',
      },
      {
        title: 'Partner Spotlight: How Himalayan Kitchen Saved 1,200 Surplus Meals',
        slug: 'partner-spotlight-himalayan-kitchen',
        authorName: 'Maya Gurung',
        authorRole: 'Partnership Coordinator',
        authorAvatar: 'MG',
        category: 'Partner Stories',
        readTime: '6 min read',
        publishedDate: 'Sep 15, 2026',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        excerpt: 'A deep dive into how one restaurant eliminated kitchen waste and earned Gold Community Partner status.',
        content: 'Himalayan Kitchen joined the ANNShare network six months ago. By logging excess daily prep portions, they have diverted over 1.2 tons of food from landfills directly to local youth shelters.',
        isFeatured: false,
        status: 'Published',
      },
    ];
    await Blog.insertMany(blogs);
  }

  // 6. Seed FAQs
  const faqCount = await Faq.countDocuments();
  if (faqCount === 0) {
    const faqs = [
      {
        question: 'Who can register as a surplus food donor on ANNShare?',
        answer: 'Any licensed commercial food business—including restaurants, hotels, cafes, bakeries, corporate cafeterias, and event caterers—can register as a donor partner.',
        category: 'Food Donors',
        displayOrder: 1,
        status: 'Active',
      },
      {
        question: 'How are receiving NGOs and shelters verified before claiming food?',
        answer: 'Our admin team manually audits government registration documents, tax exemption status, and food hygiene storage capabilities before approving any NGO account.',
        category: 'NGO Receivers',
        displayOrder: 2,
        status: 'Active',
      },
      {
        question: 'What temperature and packaging standards are required for surplus pickups?',
        answer: 'Hot meals must be stored above 60°C or thermal-packed, refrigerated items at 2–4°C, and dry bakery goods in sealed food-grade containers.',
        category: 'Food Safety & Compliance',
        displayOrder: 3,
        status: 'Active',
      },
      {
        question: 'Is there any fee for NGOs to request and receive donated surplus food?',
        answer: 'No. ANNShare is 100% free for verified community shelters, hunger relief projects, and non-profit partner organizations.',
        category: 'General',
        displayOrder: 4,
        status: 'Active',
      },
    ];
    await Faq.insertMany(faqs);
  }

  // 7. Seed Blog & FAQ categories
  const bCatCount = await BlogCategory.countDocuments();
  if (bCatCount === 0) {
    await BlogCategory.insertMany([
      { name: 'Community Impact', postCount: 3, status: 'Active' },
      { name: 'Food Safety', postCount: 2, status: 'Active' },
      { name: 'Partner Stories', postCount: 4, status: 'Active' },
      { name: 'Sustainability', postCount: 1, status: 'Active' },
      { name: 'Logistics', postCount: 1, status: 'Active' },
    ]);
  }

  const fCatCount = await FaqCategory.countDocuments();
  if (fCatCount === 0) {
    await FaqCategory.insertMany([
      { name: 'General', faqCount: 5, status: 'Active' },
      { name: 'Food Donors', faqCount: 4, status: 'Active' },
      { name: 'NGO Receivers', faqCount: 3, status: 'Active' },
      { name: 'Food Safety & Compliance', faqCount: 4, status: 'Active' },
    ]);
  }

  // 8. Seed Feedback
  const feedCount = await Feedback.countDocuments();
  if (feedCount === 0) {
    await Feedback.insertMany([
      {
        fullName: 'Sarah Jenkins',
        userName: 'Sarah Jenkins',
        userRole: 'Donor',
        email: 'sarah.j@greenkitchen.com',
        phone: '+977 9841234567',
        organization: 'Green Kitchen Restaurant',
        topic: 'Food Donation',
        subject: 'Daily Automated Pickup Request',
        message: 'We have regular surplus hot meals every evening around 6:00 PM. We would like to coordinate automated daily pickup matching with local verified shelters.',
        priority: 'Medium',
        status: 'In Review',
      },
      {
        fullName: 'Mercy Pantry Operations',
        userName: 'Mercy Pantry Operations',
        userRole: 'NGO',
        email: 'contact@mercypantry.org',
        phone: '+977 9851012345',
        organization: 'Mercy Community Food Pantry',
        topic: 'Pickup Support',
        subject: 'Thermal Box Containers',
        message: 'Inquiring about temperature insulation containers for transporting hot prepared meals during evening distributions.',
        priority: 'High',
        status: 'Open',
      },
    ]);
  }
};

module.exports = { seedDatabase, runAutoSeed };
