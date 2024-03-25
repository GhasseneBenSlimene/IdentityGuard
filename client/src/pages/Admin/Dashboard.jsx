import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import "./dashboard.css";
import handleError from "../tools";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const { loading } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/usersInfo");
        // Initialize dateOfBirth for each user
        const usersWithDateOfBirth = response.data.map((user) => ({
          ...user,
          dateOfBirth: "",
        }));
        setUsers(usersWithDateOfBirth);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle dateOfBirth change for each user
  const handleDateOfBirthChange = (email, newDateOfBirth) => {
    setUsers(
      users.map((user) =>
        user.email === email ? { ...user, dateOfBirth: newDateOfBirth } : user
      )
    );
  };

  const sendAge = async (user) => {
    await axios.post("/admin/accept", user);
  };

  const sendRefuse = async (user) => {
    setIsSending(true);
    try {
      const response = await axios.post("/admin/refuse", user);
      console.log(response.data.user.email, user.email);
      const newUsers = users.filter((user) => {
        return response.data.user.email !== user.email;
      });
      setUsers(newUsers);
      toast.success(response.data.message);
    } catch (error) {
      handleError("sendRefuse error: ", error);
    }
    setIsSending(false);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className="container dashboardContainer">
        {users.map((user) => (
          <div className="dashboardCard" key={user.email}>
            <img
              src={`${axios.defaults.baseURL}/admin/uploads/${user.imagePath}`}
              alt={user.email}
              className="dashboardImage"
            />
            <h6>{user.email}</h6>
            <div className="form-floating mb-3 mt-2">
              <input
                type="date"
                value={user.dateOfBirth}
                onChange={(e) =>
                  handleDateOfBirthChange(user.email, e.target.value)
                }
                className="form-control"
                id={`dateOfBirth-${user.email}`}
                name="dateOfBirth"
              />
              <label htmlFor={`dateOfBirth-${user.email}`}>Date of Birth</label>
            </div>
            <div className="buttons dashboardButtons">
              <button
                type="submit"
                className="btn btn-primary dashboardBtn"
                onClick={() => {
                  sendAge(user);
                }}
              >
                Accept
              </button>
              <button
                type="submit"
                className="btn btn-danger dashboardBtn"
                onClick={() => {
                  sendRefuse(user);
                }}
                disabled={isSending}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
