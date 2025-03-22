import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;

  }

  return config;

});

export const login = async (loginData) => {
  const response = await api.post('/auth/login', loginData);

  const token = response.data.token;
  localStorage.setItem('token', token);

  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return response.data;

};

export const register = async (registerData) => {
  try {
    const response = await api.post('/auth/register', registerData);

    return response.data;

  } catch (error) {
    console.error('Register error:', error.response || error);
    throw new Error(error);

  }
};

export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');

    localStorage.clear();

    return response.data;

  } catch (error) {
    console.error('Logout error:', error.response || error);

  }
  
};

export { api };
