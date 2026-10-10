const Request = require('../models/Request');
const Listing = require('../models/listing');

// GET all food requests
const getRequests = async (req, res) => {
  try {
    const { receiverId, donorId, status } = req.query;
    let filter = {};
    if (receiverId) filter.receiverId = receiverId;
    if (donorId) filter.donorId = donorId;
    if (status) filter.status = status;

    const requests = await Request.find(filter).sort({ createdAt: -1 });

    const formatted = requests.map((r) => ({
      _id: r._id,
      id: r._id.toString(),
      listingId: r.listingId,
      donationId: r.donationId || r.listingId,
      foodTitle: r.foodTitle || r.foodName,
      foodName: r.foodName || r.foodTitle,
      receiverName: r.receiverName || r.ngoName,
      receiverId: r.receiverId || r.ngoId,
      donorName: r.donorName,
      donorId: r.donorId,
      requestedQuantity: r.requestedQuantity || r.portions,
      portions: r.portions || r.requestedQuantity,
      location: r.location,
      pickupWindow: r.pickupWindow,
      status: r.status,
      requestedAt: r.requestedAt,
      requestDate: r.requestDate,
      reason: r.reason,
      image: r.image,
      contact: r.contact,
      ngoId: r.ngoId || r.receiverId,
      ngoName: r.ngoName || r.receiverName,
      ngoOrg: r.ngoOrg,
      createdAt: r.createdAt,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single request by ID
const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create request / claim
const createRequest = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.foodTitle && data.foodName) data.foodTitle = data.foodName;
    if (!data.foodName && data.foodTitle) data.foodName = data.foodTitle;

    if (req.user) {
      if (!data.receiverId) data.receiverId = req.user._id.toString();
      if (!data.ngoId) data.ngoId = req.user._id.toString();
      if (!data.receiverName) data.receiverName = req.user.organization || req.user.name;
      if (!data.ngoName) data.ngoName = req.user.organization || req.user.name;
      if (!data.ngoOrg) data.ngoOrg = req.user.organization || req.user.name;
    }

    const newRequest = await Request.create(data);

    // Optionally update the associated listing status to Requested / Claimed
    if (data.listingId) {
      await Listing.findByIdAndUpdate(data.listingId, {
        status: 'Requested',
        claimedBy: data.receiverName || 'NGO Partner',
        claimedById: data.receiverId,
      });
    }

    res.status(201).json({
      _id: newRequest._id,
      id: newRequest._id.toString(),
      ...newRequest.toObject(),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH update request status
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await Request.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Sync listing status if completed or confirmed
    if (request.listingId) {
      if (status === 'confirmed' || status === 'Confirmed') {
        await Listing.findByIdAndUpdate(request.listingId, { status: 'Claimed' });
      } else if (status === 'completed' || status === 'Completed') {
        await Listing.findByIdAndUpdate(request.listingId, { status: 'Picked Up' });
      }
    }

    res.status(200).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE request
const deleteRequest = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getRequests,
  getRequestById,
  createRequest,
  updateRequestStatus,
  deleteRequest,
};
