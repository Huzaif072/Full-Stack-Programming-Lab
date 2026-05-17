import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('rp_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
  updatePassword: (data: any) => api.put('/auth/password', data),
};

// Products
export const productAPI = {
  getAll: (params?: any) => api.get('/products', { params }),
  getOne: (id: string) => api.get(`/products/${id}`),
  getFeaturedAll: () => api.get('/products/featured-all'),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
  addReview: (id: string, data: any) => api.post(`/products/${id}/reviews`, data),
};

// Categories
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getOne: (slug: string) => api.get(`/categories/${slug}`),
  create: (data: any) => api.post('/categories', data),
  update: (id: string, data: any) => api.put(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

// Orders
export const orderAPI = {
  create: (data: any) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my'),
  getAll: (params?: any) => api.get('/orders/all', { params }),
  getOne: (id: string) => api.get(`/orders/${id}`),
  pay: (id: string, data: any) => api.put(`/orders/${id}/pay`, data),
  updateStatus: (id: string, status: string) => api.put(`/orders/${id}/status`, { status }),
};

// Cart
export const cartAPI = {
  validate: (items: any[]) => api.post('/cart/validate', { items }),
  getSummary: (items: any[]) => api.post('/cart/summary', { items }),
};

// Blog
export const blogAPI = {
  getAll: (params?: any) => api.get('/blog', { params }),
  getOne: (slug: string) => api.get(`/blog/${slug}`),
  create: (data: any) => api.post('/blog', data),
  update: (id: string, data: any) => api.put(`/blog/${id}`, data),
  delete: (id: string) => api.delete(`/blog/${id}`),
};

// Wishlist
export const wishlistAPI = {
  get: () => api.get('/wishlist'),
  toggle: (productId: string) => api.post(`/wishlist/${productId}`),
};

// Deals
export const dealAPI = {
  getAll: () => api.get('/deals'),
  create: (data: any) => api.post('/deals', data),
  update: (id: string, data: any) => api.put(`/deals/${id}`, data),
  delete: (id: string) => api.delete(`/deals/${id}`),
};

export default api;
