const TOKEN_KEY = 'crm_token';

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `crm_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
};

export const clearToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = 'crm_token=; path=/; max-age=0';
};

export const getUser = () => {
  if (typeof window === 'undefined') return null;
  const name = localStorage.getItem('crm_user_name');
  const email = localStorage.getItem('crm_user_email');
  if (!name) return null;
  return { name, email };
};

export const setUser = (user) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('crm_user_name', user.name);
  localStorage.setItem('crm_user_email', user.email);
};

export const clearUser = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('crm_user_name');
  localStorage.removeItem('crm_user_email');
};

export const logout = () => {
  clearToken();
  clearUser();
};
