import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("/login", data);
      if (response.data.error) toast.error(response.data.error);
      else {
        setUser(response.data);
        setData({});
        toast.success("You are logged in successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(`Login error: ${error}`);
      if (error.response.data.error) toast.error(error.response.data.error);
      else toast.error("server not responding, try again later");
    }
  };
  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="text"
          placeholder="enter email ..."
          value={data.email || ""}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="enter password ..."
          value={data.password || ""}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
