import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import "./dashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/usersInfo");
        // Initialize age for each user
        const usersWithAge = response.data.map((user) => ({
          ...user,
          age: "",
        }));
        setUsers(usersWithAge);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle age change for each user
  const handleAgeChange = (email, newAge) => {
    setUsers(
      users.map((user) =>
        user.email === email ? { ...user, age: newAge } : user
      )
    );
  };

  const sendAge = async (age, email) => {
    const response = await axios.post("/admin/accept", {
      age: age,
      email: email,
    });
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
                value={user.age}
                onChange={(e) => handleAgeChange(user.email, e.target.value)}
                className="form-control"
                id={`age-${user.email}`}
                name="age"
              />
              <label htmlFor={`age-${user.email}`}>Age</label>
            </div>
            <div className="buttons dashboardButtons">
              <button
                type="submit"
                className="btn btn-primary dashboardBtn"
                onClick={() => {
                  sendAge(user.age, user.email);
                }}
              >
                Accept
              </button>
              <button type="submit" className="btn btn-danger dashboardBtn">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
