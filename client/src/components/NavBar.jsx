import React, { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { logoutUser } from "../pages/Auth/utils/auth";

export default function NavBar() {
 const { user, setUser } = useContext(UserContext);
 const location = useLocation(); // Get the current location

 const createNavLinks = (items) => {
    return (
      <nav className="bg-gray-800 p-1 mt-0 w-full fixed top-0 z-20">
        <div className="container-fluid pt-1">
        <Link
 className="navbar-brand text-white font-extrabold text-6xl bg-designColor hover:bg-blue-700 py-2 px-4 rounded "
 to="/"
>
 IdentityGuard
</Link>
        </div>
        <div className="container mx-auto my-8 flex flex-wrap items-center justify-between">

          <div className="flex justify-end space-x-4">
            <ul className="flex items-center space-x-4">
              {items.map(({ name, path, onClick }, index) => {
                // Determine if the current path matches the NavLink's path
                const isActive = location.pathname === path;
                return (
                 <li key={index}>
                    <NavLink
                      className={`inline-block py-2 px-4 text-black no-underline rounded font-bodyFont ${isActive ? 'bg-designColor' : 'hover:bg-designColor'}`}
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
      { name: "Verifier", path: "/verifiers" },
      { name: "Logout", path: "/login", onClick: () => logoutUser(setUser) },
    ]);
 } else if (user && user.status === "Accepted") {
    return createNavLinks([
      { name: "Dashboard", path: "/dashboard" },
      { name: "Verifier", path: "/verifiers" },
      { name: "Logout", path: "/login", onClick: () => logoutUser(setUser) },
    ]);
 } else if (user && user.status === "Refused") {
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
