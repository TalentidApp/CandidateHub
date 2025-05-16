// authDataStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? '';

const useAuthDataStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  setAuthData: (data, token) => {
    set({
      user: data,
      token: token,
      loading: false,
      error: null,
    });
  },

  clearAuthData: () => {
    set({
      user: null,
      token: null,
      loading: false,
      error: null,
    });
  },

  fetchCandidateDetails: async () => {
    const { token } = useAuthDataStore.getState();
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/api/candidate/fetchCandidate`, {
        withCredentials: true,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      const userData = response.data.data; 
      set({
        user: userData,
        loading: false,
      });
      console.log("Fetched user data:", userData);
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error.message);
      set({
        error: error.response?.data?.message || "Failed to fetch candidate details",
        loading: false,
      });
    }
  },
}));

export default useAuthDataStore;