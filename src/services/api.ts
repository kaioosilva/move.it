import axios from "axios";

const api = axios.create({
  baseURL: "https://moveit-next-kaioosilva.vercel.app",
  // baseURL: "http://localhost:3000",
});

export default api;
