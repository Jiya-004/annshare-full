// Validation Utilities for ANNShare Backend

/**
 * Validates email format according to RFC standard
 */
const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim().toLowerCase());
};

/**
 * Validates phone numbers (supports Nepal 98/97 mobile, landline, and international formats)
 */
const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Nepal: 98XXXXXXXX, 97XXXXXXXX, +97798XXXXXXXX, +97797XXXXXXXX, 01XXXXXXX
  // International: +XXXXXXXXXXXX (7-15 digits)
  const phoneRegex = /^(?:\+?977|0)?(98\d{8}|97\d{8}|01\d{7})$|^\+?[1-9]\d{7,14}$/;
  return phoneRegex.test(cleaned);
};

/**
 * Validates password strength (minimum 6 characters)
 */
const isValidPassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  return password.trim().length >= 6;
};

module.exports = {
  isValidEmail,
  isValidPhone,
  isValidPassword,
};
