import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("rx_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      typeof window !== "undefined" &&
      error.response &&
      error.response.status === 401
    ) {
      localStorage.removeItem("rx_token");
      localStorage.removeItem("rx_user");
      window.location.href = "/Login";
    }
    return Promise.reject(error);
  },
);

export default api;

export function getImageUrl(relativePath) {
  if (!relativePath) return null;
  if (relativePath.startsWith("http")) return relativePath;
  return `${API_BASE_URL}${relativePath}`;
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("rx_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function storeAuth(token, user) {
  localStorage.setItem("rx_token", token);
  localStorage.setItem("rx_user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("rx_token");
  localStorage.removeItem("rx_user");
}

export function updateStoredUser(partialData) {
  if (typeof window === "undefined") return null;
  try {
    const current = getStoredUser();
    if (current) {
      const updated = { ...current, ...partialData };
      localStorage.setItem("rx_user", JSON.stringify(updated));
      return updated;
    }
  } catch {
    return null;
  }
  return null;
}
