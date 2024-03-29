import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "../../components/Input";

const RefusedDashboard = () => {
  const { user, loading } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [refuseReason, setRefuseReason] = useState("");

  useEffect(() => {
    const fetchReason = async () => {
      console.log("email: " + user.email);
      const response = await axios.post("/refused/getReason", {
        email: user.email,
      });
      setRefuseReason(response.data.refuseReason);
    };

    fetchReason();
  }, [loading]);

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
    formData.append("identityCard", selectedFile);

    try {
      await axios.post("/sendImage", formData, {
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

  return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        Your account creation demand has been refused.
        <br />
        Reason: {refuseReason || "No specific reason provided."}
      </div>
      <form onSubmit={handleSubmit}>
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
