import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_URL = 'https://talentid-backend-v2.vercel.app';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (credentials) => {
        set({ loading: true, error: null, user: null, token: null, isAuthenticated: false });
        try {
          const response = await axios.post(`${API_URL}/api/candidate/candidate-login`, credentials, {
            withCredentials: true,
          });
          const { token, ...userData } = response.data;
          console.log("Login response:", { token, userData }); // Debug log
          set({
            user: userData,
            token,
            isAuthenticated: true,
            loading: false,
          });
          return true;
        } catch (error) {
          console.error("Login error:", error.response?.data); // Debug log
          set({
            error: error.response?.data?.message || "Login failed",
            loading: false,
          });
          return false;
        }
      },

      fetchCandidateDetails: async () => {
        const { token } = get();
        if (!token) {
          console.warn("No token found for fetchCandidateDetails"); // Debug log
          set({ isAuthenticated: false, error: "No token found", loading: false });
          return;
        }
        set({ loading: true, error: null });
        try {
          const response = await axios.get(`${API_URL}/api/candidate/fetchCandidate`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          console.log("Fetch candidate response:", response.data); // Debug log
          set({ user: response.data, loading: false });
        } catch (error) {
          console.error("Fetch candidate error:", error.response?.data); // Debug log
          if (error.response?.status === 401) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              error: "Session expired. Please log in again.",
              loading: false,
            });
          } else {
            set({
              error: error.response?.data?.message || "Failed to fetch candidate details",
              loading: false,
            });
          }
        }
      },

      logout: async () => {
        const { token } = get();
        set({ loading: true, error: null });
        try {
          await axios.post(
            `${API_URL}/api/candidate/candidate-logout`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });
        }
      },

      clearAuthState: () => {
        console.log("Clearing auth state"); // Debug log
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: localStorage,
    }
  )
);
export default useAuthStore;
