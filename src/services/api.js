import axios from 'axios';

const API_URL = 'https://backend-modernbuildtech.onrender.com/api/'; // Adjust to your Django backend URL

// Create axios instance with default headers
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_URL}token/refresh/`, {
          refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Échec du rafraîchissement du token:', refreshError);
        logoutUser();
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

// Register a new participant
export const registerParticipant = async (data) => {
  return await api.post('participants/create/', data);
};

// Get list of participants
export const getParticipants = async () => {
  return await api.get('participants/');
};

// Validate a participant
// Valider un participant
export const validateParticipant = async (id) => {
  return await api.patch(`participants/validate/${id}/`, {});
};

// Login user
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}login/`, credentials);
  const { access, refresh } = response.data;
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  return response;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};