import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Auth/utils/auth";

export default function Dashboard() {
  const { setUser } = useContext(UserContext);
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  if (loading) return <h1>Loading...</h1>;
  console.log(`Dashboard data: ${!!user}`);

  if (!user) return <div>Please log in.</div>;

  const handleLogout = () => logoutUser(setUser, navigate);

  return (
    <div>
      <h1>Welcome to your dashboard, {user.name}</h1>
      <br />
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}
