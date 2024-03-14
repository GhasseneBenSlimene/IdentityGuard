import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";

export default function Dashboard() {
  const { user, loading } = useContext(UserContext);

  if (loading) return <h1>Loading...</h1>;
  console.log(`Dashboard data: ${!!user}`);

  if (!user) return <div>Please log in.</div>;

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
      <a href="/prouveur">Prouveur</a>
      <a href="/verificateur">Verificateur</a>
    </div>
  );
}
