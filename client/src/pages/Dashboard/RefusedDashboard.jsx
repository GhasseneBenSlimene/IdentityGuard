import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "../../components/Input";
import { logoutUser } from "../Auth/utils/auth";
import { useNavigate } from "react-router-dom";

const RefusedDashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [refuseReason, setRefuseReason] = useState("");

  useEffect(() => {
    const fetchReason = async () => {
      const response = await axios.post("/refused/getReason", {
        email: user.email,
      });
      setRefuseReason(response.data.refuseReason);
    };

    fetchReason();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("email", user.email);

    try {
      await axios.post("/refused/sendImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Identity card submitted successfully.");
    } catch (error) {
      console.error("Error submitting identity card:", error);
      toast.error("Failed to submit identity card.");
    }
  };

  if (!user) {
    return (
      <div className="alert alert-danger justify-content-center" role="alert">
        You must be logged in to view this page.
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        Hello {user.name}
        <br />
        Your account creation demand has been refused.
        <br />
        Reason: {refuseReason || "No specific reason provided."}
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          logoutUser(setUser);
          navigate("/");
        }}
      >
        <div className="form-group">
          <label htmlFor="identityCardInput">
            Resubmit your identity card:
          </label>
          <Input
            type="file"
            name="image"
            accept="image/*"
            label="Identity card image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RefusedDashboard;
