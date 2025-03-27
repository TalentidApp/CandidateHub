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

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;