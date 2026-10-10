const express = require('express');
const router = express.Router();
const {
  getNotifications,
  createNotification,
  markNotificationRead,
  markAllNotificationsRead,
} = require('../controllers/notificationController');

router.get('/', getNotifications);
router.post('/', createNotification);
router.patch('/:id/read', markNotificationRead);
router.patch('/read-all', markAllNotificationsRead);

module.exports = router;
