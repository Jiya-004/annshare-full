const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Listing = require('./models/listing');
const Request = require('./models/Request');
const Blog = require('./models/Blog');
const Faq = require('./models/Faq');
const Category = require('./models/Category');
const Feedback = require('./models/Feedback');

async function checkDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected successfully to Database: annshare\n');
    console.log('================ LIVE DATABASE SUMMARY ================');

    const [userCount, listingCount, reqCount, blogCount, faqCount, catCount, feedCount] = await Promise.all([
      User.countDocuments(),
      Listing.countDocuments(),
      Request.countDocuments(),
      Blog.countDocuments(),
      Faq.countDocuments(),
      Category.countDocuments(),
      Feedback.countDocuments(),
    ]);

    console.log(`👤 Users (Donors / NGOs / Admins): ${userCount}`);
    console.log(`🍲 Food Listings (Donations):     ${listingCount}`);
    console.log(`📦 Food Claim Requests:           ${reqCount}`);
    console.log(`📰 Blog Posts:                    ${blogCount}`);
    console.log(`❓ FAQs:                          ${faqCount}`);
    console.log(`🏷️  Categories:                    ${catCount}`);
    console.log(`💬 Feedback & Support Tickets:     ${feedCount}`);
    console.log('=======================================================\n');

    // Show latest 3 Blog Posts
    const latestBlogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    console.log('--- 📰 LATEST BLOG POSTS ---');
    if (latestBlogs.length === 0) {
      console.log('No blogs in database yet.');
    } else {
      latestBlogs.forEach((b, idx) => {
        console.log(`${idx + 1}. [${b.status}] "${b.title}" by ${b.authorName} (${b.publishedDate})`);
        console.log(`   Image URL: ${b.image || 'None'}`);
      });
    }

    // Show latest 3 FAQs
    const latestFaqs = await Faq.find().sort({ createdAt: -1 }).limit(3);
    console.log('\n--- ❓ LATEST FAQS ---');
    if (latestFaqs.length === 0) {
      console.log('No FAQs in database yet.');
    } else {
      latestFaqs.forEach((f, idx) => {
        console.log(`${idx + 1}. Q: "${f.question}" [${f.category}]`);
      });
    }

    // Show latest 3 Food Listings
    const latestListings = await Listing.find().sort({ createdAt: -1 }).limit(3);
    console.log('\n--- 🍲 LATEST FOOD DONATIONS ---');
    if (latestListings.length === 0) {
      console.log('No food listings in database yet.');
    } else {
      latestListings.forEach((l, idx) => {
        console.log(`${idx + 1}. "${l.title}" | Donor: ${l.donor} | Status: ${l.status}`);
      });
    }

    console.log('\nDatabase inspection complete.\n');
    process.exit(0);
  } catch (err) {
    console.error('Database connection or query error:', err.message);
    process.exit(1);
  }
}

checkDatabase();
