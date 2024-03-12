import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { logoutUser } from "../pages/Auth/utils/auth";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);

  const createNavLinks = (items, nave = true, onClick = (e) => {}) => {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            IdentityGuard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {items.map((item, index) => {
                return (
                  <NavLink
                    className="nav-item nav-link"
                    to={nave ? `/${item}` : "/"}
                    key={index}
                    onClick={onClick}
                  >
                    {item}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    );
  };

  if (user) return createNavLinks([]);
  return createNavLinks(["Login", "Register", "Verifiers"]);
}
