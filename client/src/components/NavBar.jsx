import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function NavBar() {
  const { user } = useContext(UserContext);
  if (user) return null;

  const render = (items) => {
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
                    to={`/${item}`}
                    key={index}
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

  return render(["Login", "Register", "Verifiers"]);
}
