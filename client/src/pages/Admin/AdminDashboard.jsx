import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function AdminDashboard() {
  const { user } = useContext(UserContext);
  return <div>I m {user.name}</div>;
}
