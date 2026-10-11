// Frontend Validation Utilities for ANNShare

/**
 * Validates email format (RFC standard)
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim().toLowerCase());
};

/**
 * Checks if email is a Gmail address
 */
export const isGmail = (email) => {
  if (!email || typeof email !== "string") return false;
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim());
};

/**
 * Strictly extracts digits from phone input, stripping country code 977 only when provided with full number
 */
export const extractPhoneDigits = (raw) => {
  if (!raw) return "";
  let digits = String(raw).replace(/\D/g, "");
  if (digits.startsWith("977") && digits.length >= 13) {
    digits = digits.slice(3);
  }
  return digits;
};

/**
 * Validates phone numbers (strictly 10 digits for Nepali mobile starting with 98 or 97, no letters/words)
 */
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== "string") return false;
  // Reject any string containing letters or words
  if (/[a-zA-Z]/.test(phone)) return false;
  const digits = extractPhoneDigits(phone);
  // Must be strictly 10 digits starting with 98 or 97
  return /^(98|97)\d{8}$/.test(digits);
};

/**
 * Formats Nepal phone number for clean consistent display (+977 98XXX-XXXXX)
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return "";
  const digits = extractPhoneDigits(phone);
  if (digits.length === 10) {
    return `+977 ${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  const cleaned = String(phone).replace(/[^\d+]/g, "").trim();
  return cleaned;
};

/**
 * Validates donation form inputs
 */
export const validateDonationForm = (data) => {
  const errors = {};
  if (!data.title || !data.title.trim()) {
    errors.title = "Food title or dish name is required.";
  }
  if (!data.quantity || Number(data.quantity) <= 0) {
    errors.quantity = "Please enter a valid quantity greater than 0.";
  }
  if (data.contactPhone && !isValidPhone(data.contactPhone)) {
    errors.contactPhone = "Please enter a valid 10-digit mobile number (e.g. +977 980-1234567).";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates registration form inputs
 */
export const validateRegisterForm = ({ name, email, password, phone }) => {
  const errors = {};
  if (!name || !name.trim()) {
    errors.name = "Full Name or Organization Name is required.";
  }
  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  if (phone && !isValidPhone(phone)) {
    errors.phone = "Please enter a valid phone number (e.g. 9841234567).";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
