import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  fetchCandidateDetails: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("http://localhost:4000/api/candidate/fetchCandidate", {
        withCredentials: true,
      });
      set({
        user: response.data.data,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch candidate details",
        isAuthenticated: false,
        loading: false,
      });
    }
  },
  logout: async () => {
    set({ loading: true, error: null });
    try {
      // Call the logout endpoint
      await axios.post("http://localhost:4000/api/candidate/candidate-logout", {}, {
        withCredentials: true,
      });
      
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      });
      
      return true; // Return success
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to logout",
        loading: false
      });
      return false; 
    }
  },
}));

export default useAuthStore;