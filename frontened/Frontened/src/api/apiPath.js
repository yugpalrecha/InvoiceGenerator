// Base URL
export const BASE_URL = "https://invoicegenerator-backend-j5g9.onrender.com";

// All API paths
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/v1/users/register",     // Signup
    LOGIN: "/api/v1/users/login",            // Login
    LOGOUT: "/api/v1/users/logout",          // Logout
    GET_PROFILE: "/api/v1/users/me",         // Get logged-in user
    UPDATE_PROFILE: "/api/v1/users/update",  // Update user profile
  },

  INVOICE: {
    CREATE: "/api/v1/invoice/create",        // Create invoice
    GET_ALL: "/api/v1/invoice",              // Get all invoices
    GET_BY_ID: (id) => `/api/v1/invoice/${id}`, // Get invoice by id
    UPDATE: (id) => `/api/v1/invoice/${id}`,    // Update invoice
    DELETE: (id) => `/api/v1/invoice/${id}`,    // Delete invoice
  },

  AI: {
    PARSE_INVOICE: "/api/ai/parse-invoice",        // AI parse invoice
    REMINDER_EMAIL: "/api/ai/reminder-email",      // AI reminder email
    DASHBOARD_SUMMARY: "/api/ai/dashboard-summary" // AI dashboard summary
  },
};
