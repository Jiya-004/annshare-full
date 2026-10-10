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
 * Checks localStorage key "annshare_accounts" for an existing account with the same identifier.
 * Throws an error if duplicate is found.
 */
export function registerAccount({ name, organization, identifier, password, role }) {
  const accounts = getAccounts();
  const cleanIdentifier = (identifier || "").trim();
  const cleanIdLower = cleanIdentifier.toLowerCase();

  const existing = accounts.find(
    (acc) => (acc.identifier || "").trim().toLowerCase() === cleanIdLower
  );

  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const normalizedRole = role === "ngos" || role === "ngo" ? "ngo" : "donor";
  const orgName = (organization || name || "").trim();
  const userName = (name || "").trim();

  const newAccount = {
    id: `${normalizedRole}-${Date.now()}`,
    name: userName,
    organization: orgName,
    identifier: cleanIdentifier,
    email: cleanIdentifier,
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
export function findAccount(identifier, password) {
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
