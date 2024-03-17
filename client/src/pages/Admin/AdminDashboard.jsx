import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function AdminDashboard() {
  const response = axios.get("/usersInfo");
  const { user } = useContext(UserContext);
  return <div>I m {user.name}</div>;
}