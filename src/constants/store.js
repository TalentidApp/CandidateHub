import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_URL = 'https://talentid-backend-v2.vercel.app';

const useAuthStore = create(persist(
  (set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,

    login: async (credentials) => {
      set({ loading: true, error: null });
      try {
        const response = await axios.post(
          `${API_URL}/api/candidate/candidate-login`,
          credentials,
        );
        const token = response.data.token;
        console.log(token)
        const userData = response.data;
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
          loading: false,
        });
        return true;
      } catch (error) {
        set({
          error: error.response?.data?.message || "Login failed",
          loading: false,
        });
        return false;
      }
    },

    fetchCandidateDetails: async () => {
      const { token } = get();
      set({ loading: true, error: null });
      try {
        const response = await axios.get(`${API_URL}/api/candidate/fetchCandidate`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        const userData = response.data;
        set({ user: userData, loading: false });
      } catch (error) {
        set({
          error: error.response?.data?.message || "Failed to fetch candidate details",
          isAuthenticated: false,
          loading: false,
        });
      }
    },

    logout: async () => {
      const { token } = get();
      try {
        await axios.post(
          `${API_URL}/api/candidate/candidate-logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
        set({
          error: error.response?.data?.message || "Failed to logout",
          loading: false,
        });
        return false;
      }
    },
  }),
  {
    name: "auth-storage",
    getStorage: () => localStorage,
  }
));

export default useAuthStore;
