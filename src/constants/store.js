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
        set({ loading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/api/candidate/candidate-login`, credentials, {
            withCredentials: true,
          });
          const { token, ...userData } = response.data;
          console.log("Login response:", { token, userData });
          set({
            user: userData,
            token,
            isAuthenticated: true,
            loading: false,
          });
          return true;
        } catch (error) {
          console.error("Login error:", error.response?.data);
          set({
            error: error.response?.data?.message || "Login failed",
            loading: false,
          });
          return false;
        }
      },

      checkAuth: async () => {
        const { token, isAuthenticated, user } = get();
        if (isAuthenticated && token && user) {
          console.log("Authenticated state restored, skipping API call");
          return true;
        }
        set({ loading: true, error: null });
        try {
          const response = await axios.get(`${API_URL}/api/candidate/fetchCandidate`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          console.log("Check auth response:", response.data);
          set({
            user: response.data,
            token,
            isAuthenticated: true,
            loading: false,
          });
          return true;
        } catch (error) {
          console.error("Check auth error:", error.response?.data);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: error.response?.data?.message || "Session expired. Please log in again.",
            loading: false,
          });
          return false;
        }
      },

      fetchCandidateDetails: async () => {
        const { token } = get();
        if (!token) {
          console.warn("No token found for fetchCandidateDetails");
          set({ error: "No token found", loading: false });
          return;
        }
        set({ loading: true, error: null });
        try {
          const response = await axios.get(`${API_URL}/api/candidate/fetchCandidate`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          console.log("Fetch candidate response:", response.data);
          set({ user: response.data, loading: false });
        } catch (error) {
          console.error("Fetch candidate error:", error.response?.data);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: error.response?.data?.message || "Failed to fetch candidate details",
            loading: false,
          });
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
          console.log("Logout successful");
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
        console.log("Clearing auth state");
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
    }
  )
);

export default useAuthStore;