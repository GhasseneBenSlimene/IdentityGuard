import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { setUser } = useContext(UserContext);
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  if (loading) return <h1>Loading...</h1>;
  console.log(`Dashboard data: ${!!user}`);

  if (!user) return <div>Please log in.</div>;

  const logout = async () => {
    try {
      const response = await axios.get("/logout");
      if (response.data.error) toast.error(response.data.error);
      else {
        navigate("/login");
        setUser(null);
        toast.success("logged out successfully");
      }
    } catch (error) {
      console.log(`Logout error: ${error}`);
      if (error.response.data.error) toast.error(error.response.data.error);
      else toast.error("server not responding, try again later");
    }
  };

  const redirectToRole = (role) => {
    // Rediriger vers la page correspondante en fonction du rôle
    if (role === "prouveur") {
    } else if (role === "verificateur") {
    }
  };

  return (
    <div>
      <h1>Welcome to your dashboard, {user.name}</h1>
      <p>Êtes-vous un Prouveur ou un Vérificateur?</p>
      <button onClick={() => redirectToRole("prouveur")}>Prouveur</button>
      <button onClick={() => redirectToRole("verificateur")}>
        Vérificateur
      </button>
      <br />
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
