import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function AdminDashboard() {
  const response = axios.get("/usersInfo");
  const { user } = useContext(UserContext);
  return (
    <div>
      I m {user.name}
      {/* {response.data.map(({imagePath, email},index)=>{
      return <img src={}/>
    })} */}
    </div>
  );
}
