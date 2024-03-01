import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";

axios.defaults.baseURL = "http://localhost:8000";

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

function App() {
  return (
    <UserContextProvider>
      <Toaster position="bottom-center" toastOptions={{ duration: 5000 }} />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
