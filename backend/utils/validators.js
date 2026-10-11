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
 * Extracts clean 10 phone digits, stripping country code 977 and non-digits
 */
const extractPhoneDigits = (raw) => {
  if (!raw) return '';
  let digits = String(raw).replace(/\D/g, '');
  if (digits.startsWith('977') && digits.length > 3) {
    digits = digits.slice(3);
  }
  return digits.slice(0, 10);
};

/**
 * Validates phone numbers (must be exactly 10-digit mobile starting with 98 or 97, no letters)
 */
const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  if (/[a-zA-Z]/.test(phone)) return false;
  const digits = extractPhoneDigits(phone);
  return digits.length === 10 && (digits.startsWith('98') || digits.startsWith('97'));
};

const normalizePhone = (phone) => {
  return extractPhoneDigits(phone);
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
  extractPhoneDigits,
  normalizePhone,
};
