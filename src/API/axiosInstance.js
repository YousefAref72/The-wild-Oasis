import axios from "axios";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
    "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
  },
});

export default axiosInstance;
