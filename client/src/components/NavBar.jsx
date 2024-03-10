import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function NavBar() {
  const { user } = useContext(UserContext);
  const style = { margin: "4px" };
  if (user) return;
  return (
    <nav>
      <Link to="/" style={style}>
        Home
      </Link>
      <Link to="/register" style={style}>
        Register
      </Link>
      <Link to="/login" style={style}>
        Login
      </Link>
    </nav>
  );
}
