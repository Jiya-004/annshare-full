const WorkerDonation = require('../models/WorkerDonation');
const Notification = require('../models/Notification');

// GET all worker donations
const getWorkerDonations = async (req, res) => {
  try {
    const donations = await WorkerDonation.find().sort({ createdAt: -1 });

    const totalRaised = donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
    const completedCount = donations.filter((d) => d.status === 'Completed' || d.status === 'Verified').length;

    const methodBreakdown = {
      esewa: donations.filter((d) => d.paymentMethod === 'esewa').reduce((s, d) => s + (Number(d.amount) || 0), 0),
      khalti: donations.filter((d) => d.paymentMethod === 'khalti').reduce((s, d) => s + (Number(d.amount) || 0), 0),
      fonepay: donations.filter((d) => d.paymentMethod === 'fonepay').reduce((s, d) => s + (Number(d.amount) || 0), 0),
      bank: donations.filter((d) => d.paymentMethod === 'bank').reduce((s, d) => s + (Number(d.amount) || 0), 0),
    };

    const formatted = donations.map((d) => ({
      _id: d._id,
      id: d._id.toString(),
      transactionId: d.transactionId,
      donorName: d.donorName || 'Anonymous Donor',
      donorPhone: d.donorPhone || '',
      donorEmail: d.donorEmail || '',
      amount: Number(d.amount) || 0,
      currency: d.currency || 'NPR',
      paymentMethod: d.paymentMethod || 'esewa',
      status: d.status || 'Completed',
      fundType: d.fundType || 'Worker Welfare Fund',
      note: d.note || '',
      date: d.date || (d.createdAt ? new Date(d.createdAt).toLocaleDateString('en-US') : 'Recent'),
      createdAt: d.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: formatted,
      stats: {
        totalRaised,
        totalDonations: donations.length,
        completedCount,
        averageDonation: donations.length ? Math.round(totalRaised / donations.length) : 0,
        methodBreakdown,
      },
    });
  } catch (err) {
    console.error('Error fetching worker donations:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST create worker donation
const createWorkerDonation = async (req, res) => {
  try {
    const {
      amount,
      paymentMethod = 'esewa',
      donorName,
      donorPhone,
      donorEmail,
      transactionId,
      note,
    } = req.body;

    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      return res.status(400).json({ success: false, message: 'A valid donation amount is required.' });
    }

    const uniqueTxn = transactionId || 'TXN-ANN-' + Math.floor(100000 + Math.random() * 900000);

    const donation = new WorkerDonation({
      amount: parsedAmount,
      paymentMethod: paymentMethod.toLowerCase(),
      donorName: donorName?.trim() || 'Anonymous Donor',
      donorPhone: donorPhone?.trim() || '',
      donorEmail: donorEmail?.trim() || '',
      transactionId: uniqueTxn,
      status: 'Completed',
      fundType: 'Worker Welfare Fund',
      note: note || '',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });

    const saved = await donation.save();

    // Create Admin notification
    try {
      await Notification.create({
        title: `Worker Fund: Rs. ${parsedAmount.toLocaleString()}`,
        desc: `${saved.donorName} donated Rs. ${parsedAmount.toLocaleString()} via ${saved.paymentMethod.toUpperCase()} to the Worker Welfare Fund.`,
        category: 'donation',
        role: 'admin',
        linkTab: 'Worker Donations',
        relatedId: saved._id.toString(),
        time: 'Just now',
      });
    } catch (notifErr) {
      console.warn('Could not create notification for worker donation:', notifErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Worker donation processed successfully',
      data: {
        _id: saved._id,
        id: saved._id.toString(),
        transactionId: saved.transactionId,
        donorName: saved.donorName,
        donorPhone: saved.donorPhone,
        amount: saved.amount,
        paymentMethod: saved.paymentMethod,
        status: saved.status,
        date: saved.date,
        createdAt: saved.createdAt,
      },
    });
  } catch (err) {
    console.error('Error creating worker donation:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH / PUT update status (e.g. Mark Verified or Pending)
const updateWorkerDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const donation = await WorkerDonation.findById(id);
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation record not found' });
    }

    if (status) donation.status = status;
    if (note !== undefined) donation.note = note;

    const updated = await donation.save();
    res.status(200).json({ success: true, message: 'Donation status updated', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE worker donation record
const deleteWorkerDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await WorkerDonation.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Donation record not found' });
    }
    res.status(200).json({ success: true, message: 'Donation deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET aggregate stats
const getWorkerDonationStats = async (req, res) => {
  try {
    const donations = await WorkerDonation.find();
    const totalRaised = donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
    const count = donations.length;
    const average = count ? Math.round(totalRaised / count) : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalRaised,
        totalDonations: count,
        averageDonation: average,
        recentCount: donations.slice(0, 5).length,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getWorkerDonations,
  createWorkerDonation,
  updateWorkerDonationStatus,
  deleteWorkerDonation,
  getWorkerDonationStats,
};
