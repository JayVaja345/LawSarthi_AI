// frontend/src/services/api.js

import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const legalApi = {
  // Send legal query
  sendQuery: async (query, document = "") => {
    try {
      const response = await api.post("/legal/query", {
        query,
        document,
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get("/legal/health");
    return response.data;
  },
};

export default api;
