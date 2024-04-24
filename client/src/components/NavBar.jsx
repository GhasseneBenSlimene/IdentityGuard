import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { logoutUser } from "../pages/Auth/utils/auth";

export default function NavBar() {
 const { user, setUser } = useContext(UserContext);

 const createNavLinks = (items) => {
    return (
      <nav className="bg-gray-800 p-1 mt-0 w-full">
        <div className="container-fluid">
          <Link className="navbar-brand text-white font-extrabold text-6xl"  to="/">
            IdentityGuard
          </Link>
          </div>
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          
          <div className="flex justify-end space-x-4">
            <ul className="flex items-center space-x-4">
              {items.map(({ name, path, onClick }, index) => {
                return (
                 <li key={index}>
                    <NavLink
                      className="inline-block py-2 px-4 text-black no-underline hover:bg-designColor rounded font-bodyFont"
                      to={path}
                      onClick={onClick}
                    >
                      {name}
                    </NavLink>
                 </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    );
 };

 if (user && user.admin) {
    return createNavLinks([
      { name: "Dashboard", path: "admin/dashboard" },
      { name: "Logout", path: "/login", onClick: () => logoutUser(setUser) },
    ]);
 } else if (user && user.status == "Accepted") {
    return createNavLinks([
      { name: "Dashboard", path: "/dashboard" },
      { name: "Verifier", path: "/verifiers" },
      { name: "Logout", path: "/login", onClick: () => logoutUser(setUser) },
    ]);
 } else if (user && user.status == "Refused") {
    return createNavLinks([
      { name: "Dashboard", path: "/refusedDashboard" },
      { name: "Logout", path: "/login", onClick: () => logoutUser(setUser) },
    ]);
 } else {
    return createNavLinks([
      { name: "Login", path: "/login" },
      { name: "Register", path: "/register" },
      { name: "Verifier", path: "/verifiers" },
    ]);
 }
}
