const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    foodName: { type: String },
    foodType: { type: String },
    category: { type: String, default: 'Prepared Meals' },
    quantity: { type: String, required: true },
    portions: { type: String, default: '' },
    weight_kg: { type: Number, default: 5 },
    donor: { type: String, required: true },
    donorId: { type: String },
    restaurantName: { type: String },
    location: { type: String, default: 'Kathmandu, Nepal' },
    address: { type: String, default: 'Kathmandu' },
    contactPhone: { type: String, default: '+977 9841234567' },
    postedDate: {
      type: String,
      default: () =>
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    expiryTime: { type: String, default: 'Today at 8:00 PM' },
    expires_at: { type: String },
    pickupWindow: { type: String, default: 'Today · 4:00 PM – 7:30 PM' },
    status: {
      type: String,
      enum: ['Available', 'Requested', 'Claimed', 'Picked Up', 'Completed', 'Expired', 'available', 'claimed', 'picked_up', 'expired'],
      default: 'Available',
    },
    claimedBy: { type: String, default: null },
    claimedById: { type: String, default: null },
    image: {
      type: String,
      default: '/food.png',
    },
    images: [{ type: String }],
    dietaryTags: [{ type: String }],
    dietary: { type: String, default: 'Vegetarian' },
    isPerishable: { type: Boolean, default: true },
    temperature: { type: String, default: 'Warm / Room Temp' },
    handlingInstructions: { type: String, default: 'Keep covered until distribution' },
    notes: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Listing', listingSchema);