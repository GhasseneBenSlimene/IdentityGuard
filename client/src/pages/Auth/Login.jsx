import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./utils/auth";
import { Input } from "../../components/Input";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleLogin = (e) => loginUser(e, data, setUser, setData, navigate);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      <form className="col-5" onSubmit={handleLogin}>
        <Input
          type="email"
          name="email"
          label="Email address"
          value={data.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
