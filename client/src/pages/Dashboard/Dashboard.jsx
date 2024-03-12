import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Auth/utils/auth";

export default function Dashboard() {
  const { user, loading } = useContext(UserContext);

  if (loading) return <h1>Loading...</h1>;

  if (!user) return <div>Please log in.</div>;

  return (
    <div>
      <h1>Welcome to your dashboard, {user.name}</h1>
    </div>
  );
}
