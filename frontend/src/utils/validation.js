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
 * Strictly extracts digits from phone input, stripping country code 977 and any letters/words
 */
export const extractPhoneDigits = (raw) => {
  if (!raw) return "";
  let digits = String(raw).replace(/\D/g, "");
  if (digits.startsWith("977") && digits.length > 3) {
    digits = digits.slice(3);
  }
  return digits.slice(0, 10);
};

/**
 * Validates phone numbers (strictly 10 digits for Nepali mobile, no letters allowed)
 */
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== "string") return false;
  // Reject any string containing letters or words
  if (/[a-zA-Z]/.test(phone)) return false;
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  const phoneRegex = /^(?:\+?977|0)?(98\d{8}|97\d{8}|01\d{7})$|^\+?[1-9]\d{7,14}$/;
  return phoneRegex.test(cleaned);
};

/**
 * Formats Nepal phone number for clean consistent display
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return "";
  const cleaned = String(phone).replace(/[\s\-\(\)]/g, "");
  if (cleaned.startsWith("+977")) return phone;
  if (/^(98\d{8}|97\d{8})$/.test(cleaned)) {
    return `+977 ${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
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
