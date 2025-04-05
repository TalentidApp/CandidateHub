// authStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? '';

const useAuthStore = create((set) => ({
  user: null,           // Stores user data from login or fetchCandidateDetails
  token: null,          // Stores the JWT token from login response
  isAuthenticated: false, // Authentication state
  loading: false,       // Loading state for async operations
  error: null,          // Error state for async operations

  // Login action to set auth data and update authentication state
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/api/candidate/candidate-login`,
        credentials,
        { withCredentials: true }
      );
      const token = response.data.token;
      const userData = response.data;
      set({
        user: userData,
        token: token,
        isAuthenticated: true,
        loading: false,
      });
      console.log("Login response:", { userData, token });
      return true;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      });
      return false;
    }
  },

  // Fetch candidate details using the stored token
  fetchCandidateDetails: async () => {
    const { token } = useAuthStore.getState();
    console.log('tok'+token)
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/api/candidate/fetchCandidate`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        withCredentials: true,
      });
      console.log(response)
      const userData = response.data; // Adjust based on backend response
      set({
        user: userData,
        loading: false,
      });
      console.log("Fetched user data:", userData);
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error.message);
      set({
        error: error.response?.data?.message || "Failed to fetch candidate details",
        isAuthenticated: false, // Reset auth state on fetch failure
        loading: false,
      });
    }
  },

  // Logout action
  logout: async () => {
    set({ loading: true, error: null });
    try {
      const { token } = useAuthStore.getState();
      await axios.post(
        `${API_URL}/api/candidate/candidate-logout`,
        {},
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
      return true;
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      set({
        error: error.response?.data?.message || "Failed to logout",
        loading: false,
      });
      return false;
    }
  },
}));

export default useAuthStore;