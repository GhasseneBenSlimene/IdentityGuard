import axios from "axios";
import toast from "react-hot-toast";

async function registerUser(event, data, setData, navigate) {
  event.preventDefault();
  try {
    const response = await axios.post("/register", data);
    if (response.data.error) toast.error(response.data.error);
    else {
      setData({});
      toast.success("User registered successfully");
      navigate("/login");
    }
  } catch (error) {
    handleAuthError("Register error", error);
  }
}

async function loginUser(event, data, setUser, setData, navigate) {
  try {
    event.preventDefault();
    const response = await axios.post("/login", data);
    if (response.data.error) toast.error(response.data.error);
    else {
      setUser(response.data);
      setData({});
      toast.success("You are logged in successfully");
      navigate("/dashboard");
    }
  } catch (error) {
    handleAuthError("Login error", error);
  }
}

async function logoutUser(setUser, navigate) {
  try {
    const response = await axios.get("/logout");
    if (response.data.error) toast.error(response.data.error);
    else {
      setUser(null);
      toast.success("logged out successfully");
      navigate("/login");
    }
  } catch (error) {
    handleAuthError("Logout error", error);
  }
}

function handleAuthError(message, error) {
  console.log(`${message}: ${error}`);
  if (error.response && error.response.data && error.response.data.error)
    toast.error(error.response.data.error);
  else toast.error("server not responding, try again later");
}

export { loginUser, registerUser, logoutUser };
