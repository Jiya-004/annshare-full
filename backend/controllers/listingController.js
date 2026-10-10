const Listing = require('../models/listing');
const { sendNotification } = require('./notificationController');

const formatNepaliDate = (date = new Date()) => {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    return d.toLocaleString('en-US', {
      timeZone: 'Asia/Kathmandu',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch (e) {
    return date;
  }
};

// GET all listings (with search, category, status, and donor filtering)
const getListings = async (req, res) => {
  try {
    const { category, status, search, donorId, donor } = req.query;
    let filter = {};

    if (category && category !== 'All' && category !== 'all') {
      filter.category = new RegExp(category, 'i');
    }

    if (status && status !== 'All' && status !== 'all') {
      filter.status = new RegExp(status, 'i');
    }

    if (donorId) {
      filter.donorId = donorId;
    }

    if (donor) {
      filter.donor = new RegExp(donor, 'i');
    }

    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { foodName: new RegExp(search, 'i') },
        { donor: new RegExp(search, 'i') },
        { restaurantName: new RegExp(search, 'i') },
        { location: new RegExp(search, 'i') },
        { category: new RegExp(search, 'i') },
      ];
    }

    const listings = await Listing.find(filter).sort({ createdAt: -1 });

    const formatted = listings.map((l) => ({
      _id: l._id,
      id: l._id.toString(),
      title: l.title || l.foodName,
      foodName: l.foodName || l.title,
      category: l.category || 'Prepared Meals',
      quantity: l.quantity,
      portions: l.portions || l.quantity,
      weight_kg: l.weight_kg || 5,
      donor: l.donor || l.restaurantName || 'Food Partner',
      donorId: l.donorId || '',
      restaurantName: l.restaurantName || l.donor || 'Food Partner',
      location: l.location || 'Kathmandu, Nepal',
      address: l.address || l.location,
      contactPhone: l.contactPhone,
      postedDate: l.createdAt ? formatNepaliDate(l.createdAt) : (l.postedDate ? formatNepaliDate(l.postedDate) : formatNepaliDate()),
      expiryTime: l.expiryTime,
      expires_at: l.expires_at,
      pickupWindow: l.pickupWindow,
      status: l.status,
      claimedBy: l.claimedBy,
      claimedById: l.claimedById,
      image: l.image || '/food.png',
      images: l.images && l.images.length > 0 ? l.images : [l.image || '/food.png'],
      dietaryTags: l.dietaryTags || [],
      dietary: l.dietary,
      description: l.description,
      notes: l.notes,
      safetyInfo: l.handlingInstructions || 'Prepared according to food safety guidelines',
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single listing by ID
const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(200).json({
      _id: listing._id,
      id: listing._id.toString(),
      title: listing.title || listing.foodName,
      foodName: listing.foodName || listing.title,
      category: listing.category,
      quantity: listing.quantity,
      portions: listing.portions || listing.quantity,
      weight_kg: listing.weight_kg,
      donor: listing.donor || listing.restaurantName,
      donorId: listing.donorId,
      restaurantName: listing.restaurantName || listing.donor,
      location: listing.location,
      address: listing.address,
      contactPhone: listing.contactPhone,
      postedDate: listing.createdAt ? formatNepaliDate(listing.createdAt) : (listing.postedDate ? formatNepaliDate(listing.postedDate) : formatNepaliDate()),
      expiryTime: listing.expiryTime,
      expires_at: listing.expires_at,
      pickupWindow: listing.pickupWindow,
      status: listing.status,
      claimedBy: listing.claimedBy,
      claimedById: listing.claimedById,
      image: listing.image,
      images: listing.images,
      dietaryTags: listing.dietaryTags,
      dietary: listing.dietary,
      description: listing.description,
      notes: listing.notes,
      safetyInfo: listing.handlingInstructions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a listing
const createListing = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.title && data.foodName) data.title = data.foodName;
    if (!data.foodName && data.title) data.foodName = data.title;
    if (!data.donor && req.user) data.donor = req.user.organization || req.user.name;
    if (!data.donorId && req.user) data.donorId = req.user._id.toString();
    if (!data.restaurantName && data.donor) data.restaurantName = data.donor;
    if (!data.status || data.status.toLowerCase() === 'available') {
      data.status = 'Pending Approval';
    }
    if (!data.postedDate) {
      data.postedDate = formatNepaliDate();
    }

    const listing = await Listing.create(data);

    // Notify Admin about new pending donation
    await sendNotification({
      title: 'New Donation Listed',
      desc: `${data.donor || 'Food Partner'} listed "${data.title}" (${data.quantity || 'surplus'}). Review required.`,
      linkTab: 'Donations',
      role: 'admin',
      category: 'listing',
      relatedId: listing._id.toString(),
    });

    res.status(201).json({
      _id: listing._id,
      id: listing._id.toString(),
      ...listing.toObject(),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update a listing
const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(200).json(listing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH update listing status
const updateListingStatus = async (req, res) => {
  try {
    const { status, claimedBy, claimedById } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (claimedBy !== undefined) updateData.claimedBy = claimedBy;
    if (claimedById !== undefined) updateData.claimedById = claimedById;

    const listing = await Listing.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Trigger status update notifications
    const sLower = (status || '').toLowerCase();
    if (sLower === 'available' || sLower === 'approved') {
      await sendNotification({
        title: 'Donation Approved & Live!',
        desc: `Your listing "${listing.title}" was approved by moderators and is now visible on Find Food.`,
        linkTab: 'my-donations',
        userId: listing.donorId,
        role: 'donor',
        category: 'listing',
        relatedId: listing._id.toString(),
      });
    } else if (sLower.includes('reject')) {
      await sendNotification({
        title: 'Donation Not Approved',
        desc: `Your listing "${listing.title}" could not be approved at this time.`,
        linkTab: 'my-donations',
        userId: listing.donorId,
        role: 'donor',
        category: 'listing',
        relatedId: listing._id.toString(),
      });
    }

    res.status(200).json(listing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a listing
const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getListings,
  getListingById,
  createListing,
  updateListing,
  updateListingStatus,
  deleteListing,
};