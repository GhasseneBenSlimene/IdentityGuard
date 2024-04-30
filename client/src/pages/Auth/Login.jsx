import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./utils/auth";
import { Input } from "../../components/Input";
import "./Login.css"; // Import the custom CSS file

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    const { isLoggedIn, isAdmin, user, status } = await loginUser(data);
    if (isLoggedIn) {
      setData({});
      setUser(user);
      if (isAdmin) {
        navigate("/admin/dashboard");
      } else if (status == "Accepted") {
        navigate("/dashboard");
      } else if (status == "Refused") {
        navigate("/refusedDashboard");
      }
    } else if (status == "Pending") {
      setData({});
      setIsPending(true);
    }
  };

  return (
    <div className="login-container pt-26">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>
        <Input
          type="email"
          name="email"
          label="Email address"
          value={data.email}
          onChange={handleChange}
          className="login-input"
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={data.password}
          onChange={handleChange}
          className="login-input"
        />
        <div className="login-button-container">
          <button type="submit" className="login-button">
            Submit
          </button>
        </div>
        {isPending && (
          <div className="login-alert">
            Your account is pending approval. An administrator will review your
            information shortly. Once approved, you can then log in to your
            account. Thank you for your patience.
          </div>
        )}
      </form>
    </div>
  );
}
