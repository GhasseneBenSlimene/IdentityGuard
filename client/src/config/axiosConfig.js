import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// enable cross-origin cookies
axios.defaults.withCredentials = true;

//log every request sent
axios.interceptors.request.use(
  (request) => {
    console.log(
      `Sending request to ${request.url} at ${new Date().toISOString()}`
    );
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
