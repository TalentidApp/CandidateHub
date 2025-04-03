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
        user: response.data,
        isAuthenticated: true,
        loading: false,
      });
      console.log(response.data)
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
      const {user} = useAuthStore.getState();
      const token = user?.token
      await axios.post("http://localhost:4000/api/candidate/candidate-logout", {}, {
        withCredentials: true,
        headers : {
          'Authorization' : `Bearer ${token}`
        }
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