import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./utils/auth";
import { Input } from "../../components/Input";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const handleRegister = (e) => registerUser(e, data, setData, navigate);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setData({ ...data, [e.target.name]: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      <form className="col-5" onSubmit={handleRegister}>
        <Input
          type="text"
          name="name"
          label="Name"
          value={data.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          label="Email address"
          value={data.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={data.password}
          onChange={handleChange}
        />
        <Input
          type="file"
          name="image"
          accept="image/*"
          label="Identity card image"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
