import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // interact with the backend
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", data);
      if (response.data.error) toast.error(response.data.error);
      else {
        setData({});
        toast.success("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      if (error.response) toast.error(error.response.data.error);
      else toast.error("server not responding, try again later");
    }
  };
  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input
          type="text"
          placeholder="enter name ..."
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label>Email</label>
        <input
          type="text"
          placeholder="enter email ..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="enter password ..."
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
