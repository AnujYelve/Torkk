import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests if available (except for login)
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // Do not attach token for login requests
    if (!config.url.includes("/login")) {
      const token = localStorage.getItem("torkk_admin_token") || localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
  return config;
});

// Helper for unwrapping API response data
const handleResponse = async (promise) => {
  try {
    const res = await promise;
    return res.data?.data ?? res.data;
  } catch (err) {
    const data = err.response?.data;
    let message = data?.message || err.message || "An error occurred";
    if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      message = `${message} (${data.errors.join("; ")})`;
    }
    throw new Error(message);
  }
};

// ─── AUTH SERVICE ──────────────────────────────────────────────────
export const authService = {
  login: (credentials) =>
    api.post("/auth/login", credentials).then((res) => {
      const data = res.data?.data || res.data;
      if (data.accessToken && typeof window !== "undefined") {
        localStorage.setItem("torkk_admin_token", data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
        if (data.admin || data.user) {
          localStorage.setItem("torkk_admin_user", JSON.stringify(data.admin || data.user));
        }
      }
      return data;
    }),
  getMe: () => handleResponse(api.get("/auth/me")),
  changePassword: (passwords) => handleResponse(api.post("/auth/change-password", passwords)),
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("torkk_admin_token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("torkk_admin_user");
      localStorage.removeItem("refreshToken");
    }
  },
};

// ─── SETTINGS SERVICE ──────────────────────────────────────────────
export const settingsService = {
  getSettings: () => handleResponse(api.get("/settings")),
  updateSettings: (data) => handleResponse(api.put("/admin/settings", data)),
};

// ─── HOMEPAGE SERVICE ──────────────────────────────────────────────
export const homepageService = {
  getHomepage: () => handleResponse(api.get("/homepage")),
  updateHomepage: (data) => handleResponse(api.put("/admin/homepage", data)),
};

// ─── SUBSCRIPTION SERVICE ──────────────────────────────────────────
export const subscriptionService = {
  getPublicPlans: () => handleResponse(api.get("/subscriptions/plans")),
  getAdminPlans: (params) => handleResponse(api.get("/admin/subscriptions/plans", { params })),
  createPlan: (data) => handleResponse(api.post("/admin/subscriptions/plans", data)),
  updatePlan: (id, data) => handleResponse(api.put(`/admin/subscriptions/plans/${id}`, data)),
  deletePlan: (id) => handleResponse(api.delete(`/admin/subscriptions/plans/${id}`)),
  restorePlan: (id) => handleResponse(api.post(`/admin/subscriptions/plans/${id}/restore`)),
};

// ─── FAQ SERVICE ───────────────────────────────────────────────────
export const faqService = {
  getPublicFaqs: () => handleResponse(api.get("/faqs")),
  getAdminFaqs: (params) => handleResponse(api.get("/admin/faqs", { params })),
  createFaq: (data) => handleResponse(api.post("/admin/faqs", data)),
  updateFaq: (id, data) => handleResponse(api.put(`/admin/faqs/${id}`, data)),
  deleteFaq: (id) => handleResponse(api.delete(`/admin/faqs/${id}`)),
};

// ─── BLOG SERVICE ──────────────────────────────────────────────────
export const blogService = {
  getPublicBlogs: (params) => handleResponse(api.get("/blogs", { params })),
  getBlogBySlug: (slug) => handleResponse(api.get(`/blogs/${slug}`)),
  getAdminBlogs: (params) => handleResponse(api.get("/admin/blogs", { params })),
  createBlog: (data) => handleResponse(api.post("/admin/blogs", data)),
  updateBlog: (id, data) => handleResponse(api.put(`/admin/blogs/${id}`, data)),
  deleteBlog: (id) => handleResponse(api.delete(`/admin/blogs/${id}`)),
  restoreBlog: (id) => handleResponse(api.post(`/admin/blogs/${id}/restore`)),
};

// ─── CAREER SERVICE ────────────────────────────────────────────────
export const careerService = {
  getPublicCareers: () => handleResponse(api.get("/careers")),
  getAdminCareers: (params) => handleResponse(api.get("/admin/careers", { params })),
  createCareer: (data) => handleResponse(api.post("/admin/careers", data)),
  updateCareer: (id, data) => handleResponse(api.put(`/admin/careers/${id}`, data)),
  deleteCareer: (id) => handleResponse(api.delete(`/admin/careers/${id}`)),
  restoreCareer: (id) => handleResponse(api.post(`/admin/careers/${id}/restore`)),
  getApplications: () => handleResponse(api.get("/admin/careers/applications")),
  applyForJob: (id, data) => handleResponse(api.post(`/careers/${id}/apply`, data)),
};

// ─── DASHBOARD SERVICE ─────────────────────────────────────────────
export const dashboardService = {
  getStats: () => handleResponse(api.get("/admin/dashboard/stats")),
};

// ─── CONTACT SERVICE ───────────────────────────────────────────────
export const contactService = {
  submitContact: (data) => handleResponse(api.post("/contact", data)),
  getAdminSubmissions: (params) => handleResponse(api.get("/admin/contact", { params })),
  getSubmissionById: (id) => handleResponse(api.get(`/admin/contact/${id}`)),
  updateSubmission: (id, data) => handleResponse(api.patch(`/admin/contact/${id}`, data)),
  deleteSubmission: (id) => handleResponse(api.delete(`/admin/contact/${id}`)),
};

export default api;

