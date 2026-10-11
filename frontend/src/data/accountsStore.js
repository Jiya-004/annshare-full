import { isValidPhone, extractPhoneDigits } from "../utils/validation";

const STORAGE_KEY = "annshare_accounts";

/**
 * Seed accounts for demo purposes if localStorage is empty.
 */
const DEFAULT_ACCOUNTS = [
  {
    id: "donor-101",
    name: "Ramesh Shrestha",
    organization: "Himalayan Kitchen & Café",
    identifier: "ramesh@himalayankitchen.com",
    email: "ramesh@himalayankitchen.com",
    phone: "9841234567",
    password: "password123",
    role: "donor",
    avatar: "R",
    badge: "Verified Food Donor",
    location: "Thamel, Kathmandu",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ngo-202",
    name: "Hope Foundation Nepal",
    organization: "Hope Foundation",
    identifier: "coordination@hopefoundation.org",
    email: "coordination@hopefoundation.org",
    phone: "9851012345",
    password: "password123",
    role: "ngo",
    avatar: "H",
    badge: "Verified Community NGO",
    location: "Jhamsikhel, Lalitpur",
    createdAt: new Date().toISOString(),
  },
];

/**
 * Retrieve all accounts from localStorage.
 */
export function getAccounts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      return [...DEFAULT_ACCOUNTS];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      return [...DEFAULT_ACCOUNTS];
    }
    return parsed;
  } catch (err) {
    console.error("Failed to read accounts from localStorage:", err);
    return [...DEFAULT_ACCOUNTS];
  }
}

/**
 * Persist accounts array to localStorage.
 */
function saveAccounts(accounts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.error("Failed to save accounts to localStorage:", err);
  }
}

/**
 * Register a new user account.
 * Checks localStorage key "annshare_accounts" for an existing account with the same identifier or phone.
 * Throws an error if duplicate is found.
 */
export function registerAccount({ name, organization, identifier, phone, password, role }) {
  const accounts = getAccounts();
  const cleanIdentifier = (identifier || "").trim();
  const cleanIdLower = cleanIdentifier.toLowerCase();
  const rawPhone = (phone || "").trim();

  const existing = accounts.find(
    (acc) => (acc.identifier || "").trim().toLowerCase() === cleanIdLower
  );

  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  if (rawPhone) {
    if (!isValidPhone(rawPhone)) {
      throw new Error("Please enter a valid 10-digit mobile number starting with 98 or 97.");
    }
    const cleanPhone = extractPhoneDigits(rawPhone);
    const phoneExisting = accounts.find((acc) => {
      const existingDigits = extractPhoneDigits(acc.phone || "");
      return existingDigits === cleanPhone;
    });
    if (phoneExisting) {
      throw new Error(
        "This phone number is already registered to another account. Each user must have a unique phone number."
      );
    }
  }

  const cleanPhone = rawPhone ? extractPhoneDigits(rawPhone) : "";
  const normalizedRole = role === "ngos" || role === "ngo" ? "ngo" : "donor";
  const orgName = (organization || name || "").trim();
  const userName = (name || "").trim();

  const newAccount = {
    id: `${normalizedRole}-${Date.now()}`,
    name: userName,
    organization: orgName,
    identifier: cleanIdentifier,
    email: cleanIdentifier,
    phone: cleanPhone || rawPhone,
    password: password || "",
    role: normalizedRole,
    avatar: userName[0]?.toUpperCase() || "U",
    badge: normalizedRole === "donor" ? "Verified Food Donor" : "Verified Community NGO",
    location: "Kathmandu, Nepal",
    createdAt: new Date().toISOString(),
  };

  accounts.push(newAccount);
  saveAccounts(accounts);
  return newAccount;
}

/**
 * Find an account with matching identifier and password.
 * Returns the matching account object or null if no match is found.
 */
export function findAccount(identifier, password, requiredRole) {
  const accounts = getAccounts();
  const cleanIdLower = (identifier || "").trim().toLowerCase();
  const cleanPassword = password || "";

  const match = accounts.find(
    (acc) =>
      (acc.identifier || "").trim().toLowerCase() === cleanIdLower &&
      acc.password === cleanPassword
  );

  return match || null;
}

/**
 * Reset/Update account password in localStorage accounts store
 */
export function updateAccountPassword(identifier, newPassword, requiredRole) {
  const accounts = getAccounts();
  const cleanIdLower = (identifier || "").trim().toLowerCase();
  const idx = accounts.findIndex(
    (acc) => (acc.identifier || "").trim().toLowerCase() === cleanIdLower
  );

  if (idx !== -1) {
    if (requiredRole) {
      const userRole = accounts[idx].role === "ngos" || accounts[idx].role === "ngo" ? "ngo" : "donor";
      const targetRole = requiredRole === "ngos" || requiredRole === "ngo" ? "ngo" : "donor";
      if (userRole !== targetRole && userRole !== "admin") {
        throw new Error(
          `This email is registered as a ${userRole === "donor" ? "Food Donor" : "NGO Partner"} account. Please switch to the ${userRole === "donor" ? "Donor" : "NGO"} tab to reset your password.`
        );
      }
    }
    accounts[idx].password = newPassword;
    saveAccounts(accounts);
    return accounts[idx];
  }
  return null;
}
