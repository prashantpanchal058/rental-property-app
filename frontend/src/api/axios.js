// import axios from 'axios';

// const API = axios.create({
//     baseURL: 'http://localhost:5000/api', // Match your backend port
// });

// // This is the MAGIC part: it attaches your token to every call
// API.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token'); 
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "https://rental-property-app.onrender.com/api"
});

// ✅ Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;