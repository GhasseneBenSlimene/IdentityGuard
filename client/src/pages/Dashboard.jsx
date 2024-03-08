import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (user !== undefined) setLoading(false);
  }, [user]);

  if (loading) return <h1>Loading...</h1>;

  if (user === null) return <div>Please log in.</div>;

  return (
    <div>
      <h1>Welcome to your dashboard, {user.name}</h1>
    </div>
  );
}
