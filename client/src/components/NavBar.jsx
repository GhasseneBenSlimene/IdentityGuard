import { Link } from "react-router-dom";

export default function NavBar() {
  const style = { margin: "4px" };
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
      <Link to="/verifiers" style={style}>
        Verifier
      </Link>
    </nav>
  );
}
