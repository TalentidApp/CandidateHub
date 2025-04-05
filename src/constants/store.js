import { create } from "zustand";
import axios from "axios";


  // eslint-disable-next-line no-undef
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  fetchCandidateDetails: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/api/candidate/fetchCandidate`, {
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
      await axios.post(`${API_URL}/api/candidate/candidate-logout`, {}, {
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